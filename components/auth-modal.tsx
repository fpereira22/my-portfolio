"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (user: { name: string; email: string; isNewUser?: boolean }) => void
  onGoogleLogin?: () => void
}

export function AuthModal({ isOpen, onClose, onLogin, onGoogleLogin }: AuthModalProps) {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [profileImage, setProfileImage] = useState<File | null>(null)

  if (!isOpen) return null

  const validateEmail = (email: string) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
    return regex.test(email);
  }

  const validatePassword = (password: string) => {
    // Mínimo 6 caracteres para login local
    return password.length >= 6;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!validateEmail(formData.email)) {
      setMessage({ type: "error", text: "Por favor ingresa un correo electrónico válido." });
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setMessage({ type: "error", text: "La contraseña debe tener mínimo 6 caracteres." });
      setLoading(false);
      return;
    }

    try {
      // Obtener usuarios registrados del localStorage
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "{}");

      if (isLoginMode) {
        // LOGIN - verificar si el usuario existe
        const userKey = formData.email.toLowerCase();
        const savedUser = registeredUsers[userKey];

        if (!savedUser) {
          setMessage({ type: "error", text: "No existe una cuenta con este correo." });
          setLoading(false);
          return;
        }

        if (savedUser.password !== formData.password) {
          setMessage({ type: "error", text: "Contraseña incorrecta." });
          setLoading(false);
          return;
        }

        setMessage({ type: "success", text: "Inicio de sesión exitoso" });
        setTimeout(() => {
          onLogin({ name: savedUser.name, email: savedUser.email });
          onClose();
          resetForm();
        }, 1000);
      } else {
        // REGISTRO - crear nuevo usuario
        if (!formData.name.trim()) {
          setMessage({ type: "error", text: "Por favor ingresa tu nombre." });
          setLoading(false);
          return;
        }

        const userKey = formData.email.toLowerCase();

        if (registeredUsers[userKey]) {
          setMessage({ type: "error", text: "Ya existe una cuenta con este correo." });
          setLoading(false);
          return;
        }

        // Guardar imagen de perfil en localStorage si existe
        let profileImageData = null;
        if (profileImage) {
          const reader = new FileReader();
          profileImageData = await new Promise<string>((resolve) => {
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(profileImage);
          });
          localStorage.setItem(`profileImage-${formData.email}`, profileImageData);
        }

        // Guardar nuevo usuario
        registeredUsers[userKey] = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

        setMessage({ type: "success", text: "Cuenta creada exitosamente. Ahora puedes iniciar sesión." });
        setTimeout(() => {
          setIsLoginMode(true);
          resetForm();
        }, 1500);
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error inesperado. Intenta nuevamente." });
    } finally {
      setLoading(false);
    }
  }

  const resetForm = () => {
    setFormData({ name: "", email: "", password: "" })
    setProfileImage(null)
    setMessage(null)
    setShowPassword(false)
  }

  const switchMode = () => {
    setIsLoginMode(!isLoginMode)
    resetForm()
  }


  const profileImagePreview = profileImage ? URL.createObjectURL(profileImage) : null;

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

          {onGoogleLogin && (
            <Button
              type="button"
              onClick={onGoogleLogin}
              className="mt-4 w-full bg-white text-purple-700 border border-purple-600 hover:bg-purple-50 flex items-center justify-center gap-2"
              disabled={loading}
            >
              <img src="/img/logos/google.png" alt="Google" className="w-5 h-5 mr-2" />
              Iniciar sesión con Google
            </Button>
          )}
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-4 flex items-center gap-2 ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              }`}
          >
            {message.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="text-sm font-medium">{message.text}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isLoginMode && (
            <>
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
              <div className="relative">
                <label className="block mb-2 text-sm text-gray-700">Foto de perfil (opcional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setProfileImage(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                  disabled={loading}
                />
                {profileImagePreview && (
                  <div className="mt-2 flex justify-center">
                    <img src={profileImagePreview} alt="Vista previa" className="w-20 h-20 rounded-full object-cover border" />
                  </div>
                )}
              </div>
            </>
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
