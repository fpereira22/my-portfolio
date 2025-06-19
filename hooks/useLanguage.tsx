"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"


type Language = "es" | "en" | "eu"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  es: {
    // Navigation
    "nav.about": "Sobre Mí",
    "nav.experience": "Experiencia",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",

    // Hero Section
    "hero.name": "Felipe Pereira A.",
    "hero.title": "Ingeniero Civil Informático",
    "hero.description":
      "Desarrollador Full Stack especializado en análisis de datos, ciberseguridad y desarrollo web moderno.",
    "hero.contactBtn": "Contactar",

    // About Section
    "about.title": "Sobre Mí",
    "about.engineer": "Ingeniero Civil Informático",
    "about.engineerDescription":
      " con sólida formación académica y experiencia práctica en desarrollo de aplicaciones.",
    "about.exchange": "Realicé un intercambio académico en la ",
    "about.specialized": "Especializado en",
    "about.functional": "programación funcional",
    "about.functionalDescription": " y metodologías ágiles para el desarrollo de software.",
    "about.focus": "Mi enfoque se centra en la",
    "about.quality": "calidad del código",
    "about.qualityDescription": " y la implementación de soluciones escalables.",
    "about.capacity": "Tengo la capacidad de",
    "about.adaptation": "adaptación rápida",
    "about.adaptationDescription": " a nuevas tecnologías y entornos de trabajo.",
    "about.downloadCV": "Descargar CV",

    // Experience Section
    "experience.title": "Experiencia",
    "experience.intro": "Durante mi formación en",
    "experience.faculty": "la facultad de Ingeniería",
    "experience.university": "Universidad Andres Bello",
    "experience.developing": ", he estado desarrollando tanto proyectos",
    "experience.personal": "personales",
    "experience.and": "como",
    "experience.professional": "profesionales",
    "experience.consolidated": ". Esto me ha permitido consolidar mis",
    "experience.skills": "habilidades técnicas",
    "experience.comma1": " en",
    "experience.dataAnalysis": "análisis de datos",
    "experience.comma2": ",",
    "experience.cybersecurity": "ciberseguridad",
    "experience.comma3": ",",
    "experience.algorithms": "algoritmos",
    "experience.comma4": ",",
    "experience.operations": "investigación de operaciones",
    "experience.comma5": " y",
    "experience.projectManagement": "gestión de proyectos",
    "experience.period1": ".",
    "experience.throughout": "A lo largo de este tiempo, he trabajado con diversos",
    "experience.environments": "entornos",
    "experience.technologies": "tecnologías",
    "experience.applying": ", aplicándolos en",
    "experience.multipleProjects": "múltiples proyectos",
    "experience.period2": ".",
    "experience.diversity": "Esta diversidad de experiencias me ha proporcionado una",
    "experience.widerVision": "visión más amplia",
    "experience.improve": " del desarrollo de software, lo que me permite mejorar continuamente mi",
    "experience.professionalCapacity": "capacidad profesional",
    "experience.maintain": " y mantener una mentalidad de",
    "experience.alwaysLearning": "aprendizaje constante",
    "experience.period3": ".",
    "experience.seek": "Busco constantemente",
    "experience.expandKnowledge": "expandir mis conocimientos",
    "experience.continue": " y continuar",
    "experience.perfectSkills": "perfeccionando mis habilidades",
    "experience.always": ", siempre en busca de",
    "experience.newOpportunities": "nuevas oportunidades",
    "experience.innovate": " para innovar y crear",
    "experience.solutions": "soluciones",
    "experience.notOnly": " que no solo sean",
    "experience.effective": "efectivas",
    "experience.alsoOptimal": ", sino también",
    "experience.optimal": "óptimas",
    "experience.comma6": ",",
    "experience.efficient": "eficientes",
    "experience.adaptable": "adaptables",
    "experience.needs": " a las necesidades del proyecto.",

    // Projects Section
    "projects.title": "Proyectos Destacados",
    "projects.project1.title": "Análisis de Tachas",
    "projects.project1.desc":
      "Sistema de análisis de datos para optimización de rutas y gestión de infraestructura vial.",
    "projects.project2.title": "Proyecto Web",
    "projects.project2.desc": "Desarrollo de aplicación web completa con backend robusto y frontend moderno.",
    "projects.project3.title": "Detector de Neumonía",
    "projects.project3.desc": "Sistema de detección de neumonía usando Computer Vision e Inteligencia Artificial.",
    "projects.viewBtn": "Ver Proyecto",

    // Certifications Section
    "certifications.title": "Certificaciones",
    "certifications.intro": "Cuento con más de 60 certificaciones profesionales que respaldan mi experiencia y conocimientos técnicos.",
    "certifications.more": "Vea más certificaciones",
    "certifications.button": "Click aquí",

    // Contact Section
    "contact.title": "Contacto",
    "contact.name": "Nombre",
    "contact.email": "Email",
    "contact.subject": "Asunto",
    "contact.message": "Mensaje",
    "contact.sendBtn": "Enviar Mensaje",
    "contact.success": "Mensaje enviado con éxito",
    "contact.error": "Error al enviar el mensaje",

    // Footer
    "footer.rights": "Todos los derechos reservados.",

    // Dashboard Section
    "dashboard.projects": "Proyectos",
    "dashboard.tasks": "Zereginak",
    "dashboard.messages": "Mezuak",
    "dashboard.team": "Taldea",
    "dashboard.documents": "Dokumentuak",
    "dashboard.calendar": "Egutegia",
    "dashboard.settings": "Ezarpenak",
    "dashboard.newProject": "Proiektu Berria",
    "dashboard.newTask": "Zeregin Berria",
    "dashboard.compose": "Idatzi",
  },

  en: {
    // Navigation
    "nav.about": "About Me",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    // Hero Section
    "hero.name": "Felipe Pereira A.",
    "hero.title": "Software Engineer",
    "hero.description": "Full Stack Developer specialized in data analysis, cybersecurity and modern web development.",
    "hero.contactBtn": "Contact",

    // About Section
    "about.title": "About Me",
    "about.engineer": "Software Engineer",
    "about.engineerDescription": " with solid academic background and practical experience in application development.",
    "about.exchange": "I did an academic exchange at ",
    "about.specialized": "Specialized in",
    "about.functional": "functional programming",
    "about.functionalDescription": " and agile methodologies for software development.",
    "about.focus": "My focus is on",
    "about.quality": "code quality",
    "about.qualityDescription": " and implementation of scalable solutions.",
    "about.capacity": "I have the ability for",
    "about.adaptation": "quick adaptation",
    "about.adaptationDescription": " to new technologies and work environments.",
    "about.downloadCV": "Download CV",

    // Experience Section
    "experience.title": "Experience",
    "experience.intro": "During my studies at",
    "experience.faculty": "the Faculty of Engineering",
    "experience.university": "Andres Bello University",
    "experience.developing": ", I have been developing both",
    "experience.personal": "personal",
    "experience.and": "and",
    "experience.professional": "professional",
    "experience.consolidated": " projects. This has allowed me to consolidate my",
    "experience.skills": "technical skills",
    "experience.comma1": " in",
    "experience.dataAnalysis": "data analysis",
    "experience.comma2": ",",
    "experience.cybersecurity": "cybersecurity",
    "experience.comma3": ",",
    "experience.algorithms": "algorithms",
    "experience.comma4": ",",
    "experience.operations": "operations research",
    "experience.comma5": " and",
    "experience.projectManagement": "project management",
    "experience.period1": ".",
    "experience.throughout": "Throughout this time, I have worked with various",
    "experience.environments": "environments",
    "experience.technologies": "technologies",
    "experience.applying": ", applying them in",
    "experience.multipleProjects": "multiple projects",
    "experience.period2": ".",
    "experience.diversity": "This diversity of experiences has provided me with a",
    "experience.widerVision": "broader vision",
    "experience.improve": " of software development, which allows me to continuously improve my",
    "experience.professionalCapacity": "professional capacity",
    "experience.maintain": " and maintain a mindset of",
    "experience.alwaysLearning": "constant learning",
    "experience.period3": ".",
    "experience.seek": "I constantly seek to",
    "experience.expandKnowledge": "expand my knowledge",
    "experience.continue": " and continue",
    "experience.perfectSkills": "perfecting my skills",
    "experience.always": ", always looking for",
    "experience.newOpportunities": "new opportunities",
    "experience.innovate": " to innovate and create",
    "experience.solutions": "solutions",
    "experience.notOnly": " that are not only",
    "experience.effective": "effective",
    "experience.alsoOptimal": ", but also",
    "experience.optimal": "optimal",
    "experience.comma6": ",",
    "experience.efficient": "efficient",
    "experience.adaptable": "adaptable",
    "experience.needs": " to project needs.",

    // Projects Section
    "projects.title": "Featured Projects",
    "projects.project1.title": "Road Stud Analysis",
    "projects.project1.desc": "Data analysis system for route optimization and road infrastructure management.",
    "projects.project2.title": "Web Project",
    "projects.project2.desc": "Complete web application development with robust backend and modern frontend.",
    "projects.project3.title": "Pneumonia Detector",
    "projects.project3.desc": "Pneumonia detection system using Computer Vision and Artificial Intelligence.",
    "projects.viewBtn": "View Project",

    // Certifications Section
    "certifications.title": "Certifications",
    "certifications.intro": "i have more than 60 Professional certifications that support my experience and technical knowledge.",
    "certifications.more": "View more certifications",
    "certifications.button": "Click here",

    // Contact Section
    "contact.title": "Contact",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.sendBtn": "Send Message",
    "contact.success": "Message sent successfully",
    "contact.error": "Error sending message",

    // Footer
    "footer.rights": "All rights reserved.",

    // Dashboard Section
    "dashboard.projects": "Projects",
    "dashboard.tasks": "Tasks",
    "dashboard.messages": "Messages",
    "dashboard.team": "Team",
    "dashboard.documents": "Documents",
    "dashboard.calendar": "Calendar",
    "dashboard.settings": "Settings",
    "dashboard.newProject": "New Project",
    "dashboard.newTask": "New Task",
    "dashboard.compose": "Compose",
  },

  eu: {
    // Navigation
    "nav.about": "Niri buruz",
    "nav.experience": "Esperientzia",
    "nav.projects": "Proiektuak",
    "nav.contact": "Kontaktua",

    // Hero Section
    "hero.name": "Felipe Pereira A.",
    "hero.title": "Informatikako Ingeniari Zibila",
    "hero.description":
      "Full Stack garatzailea, datu-analisian, ziberseguritasunean eta web garapen modernoan espezializatua.",
    "hero.contactBtn": "Kontaktatu",

    // About Section
    "about.title": "Niri buruz",
    "about.engineer": "Informatikako Ingeniari Zibila",
    "about.engineerDescription": " heziketa akademiko sendoa eta aplikazio garapenean esperientzia praktikoa dituena.",
    "about.exchange": "Truke akademiko bat egin nuen ",
    "about.specialized": "Espezializatua",
    "about.functional": "programazio funtzionalean",
    "about.functionalDescription": " eta software garapenerako metodologia arinak.",
    "about.focus": "Nire fokua",
    "about.quality": "kode kalitatea",
    "about.qualityDescription": " eta soluzio eskalagarrien inplementazioan dago.",
    "about.capacity": "Gaitasuna dut",
    "about.adaptation": "egokitzapen azkarreko",
    "about.adaptationDescription": " teknologia berrietara eta lan inguruneetara.",
    "about.downloadCV": "CV deskargatu",

    // Experience Section
    "experience.title": "Esperientzia",
    "experience.intro": "Nire ikasketetan",
    "experience.faculty": "Ingeniaritza Fakultatean",
    "experience.university": "Andres Bello Unibertsitatea",
    "experience.developing": ", proiektu",
    "experience.personal": "pertsonalak",
    "experience.and": "eta",
    "experience.professional": "profesionalak",
    "experience.consolidated": " garatzen egon naiz. Honek nire",
    "experience.skills": "trebetasun teknikoak",
    "experience.comma1": " sendotzea ahalbidetu dit",
    "experience.dataAnalysis": "datu-analisian",
    "experience.comma2": ",",
    "experience.cybersecurity": "ziberseguritasunean",
    "experience.comma3": ",",
    "experience.algorithms": "algoritmoetan",
    "experience.comma4": ",",
    "experience.operations": "eragiketa ikerketan",
    "experience.comma5": " eta",
    "experience.projectManagement": "proiektu kudeaketan",
    "experience.period1": ".",
    "experience.throughout": "Denbora honetan zehar, hainbat",
    "experience.environments": "inguru",
    "experience.technologies": "teknologiekin",
    "experience.applying": " lan egin dut, hauek",
    "experience.multipleProjects": "proiektu anitzetan",
    "experience.period2": " aplikatuz.",
    "experience.diversity": "Esperientzia aniztasun honek",
    "experience.widerVision": "ikuspegi zabalagoa",
    "experience.improve": " eman dit software garapenari buruz, eta honek nire",
    "experience.professionalCapacity": "gaitasun profesionala",
    "experience.maintain": " etengabe hobetzea eta",
    "experience.alwaysLearning": "ikasketa etengabeko",
    "experience.period3": " pentsamoldea mantentzea ahalbidetzen dit.",
    "experience.seek": "Etengabe bilatzen dut",
    "experience.expandKnowledge": "nire ezagutzak zabaltzea",
    "experience.continue": " eta",
    "experience.perfectSkills": "nire trebetasunak perfekzionatzen",
    "experience.always": " jarraitzea, beti",
    "experience.newOpportunities": "aukera berriak",
    "experience.innovate": " bilatuz berrikuntza egiteko eta",
    "experience.solutions": "soluzioak",
    "experience.notOnly": " sortzeko, ez bakarrik",
    "experience.effective": "eraginkorrak",
    "experience.alsoOptimal": " direnak, baita",
    "experience.optimal": "optimalak",
    "experience.comma6": ",",
    "experience.efficient": "eraginkorrak",
    "experience.adaptable": "egokigarriak",
    "experience.needs": " ere proiektuaren beharretara.",

    // Projects Section
    "projects.title": "Proiektu Nabarmenenak",
    "projects.project1.title": "Tatxen Analisia",
    "projects.project1.desc": "Datu-analisi sistema bide optimizaziorako eta bide azpiegituren kudeaketarako.",
    "projects.project2.title": "Web Proiektua",
    "projects.project2.desc": "Web aplikazio osoa backend sendoarekin eta frontend modernoarekin.",
    "projects.project3.title": "Pneumonia Detektorea",
    "projects.project3.desc": "Pneumonia detektatzeko sistema Computer Vision eta Adimen Artifiziala erabiliz.",
    "projects.viewBtn": "Proiektua ikusi",

    // Certifications Section
    "certifications.title": "Ziurtagiriak",
    "certifications.intro": "60 Ziurtagiri Profesional baino gehiago ditut nire esperientzia eta ezagutza teknikoa babesten dutenak.",
    "certifications.more": "Ziurtagiri gehiago ikusi",
    "certifications.button": "Egin click",

    // Contact Section
    "contact.title": "Kontaktua",
    "contact.name": "Izena",
    "contact.email": "Email",
    "contact.subject": "Gaia",
    "contact.message": "Mezua",
    "contact.sendBtn": "Mezua bidali",
    "contact.success": "Mezua ongi bidali da",
    "contact.error": "Errorea mezua bidaltzean",

    // Footer
    "footer.rights": "Eskubide guztiak gordeta.",

    // Dashboard Section
    "dashboard.welcome": "Ongi etorri",
    "dashboard.online": "LINEAN",
    "dashboard.activeProjects": "Proiektu Aktiboak",
    "dashboard.inProgress": "martxan",
    "dashboard.pendingTasks": "Zereginak Pendiente",
    "dashboard.highPriority": "lehentasun handia",
    "dashboard.upcomingEvents": "Hurrengo Gertaerak",
    "dashboard.nextMeeting": "Hurrengoa: Taldeko bilera",
    "dashboard.dashboard": "Panela",
    "dashboard.projects": "Proiektuak",
    "dashboard.tasks": "Zereginak",
    "dashboard.calendar": "Egutegia",
    "dashboard.team": "Taldea",
    "dashboard.documents": "Dokumentuak",
    "dashboard.messages": "Mezuak",
    "dashboard.settings": "Ezarpenak",
    "dashboard.projectsStatus": "PROIEKTUEN EGOERA",
    "dashboard.currentDateTime": "UNEDO DATA ETA ORDUA",
    "dashboard.quickStats": "Estatistika Azkarrak",
    "dashboard.teamMembers": "Taldekideak",
    "dashboard.unreadMessages": "Irakurri gabeko mezuak",
  },
}

// Detect browser language safely
const detectBrowserLanguage = (): Language => {
  if (typeof window === "undefined") return "es"

  try {
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith("eu")) return "eu"
    if (browserLang.startsWith("en")) return "en"
    return "es"
  } catch {
    return "es"
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check localStorage first, then detect browser language
    const savedLang = localStorage.getItem("portfolio-language") as Language
    if (savedLang && ["es", "en", "eu"].includes(savedLang)) {
      setLanguage(savedLang)
    } else {
      const detectedLang = detectBrowserLanguage()
      setLanguage(detectedLang)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-language", lang)
    }
  }

  const t = (key: string): string => {
    if (!mounted) return key // Return key during SSR

    try {
      return translations[language][key as keyof (typeof translations)[typeof language]] || key
    } catch (error) {
      console.error(`Translation error for key "${key}" in language "${language}":`, error)
      return key
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
