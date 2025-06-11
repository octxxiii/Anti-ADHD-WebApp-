"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, Chrome, User } from "lucide-react"

interface AuthUser {
  id: string
  email: string
  name: string
  avatar?: string
}

interface AuthFlowProps {
  onLogin: (user: AuthUser) => void
  onAnonymousMode: () => void
}

export default function AuthFlow({ onLogin, onAnonymousMode }: AuthFlowProps) {
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      setIsLoading(false)
      return
    }

    // Mock successful authentication
    const user: AuthUser = {
      id: "1",
      email: formData.email,
      name: mode === "signup" ? formData.name : "John Doe",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`,
    }

    onLogin(user)
    setIsLoading(false)
  }

  const handleGoogleSignIn = () => {
    // Mock Google sign-in
    const user: AuthUser = {
      id: "google-1",
      email: "user@gmail.com",
      name: "Google User",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=google",
    }
    onLogin(user)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Team Matrix</h1>
          <p className="text-gray-600 dark:text-gray-400">Collaborate with the Eisenhower Matrix</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {mode === "login" ? "Welcome back" : "Create account"}
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              {mode === "login"
                ? "Enter your credentials to access your workspace"
                : "Sign up to start collaborating with your team"}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      type="text"
                      className="pl-10"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      type={showPassword ? "text" : "password"}
                      className="pl-10"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-800 px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>

            <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700" onClick={onAnonymousMode}>
              Try without account
            </Button>

            <div className="text-center">
              <Button variant="link" className="text-sm" onClick={() => setMode(mode === "login" ? "signup" : "login")}>
                {mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
