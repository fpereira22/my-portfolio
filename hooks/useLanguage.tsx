"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "es" | "en" | "eu"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Traducciones
const translations = {
  es: {
    // Navigation
    "nav.about": "Acerca de mí",
    "nav.experience": "Experiencia",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",

    // Hero Section
    "hero.name": "Felipe Pereira A.",
    "hero.title": "Ingeniero Civil Informático",
    "hero.description": "Desarrollando soluciones modernas e innovadoras para mejorar al mundo",
    "hero.aboutBtn": "Acerca de mí",
    "hero.contactBtn": "Contáctame",

    // About Section
    "about.title": "Sobre Mí",
    "about.engineer": "Ingeniero Civil Informático",
    "about.engineerDescription":
      "con pasión creativa para encontrar soluciones innovadoras al mundo de la mano de mis conocimientos.",
    "about.exchange":
      "Realicé un intercambio a la Pontíficia Universidad Javeriana Cali durante 5 meses en el segundo semestre del 2023.",
    "about.specialized": "Especializado en desarrollar proyectos",
    "about.functional": "funcionales y escalables",
    "about.functionalDescription":
      ", gestionando equipos con proactividad y liderazgo acompañado de la metodología Agile.",
    "about.focus": "Concentrado en",
    "about.quality": "calidad y eficiencia",
    "about.qualityDescription": "entregando soluciones óptimas a proyectos de software e investigación.",
    "about.capacity": "Me",
    "about.adaptation": "adapto rápido",
    "about.adaptationDescription":
      "y cuenta con mi compromiso mejorando continuamente, aportando valores positivos a cualquier equipo en ambiente de desarrollo.",
    "about.downloadCV": "Descargar CV",

    // Experience Section
    "experience.title": "Experiencia y Tecnologías",
    "experience.intro": "Me formé en",
    "experience.faculty": "la facultad de Ingeniería",
    "experience.university": "Universidad Andres Bello",
    "experience.developing": ", desarrollando proyectos",
    "experience.personal": "personales",
    "experience.and": "y",
    "experience.professional": "profesionales",
    "experience.consolidated": ", he consolidado mis",
    "experience.skills": "habilidades en desarrollo de software",
    "experience.comma1": ",",
    "experience.dataAnalysis": "análisis de datos",
    "experience.comma2": ",",
    "experience.cybersecurity": "ciberseguridad",
    "experience.comma3": ",",
    "experience.algorithms": "análisis y diseño de algoritmos",
    "experience.comma4": ",",
    "experience.operations": "investigación de operaciones",
    "experience.comma5": "y",
    "experience.projectManagement": "gestión de proyectos",
    "experience.period1": ".",
    "experience.throughout": "A lo largo de mi trayectoria, he trabajado con",
    "experience.environments": "diversos entornos",
    "experience.technologies": "tecnologías",
    "experience.applying": ", aplicándolos en",
    "experience.multipleProjects": "múltiples proyectos",
    "experience.period2": ".",
    "experience.diversity": "Esta diversidad me ha permitido desarrollar una",
    "experience.widerVision": "visión mucho más amplia",
    "experience.improve": ", mejorar mi",
    "experience.professionalCapacity": "capacidad profesional",
    "experience.maintain": "y mantenerme en",
    "experience.alwaysLearning": "aprendiendo siempre",
    "experience.period3": ".",

    "experience.seek": "Busco",
    "experience.expandKnowledge": "expandir mi conocimiento",
    "experience.continue": "y seguir",
    "experience.perfectSkills": "perfeccionando mis habilidades",
    "experience.always": ", siempre en busca de",
    "experience.newOpportunities": "nuevas oportunidades",
    "experience.innovate": "para innovar y crecer. Me enfoco en dar",
    "experience.solutions": "soluciones",
    "experience.notOnly": "que no solo sean",
    "experience.effective": "efectivas",
    "experience.alsoOptimal": ", sino también",
    "experience.optimal": "optimas",
    "experience.comma6": ",",
    "experience.efficient": "eficientes",
    "experience.adaptable": "adaptables",
    "experience.needs": "a las necesidades de cada proyecto y sistema.",

    // Projects Section
    "projects.title": "Mejores Proyectos",
    "projects.project1.title": "Análisis de detección de tachas",
    "projects.project1.desc":
      "Análisis realizado con IA Y Visión por Computadora para la empresa SSGL con el objetivo de detectar tachas existentes y faltantes en carreteras",
    "projects.project2.title": "Página Web Equipo",
    "projects.project2.desc": "Web para un equipo de competiciones Hackaton",
    "projects.project3.title": "Detección de Cáncer Pulmonar",
    "projects.project3.desc":
      "Software Diseñado para detectar cáncer de pulmones via Análisis de imagen con Visión por Computadora.",
    "projects.viewBtn": "Ver en GitHub",

    // Contact Section
    "contact.title": "Contáctame",
    "contact.name": "Nombre",
    "contact.email": "Email",
    "contact.subject": "Asunto",
    "contact.message": "Mensaje",
    "contact.sendBtn": "Enviar Mensaje",

    // Certifications Section
    "certifications.title": "Certificaciones",
    "certifications.intro": "Como Informático, he sido partícipe de más de 40 certificaciones para múltiples empresas. A continuación les muestro las más relevantes.",
    "certifications.more": "Para ver el resto de las certificaciones",
    "certifications.button": "Click aquí",

    // Footer
    "footer.rights": "Todos los derechos reservados.",
  },
  en: {
    // Navigation
    "nav.about": "About Me",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    // Hero Section
    "hero.name": "Felipe Pereira A.",
    "hero.title": "Computer Engineering",
    "hero.description": "Developing modern and innovative solutions to improve the world",
    "hero.aboutBtn": "About Me",
    "hero.contactBtn": "Contact Me",

    // About Section
    "about.title": "About Me",
    "about.engineer": "Computer Engineering",
    "about.engineerDescription":
      "with creative passion to find innovative solutions to the world with the help of my knowledge.",
    "about.exchange":
      "I did an exchange at Pontíficia Universidad Javeriana Cali for 5 months during the second semester of 2023.",
    "about.specialized": "Specialized in developing projects",
    "about.functional": "functional and scalable",
    "about.functionalDescription": ", managing teams with proactivity and leadership accompanied by Agile methodology.",
    "about.focus": "Focused on",
    "about.quality": "quality and efficiency",
    "about.qualityDescription": "delivering optimal solutions to software and research projects.",
    "about.capacity": "I",
    "about.adaptation": "adapt quickly",
    "about.adaptationDescription":
      "and count on my commitment to continuously improve, bringing positive values to any team in a development environment.",
    "about.downloadCV": "Download CV",

    // Experience Section
    "experience.title": "Experience and Technologies",
    "experience.intro": "I trained at",
    "experience.faculty": "the Engineering faculty",
    "experience.university": "Universidad Andres Bello",
    "experience.developing": ", developing projects",
    "experience.personal": "personal",
    "experience.and": "and",
    "experience.professional": "professional",
    "experience.consolidated": ", I have consolidated my",
    "experience.skills": "software development skills",
    "experience.comma1": ",",
    "experience.dataAnalysis": "data analysis",
    "experience.comma2": ",",
    "experience.cybersecurity": "cybersecurity",
    "experience.comma3": ",",
    "experience.algorithms": "algorithm analysis and design",
    "experience.comma4": ",",
    "experience.operations": "operations research",
    "experience.comma5": "and",
    "experience.projectManagement": "project management",
    "experience.period1": ".",
    "experience.throughout": "Throughout my career, I have worked with",
    "experience.environments": "diverse environments",
    "experience.technologies": "technologies",
    "experience.applying": ", applying them in",
    "experience.multipleProjects": "multiple projects",
    "experience.period2": ".",
    "experience.diversity": "This diversity has allowed me to develop a",
    "experience.widerVision": "much broader vision",
    "experience.improve": ", improve my",
    "experience.professionalCapacity": "professional capacity",
    "experience.maintain": "and keep",
    "experience.alwaysLearning": "always learning",
    "experience.period3": ".",

    "experience.seek": "I seek to",
    "experience.expandKnowledge": "expand my knowledge",
    "experience.continue": "and continue",
    "experience.perfectSkills": "perfecting my skills",
    "experience.always": ", always looking for",
    "experience.newOpportunities": "new opportunities",
    "experience.innovate": "to innovate and grow. I focus on providing",
    "experience.solutions": "solutions",
    "experience.notOnly": "that are not only",
    "experience.effective": "effective",
    "experience.alsoOptimal": "but also",
    "experience.optimal": "optimal",
    "experience.comma6": ",",
    "experience.efficient": "efficient",
    "experience.adaptable": "adaptable",
    "experience.needs": "to the needs of each project and system.",

    // Projects Section
    "projects.title": "Best Projects",
    "projects.project1.title": "Road Stud Detection Analysis",
    "projects.project1.desc":
      "Analysis performed with AI and Computer Vision for SSGL company with the objective of detecting existing and missing road studs on highways",
    "projects.project2.title": "Team Website",
    "projects.project2.desc": "Website for a Hackathon competition team",
    "projects.project3.title": "Lung Cancer Detection",
    "projects.project3.desc": "Software designed to detect lung cancer via image analysis with Computer Vision.",
    "projects.viewBtn": "View on GitHub",

    // Contact Section
    "contact.title": "Contact Me",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.sendBtn": "Send Message",

    // Certifications Section
    "certifications.title": "Certifications",
    "certifications.intro": "As a Computer Engineer, I have participated in more than 40 certifications for multiple companies. Here are the most relevant ones.",
    "certifications.more": "To see the rest of the certifications",
    "certifications.button": "Click here",

    // Footer
    "footer.rights": "All rights reserved.",
  },
  eu: {
    // Navigation
    "nav.about": "Niri buruz",
    "nav.experience": "Esperientzia",
    "nav.projects": "Proiektuak",
    "nav.contact": "Kontaktua",

    // Hero Section
    "hero.name": "Felipe Pereira A.",
    "hero.title": "Informatika Ingeniaritza",
    "hero.description":
      "Mundua hobetzeko soluzio moderno eta berritzaileak garatzen",
    "hero.aboutBtn": "Niri buruz",
    "hero.contactBtn": "Kontaktatu",

    // About Section
    "about.title": "Niri buruz",
    "about.engineer": "Informatika Ingeniaritza",
    "about.engineerDescription":
      "nire ezagutzaren laguntzarekin mundura soluzio berritzaileak aurkitzeko pasio sortzailearekin.",
    "about.exchange":
      "2023ko bigarren seihilekoan 5 hilabetez egon nintzen trukean Pontíficia Universidad Javeriana Cali-n.",
    "about.specialized": "Proiektuak garatzen espezializatua",
    "about.functional": "funtzionalak eta eskalagarriak",
    "about.functionalDescription": ", taldeak proaktibotasunez eta lidergoaz kudeatzen, Agile metodologiarekin batera.",
    "about.focus": "Arreta jarrita",
    "about.quality": "kalitatea eta eraginkortasuna",
    "about.qualityDescription": "software eta ikerketa proiektuetarako soluzio optimoak eskaintzen.",
    "about.capacity": "Azkar",
    "about.adaptation": "egokitzen naiz",
    "about.adaptationDescription":
      "eta nire konpromisoarekin etengabe hobetzen, balio positiboak ekarriz edozein talderi garapen-ingurune batean.",
    "about.downloadCV": "CV deskargatu",

    // Experience Section
    "experience.title": "Esperientzia eta Teknologiak",
    "experience.intro": "",
    "experience.faculty": "Universidad Andres Belloko Ingeniaritza fakultatean",
    "experience.university": "",
    "experience.developing": "prestatu nintzen, proiektuak garatuz",
    "experience.personal": "pertsonalak",
    "experience.and": "eta",
    "experience.professional": "profesionalak",
    "experience.consolidated": ", nire gaitasunak finkatu ditut",
    "experience.skills": "software garapenean",
    "experience.comma1": ",",
    "experience.dataAnalysis": "datuen analisian",
    "experience.comma2": ",",
    "experience.cybersecurity": "zibersegurtasunean",
    "experience.comma3": ",",
    "experience.algorithms": "algoritmoen analisi eta diseinuan",
    "experience.comma4": ",",
    "experience.operations": "eragiketen ikerketan",
    "experience.comma5": "eta",
    "experience.projectManagement": "proiektuen kudeaketan",
    "experience.period1": ".",
    "experience.throughout": "Nire ibilbidean zehar,",
    "experience.environments": "ingurune anitzak",
    "experience.technologies": "teknologiak",
    "experience.applying": "ekin lan egin dut,",
    "experience.multipleProjects": "proiektu anitzetan",
    "experience.period2": "aplikatuz.",
    "experience.diversity": "Aniztasun honek",
    "experience.widerVision": "ikuspegi askoz zabalagoa",
    "experience.improve": "garatzea, nire",
    "experience.professionalCapacity": "gaitasun profesionala",
    "experience.maintain": "hobetzea eta",
    "experience.alwaysLearning": "beti ikasten",
    "experience.period3": "jarraitzea ahalbidetu dit.",

    "experience.seek": "",
    "experience.expandKnowledge": "Nire ezagutza zabaldu",
    "experience.continue": "eta nire",
    "experience.perfectSkills": "gaitasunak hobetzen",
    "experience.always": "jarraitu nahi dut, beti",
    "experience.newOpportunities": "aukera berrien",
    "experience.innovate": "bila berrikuntzarako eta hazteko.",
    "experience.solutions": "Soluzioak",
    "experience.notOnly": "ematen zentratzen naiz,",
    "experience.effective": "eraginkorrak",
    "experience.alsoOptimal": "izateaz gain,",
    "experience.optimal": "optimoak",
    "experience.comma6": ",",
    "experience.efficient": "eraginkorrak",
    "experience.adaptable": "moldagarriak",
    "experience.needs": "direnak proiektu eta sistema bakoitzaren beharretara.",

    // Projects Section
    "projects.title": "Proiektu Onenak",
    "projects.project1.title": "Errepide-tapen Detekzio Analisia",
    "projects.project1.desc":
      "SSGL enpresarentzat IA eta Computer Vision-ekin egindako analisia, errepideetan dauden eta falta diren errepide-tapak detektatzeko helburuarekin",
    "projects.project2.title": "Talde Webgunea",
    "projects.project2.desc": "Hackathon lehiaketa talde batentzako webgunea",
    "projects.project3.title": "Birika Minbizi Detekzioa",
    "projects.project3.desc":
      "Computer Vision-ekin irudi analisiaren bidez birika minbizia detektatzeko diseinatutako softwarea.",
    "projects.viewBtn": "GitHub-en ikusi",

    // Contact Section
    "contact.title": "Kontaktatu",
    "contact.name": "Izena",
    "contact.email": "Emaila",
    "contact.subject": "Gaia",
    "contact.message": "Mezua",
    "contact.sendBtn": "Mezua bidali",

    // Certifications Section
    "certifications.title": "Ziurtagiriak",
    "certifications.intro": "Informatikari gisa, 40 ziurtagiri baino gehiagotan parte hartu dut hainbat enpresentzat. Hemen garrantzitsuenak erakusten dizkizuet.",
    "certifications.more": "Gainerako ziurtagiriak ikusteko",
    "certifications.button": "Egin klik hemen",

    // Footer
    "footer.rights": "Eskubide guztiak gordeta.",
  },
}

// Detectar idioma del navegador
const detectBrowserLanguage = (): Language => {
  if (typeof window === "undefined") return "es"

  const browserLang = navigator.language.toLowerCase()

  if (browserLang.startsWith("eu")) return "eu"
  if (browserLang.startsWith("en")) return "en"
  return "es" // Default to Spanish
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  useEffect(() => {
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
    localStorage.setItem("portfolio-language", lang)
  }

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
