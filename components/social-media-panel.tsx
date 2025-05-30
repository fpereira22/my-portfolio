"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, Instagram, Music, ExternalLink, Users, ChevronRight, X } from "lucide-react"

export function SocialMediaPanel({ language = "es" }: { language?: "es" | "en" | "eu" }) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Cerrar panel al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isExpanded) {
        setIsExpanded(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isExpanded])

  const translations = {
    es: {
      connect: "Conecta Conmigo",
      follow: "Sígueme en redes",
      whatsapp: "Chatea conmigo directamente",
      instagram: "Sígueme para contenido exclusivo",
      tiktok: "Videos y tutoriales de programación",
      aria: "Abrir panel de redes sociales",
    },
    en: {
      connect: "Connect with Me",
      follow: "Follow me on social media",
      whatsapp: "Chat with me directly",
      instagram: "Follow me for exclusive content",
      tiktok: "Programming videos and tutorials",
      aria: "Open social media panel",
    },
    eu: {
      connect: "Konektatu Nirekin",
      follow: "Jarraitu sareetan",
      whatsapp: "Zuzeneko txata nirekin",
      instagram: "Jarraitu eduki esklusiborako",
      tiktok: "Programazio bideoak eta tutorialak",
      aria: "Ireki sare sozialen panela",
    },
  }

  const t = translations[language]

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-green-500 hover:bg-green-600",
      url: "https://wa.me/56989213006",
      description: t.whatsapp,
    },
    {
      name: "Instagram",
      icon: Instagram,
      color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
      url: "https://www.instagram.com/_f.pereira14",
      description: t.instagram,
    },
    {
      name: "TikTok",
      icon: Music,
      color: "bg-black hover:bg-gray-800",
      url: "https://tiktok.com/@_f.pereira14",
      description: t.tiktok,
    },
  ]

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40">
      {/* Panel expandido o colapsado */}
      <div
        className={`transition-all duration-300 ${isExpanded ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className={`relative bg-purple-800/70 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20 min-w-[280px]`}>
          {/* Botón toggle a la derecha, solo cuando está colapsado */}
          {!isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 shadow-lg flex items-center justify-center transition-all"
              aria-label={t.aria}
              style={{ zIndex: 2 }}
            >
              <Users className="w-5 h-5" />
            </button>
          )}

          {/* Contenido del panel, solo visible cuando está expandido */}
          {isExpanded && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold text-sm">{t.connect}</h3>
                <button
                  onClick={e => {
                    e.stopPropagation()
                    setIsExpanded(false)
                  }}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <div key={social.name} className="group">
                    <Button
                      asChild
                      className={`w-full ${social.color} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                    >
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3"
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="font-medium">{social.name}</span>
                        <ExternalLink className="w-4 h-4 ml-auto" />
                      </a>
                    </Button>
                    <p className="text-xs text-white/70 mt-1 px-2">{social.description}</p>
                  </div>
                )
              })}

              <div className="pt-2 border-t border-white/20">
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <Users className="w-4 h-4" />
                  <span>{t.follow}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
