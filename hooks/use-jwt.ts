"use client"

import { useState, useEffect } from "react"
import { isTokenExpired, getTokenExpirationTime } from "@/lib/jwt"

export function useJWT() {
  const [token, setToken] = useState<string | null>(null)
  const [isExpired, setIsExpired] = useState(false)
  const [expirationTime, setExpirationTime] = useState<Date | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<string>("")

  useEffect(() => {
    // Check for existing token in localStorage
    const storedToken = localStorage.getItem("jwt_token")
    if (storedToken) {
      setToken(storedToken)
      updateTokenStatus(storedToken)
    }
  }, [])

  useEffect(() => {
    if (!token) return

    const interval = setInterval(() => {
      updateTokenStatus(token)
    }, 1000) // Update every second

    return () => clearInterval(interval)
  }, [token])

  const updateTokenStatus = (currentToken: string) => {
    const expired = isTokenExpired(currentToken)
    const expTime = getTokenExpirationTime(currentToken)

    setIsExpired(expired)
    setExpirationTime(expTime)

    if (expired) {
      setTimeRemaining("Expired")
      // Automatically remove expired token
      removeToken()
    } else if (expTime) {
      const now = new Date()
      const diff = expTime.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`)
    }
  }

  const saveToken = (newToken: string) => {
    setToken(newToken)
    localStorage.setItem("jwt_token", newToken)
    updateTokenStatus(newToken)
  }

  const removeToken = () => {
    setToken(null)
    setIsExpired(false)
    setExpirationTime(null)
    setTimeRemaining("")
    localStorage.removeItem("jwt_token")
  }

  return {
    token,
    isExpired,
    expirationTime,
    timeRemaining,
    saveToken,
    removeToken,
  }
}
