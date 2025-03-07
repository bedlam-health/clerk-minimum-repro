"use client"
import React, { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"

const AuthDebugger = () => {
  const [debugInfo, setDebugInfo] = useState({
    serviceWorkerStatus: "Checking...",
    authStatus: "Checking...",
    idToken: "Checking...",
    interceptorTest: "Not tested",
    lastError: null as string | null,
  })

  useEffect(() => {
    // Check Service Worker Registration
    const checkServiceWorker = async () => {
      try {
        if ("serviceWorker" in navigator) {
          const registration = await navigator.serviceWorker.getRegistration()
          setDebugInfo((prev) => ({
            ...prev,
            serviceWorkerStatus: registration
              ? `Registered at: ${registration.scope}`
              : "Not registered",
          }))
        } else {
          setDebugInfo((prev) => ({
            ...prev,
            serviceWorkerStatus: "Service Workers not supported",
          }))
        }
      } catch (error: any) {
        setDebugInfo((prev) => ({
          ...prev,
          serviceWorkerStatus: `Error: ${error.message}`,
        }))
      }
    }

    // Check Auth State
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken()
          setDebugInfo((prev) => ({
            ...prev,
            authStatus: `Logged in as: ${user.email}`,
            idToken: `Token available (${token.substring(0, 10)}...)`,
          }))
        } catch (error: any) {
          setDebugInfo((prev) => ({
            ...prev,
            authStatus: `Error getting token: ${error.message}`,
            idToken: "Error",
          }))
        }
      } else {
        setDebugInfo((prev) => ({
          ...prev,
          authStatus: "Not logged in",
          idToken: "No token",
        }))
      }
    })

    // Test interceptor
    const testInterceptor = async () => {
      try {
        const response = await fetch("/api/test-auth", {
          method: "POST", // Changed to POST to be explicit
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ test: true }), // Added body to make it a valid POST
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log("data", data)
        setDebugInfo((prev) => ({
          ...prev,
          interceptorTest: data.idToken
            ? "Token detected in request"
            : "No token in request",
          lastError: null,
        }))
      } catch (error) {
        setDebugInfo((prev) => ({
          ...prev,
          interceptorTest: "Request failed",
          lastError:
            error instanceof Error ? error.message : "Unknown error occurred",
        }))
      }
    }

    checkServiceWorker()
    testInterceptor()

    return () => unsubscribe()
  }, [])

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Auth Debug Info</h2>
      <div className="space-y-2">
        <div className="flex gap-2">
          <span className="font-semibold">Service Worker:</span>
          <span
            className={
              debugInfo.serviceWorkerStatus.includes("Error")
                ? "text-red-600"
                : ""
            }
          >
            {debugInfo.serviceWorkerStatus}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold">Auth Status:</span>
          <span>{debugInfo.authStatus}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold">ID Token:</span>
          <span>{debugInfo.idToken}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold">Interceptor Test:</span>
          <span
            className={
              debugInfo.interceptorTest.includes("Error") ? "text-red-600" : ""
            }
          >
            {debugInfo.interceptorTest}
          </span>
        </div>
        {debugInfo.lastError && (
          <div className="mt-2 p-2 bg-red-50 text-red-600 rounded">
            <span className="font-semibold">Error:</span> {debugInfo.lastError}
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthDebugger
