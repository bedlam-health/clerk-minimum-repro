"server-only"
import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

// Check if we're in a build/SSG environment
const isBuildTime =
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PHASE === "phase-production-build"

function checkEmulatorVariables() {
  const emulatorVars = {
    FB_AUTH_EMULATOR_HOST: process.env.FB_AUTH_EMULATOR_HOST,
    FB_STORAGE_EMULATOR_HOST: process.env.FB_STORAGE_EMULATOR_HOST,
    FIRESTORE_EMULATOR_HOST: process.env.FIRESTORE_EMULATOR_HOST,
  }

  const activeEmulators = Object.entries(emulatorVars)
    // eslint-disable-next-line
    .filter(([_, value]) => value)
    .map(([name]) => name)

  if (activeEmulators.length > 0) {
    console.warn("⚠️ Firebase Emulator variables detected:", activeEmulators)
    console.warn(
      "This may cause Firebase Admin to connect to emulators instead of production"
    )
  } else {
    console.log("✅ No Firebase Emulator variables detected")
  }
}

// Check if all required Firebase credentials are available
function checkFirebaseCredentials() {
  const requiredVars = {
    FB_PROJECT_ID: process.env.FB_PROJECT_ID,
    FB_CLIENT_EMAIL: process.env.FB_CLIENT_EMAIL,
    FB_PRIVATE_KEY: process.env.FB_PRIVATE_KEY,
  }

  const missingVars = Object.entries(requiredVars)
    .filter(([, value]) => !value || value.length === 0)
    .map(([name]) => name)

  if (missingVars.length > 0) {
    console.warn("⚠️ Missing Firebase credentials:", missingVars)
    return false
  }

  return true
}

function hasValidFirebaseCredentials() {
  return checkFirebaseCredentials()
}

// Only initialize if app hasn't been initialized yet
export function initializeFirebaseAdmin() {
  // Skip Firebase initialization during build time or if credentials are missing
  if (isBuildTime) {
    console.log("🔄 Skipping Firebase initialization during build process")
    return null
  }

  if (!hasValidFirebaseCredentials()) {
    console.warn(
      "⚠️ Missing Firebase credentials. Using mock/null Firebase instance"
    )
    return null
  }

  if (getApps().length === 0) {
    checkEmulatorVariables()
    try {
      const app = initializeApp({
        credential: cert({
          projectId: process.env.FB_PROJECT_ID,
          clientEmail: process.env.FB_CLIENT_EMAIL,
          privateKey: JSON.parse(process.env.FB_PRIVATE_KEY ?? ""),
        }),
      })

      console.log(
        "Initializing Firebase Admin with project:",
        process.env.FB_PROJECT_ID
      )
      return app
    } catch (error) {
      console.error("Firebase initialization error:", error)
      // Return null or throw depending on your error handling strategy
      return null
    }
  }

  // Return the existing app if already initialized
  return getApps()[0]
}

// Get Firestore instance
export function getFirestoreInstance() {
  const app = initializeFirebaseAdmin()
  if (!app) {
    // During build time, return a mock or null version
    if (isBuildTime) {
      console.log("🔄 Using mock Firestore during build")
      return {
        collection: () => ({
          get: async () => ({
            docs: [],
            size: 0,
            empty: true,
          }),
        }),
        doc: () => ({
          get: async () => ({
            exists: false,
            data: () => null,
          }),
        }),
      } as unknown as ReturnType<typeof getFirestore>
    }
    throw new Error("Firebase app initialization failed")
  }
  return getFirestore(app)
}
