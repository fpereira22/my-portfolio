"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Settings, LogOut, LayoutDashboard } from "lucide-react"
import { useLanguage } from "../hooks/useLanguage"

interface UserMenuProps {
  user: { name: string; email: string } | null
  isLoggedIn: boolean
  onLogout: () => void
  onOpenDashboard: () => void
  onOpenProfile: () => void
  profileImage?: string | null
}

export function UserMenu({ user, isLoggedIn, onLogout, onOpenDashboard, onOpenProfile, profileImage }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { t, language } = useLanguage()

  if (!isLoggedIn || !user) return null

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: language === "en" ? "Dashboard" : language === "eu" ? "Aginte-panela" : "Dashboard",
      onClick: onOpenDashboard,
    },
    {
      icon: Settings,
      label: language === "en" ? "Edit Profile" : language === "eu" ? "Profila editatu" : "Editar Perfil",
      onClick: onOpenProfile,
    },
    {
      icon: LogOut,
      label: language === "en" ? "Logout" : language === "eu" ? "Saioa itxi" : "Cerrar Sesión",
      onClick: onLogout,
    },
  ]

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        size="sm"
        className="text-white hover:text-purple-300 hover:bg-white/10 flex items-center gap-2"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-purple-500 bg-gray-100 flex items-center justify-center">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="object-cover w-full h-full" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-medium">
              {getInitials(user.name)}
            </div>
          )}
        </div>
        <span className="hidden sm:inline max-w-24 truncate">{user.name}</span>
        <ChevronDown className="w-4 h-4" />
      </Button>

      {isOpen && (
        <>
          {/* Overlay para cerrar el menú */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Menú dropdown */}
          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black/5 focus:outline-none z-50">
            <div className="py-1" role="menu" aria-orientation="vertical">
              {/* Información del usuario */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-purple-600 flex items-center justify-center text-white font-medium">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="object-cover w-full h-full" />
                    ) : (
                      getInitials(user.name)
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Opciones del menú */}
              {menuItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <button
                    key={index}
                    onClick={() => {
                      item.onClick()
                      setIsOpen(false)
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
                    role="menuitem"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
