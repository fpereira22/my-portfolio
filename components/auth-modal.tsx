"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"
import { AuthService } from "@/lib/auth"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (user: { name: string; email: string }) => void
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Detectar combinación de teclas: Ctrl+Alt+T para usuario de prueba y Ctrl+Alt+S para superadmin
    const handleKeyDown = (e: KeyboardEvent) => {
      const newKeysPressed = new Set(keysPressed)
      newKeysPressed.add(e.key.toLowerCase())
      setKeysPressed(newKeysPressed)

      // Verificar si la combinación está completa para usuario de prueba (Ctrl+Alt+T)
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "t") {
        e.preventDefault()
        const testUser = AuthService.getTestUser()
        setFormData({
          name: testUser.name,
          email: testUser.email,
          password: testUser.password,
        })

        // Auto-login después de un breve retraso
        setTimeout(() => {
          handleAutoLogin(testUser)
        }, 500)
      }

      // Verificar si la combinación está completa para superadmin (Ctrl+Alt+S)
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "s") {
        e.preventDefault()
        const superAdmin = AuthService.getSuperAdmin()
        setFormData({
          name: superAdmin.name,
          email: superAdmin.email,
          password: superAdmin.password,
        })

        // Auto-login después de un breve retraso
        setTimeout(() => {
          handleAutoLogin(superAdmin)
        }, 500)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const newKeysPressed = new Set(keysPressed)
      newKeysPressed.delete(e.key.toLowerCase())
      setKeysPressed(newKeysPressed)
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [keysPressed])

  if (!isOpen) return null

  const handleAutoLogin = async (testUser: { name: string; email: string; password: string }) => {
    setLoading(true)
    setMessage({ type: "success", text: "Acceso automático con usuario de prueba" })

    setTimeout(() => {
      onLogin({ name: testUser.name, email: testUser.email })
      onClose()
      setFormData({ name: "", email: "", password: "" })
      setMessage(null)
      setLoading(false)
    }, 1000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      if (isLoginMode) {
        const result = await AuthService.login(formData.email, formData.password)

        if (result.success && result.user) {
          setMessage({ type: "success", text: result.message })
          setTimeout(() => {
            onLogin({ name: result.user!.name, email: result.user!.email })
            onClose()
            setFormData({ name: "", email: "", password: "" })
            setMessage(null)
          }, 1000)
        } else {
          setMessage({ type: "error", text: result.message })
        }
      } else {
        const result = await AuthService.register(formData.name, formData.email, formData.password)

        if (result.success) {
          setMessage({ type: "success", text: result.message })
          setTimeout(() => {
            setIsLoginMode(true)
            setFormData({ name: "", email: "", password: "" })
            setMessage(null)
          }, 1500)
        } else {
          setMessage({ type: "error", text: result.message })
        }
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error inesperado. Intenta nuevamente." })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({ name: "", email: "", password: "" })
    setMessage(null)
    setShowPassword(false)
  }

  const switchMode = () => {
    setIsLoginMode(!isLoginMode)
    resetForm()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-6 text-white relative">
          <button
            onClick={() => {
              onClose()
              resetForm()
            }}
            className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold">{isLoginMode ? "Iniciar Sesión" : "Crear Cuenta"}</h2>
          <p className="text-purple-100 mt-1">{isLoginMode ? "Accede a tu cuenta" : "Únete a nuestra comunidad"}</p>
          {/* <div className="text-xs text-purple-200 mt-2 opacity-70">
            Tip: Usa Ctrl+Alt+T para usuario de prueba o Ctrl+Alt+S para superadmin
          </div> */}
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-4 flex items-center gap-2 ${
              message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {message.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="text-sm font-medium">{message.text}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isLoginMode && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Nombre completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-gray-900 placeholder:text-gray-500"
                required
                disabled={loading}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-gray-900 placeholder:text-gray-500"
              required
              disabled={loading}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pl-10 pr-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-gray-900 placeholder:text-gray-500"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              disabled={loading}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Procesando..." : isLoginMode ? "Iniciar Sesión" : "Crear Cuenta"}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={switchMode}
              disabled={loading}
              className="text-purple-600 hover:text-purple-700 font-medium disabled:opacity-50"
            >
              {isLoginMode ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
