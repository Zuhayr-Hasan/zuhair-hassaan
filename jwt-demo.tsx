"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { loginUser, validateToken } from "@/actions/auth"
import { useJWT } from "@/hooks/use-jwt"

export default function JWTDemo() {
  const [email, setEmail] = useState("user@example.com")
  const [password, setPassword] = useState("password")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [validationResult, setValidationResult] = useState<any>(null)

  const { token, isExpired, expirationTime, timeRemaining, saveToken, removeToken } = useJWT()

  const handleLogin = async () => {
    setLoading(true)
    setMessage("")

    try {
      const result = await loginUser(email, password)

      if (result.success && result.token) {
        saveToken(result.token)
        setMessage("Login successful! JWT token generated.")
      } else {
        setMessage(result.message)
      }
    } catch (error) {
      setMessage("Login failed")
    } finally {
      setLoading(false)
    }
  }

  const handleValidateToken = async () => {
    if (!token) return

    setLoading(true)
    try {
      const result = await validateToken(token)
      setValidationResult(result)
    } catch (error) {
      setValidationResult({ valid: false, message: "Validation failed" })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    removeToken()
    setMessage("Logged out successfully")
    setValidationResult(null)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>JWT Token Demo</CardTitle>
          <CardDescription>Generate a JWT token that expires automatically after 2 hours</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!token ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                />
              </div>
              <Button onClick={handleLogin} disabled={loading} className="w-full">
                {loading ? "Logging in..." : "Login & Generate JWT"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Token Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span>Status:</span>
                    <Badge variant={isExpired ? "destructive" : "default"}>{isExpired ? "Expired" : "Active"}</Badge>
                  </div>
                  <div>
                    <span>Time Remaining: </span>
                    <span className="font-mono">{timeRemaining}</span>
                  </div>
                  {expirationTime && (
                    <div>
                      <span>Expires At: </span>
                      <span className="font-mono">{expirationTime.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">JWT Token</h3>
                <div className="font-mono text-sm break-all bg-white p-2 rounded border">{token}</div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleValidateToken} disabled={loading} variant="outline">
                  Validate Token
                </Button>
                <Button onClick={handleLogout} variant="destructive">
                  Logout
                </Button>
              </div>
            </div>
          )}

          {message && <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">{message}</div>}

          {validationResult && (
            <div
              className={`p-3 rounded-lg border ${
                validationResult.valid ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
              }`}
            >
              <h4 className="font-semibold">Validation Result:</h4>
              <p>{validationResult.message}</p>
              {validationResult.payload && (
                <pre className="mt-2 text-sm">{JSON.stringify(validationResult.payload, null, 2)}</pre>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
