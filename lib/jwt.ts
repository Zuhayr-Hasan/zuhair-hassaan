import { SignJWT, jwtVerify } from "jose"

const secretKey = process.env.JWT_SECRET || "your-secret-key-here"
const encodedKey = new TextEncoder().encode(secretKey)

export interface JWTPayload {
  userId: string
  email: string
  role?: string
  iat?: number
  exp?: number
}

export async function generateJWT(payload: Omit<JWTPayload, "iat" | "exp">) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h") // Expires in 2 hours
    .sign(encodedKey)

  return token
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    })

    return payload as JWTPayload
  } catch (error) {
    console.error("JWT verification failed:", error)
    return null
  }
}

export function isTokenExpired(token: string): boolean {
  try {
    // Decode without verification to check expiration
    const [, payloadBase64] = token.split(".")
    const payload = JSON.parse(atob(payloadBase64))

    if (!payload.exp) return true

    const currentTime = Math.floor(Date.now() / 1000)
    return payload.exp < currentTime
  } catch (error) {
    return true
  }
}

export function getTokenExpirationTime(token: string): Date | null {
  try {
    const [, payloadBase64] = token.split(".")
    const payload = JSON.parse(atob(payloadBase64))

    if (!payload.exp) return null

    return new Date(payload.exp * 1000)
  } catch (error) {
    return null
  }
}
