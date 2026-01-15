"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, User, Mail, Save, AlertCircle, CheckCircle } from "lucide-react"
import { useLanguage } from "../hooks/useLanguage"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
  user: { name: string; email: string } | null
  onUpdateUser: (user: { name: string; email: string }) => void
}

export function ProfileModal({ isOpen, onClose, user, onUpdateUser }: ProfileModalProps) {
  // Hooks SIEMPRE al inicio
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    profileImage: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const { language } = useLanguage()

  // Cargar imagen guardada al abrir modal
  useEffect(() => {
    if (user?.email) {
      const img = localStorage.getItem(`profileImage-${user.email}`)
      if (img) {
        setFormData((prev) => ({ ...prev, profileImage: img }))
      }
    }
  }, [user])

  // Manejar subida de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && user?.email) {
      const reader = new FileReader()
      reader.onload = () => {
        const img = new window.Image()
        img.onload = () => {
          // Redimensionar a 256x256px (ajusta según tu necesidad)
          const canvas = document.createElement("canvas")
          const size = 256
          canvas.width = size
          canvas.height = size
          const ctx = canvas.getContext("2d")
          if (ctx) {
            ctx.fillStyle = "#fff"
            ctx.fillRect(0, 0, size, size)
            // Centrar la imagen
            let sx = 0, sy = 0, sw = img.width, sh = img.height
            if (img.width > img.height) {
              sx = (img.width - img.height) / 2
              sw = img.height
            } else if (img.height > img.width) {
              sy = (img.height - img.width) / 2
              sh = img.width
            }
            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, size, size)
            const dataUrl = canvas.toDataURL("image/jpeg", 0.7) // calidad 70%
            try {
              localStorage.setItem(`profileImage-${user.email}`, dataUrl)
              setFormData((prev) => ({ ...prev, profileImage: dataUrl }))
            } catch (err) {
              alert("La imagen es demasiado grande. Por favor, selecciona una más pequeña.")
            }
          }
        }
        img.src = reader.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // Validaciones básicas
      if (!formData.name.trim() || !formData.email.trim()) {
        setMessage({ type: "error", text: getText("fillRequired") })
        return
      }

      // Si se está cambiando la contraseña, validar
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          setMessage({ type: "error", text: getText("passwordMismatch") })
          return
        }
      }

      // Guardar imagen en localStorage
      if (formData.profileImage && user?.email) {
        localStorage.setItem(`profileImage-${user.email}`, formData.profileImage)
      }

      // Simular actualización del perfil
      const updatedUser = {
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
      }

      // Actualizar en localStorage
      const savedUser = localStorage.getItem("portfolioUser")
      if (savedUser) {
        const userData = JSON.parse(savedUser)
        const newUserData = { ...userData, ...updatedUser }
        localStorage.setItem("portfolioUser", JSON.stringify(newUserData))
      }

      setMessage({ type: "success", text: getText("success") })
      onUpdateUser({ name: formData.name.trim(), email: formData.email.toLowerCase().trim() })

      setTimeout(() => {
        onClose()
        setMessage(null)
        setFormData({ ...formData, currentPassword: "", newPassword: "", confirmPassword: "" })
      }, 1500)
    } catch (error) {
      setMessage({ type: "error", text: getText("error") })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      profileImage: "",
    })
    setMessage(null)
  }

  const profileImage = user?.email ? localStorage.getItem(`profileImage-${user.email}`) : null

  // El return condicional debe ir DESPUÉS de los hooks
  if (!isOpen || !user) return null

  const getText = (key: string) => {
    const texts = {
      es: {
        title: "Editar Perfil",
        subtitle: "Actualiza tu información personal",
        name: "Nombre",
        email: "Email",
        currentPassword: "Contraseña Actual",
        newPassword: "Nueva Contraseña",
        confirmPassword: "Confirmar Contraseña",
        save: "Guardar Cambios",
        cancel: "Cancelar",
        saving: "Guardando...",
        success: "Perfil actualizado exitosamente",
        error: "Error al actualizar el perfil",
        passwordMismatch: "Las contraseñas no coinciden",
        fillRequired: "Por favor completa todos los campos requeridos",
      },
      en: {
        title: "Edit Profile",
        subtitle: "Update your personal information",
        name: "Name",
        email: "Email",
        currentPassword: "Current Password",
        newPassword: "New Password",
        confirmPassword: "Confirm Password",
        save: "Save Changes",
        cancel: "Cancel",
        saving: "Saving...",
        success: "Profile updated successfully",
        error: "Error updating profile",
        passwordMismatch: "Passwords don't match",
        fillRequired: "Please fill in all required fields",
      },
      eu: {
        title: "Profila Editatu",
        subtitle: "Zure informazio pertsonala eguneratu",
        name: "Izena",
        email: "Email",
        currentPassword: "Oraingo Pasahitza",
        newPassword: "Pasahitz Berria",
        confirmPassword: "Pasahitza Berretsi",
        save: "Aldaketak Gorde",
        cancel: "Utzi",
        saving: "Gordetzen...",
        success: "Profila ongi eguneratu da",
        error: "Errorea profila eguneratzean",
        passwordMismatch: "Pasahitzak ez datoz bat",
        fillRequired: "Mesedez bete beharrezko eremu guztiak",
      },
    }
    return (
      texts[language as keyof typeof texts]?.[key as keyof (typeof texts)[typeof language]] ||
      texts.es[key as keyof (typeof texts)["es"]]
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-6 pr-16 text-white relative">
          <button
            onClick={() => {
              onClose()
              resetForm()
            }}
            className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold">{getText("title")}</h2>
          <p className="text-purple-100 mt-1">{getText("subtitle")}</p>
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
          {/* Imagen de perfil */}
          <div className="flex flex-col items-center mb-4">
            <label htmlFor="profileImage" className="cursor-pointer">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500 bg-gray-100 flex items-center justify-center">
                {formData.profileImage ? (
                  <img src={formData.profileImage} alt="Profile" className="object-cover w-full h-full" />
                ) : (
                  <User className="w-10 h-10 text-purple-400" />
                )}
              </div>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={loading}
              />
              <span className="block mt-2 text-xs text-purple-600 hover:underline">
                {language === "en"
                  ? "Change profile photo"
                  : language === "eu"
                  ? "Aldatu profila argazkia"
                  : "Cambiar foto de perfil"}
              </span>
            </label>
          </div>

          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder={getText("name")}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-gray-900 placeholder:text-gray-500"
              required
              disabled={loading}
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="email"
              placeholder={getText("email")}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-gray-900 placeholder:text-gray-500"
              required
              disabled={loading}
            />
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600 mb-3">
              {language === "en"
                ? "Leave blank to keep current password"
                : language === "eu"
                  ? "Utzi hutsik oraingo pasahitza mantentzeko"
                  : "Deja en blanco para mantener la contraseña actual"}
            </p>

            <Input
              type="password"
              placeholder={getText("currentPassword")}
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-gray-900 placeholder:text-gray-500 mb-3"
              disabled={loading}
            />

            <Input
              type="password"
              placeholder={getText("newPassword")}
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-gray-900 placeholder:text-gray-500 mb-3"
              disabled={loading}
            />

            <Input
              type="password"
              placeholder={getText("confirmPassword")}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-gray-900 placeholder:text-gray-500"
              disabled={loading}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onClose()
                resetForm()
              }}
              disabled={loading}
              className="flex-1"
            >
              {getText("cancel")}
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? getText("saving") : getText("save")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
