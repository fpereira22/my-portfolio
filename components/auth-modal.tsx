"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (user: { name: string; email: string }) => void
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
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set())

  // Eliminado autologin de prueba y combinaciones de teclas. Solo login real con Firebase.

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

  const validateEmail = (email: string) => {
    // Regex para validar formato de email
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
    return regex.test(email);
  }

  const validatePassword = (password: string) => {
    // Mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número y un símbolo
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(password);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!isLoginMode) {
      if (!validateEmail(formData.email)) {
        setMessage({ type: "error", text: "Por favor ingresa un correo electrónico válido." });
        setLoading(false);
        return;
      }
      if (!validatePassword(formData.password)) {
        setMessage({ type: "error", text: "La contraseña debe tener mínimo 8 caracteres, incluir mayúsculas, minúsculas, números y símbolos." });
        setLoading(false);
        return;
      }
    }

    try {
      if (isLoginMode) {
        // LOGIN con Firebase
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
        const user = userCredential.user
        setMessage({ type: "success", text: "Inicio de sesión exitoso" })
        setTimeout(() => {
          onLogin({ name: user.displayName || user.email || "Usuario", email: user.email || "" })
          onClose()
          setFormData({ name: "", email: "", password: "" })
          setMessage(null)
        }, 1000)
      } else {
        // REGISTRO con Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
        const user = userCredential.user
        let photoURL = "";
        // Subir imagen de perfil si existe
        if (profileImage) {
          const { getStorage, ref, uploadBytes, getDownloadURL } = await import("firebase/storage");
          const storage = getStorage();
          const imageRef = ref(storage, `profile-images/${user.uid}`);
          await uploadBytes(imageRef, profileImage);
          photoURL = await getDownloadURL(imageRef);
        }
        // Actualizar el nombre y foto del usuario
        const updateObj: any = { displayName: formData.name };
        if (photoURL) updateObj.photoURL = photoURL;
        await updateProfile(user, updateObj);
        setMessage({ type: "success", text: "Cuenta creada exitosamente. Ahora puedes iniciar sesión." })
        setTimeout(() => {
          setIsLoginMode(true)
          setFormData({ name: "", email: "", password: "" })
          setProfileImage(null)
          setMessage(null)
        }, 1500)
      }
    } catch (error: any) {
      let msg = "Error inesperado. Intenta nuevamente."
      if (error && typeof error === "object") {
        if ("code" in error) {
          if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
            msg = "Correo o contraseña incorrectos."
          } else if (error.code === "auth/email-already-in-use") {
            msg = "El correo ya está registrado."
          } else if (error.code === "auth/weak-password") {
            msg = "La contraseña es demasiado débil."
          }
        }
        if ("message" in error && typeof error.message === "string") {
          msg += ` (${error.message})`
        }
      }
      setMessage({ type: "error", text: msg })
    } finally {
      setLoading(false)
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

  // Vista previa de imagen de perfil
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
          {/* <div className="text-xs text-purple-200 mt-2 opacity-70">
            Tip: Usa Ctrl+Alt+T para usuario de prueba o Ctrl+Alt+S para superadmin
          </div> */}
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
