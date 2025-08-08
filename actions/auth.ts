"use server"

import { generateJWT } from "@/lib/jwt"

export async function loginUser(email: string, password: string) {
  // Simulate user authentication (replace with your actual auth logic)
  if (email === "user@example.com" && password === "password") {
    const token = await generateJWT({
      userId: "123",
      email: email,
      role: "user",
    })

    return {
      success: true,
      token,
      message: "Login successful",
    }
  }

  return {
    success: false,
    token: null,
    message: "Invalid credentials",
  }
}

export async function validateToken(token: string) {
  const { verifyJWT } = await import("@/lib/jwt")
  const payload = await verifyJWT(token)

  if (!payload) {
    return {
      valid: false,
      message: "Invalid or expired token",
    }
  }

  return {
    valid: true,
    payload,
    message: "Token is valid",
  }
}
