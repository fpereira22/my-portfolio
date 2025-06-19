"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import {
  Code,
  User,
  Briefcase,
  Mail,
  ChevronDown,
  ExternalLink,
  Download,
  Monitor,
  Palette,
  Target,
  Zap,
  LogIn,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "../components/language-selector"
import { AuthModal } from "../components/auth-modal"
import { SocialMediaPanel } from "../components/social-media-panel"
import { AIChatbot } from "../components/ai-chatbot"
import { UserMenu } from "../components/user-menu"
import { ProfileModal } from "../components/profile-modal"
import { useLanguage } from "../hooks/useLanguage"
import { useRouter } from "next/navigation"

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const { t } = useLanguage()
  const [rotation, setRotation] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    // Check if user is already logged in (localStorage)
    const savedUser = localStorage.getItem("portfolioUser")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setIsLoggedIn(true)
        setUser(userData)
      } catch {
        localStorage.removeItem("portfolioUser")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogin = (userData: { name: string; email: string }) => {
    const userInfo = {
      name: userData.name,
      email: userData.email,
      loginTime: new Date().toISOString(),
    }

    localStorage.setItem("portfolioUser", JSON.stringify(userInfo))
    setIsLoggedIn(true)
    setUser(userInfo)
    setIsAuthModalOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("portfolioUser")
    setIsLoggedIn(false)
    setUser(null)
  }

  const handleOpenDashboard = () => {
    router.push("/dashboard")
  }

  const handleOpenProfile = () => {
    setIsProfileModalOpen(true)
  }

  const handleUpdateUser = (updatedUser: { name: string; email: string }) => {
    setUser(updatedUser)
  }

  // Detecta el lado de entrada del mouse
  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = profileRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    setRotation(x < rect.width / 2 ? 8 : -8)
  }
  const handleMouseLeave = () => setRotation(0)

  // Cierra el menú al navegar o al hacer scroll
  useEffect(() => {
    if (!mobileMenuOpen) return
    const close = () => setMobileMenuOpen(false)
    window.addEventListener("scroll", close)
    return () => window.removeEventListener("scroll", close)
  }, [mobileMenuOpen])

  if (!mounted) {
    return null
  }

  const profileImage =
    user?.email ? localStorage.getItem(`profileImage-${user.email}`) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 text-white">
      {/* Header/Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-purple-900/90 backdrop-blur-sm shadow-md" : "bg-transparent"}`}
      >
        <div className="container mx-auto px-2 py-4 flex flex-nowrap items-center justify-between gap-2">
          {/* Logo y nombre */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Code className="w-8 h-8" />
            <span className="text-lg md:text-xl font-bold whitespace-nowrap">{t("hero.name")}</span>
          </div>

          {/* Navegación */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-6 flex-nowrap overflow-x-auto">
            <a
              href="#about"
              className="hover:text-purple-300 transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <User size={16} />
              <span>{t("nav.about")}</span>
            </a>
            <a
              href="#experience"
              className="hover:text-purple-300 transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <Briefcase size={16} />
              <span>{t("nav.experience")}</span>
            </a>
            <a
              href="#projects"
              className="hover:text-purple-300 transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <Code size={16} />
              <span>{t("nav.projects")}</span>
            </a>
            <a
              href="#certifications"
              className="hover:text-purple-300 transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <Monitor size={16} />
              <span>{t("certifications.title")}</span>
            </a>
            <a
              href="#contact"
              className="hover:text-purple-300 transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <Mail size={16} />
              <span>{t("nav.contact")}</span>
            </a>
          </nav>

          {/* Auth, Language Selector y menú móvil */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto md:ml-0 md:order-2">
            {/* Auth Button / User Menu */}
            <div className="order-1">
              {isLoggedIn && user ? (
                <UserMenu
                  user={user}
                  isLoggedIn={isLoggedIn}
                  onLogout={handleLogout}
                  onOpenDashboard={handleOpenDashboard}
                  onOpenProfile={handleOpenProfile}
                  profileImage={profileImage} // <-- pásala como prop
                />
              ) : (
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-purple-300 hover:bg-white/10"
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              )}
            </div>

            <div className="order-2">
              <LanguageSelector />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden order-3"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Abrir menú"
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-purple-900/95 shadow-lg z-50 animate-fade-in">
            <nav className="flex flex-col py-4 px-6 gap-4">
              <a
                href="#about"
                className="py-2 text-white font-semibold hover:text-purple-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.about")}
              </a>
              <a
                href="#experience"
                className="py-2 text-white font-semibold hover:text-purple-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.experience")}
              </a>
              <a
                href="#projects"
                className="py-2 text-white font-semibold hover:text-purple-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.projects")}
              </a>
              <a
                href="#certifications"
                className="py-2 text-white font-semibold hover:text-purple-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("certifications.title")}
              </a>
              <a
                href="#contact"
                className="py-2 text-white font-semibold hover:text-purple-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.contact")}
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-16">
        {/* Fondo con imagen y degradado */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/background.jpg"
            alt="Fondo Hero"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-violet-800/70 to-indigo-900/90"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <div
            ref={profileRef}
            className="w-32 h-32 rounded-full border-4 border-white overflow-hidden mb-6 relative transition-transform duration-300"
            style={{ transform: `scale(${rotation !== 0 ? 1.1 : 1}) rotate(${rotation}deg)` }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src="/img/profile.jpg"
              alt="Profile"
              width={200}
              height={200}
              className="object-cover"
              priority
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-2">{t("hero.name")}</h1>
          <h2 className="text-xl md:text-2xl mb-4">{t("hero.title")}</h2>
          <p className="max-w-2xl text-center mb-8">{t("hero.description")}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-white text-purple-900 hover:bg-purple-100">
              <a
                href="https://www.linkedin.com/in/felipe-pereira-alarc%C3%B3n/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <User className="mr-2 h-4 w-4" /> Linkedin
              </a>
            </Button>
            <Button asChild className="bg-white text-purple-900 hover:bg-purple-100">
              <a href="mailto:f.pereiraalarcn@gmail.com">
                <Mail className="mr-2 h-4 w-4" /> {t("hero.contactBtn")}
              </a>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <button
            type="button"
            aria-label="Ir a Sobre Mí"
            onClick={() => {
              const aboutSection = document.getElementById("about")
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
            className="focus:outline-none"
          >
            <ChevronDown className="h-8 w-8" />
          </button>
        </div>
      </section>

      {/* About Section - Sobre Mí */}
      <section id="about" className="py-20 px-4 bg-gray-50 text-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="flex justify-center mb-8 lg:mb-0">
              <div className="relative">
                <div className="w-64 h-80 sm:w-80 sm:h-[28rem] rounded-3xl border-4 border-purple-500 overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-105 mx-auto">
                  <Image
                    src="/img/profile.jpg"
                    alt="Felipe Pereira A."
                    width={320}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* About Content */}
            <div className="space-y-6 max-w-xl mx-auto">
              <div>
                <h2 className="text-4xl font-bold text-purple-600 mb-4">{t("about.title")}</h2>
                <div className="w-16 h-1 bg-purple-600 mb-6"></div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Monitor className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-purple-600">{t("about.engineer")}</span>
                    <span className="text-gray-700"> {t("about.engineerDescription")}</span>
                  </div>
                </div>

                {/* Párrafo de intercambio */}
                <div className="flex items-start gap-3">
                  <User className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-gray-700">
                      {t("about.exchange").split("Pontíficia Universidad Javeriana Cali")[0]}
                      <span className="font-semibold">Pontíficia Universidad Javeriana Cali</span>
                      {t("about.exchange").split("Pontíficia Universidad Javeriana Cali")[1]}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Palette className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-gray-700">{t("about.specialized")} </span>
                    <span className="font-semibold">{t("about.functional")}</span>
                    <span className="text-gray-700">{t("about.functionalDescription")}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-gray-700">{t("about.focus")} </span>
                    <span className="font-semibold">{t("about.quality")}</span>
                    <span className="text-gray-700"> {t("about.qualityDescription")}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-gray-700">{t("about.capacity")} </span>
                    <span className="font-semibold">{t("about.adaptation")}</span>
                    <span className="text-gray-700"> {t("about.adaptationDescription")}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  asChild
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <a href="/CVFelipePereira.pdf" download target="_blank" rel="noopener noreferrer">
                    <Download className="w-5 h-5" />
                    {t("about.downloadCV")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience and Technologies Section */}
      <section id="experience" className="py-20 px-4 bg-slate-800 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Experience Text */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-purple-400 mb-4">{t("experience.title")}</h2>
                <div className="w-16 h-1 bg-purple-400 mb-6"></div>
              </div>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  {t("experience.intro")}{" "}
                  <span className="text-black-400 font-semibold">{t("experience.faculty")}</span>{" "}
                  {t("experience.university") && (
                    <span className="text-red-400 font-semibold">{t("experience.university")}</span>
                  )}
                  {t("experience.developing")}{" "}
                  <span className="text-blue-400 font-semibold">{t("experience.personal")}</span> {t("experience.and")}{" "}
                  <span className="text-blue-400 font-semibold">{t("experience.professional")}</span>
                  {t("experience.consolidated")}{" "}
                  <span className="text-purple-400 font-semibold">{t("experience.skills")}</span>
                  {t("experience.comma1")}{" "}
                  <span className="text-yellow-400 font-semibold">{t("experience.dataAnalysis")}</span>
                  {t("experience.comma2")}{" "}
                  <span className="text-green-400 font-semibold">{t("experience.cybersecurity")}</span>
                  {t("experience.comma3")}{" "}
                  <span className="text-blue-400 font-semibold">{t("experience.algorithms")}</span>
                  {t("experience.comma4")}{" "}
                  <span className="text-pink-400 font-semibold">{t("experience.operations")}</span>{" "}
                  {t("experience.comma5")}{" "}
                  <span className="text-gray-400 font-semibold">{t("experience.projectManagement")}</span>
                  {t("experience.period1")}
                  <br />
                  {t("experience.throughout")}{" "}
                  <span className="text-blue-400 font-semibold">{t("experience.environments")}</span>{" "}
                  {t("experience.and")}{" "}
                  <span className="text-blue-400 font-semibold">{t("experience.technologies")}</span>
                  {t("experience.applying")}{" "}
                  <span className="text-yellow-400 font-semibold">{t("experience.multipleProjects")}</span>
                  {t("experience.period2")}
                  <br />
                  {t("experience.diversity")}{" "}
                  <span className="text-blue-400 font-semibold">{t("experience.widerVision")}</span>
                  {t("experience.improve")}{" "}
                  <span className="text-purple-400 font-semibold">{t("experience.professionalCapacity")}</span>{" "}
                  {t("experience.maintain")}{" "}
                  <span className="text-green-400 font-semibold">{t("experience.alwaysLearning")}</span>
                  {t("experience.period3")}
                </p>

                <p>
                  {t("experience.seek")}{" "}
                  <span className="text-yellow-400 font-semibold">{t("experience.expandKnowledge")}</span>{" "}
                  {t("experience.continue")}{" "}
                  <span className="text-purple-400 font-semibold">{t("experience.perfectSkills")}</span>
                  {t("experience.always")}{" "}
                  <span className="text-green-400 font-semibold">{t("experience.newOpportunities")}</span>{" "}
                  {t("experience.innovate")}{" "}
                  <span className="text-blue-400 font-semibold">{t("experience.solutions")}</span>{" "}
                  {t("experience.notOnly")}{" "}
                  <span className="text-yellow-400 font-semibold">{t("experience.effective")}</span>
                  {t("experience.alsoOptimal")}{" "}
                  <span className="text-green-400 font-semibold">{t("experience.optimal")}</span>
                  {t("experience.comma6")}{" "}
                  <span className="text-purple-400 font-semibold">{t("experience.efficient")}</span>{" "}
                  {t("experience.and")} <span className="text-blue-400 font-semibold">{t("experience.adaptable")}</span>{" "}
                  {t("experience.needs")}
                </p>
              </div>
            </div>

            {/* Technologies Grid */}
            <div className="grid grid-cols-4 gap-4 self-start">
              {[
                // Análisis de datos (amarillo)
                { name: "Python", icon: "🐍", color: "bg-yellow-400" }, // Data Analysis
                // Ciberseguridad (verde)
                { name: "AWS", icon: "☁️", color: "bg-green-600" }, // Cybersecurity
                // Desarrollo de software (morado)
                { name: "AMPL", icon: "📊", color: "bg-purple-400" }, // Desarrollo de software
                { name: "Node.js", icon: "🟢", color: "bg-purple-500" }, // Desarrollo de software
                { name: "Express", icon: "⚡", color: "bg-purple-600" }, // Desarrollo de software
                // Análisis y diseño de software (azul)
                { name: "C", icon: "💾", color: "bg-blue-700" }, // Análisis/diseño software
                { name: "C++", icon: "➕", color: "bg-blue-900" }, // Nuevo
                { name: "Java", icon: "☕", color: "bg-orange-700" }, // Nuevo
                { name: "PHP", icon: "🐘", color: "bg-blue-600" },
                { name: "HTML5", icon: "🌐", color: "bg-blue-400" },
                { name: "CSS3", icon: "🎨", color: "bg-blue-300" },
                { name: "TypeScript", icon: "📘", color: "bg-blue-500" },
                { name: "JavaScript", icon: "⚡", color: "bg-blue-200" },
                { name: "PostgreSQL", icon: "🐘", color: "bg-blue-800" },
                // Otros
                { name: "Angular", icon: "🅰️", color: "bg-red-600" },
                { name: "React", icon: "⚛️", color: "bg-cyan-500" },
                { name: "Vue.js", icon: "🟩", color: "bg-green-400" }, // Nuevo
                { name: "Next.js", icon: "▲", color: "bg-black" },
                { name: "PowerBI", icon: "📊", color: "bg-yellow-600" }, // Nuevo
                { name: "GitHub", icon: "🐙", color: "bg-gray-800" },
              ].map((tech, index) => (
                <div
                  key={index}
                  className={`${tech.color} rounded-lg p-4 flex flex-col items-center justify-center text-white hover:scale-105 transition-transform cursor-pointer shadow-lg`}
                >
                  <span className="text-2xl mb-1">{tech.icon}</span>
                  <span className="text-xs font-medium text-center">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gray-50 text-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-purple-600 mb-4">{t("projects.title")}</h2>
            <div className="w-16 h-1 bg-purple-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Análisis de Tachas */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 p-4">
                <Image
                  src="/img/1.png"
                  alt={t("projects.project1.title")}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Code className="w-5 h-5 text-purple-600" />
                  <h3 className="text-xl font-bold">{t("projects.project1.title")}</h3>
                </div>
                <p className="text-gray-600 mb-4">{t("projects.project1.desc")}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Python</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Node.js</span>
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm">Tailwind</span>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  <a href="https://github.com/GaztelakoFelipeI/tatxas/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t("projects.viewBtn")}
                  </a>
                </Button>
              </div>
            </div>

            {/* Proyecto Web*/}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="h-48 bg-gradient-to-br from-yellow-100 to-red-100 p-4">
                <Image
                  src="/img/2.jpg"
                  alt={t("projects.project2.title")}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Code className="w-5 h-5 text-purple-600" />
                  <h3 className="text-xl font-bold">{t("projects.project2.title")}</h3>
                </div>
                <p className="text-gray-600 mb-4">{t("projects.project2.desc")}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">PHP</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Node.js</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">HTML</span>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  <a href="https://github.com/fpereira22" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t("projects.viewBtn")}
                  </a>
                </Button>
              </div>
            </div>

            {/* Pulmonar */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 p-4">
                <Image
                  src="/img/3.png"
                  alt={t("projects.project3.title")}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Code className="w-5 h-5 text-purple-600" />
                  <h3 className="text-xl font-bold">{t("projects.project3.title")}</h3>
                </div>
                <p className="text-gray-600 mb-4">{t("projects.project3.desc")}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Python</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">ComputerVision</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">IA</span>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-purple-600 text-green-600 hover:bg-purple-50"
                >
                  <a href="https://github.com/fpereira22/PneumoniaDetectorCV" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t("projects.viewBtn")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-4 bg-white text-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-purple-600 mb-4">{t("certifications.title")}</h2>
            <div className="w-16 h-1 bg-purple-600 mx-auto"></div>
          </div>
          {/* Texto introductorio de certificaciones */}
          <p className="text-center max-w-2xl mx-auto mb-10 text-lg text-gray-700">{t("certifications.intro")}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* IBM */}
            <div className="bg-purple-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <Image
                  src="/img/logos/ibm.png"
                  alt="IBM"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Developer Specialization - Professional</h3>
              <p className="text-gray-600 mb-4">IBM - 2025</p>
              <a
                href="https://www.coursera.org/account/accomplishments/specialization/145AHJLRIH6A"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-4 h-4" />
                Ver credencial
              </a>
            </div>
            {/* Scrum */}
            <div className="bg-purple-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <Image
                  src="/img/logos/scrum.png"
                  alt="Scrum"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Scrum Foundation Professional Certification - SFPC™</h3>
              <p className="text-gray-600 mb-4">Scrum - 2023</p>
              <a
                href="https://www.credly.com/badges/697244fa-8be0-4463-b5c2-bf35c9caba81/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-4 h-4" />
                Ver credencial
              </a>
            </div>
            
            {/* IBM */}
            <div className="bg-purple-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <Image
                  src="/img/logos/ibm.png"
                  alt="IBM"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Python for Data Science, AI & Development</h3>
              <p className="text-gray-600 mb-4">IBM - 2025</p>
              <a
                href="https://www.coursera.org/account/accomplishments/verify/JZLY826KAWND"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-4 h-4" />
                Ver credencial
              </a>
            </div>
            {/* Cisco 2 */}
            <div className="bg-purple-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <Image
                  src="/img/logos/cisco.png"
                  alt="Cisco"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Python Essentials 2</h3>
              <p className="text-gray-600 mb-4">Cisco - 2025</p>
              <a
                href="https://www.credly.com/badges/a8d62e07-9d97-4a5a-9a21-2f27cca1f60b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-4 h-4" />
                Ver credencial
              </a>
            </div>
            {/* Esade */}
            <div className="bg-purple-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <Image
                  src="/img/logos/esade.png"
                  alt="Esade"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Business</h3>
              <p className="text-gray-600 mb-4">Esade - 2025</p>
              <a
                href="https://drive.google.com/file/d/1OTR2miQCzq7KR737WJrZ_tm9bD33AIN-/view"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-4 h-4" />
                Ver credencial
              </a>
            </div>
            {/* Cisco 1 */}
            <div className="bg-purple-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <Image
                  src="/img/logos/cisco.png"
                  alt="Cisco"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Python Essentials 1</h3>
              <p className="text-gray-600 mb-4">Cisco - 2025</p>
              <a
                href="https://www.credly.com/badges/96870313-aa82-4000-86f9-6af442362a96/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-4 h-4" />
                Ver credencial
              </a>
            </div>
            {/* Udemy */}
            <div className="bg-purple-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <Image
                  src="/img/logos/udemy.png"
                  alt="Udemy"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Full Stack Web Developer (HTML5, CSS3, JS AJAX PHP y MySQL)</h3>
              <p className="text-gray-600 mb-4">Udemy - 2025</p>
              <a
                href="https://www.udemy.com/certificate/UC-459391a7-36c3-4bfa-a16a-9b0b753b18ed/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-4 h-4" />
                Ver credencial
              </a>
            </div>
            {/* Google */}
            <div className="bg-purple-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <Image
                  src="/img/logos/google.png"
                  alt="Google"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Búsqueda de Google Ads</h3>
              <p className="text-gray-600 mb-4">Google - 2025</p>
              <a
                href="https://skillshop.credential.net/13f5bae5-b564-4439-8162-48a0117ca2b1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-4 h-4" />
                Ver credencial
              </a>
            </div>
            {/* IBM Data Science Practitioner */}
            <div className="bg-purple-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <Image
                  src="/img/logos/ibm.png"
                  alt="IBM"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">IBM Data Science Practitioner Certificate</h3>
              <p className="text-gray-600 mb-4">IBM - 2024</p>
              <a
                href="https://drive.google.com/file/d/1BzlhI7kxtxcke_GFrjiwrE7TG9EsafAL/view"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-4 h-4" />
                Ver credencial
              </a>
            </div>
          </div>
          
          {/* Enlace a más certificaciones centrado */}
          <div className="flex flex-col items-center mt-10">
            <span className="mb-2 text-gray-700">{t("certifications.more")}:</span>
            <a
              href="https://www.linkedin.com/in/felipe-pereira-alarc%C3%B3n/details/certifications/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2 bg-purple-600 text-white rounded-md font-bold hover:bg-purple-700 transition-colors"
            >
              {t("certifications.button")}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-purple-900 text-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("contact.title")}</h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-xl">
            <form className="space-y-4" action="https://formspree.io/f/tu_codigo" method="POST">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-2">
                    {t("contact.name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-md bg-white/20 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2">
                    {t("contact.email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-md bg-white/20 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder:text-gray-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block mb-2">
                  {t("contact.subject")}
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 rounded-md bg-white/20 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder:text-gray-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2">
                  {t("contact.message")}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 rounded-md bg-white/20 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder:text-gray-500"
                ></textarea>
              </div>
              <Button className="w-full md:w-auto bg-white text-purple-900 hover:bg-purple-100">
                {t("contact.sendBtn")}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-purple-950">
        <div className="container mx-auto max-w-4xl text-center">
          <p>
            © {new Date().getFullYear()} {t("hero.name")}. {t("footer.rights")}
          </p>
          {/* Animación de ubicación y ciudades */}
          <div className="flex items-center justify-center gap-2 mt-4 mb-2">
            {/* Ícono animado de ubicación */}
            <svg
              className="w-6 h-6 text-pink-400 animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21c-4.418 0-8-5.373-8-10a8 8 0 1 1 16 0c0 4.627-3.582 10-8 10z"
              />
              <circle cx="12" cy="11" r="3" />
            </svg>
            <span className="text-white font-medium">Santiago, Chile / Bilbao, España / Cali, Colombia</span>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <Button asChild variant="ghost" size="icon" className="rounded-full">
              <a
                href="https://www.linkedin.com/in/felipe-pereira-alarc%C3%B3n/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="rounded-full">
              <a href="https://github.com/fpereira22" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5 28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="rounded-full">
              <a
                href="https://www.instagram.com/_f.pereira14"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
            </Button>
          </div>
        </div>
      </footer>

      {/* Botón flotante "Ir arriba" */}
      <a
        href="#"
        className="fixed bottom-6 right-6 z-50 bg-purple-700 hover:bg-purple-800 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center transition-colors"
        aria-label="Ir al inicio"
      >
        <svg className="w-7 h-7 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </a>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onLogin={handleLogin} />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onUpdateUser={handleUpdateUser}
      />

      {/* Social Media Panel - Siempre visible */}
      <SocialMediaPanel />

      {/* AI Chatbot - Siempre visible */}
      <AIChatbot />
    </div>
  )
}
