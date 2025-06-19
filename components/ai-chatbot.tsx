"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, X, Bot, User, Minimize2, Maximize2 } from "lucide-react"
import { useLanguage } from "../hooks/useLanguage"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

// Definir interfaces para tipar correctamente las respuestas
interface PageInfo {
  name: string
  title: string
  location: string
  email: string
  linkedin: string
  github: string
  instagram: string
  technologies: string[]
  projects: Array<{
    name: string
    description: string
    technologies: string[]
    url: string
  }>
  certifications: string[]
  experience: string
  education: string
}

interface ResponseFunctions {
  name: () => string
  contact: () => string
  location: () => string
  projects: () => string
  technologies: () => string
  certifications: () => string
  experience: () => string
  default: () => string
  tachas?: () => string
  pneumonia?: () => string
  python?: () => string
  react?: () => string
  education?: () => string
  skills?: () => string
  languages?: () => string
  social?: () => string
}

interface ResponsesType {
  es: ResponseFunctions
  en: ResponseFunctions
  eu: ResponseFunctions
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { t, language } = useLanguage()

  // Inicializar mensaje de bienvenida según idioma
  useEffect(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      text: getWelcomeMessage(),
      isBot: true,
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }, [language])

  const getWelcomeMessage = () => {
    switch (language) {
      case "en":
        return "Hello! I'm Felipe's virtual assistant. I can help you with information about his projects, experience, skills, and more. What would you like to know?"
      case "eu":
        return "Kaixo! Felipe-ren asistente birtuala naiz. Bere proiektuei, esperientziari, trebetasunei eta gehiagoari buruzko informazioarekin lagun dezaket. Zer jakin nahi duzu?"
      default:
        return "¡Hola! Soy el asistente virtual de Felipe. Puedo ayudarte con información sobre sus proyectos, experiencia, habilidades y más. ¿Qué te gustaría saber?"
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simular respuesta del bot
    setTimeout(
      () => {
        const botResponse = generateBotResponse(inputValue)
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          isBot: true,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 2000,
    )
  }

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    // Información específica de la página
    const pageInfo: PageInfo = {
      // Información personal
      name: "Felipe Pereira Alarcón",
      title: "Ingeniero Civil Informático",
      location: "Santiago, Chile / Bilbao, España / Cali, Colombia",
      email: "f.pereiraalarcn@gmail.com",
      linkedin: "https://www.linkedin.com/in/felipe-pereira-alarc%C3%B3n/",
      github: "https://github.com/fpereira22",
      instagram: "https://www.instagram.com/_f.pereira14",

      // Tecnologías
      technologies: [
        "Python",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "Express",
        "PostgreSQL",
        "AWS",
        "PHP",
        "HTML5",
        "CSS3",
        "Angular",
        "GitHub",
        "AMPL",
        "C",
      ],

      // Proyectos
      projects: [
        {
          name: "Análisis de Tachas",
          description: "Sistema de análisis de datos para optimización de rutas y gestión de infraestructura vial",
          technologies: ["Python", "Node.js", "Tailwind"],
          url: "https://github.com/GaztelakoFelipeI/tatxas/",
        },
        {
          name: "Proyecto Web",
          description: "Desarrollo de aplicación web completa con backend robusto y frontend moderno",
          technologies: ["PHP", "Node.js", "HTML"],
          url: "https://github.com/fpereira22",
        },
        {
          name: "Detector de Neumonía",
          description: "Sistema de detección de neumonía usando Computer Vision e Inteligencia Artificial",
          technologies: ["Python", "Computer Vision", "IA"],
          url: "https://github.com/fpereira22/PneumoniaDetectorCV",
        },
      ],

      // Certificaciones
      certifications: [
        "Python for Data Science, AI & Development (IBM)",
        "Artificial Intelligence (AI) (IBM)",
        "Python Essentials 1 & 2 (Cisco)",
        "Búsqueda de Google Ads (Google)",
        "Full Stack Web Developer (Udemy)",
        "Scrum Foundation Professional Certification",
        "IBM Data Science Practitioner Certificate",
        "Business (Esade)",
      ],

      // Experiencia
      experience: "Desarrollo full-stack, análisis de datos, ciberseguridad, gestión de proyectos",
      education: "Universidad Andres Bello, intercambio en Pontíficia Universidad Javeriana Cali",
    }

    // Respuestas según idioma
    const responses: ResponsesType = {
      es: {
        // Información personal
        name: () =>
          `Felipe Pereira Alarcón es un Ingeniero Civil Informático especializado en desarrollo full-stack, análisis de datos y ciberseguridad.`,
        contact: () =>
          `Puedes contactar a Felipe por email: ${pageInfo.email}, LinkedIn: ${pageInfo.linkedin}, o Instagram: ${pageInfo.instagram}`,
        location: () => `Felipe se encuentra en ${pageInfo.location}`,

        // Proyectos
        projects: () =>
          `Felipe ha trabajado en varios proyectos destacados:\n\n1. **${pageInfo.projects[0].name}**: ${pageInfo.projects[0].description}\n2. **${pageInfo.projects[1].name}**: ${pageInfo.projects[1].description}\n3. **${pageInfo.projects[2].name}**: ${pageInfo.projects[2].description}\n\n¿Te interesa algún proyecto en particular?`,
        tachas: () =>
          `El proyecto de Análisis de Tachas es un sistema de análisis de datos para optimización de rutas y gestión de infraestructura vial, desarrollado con ${pageInfo.projects[0].technologies.join(", ")}. Puedes verlo en: ${pageInfo.projects[0].url}`,
        pneumonia: () =>
          `El Detector de Neumonía es un sistema que usa Computer Vision e IA para detectar neumonía en imágenes médicas, desarrollado con Python. Puedes verlo en: ${pageInfo.projects[2].url}`,

        // Tecnologías
        technologies: () =>
          `Felipe domina múltiples tecnologías: ${pageInfo.technologies.join(", ")}. ¿Hay alguna tecnología específica sobre la que quieras saber más?`,
        python: () =>
          `Felipe tiene amplia experiencia en Python, especialmente en análisis de datos, IA y desarrollo web. Tiene certificaciones de IBM y Cisco en Python.`,
        react: () =>
          `Felipe usa React y Next.js para desarrollo frontend moderno, como puedes ver en este mismo portfolio.`,

        // Certificaciones
        certifications: () =>
          `Felipe tiene múltiples certificaciones profesionales: ${pageInfo.certifications.join(", ")}. Puedes ver todas sus certificaciones en su LinkedIn.`,

        // Experiencia
        experience: () =>
          `Felipe tiene experiencia en ${pageInfo.experience}. Estudió en ${pageInfo.education} y ha desarrollado proyectos tanto personales como profesionales.`,

        // Educación
        education: () =>
          `Felipe estudió en la Universidad Andres Bello y realizó un intercambio académico en la Pontíficia Universidad Javeriana Cali, Colombia.`,

        // Habilidades
        skills: () =>
          `Las principales habilidades de Felipe incluyen: programación funcional, metodologías ágiles, análisis de datos, ciberseguridad, algoritmos, investigación de operaciones y gestión de proyectos.`,

        // Idiomas
        languages: () =>
          `Este portfolio está disponible en español, inglés y euskera. Felipe maneja múltiples idiomas.`,

        // Redes sociales
        social: () =>
          `Puedes seguir a Felipe en sus redes sociales: LinkedIn (profesional), GitHub (código), e Instagram (personal). Los enlaces están disponibles en el panel lateral y en el footer.`,

        default: () =>
          `Esa es una pregunta interesante. Basándome en la información del portfolio, Felipe es un desarrollador full-stack con experiencia en ${pageInfo.technologies.slice(0, 5).join(", ")} y más. ¿Te gustaría saber algo específico sobre sus proyectos, tecnologías o experiencia?`,
      },
      en: {
        name: () =>
          `Felipe Pereira Alarcón is a Software Engineer specialized in full-stack development, data analysis, and cybersecurity.`,
        contact: () =>
          `You can contact Felipe via email: ${pageInfo.email}, LinkedIn: ${pageInfo.linkedin}, or Instagram: ${pageInfo.instagram}`,
        location: () => `Felipe is located in ${pageInfo.location}`,
        projects: () =>
          `Felipe has worked on several featured projects:\n\n1. **${pageInfo.projects[0].name}**: ${pageInfo.projects[0].description}\n2. **${pageInfo.projects[1].name}**: ${pageInfo.projects[1].description}\n3. **${pageInfo.projects[2].name}**: ${pageInfo.projects[2].description}\n\nAre you interested in any particular project?`,
        technologies: () =>
          `Felipe masters multiple technologies: ${pageInfo.technologies.join(", ")}. Is there any specific technology you'd like to know more about?`,
        certifications: () =>
          `Felipe has multiple professional certifications: ${pageInfo.certifications.join(", ")}. You can see all his certifications on his LinkedIn.`,
        experience: () =>
          `Felipe has experience in ${pageInfo.experience}. He studied at ${pageInfo.education} and has developed both personal and professional projects.`,
        tachas: () =>
          `The Road Stud Analysis project is a data analysis system for route optimization and road infrastructure management, developed with ${pageInfo.projects[0].technologies.join(", ")}. You can see it at: ${pageInfo.projects[0].url}`,
        pneumonia: () =>
          `The Pneumonia Detector is a system that uses Computer Vision and AI to detect pneumonia in medical images, developed with Python. You can see it at: ${pageInfo.projects[2].url}`,
        python: () =>
          `Felipe has extensive experience in Python, especially in data analysis, AI and web development. He has certifications from IBM and Cisco in Python.`,
        react: () => `Felipe uses React and Next.js for modern frontend development, as you can see in this portfolio.`,
        education: () =>
          `Felipe studied at Andres Bello University and did an academic exchange at Pontificia Universidad Javeriana Cali, Colombia.`,
        skills: () =>
          `Felipe's main skills include: functional programming, agile methodologies, data analysis, cybersecurity, algorithms, operations research and project management.`,
        languages: () => `This portfolio is available in Spanish, English and Basque. Felipe is multilingual.`,
        social: () =>
          `You can follow Felipe on his social networks: LinkedIn (professional), GitHub (code), and Instagram (personal). The links are available in the side panel and footer.`,
        default: () =>
          `That's an interesting question. Based on the portfolio information, Felipe is a full-stack developer with experience in ${pageInfo.technologies.slice(0, 5).join(", ")} and more. Would you like to know something specific about his projects, technologies, or experience?`,
      },
      eu: {
        name: () =>
          `Felipe Pereira Alarcón Informatikako Ingeniari Zibila da, full-stack garapenean, datu-analisian eta ziberseguritasunean espezializatua.`,
        contact: () =>
          `Felipe honekin harremanetan jar zaitezke email bidez: ${pageInfo.email}, LinkedIn: ${pageInfo.linkedin}, edo Instagram: ${pageInfo.instagram}`,
        location: () => `Felipe hemen dago: ${pageInfo.location}`,
        projects: () => `Felipek hainbat proiektu garrantzitsu garatu ditu. Zein proiekturi buruz jakin nahi duzu?`,
        technologies: () =>
          `Felipek teknologia asko menperatzen ditu: ${pageInfo.technologies.join(", ")}. Teknologia zehatz baten gainean gehiago jakin nahi duzu?`,
        certifications: () =>
          `Felipek ziurtagiri profesional ugari ditu. Bere ziurtagiri guztiak LinkedIn-en ikus ditzakezu.`,
        experience: () =>
          `Felipek esperientzia du ${pageInfo.experience} arloan. ${pageInfo.education} ikasi zuen eta proiektu pertsonal zein profesionalak garatu ditu.`,
        tachas: () =>
          `Tatxen Analisia bide-optimizaziorako eta bide-azpiegituren kudeaketarako datu-analisi sistema bat da. Hemen ikus dezakezu: ${pageInfo.projects[0].url}`,
        pneumonia: () =>
          `Pneumonia Detektorea Computer Vision eta IA erabiltzen duen sistema bat da pneumonia irudi medikoetan detektatzeko. Hemen ikus dezakezu: ${pageInfo.projects[2].url}`,
        python: () => `Felipek esperientzia zabala du Python-en, bereziki datu-analisian, IA-n eta web garapenean.`,
        react: () =>
          `Felipek React eta Next.js erabiltzen ditu frontend garapen modernoetarako, portfolio honetan ikus dezakezun bezala.`,
        education: () =>
          `Felipek Andres Bello Unibertsitatean ikasi zuen eta truke akademiko bat egin zuen Pontificia Universidad Javeriana Cali-n, Kolonbian.`,
        skills: () =>
          `Feliperen trebetasun nagusiak hauek dira: programazio funtzionala, metodologia arinak, datu-analisia, zibersegurtasuna, algoritmoak, eragiketen ikerketa eta proiektuen kudeaketa.`,
        languages: () => `Portfolio hau gaztelaniaz, ingelesez eta euskaraz dago eskuragarri. Felipe eleaniztuna da.`,
        social: () =>
          `Feliperi jarrai diezaiokezu bere sare sozialetan: LinkedIn (profesionala), GitHub (kodea) eta Instagram (pertsonala).`,
        default: () =>
          `Galdera interesgarria da hori. Portfolioaren informazioan oinarrituta, Felipe full-stack garatzailea da. Zer jakin nahi duzu bere proiektuei, teknologiei edo esperientziari buruz?`,
      },
    }

    // Obtener el objeto de respuestas para el idioma actual
    const currentResponses = responses[language as keyof typeof responses] || responses.es

    // Análisis de entrada del usuario
    if (
      input.includes("nombre") ||
      input.includes("name") ||
      input.includes("quien") ||
      input.includes("who") ||
      input.includes("nor")
    ) {
      return currentResponses.name()
    }

    if (
      input.includes("contacto") ||
      input.includes("contact") ||
      input.includes("email") ||
      input.includes("harremanetan")
    ) {
      return currentResponses.contact()
    }

    if (
      input.includes("ubicación") ||
      input.includes("location") ||
      input.includes("donde") ||
      input.includes("where") ||
      input.includes("non")
    ) {
      return currentResponses.location()
    }

    if (
      input.includes("proyecto") ||
      input.includes("project") ||
      input.includes("trabajo") ||
      input.includes("proiektu")
    ) {
      if (input.includes("tachas") || input.includes("road")) {
        return currentResponses.tachas ? currentResponses.tachas() : currentResponses.projects()
      }
      if (input.includes("neumonía") || input.includes("pneumonia") || input.includes("detector")) {
        return currentResponses.pneumonia ? currentResponses.pneumonia() : currentResponses.projects()
      }
      return currentResponses.projects()
    }

    if (
      input.includes("tecnología") ||
      input.includes("technology") ||
      input.includes("programación") ||
      input.includes("programming") ||
      input.includes("teknologia")
    ) {
      if (input.includes("python")) {
        return currentResponses.python ? currentResponses.python() : currentResponses.technologies()
      }
      if (input.includes("react") || input.includes("next")) {
        return currentResponses.react ? currentResponses.react() : currentResponses.technologies()
      }
      return currentResponses.technologies()
    }

    if (
      input.includes("certificación") ||
      input.includes("certification") ||
      input.includes("certificado") ||
      input.includes("ziurtagiri")
    ) {
      return currentResponses.certifications()
    }

    if (input.includes("experiencia") || input.includes("experience") || input.includes("esperientzia")) {
      return currentResponses.experience()
    }

    if (
      input.includes("educación") ||
      input.includes("education") ||
      input.includes("universidad") ||
      input.includes("university") ||
      input.includes("hezkuntza")
    ) {
      return currentResponses.education ? currentResponses.education() : currentResponses.experience()
    }

    if (
      input.includes("habilidad") ||
      input.includes("skill") ||
      input.includes("capacidad") ||
      input.includes("trebetasun")
    ) {
      return currentResponses.skills ? currentResponses.skills() : currentResponses.technologies()
    }

    if (input.includes("idioma") || input.includes("language") || input.includes("hizkuntza")) {
      return currentResponses.languages ? currentResponses.languages() : currentResponses.default()
    }

    if (
      input.includes("redes") ||
      input.includes("social") ||
      input.includes("instagram") ||
      input.includes("linkedin") ||
      input.includes("github")
    ) {
      return currentResponses.social ? currentResponses.social() : currentResponses.contact()
    }

    if (input.includes("hola") || input.includes("hello") || input.includes("hi") || input.includes("kaixo")) {
      return getWelcomeMessage()
    }

    // Respuesta por defecto
    return currentResponses.default()
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <Bot className="w-6 h-6" />
      </Button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 bg-white rounded-2xl shadow-2xl border transition-all duration-300 ${
        isMinimized ? "w-80 h-16" : "w-80 h-96"
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <span className="font-semibold">ChatBot AI</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsMinimized(!isMinimized)}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 w-8 h-8"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 w-8 h-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${message.isBot ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isBot ? "bg-blue-100" : "bg-purple-100"
                    }`}
                  >
                    {message.isBot ? (
                      <Bot className="w-4 h-4 text-blue-600" />
                    ) : (
                      <User className="w-4 h-4 text-purple-600" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl p-3 ${
                      message.isBot
                        ? "bg-gray-100 text-gray-800"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  language === "en"
                    ? "Type your message..."
                    : language === "eu"
                      ? "Idatzi zure mezua..."
                      : "Escribe tu mensaje..."
                }
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 text-gray-900 placeholder:text-gray-500"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
