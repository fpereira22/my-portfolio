"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Menu, User, Briefcase, Layers, Code, Mail } from "lucide-react"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-white">
        <Menu className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-purple-900/95 backdrop-blur-sm flex flex-col">
          <div className="flex justify-end p-4">
            <Button variant="ghost" size="icon" onClick={closeMenu} className="text-white">
              <X className="h-6 w-6" />
            </Button>
          </div>

          <nav className="flex flex-col items-center justify-center flex-1 gap-8 text-lg">
            <a href="#about" onClick={closeMenu} className="flex items-center gap-2">
              <User size={20} />
              <span>About Me</span>
            </a>
            <a href="#specialization" onClick={closeMenu} className="flex items-center gap-2">
              <Briefcase size={20} />
              <span>Specialization</span>
            </a>
            <a href="#technologies" onClick={closeMenu} className="flex items-center gap-2">
              <Layers size={20} />
              <span>Technologies</span>
            </a>
            <a href="#projects" onClick={closeMenu} className="flex items-center gap-2">
              <Code size={20} />
              <span>Projects</span>
            </a>
            <a href="#contact" onClick={closeMenu} className="flex items-center gap-2">
              <Mail size={20} />
              <span>Contact</span>
            </a>
          </nav>
        </div>
      )}
    </div>
  )
}
