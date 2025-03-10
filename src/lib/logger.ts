// lib/logger.ts
import { NextRequest } from "next/server"

// Log levels for different types of messages
export enum LogLevel {
  ERROR = "ERROR",
  WARN = "WARN",
  INFO = "INFO",
  DEBUG = "DEBUG",
}

// Interface for log entries
interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  metadata?: Record<string, any>
  requestId?: string
  userId?: string
  path?: string
  method?: string
}

// Logger class with different methods for each log level
export class Logger {
  private static instance: Logger
  private environment: string

  private constructor() {
    this.environment = process.env.NODE_ENV || "development"
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  private formatLog(
    level: LogLevel,
    message: string,
    metadata?: Record<string, any>
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      metadata: metadata ? this.sanitizeMetadata(metadata) : undefined,
    }
  }

  private sanitizeMetadata(metadata: Record<string, any>): Record<string, any> {
    const sensitiveFields = ["password", "token", "secret", "authorization"]
    const sanitized = { ...metadata }

    for (const key in sanitized) {
      if (sensitiveFields.some((field) => key.toLowerCase().includes(field))) {
        sanitized[key] = "[REDACTED]"
      }
    }

    return sanitized
  }

  private writeLog(entry: LogEntry): void {
    const consoleMethods = {
      [LogLevel.ERROR]: console.error,
      [LogLevel.WARN]: console.warn,
      [LogLevel.INFO]: console.info,
      [LogLevel.DEBUG]: console.debug,
    }

    // In development, log to console with colors
    if (process.env.NODE_ENV === "development") {
      const colors = {
        [LogLevel.ERROR]: "\x1b[31m", // Red
        [LogLevel.WARN]: "\x1b[33m", // Yellow
        [LogLevel.INFO]: "\x1b[36m", // Cyan
        [LogLevel.DEBUG]: "\x1b[32m", // Green
      }

      console.log(
        `${colors[entry.level]}[${entry.level}]\x1b[0m [${entry.timestamp}] ${
          entry.message
        }`,
        entry.metadata ? `\nMetadata: ${JSON.stringify(entry.metadata)}` : ""
      )
    } else {
      // In production, you might want to send logs to a service like Datadog, NewRelic, or CloudWatch
      // This is where you'd implement your production logging service
      // Sending them to Google Cloud Logs means just using the console.log methods
      const consoleMethod = consoleMethods[entry.level]
      consoleMethod(JSON.stringify(entry))
    }
  }

  public error(message: string, metadata?: Record<string, any>): void {
    this.writeLog(this.formatLog(LogLevel.ERROR, message, metadata))
  }

  public warn(message: string, metadata?: Record<string, any>): void {
    this.writeLog(this.formatLog(LogLevel.WARN, message, metadata))
  }

  public info(message: string, metadata?: Record<string, any>): void {
    this.writeLog(this.formatLog(LogLevel.INFO, message, metadata))
  }

  public debug(message: string, metadata?: Record<string, any>): void {
    if (this.environment === "development") {
      this.writeLog(this.formatLog(LogLevel.DEBUG, message, metadata))
    }
  }
}

// Create a singleton instance
export const logger = Logger.getInstance()

// Middleware for API routes
export async function loggerMiddleware(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<Response>
): Promise<Response> {
  const requestId = crypto.randomUUID()
  const startTime = performance.now()
  try {
    logger.info(`API Request started`, {
      requestId,
      method: req.method,
      path: req.nextUrl.pathname,
      referer: req.headers.get("referer"),
      query: Object.fromEntries(req.nextUrl.searchParams),
    })

    const response = await handler(req)
    const responseClone = response.clone()

    const endTime = performance.now()
    logger.info(`API Request completed`, {
      requestId,
      method: req.method,
      path: req.nextUrl.pathname,
      status: response.status,
      message: await responseClone.json(),
      duration: `${Math.round(endTime - startTime)}ms`,
    })

    return response
  } catch (error) {
    const endTime = performance.now()
    logger.error(`API Request failed`, {
      requestId,
      method: req.method,
      path: req.nextUrl.pathname,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      duration: `${Math.round(endTime - startTime)}ms`,
    })

    throw error
  }
}
