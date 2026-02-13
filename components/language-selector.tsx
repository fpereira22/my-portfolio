"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "../hooks/useLanguage"
import Image from "next/image"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "es", label: "Español", flag: "/flags/es.webp" },
    { code: "en", label: "English", flag: "/flags/en.webp" },
    { code: "eu", label: "Euskera", flag: "/flags/eu.webp" },
  ]

  const currentLanguage = languages.find((lang) => lang.code === language)

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        size="sm"
        className="text-white hover:text-purple-300 hover:bg-white/10 flex items-center gap-2"
      >
        {currentLanguage?.flag && (
          <Image
            src={currentLanguage.flag || "/placeholder.svg"}
            alt={`${currentLanguage.label} flag`}
            width={20}
            height={15}
            className="rounded-sm"
          />
        )}
        <span className="hidden sm:inline">{currentLanguage?.label}</span>
        <ChevronDown className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black/5 focus:outline-none z-50">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu-button">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as "es" | "en" | "eu")
                  setIsOpen(false)
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
                role="menuitem"
              >
                <Image
                  src={lang.flag || "/placeholder.svg"}
                  alt={`${lang.label} flag`}
                  width={20}
                  height={15}
                  className="rounded-sm"
                />
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
