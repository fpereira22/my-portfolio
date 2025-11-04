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
    "nav.education": "Formación",
    "nav.scholarships": "Becas",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",

    // Menu Mobile
    "menu.close": "Cerrar menú",
    "menu.open": "Abrir menú",
    "menu.login": "Iniciar sesión",
    "menu.dashboard": "Panel de control",
    "menu.profile": "Perfil",
    "menu.logout": "Cerrar sesión",
    
    // Education Labels
    "education.grade": "Nota",
    "education.skills": "Aptitudes",
    "education.activities": "Actividades y grupos",
    "education.location": "Ubicación",
    "education.dates": "Periodo",
    "education.current": "En curso",
    
    // Scholarship Labels
    "scholarship.period": "Periodo",
    "scholarship.details": "Detalles",
    "scholarship.achievements": "Logros alcanzados",
    "scholarship.institution": "Institución",

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
    "projects.project2.title": "Housing Price API",
    "projects.project2.desc": "Desarrollo de API para la predicción de precios de viviendas utilizando Machine Learning.",
    "projects.project3.title": "Detector de Sentimientos",
    "projects.project3.desc": "Sistema de detección de sentimientos en reseñas de productos usando NLP e Inteligencia Artificial.",
    "projects.viewBtn": "Ver Proyecto",

    // Work History Section
    "workHistory.title": "Experiencia Laboral",

    // Work item translations (Spanish) - sociedad servicios, prácticas, mrcomputer, lapica, saez, unab
    "work.sociedad_servicios_expert.description": "Ascendido a \"Experto en Programación y Desarrollo\". Tras mi ascenso, mi rol se centra en diseñar, desarrollar e implementar soluciones avanzadas de Inteligencia Artificial y software para la optimización de infraestructura vial y proyectos de automatización a gran escala.",
    "work.sociedad_servicios_expert.bullets": "IA Visual para Infraestructura Crítica: Desarrollo de modelos avanzados de Computer Vision con Python, PyTorch y YOLO para la detección de elementos clave en carreteras, incluyendo fisuras y señalética.||Proyectos de Innovación en IA: Diseño de arquitecturas para análisis geoespacial e integración de sistemas predictivos.||Automatización y Escalabilidad: Implementación de pipelines para procesar datos masivos e integrar dashboards interactivos.||Nuevos Retos: Investigación y desarrollo de soluciones full stack aplicadas al sector.",

    "work.sociedad_servicios_practicas.description": "Durante mis prácticas profesionales, contribuí al desarrollo de soluciones tecnológicas avanzadas, enfocándome en la mejora de procesos internos y el análisis de infraestructura vial mediante Inteligencia Artificial.",
    "work.sociedad_servicios_practicas.bullets": "Desarrollo Full Stack: Lideré el diseño e implementación de una intranet corporativa segura, integrando un sistema de autenticación basado en JWT.||Inteligencia Artificial para Infraestructura Crítica: Desarrollé y desplegué modelos de Computer Vision (Python, PyTorch, YOLO) para detectar fisuras en barreras New Jersey y otros elementos.||Análisis de Datos y Visualización: Creación de dashboards interactivos y framework de visualización para análisis geoespacial.||Gestión de Infraestructura y Cloud: Administración de bases de datos y despliegue en Microsoft Azure.",

    "work.lapica_pipeeno.description": "Fundé y lideré un emprendimiento de e-commerce especializado en la importación y comercialización de ropa deportiva, gestionando operaciones, proveedores y la plataforma de ventas.",
    "work.lapica_pipeeno.bullets": "Gestión de Proveedores: Desarrollo de red global de proveedores y negociación internacional.||Automatización: Programación de herramientas en Excel (VBA) para automatizar procesos internos.||Análisis Financiero: Uso de BI para monitoreo de ingresos y márgenes.||Optimización Logística: Orquestación de la cadena logística desde importación hasta entrega final.",
  "work.freelance_developer.company": "Independiente (Freelance)",
  "work.freelance_developer.title": "Desarrollador Full Stack Independiente (Freelance)",
  "work.freelance_developer.description": "Capitalicé mi especialización en desarrollo y las habilidades de mi intercambio para construir aplicaciones web a medida para pequeñas empresas y startups.",
  "work.freelance_developer.bullets": "Diseñé y construí interfaces de usuario (UI) interactivas y responsivas, utilizando React y Angular para consumir APIs RESTful.||Desarrollé servicios de backend y APIs robustas usando Django y FastAPI, integrando diversas bases de datos (PostgreSQL, MySQL, MongoDB).||Gestioné el ciclo de vida completo de proyectos, desde la toma de requisitos hasta el despliegue, implementando pipelines de CI/CD para la automatización de pruebas y entregas.||Brindé consultoría sobre arquitectura de software, ayudando a clientes a seleccionar el stack tecnológico (Front, Back, DB) óptimo para sus necesidades.",

    "work.saez_saez.description": "Responsable de la infraestructura de red y del desarrollo de herramientas de automatización en la empresa automotriz.",
    "work.saez_saez.bullets": "Rediseño de la Red Local: Planificación y simulación de topologías seguras (Cisco Packet Tracer, GNS3).||Automatización con Python y VBA: Herramientas para mejorar procesos de contacto y seguimiento.||Sistemas de Seguridad: Implementación y administración de cámaras y accesos remotos (SMARTPSS).",

    "work.unab_ayudante.description": "Colaboré con el cuerpo docente brindando apoyo directo a estudiantes de ciencias e ingeniería para fortalecer su comprensión de conceptos fundamentales.",
    "work.unab_ayudante.bullets": "Apoyo Académico y Mentoría: Tutoría en Física y Matemáticas.||Colaboración Docente en Programación: Asistencia en preparación de material y corrección de proyectos.||Desarrollo de Habilidades Técnicas: Retroalimentación sobre código y algoritmos.||Fomento del Pensamiento Crítico: Impulsé resolución de problemas y pensamiento analítico.",
    
    // Education Section
    "education.title": "Formación Académica",
    "education.gradeLabel": "Nota:",
    "education.skillsLabel": "Aptitudes:",
    "education.activitiesLabel": "Actividades y grupos:",
    "education.locationLabel": "Ubicación:",
    "education.datesLabel": "Periodo:",
    "education.currentStatus": "En curso",
    
    // Scholarships Section
    "scholarships.title": "Becas y Reconocimientos",
  // Scholarships content (Spanish)
  "scholarships.alura_one.description": "Seleccionado como beneficiario de la prestigiosa beca Oracle Next Education (ONE) Generación 9, una iniciativa de alto impacto que combina formación técnica avanzada con desarrollo profesional. El programa está diseñado para formar profesionales en Data Science con un enfoque 100% práctico, abordando desde fundamentos hasta técnicas avanzadas de análisis de datos y machine learning.",
  "scholarships.alura_one.bullets": "Análisis de Datos: Dominio avanzado de Python con Pandas y NumPy para manipulación y análisis de datos masivos||Visualización Avanzada: Creación de dashboards interactivos utilizando Matplotlib, Seaborn y Plotly||Machine Learning: Implementación de modelos predictivos y de clasificación usando Scikit-learn y TensorFlow||Proyectos Prácticos: Desarrollo de casos reales de análisis de datos y predicción||Big Data: Procesamiento de grandes volúmenes de datos||Estadística Aplicada: Análisis estadístico avanzado para la toma de decisiones",

  "scholarships.coursera_santander.description": "Beneficiario de la Beca Santander Skills | Skills for Work, un programa integral de formación diseñado para desarrollar competencias demandadas por las empresas, con rutas de aprendizaje orientadas a la empleabilidad y el desarrollo profesional.",
  "scholarships.coursera_santander.bullets": "Liderazgo Digital: Desarrollo de competencias para liderar equipos en entornos digitales||Gestión de Proyectos Ágiles: Certificación en metodologías ágiles||Análisis de Datos Empresariales: Capacitación en Business Intelligence||Habilidades de Comunicación: Técnicas de presentación ejecutiva||Inteligencia Emocional: Gestión de equipos y conflictos||Transformación Digital: Estrategias para la adaptación empresarial",

  "scholarships.puj_exchange.description": "Galardonado con una beca de intercambio académico que cubrió estudios y alojamiento en la Pontificia Universidad Javeriana Cali. Permitió una inmersión académica y cultural que potenció competencias técnicas y blandas, y facilitó la participación en proyectos internacionales.",
  "scholarships.puj_exchange.bullets": "Excelencia Académica: Seleccionado por mérito académico||Formación Internacional: Acceso a cursos avanzados y programas especializados||Desarrollo Multicultural: Participación en actividades culturales y académicas||Networking Global: Construcción de una red profesional internacional||Investigación Aplicada: Colaboración en proyectos con profesorado internacional",

  // Education detailed texts (Spanish)
  "education.unab_postgrado.description": "Programa de postgrado enfocado en la aplicación de técnicas avanzadas de Inteligencia Artificial y optimización para resolver problemas computacionales complejos. Incluye modelado matemático, técnicas de optimización, y proyectos prácticos aplicados a casos reales.",
  "education.unab_postgrado.bullets": "Modelado y Resolución de Problemas de Optimización: Aplicación de heurísticas y metaheurísticas||Implementación de Soluciones de IA en Python: Desarrollo de algoritmos y despliegue||Dominio de Lenguajes de Modelado: Uso de AMPL y Julia para modelado matemático||Proyectos Aplicados: Integración de soluciones en entornos reales",

  "education.uc_diplomado.description": "Diplomado centrado en la gestión estratégica de proyectos tecnológicos. Cubre metodologías ágiles, planificación de recursos, gestión de riesgos y comunicación con stakeholders para la entrega exitosa de proyectos TI.",
  "education.uc_diplomado.bullets": "Gestión Ágil de Proyectos: SCRUM y Kanban||Planificación Estratégica: Roadmaps y gestión de recursos||Liderazgo y Comunicación: Gestión de equipos y stakeholders",

  "education.uc_ingelectrica.description": "Formación en ingeniería eléctrica con enfoque en sistemas de control, electrónica de potencia y aplicaciones de software para sistemas embarcados y control industrial. Incluye laboratorios prácticos y proyectos de integración hardware-software.",
  "education.uc_ingelectrica.bullets": "Sistemas de Control y Automatización: Diseño de controladores||Electrónica de Potencia: Conversión y gestión de energía||Aplicaciones Software: Integración de sistemas embebidos y bases de datos||Proyectos de I+D: Participación en investigaciones aplicadas",

  "education.unab_diseno_algoritmos.description": "Grado orientado al diseño, análisis y optimización de algoritmos. El plan incluye teoría de complejidad, estructuras de datos avanzadas y aplicaciones prácticas en optimización y machine learning.",
  "education.unab_diseno_algoritmos.bullets": "Algoritmos Avanzados: Técnicas de diseño y análisis||Optimización y Complejidad: Mejora de eficiencia algorítmica||Machine Learning: Implementación de modelos y pipelines||Big Data: Algoritmos para procesamiento masivo",

  "education.puj_cali.description": "Semestre de intercambio con cursos de postgrado en optimización logística, ciberseguridad y modelación de procesos industriales. Experiencia académica y cultural que fortaleció habilidades técnicas y de adaptación internacional.",
  "education.puj_cali.bullets": "Formación Avanzada: Cursos de postgrado en optimización||Ciberseguridad: Formación práctica basada en estándares industriales||Modelación Logística: Análisis de cadenas de suministro||Interculturalidad: Desarrollo de competencias en entornos diversos",
  "education.colegio_smp.description": "Estudiante destacado en Matemáticas, Química, Artes visuales y Música. Participé activamente en actividades extracurriculares como clubes de ciencia y talleres artísticos, destacando por mi compromiso académico y liderazgo en proyectos escolares.",
  "education.colegio_smp.bullets": "Excelencia Académica: Alto rendimiento en materias STEM y humanidades||Participación Artística: Miembro del taller de artes visuales y coro escolar||Liderazgo Estudiantil: Representante de curso y coordinador de eventos escolares||Proyectos Científicos: Participación en ferias y concursos regionales",

  // Work item translations (Spanish)
  "work.mrcomputer.description": "Inicié como Practicante y fui promovido gracias al rápido desarrollo de habilidades y contribuciones clave en proyectos de seguridad y software. Mis responsabilidades incluyeron:",
  "work.mrcomputer.bullets": "Gestioné la ciberseguridad del entorno empresarial, implementando políticas de protección (ESET) y realizando análisis proactivos de vulnerabilidades con Kali Linux.||Desarrollé aplicaciones web y software interno utilizando Python (Django, Flask) y la pila MERN para proyectos Full Stack.||Administré la infraestructura en la nube (AWS, Azure) y gestioné el ciclo de vida de usuarios y permisos en Google Workspace y Microsoft 365.||Automaticé la generación de informes mediante scripts en Python (Pandas, NumPy) y macros de Excel (VBA).",
    "scholarships.periodLabel": "Periodo:",
    "scholarships.detailsLabel": "Detalles:",
    "scholarships.achievementsLabel": "Logros alcanzados:",
    "scholarships.institutionLabel": "Institución:",

    // Certifications Section
    "certifications.title": "Certificaciones",
    "certifications.intro": "Cuento con más de 100 certificaciones profesionales que respaldan mi experiencia y conocimientos técnicos.",
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
    "nav.education": "Education",
    "nav.scholarships": "Scholarships",
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
    "projects.project2.title": "Housing Price API",
    "projects.project2.desc": "API development for housing price prediction using Machine Learning.",
    "projects.project3.title": "Sentiment Detector",
    "projects.project3.desc": "Sentiment detection system for product reviews using NLP and Artificial Intelligence.",
    "projects.viewBtn": "View Project",

    // Work History Section
    "workHistory.title": "Work Experience",

    // Work item translations (English)
    "work.sociedad_servicios_expert.description": "Promoted to \"Expert in Programming and Development\". In this role I design, develop and implement advanced AI and software solutions to optimize road infrastructure and large-scale automation projects.",
    "work.sociedad_servicios_expert.bullets": "Computer Vision for Critical Infrastructure: Developed advanced CV models (Python, PyTorch, YOLO) to detect road features such as cracks and signage.||AI Innovation Projects: Designed architectures for geospatial analysis and predictive systems.||Automation & Scalability: Implemented pipelines to process massive datasets and integrated interactive dashboards.||Ongoing R&D: Researched new full-stack solutions for sector-specific challenges.",

    "work.sociedad_servicios_practicas.description": "During my internship I contributed to the development of advanced technological solutions, focusing on improving internal processes and analyzing road infrastructure using AI.",
    "work.sociedad_servicios_practicas.bullets": "Full Stack Development: Led the design and implementation of a secure corporate intranet with JWT-based authentication.||AI for Critical Infrastructure: Developed and deployed Computer Vision models (Python, PyTorch, YOLO) for detection tasks on road barriers.||Data Analysis & Visualization: Built interactive dashboards and a visualization framework for geospatial analysis.||Infrastructure & Cloud Management: Administered databases and deployed services on Microsoft Azure.",

    "work.lapica_pipeeno.description": "Founded and led an e-commerce venture focused on importing and selling sportswear; responsible for end-to-end business operations and platform management.",
    "work.lapica_pipeeno.bullets": "Supplier Management: Built and negotiated with a global supplier network.||Automation: Developed Excel (VBA) tools to automate internal processes.||Financial Analysis: Used BI tools to monitor revenues and margins.||Logistics Optimization: Orchestrated the supply chain from import to delivery.",
  "work.freelance_developer.description": "I leveraged my development specialization and exchange experience to build custom web applications for small businesses and startups.",
  "work.freelance_developer.bullets": "Designed and built interactive, responsive user interfaces using React and Angular to consume RESTful APIs.||Developed robust backend services and APIs with Django and FastAPI, integrating databases like PostgreSQL, MySQL and MongoDB.||Managed full project lifecycle from requirements to deployment, implementing CI/CD pipelines to automate tests and releases.||Provided software architecture consulting, helping clients choose an optimal technology stack (Front, Back, DB) for their needs.",
    "work.freelance_developer.company": "Independent (Freelance)",
    "work.freelance_developer.title": "Independent Full Stack Developer (Freelance)",

    "work.saez_saez.description": "Responsible for network infrastructure and automation tool development at an automotive company.",
    "work.saez_saez.bullets": "Local Network Redesign: Planned and simulated secure topologies using Cisco Packet Tracer and GNS3.||Automation with Python & VBA: Built custom tools to streamline customer contact processes.||Security Systems: Implemented and managed CCTV and remote access systems (SMARTPSS).",

    "work.unab_ayudante.description": "Worked closely with faculty providing direct support to students in science and engineering to strengthen their understanding of core concepts.",
    "work.unab_ayudante.bullets": "Academic Support & Mentoring: Guided students in Physics and introductory Mathematics.||Teaching Assistance in Programming: Helped prepare materials and grade projects.||Technical Skill Development: Provided constructive feedback on code and algorithms.||Critical Thinking Promotion: Encouraged active problem-solving and analysis.",
    
    // Education Section
    "education.title": "Academic Background",
    "education.gradeLabel": "Grade:",
    "education.skillsLabel": "Skills:",
    "education.activitiesLabel": "Activities and groups:",
    "education.locationLabel": "Location:",
    "education.datesLabel": "Period:",
    "education.currentStatus": "In progress",
    
    // Scholarships Section
    "scholarships.title": "Scholarships and Awards",
  // Scholarships content (English)
  "scholarships.alura_one.description": "Selected as a beneficiary of the Oracle Next Education (ONE) Generation 9 scholarship — a high-impact program combining advanced technical training and professional development. The program trains Data Science professionals with a 100% practical approach, covering fundamentals to advanced machine learning and data analysis techniques.",
  "scholarships.alura_one.bullets": "Data Analysis: Advanced Python with Pandas and NumPy for large-scale manipulation||Advanced Visualization: Interactive dashboards with Matplotlib, Seaborn and Plotly||Machine Learning: Predictive models using Scikit-learn and TensorFlow||Practical Projects: Real-world analysis and prediction cases||Big Data: Processing large datasets and performance optimization||Applied Statistics: Advanced statistical analysis for decision making",

  "scholarships.coursera_santander.description": "Recipient of the Santander Skills | Skills for Work scholarship, an intensive program aimed at developing in-demand professional skills and closing the skills gap between academia and industry.",
  "scholarships.coursera_santander.bullets": "Digital Leadership: Leading teams in digital environments||Agile Project Management: Certification in agile methodologies||Business Data Analysis: Training in business intelligence tools||Communication Skills: Executive presentation techniques||Emotional Intelligence: Team and conflict management||Digital Transformation: Strategies for organizational adaptation",

  "scholarships.puj_exchange.description": "Awarded a full academic exchange scholarship covering study and accommodation at Pontificia Universidad Javeriana Cali. The selective program provided full immersion in an international academic environment, combining academic rigor with cultural enrichment.",
  "scholarships.puj_exchange.bullets": "Academic Excellence: Selected on academic merit among international students||International Training: Access to advanced and postgraduate-level courses||Multicultural Development: Participation in international projects and cultural events||Global Networking: Building a professional international network||Applied Research: Collaboration on research projects with international faculty",

  // Education detailed texts (English)
  "education.unab_postgrado.description": "Postgraduate program focused on applying advanced AI and optimization techniques to solve complex computational problems. Includes mathematical modeling, optimization techniques and practical projects applied to real use cases.",
  "education.unab_postgrado.bullets": "Optimization Modeling: Heuristics and metaheuristics application||AI Implementation in Python: Algorithm development and deployment||Modeling Languages: Advanced use of AMPL and Julia||Applied Projects: Integration of solutions into real environments",

  "education.uc_diplomado.description": "Diploma focused on strategic management of technology projects. Covers agile methodologies, resource planning, risk management and stakeholder communication for successful IT project delivery.",
  "education.uc_diplomado.bullets": "Agile Project Management: SCRUM and Kanban||Strategic Planning: Roadmaps and resource management||Leadership and Communication: Team and stakeholder management",

  "education.uc_ingelectrica.description": "Comprehensive electrical engineering training with emphasis on control systems, power electronics and software applications for embedded systems and industrial control. Includes labs and hardware-software integration projects.",
  "education.uc_ingelectrica.bullets": "Control Systems and Automation: Controller design||Power Electronics: Energy conversion and management||Software Applications: Embedded systems integration and databases||R&D Projects: Participation in applied research",

  "education.unab_diseno_algoritmos.description": "Degree oriented to the design, analysis and optimization of algorithms. Curriculum includes complexity theory, advanced data structures and practical applications in optimization and machine learning.",
  "education.unab_diseno_algoritmos.bullets": "Advanced Algorithms: Design and analysis techniques||Optimization and Complexity: Improving algorithmic efficiency||Machine Learning: Implementing models and pipelines||Big Data: Algorithms for large-scale processing",

  "education.puj_cali.description": "Exchange semester including postgraduate-level courses in logistics optimization, cybersecurity and industrial process modeling. Academic and cultural experience that strengthened technical skills and international adaptability.",
  "education.puj_cali.bullets": "Advanced Training: Postgraduate courses in optimization||Cybersecurity: Practical training based on industry standards||Logistics Modeling: Supply chain analysis||Intercultural Skills: Competence development in diverse contexts",
  "education.colegio_smp.description": "Outstanding student in Mathematics, Chemistry, Visual Arts and Music. Actively participated in extracurricular activities such as science clubs and art workshops, demonstrating academic commitment and leadership in school projects.",
  "education.colegio_smp.bullets": "Academic Excellence: High performance in STEM and humanities subjects||Artistic Participation: Member of visual arts workshops and school choir||Student Leadership: Class representative and events coordinator||Science Projects: Participation in regional fairs and competitions",

  // Work item translations (English)
  "work.mrcomputer.description": "I started as an intern and was promoted thanks to rapid skill development and key contributions in security and software projects. My responsibilities included:",
  "work.mrcomputer.bullets": "Managed enterprise cybersecurity, implementing protection policies (ESET) and conducting proactive vulnerability analysis with Kali Linux||Developed web applications and internal software using Python (Django, Flask) and the MERN stack for full-stack projects||Managed cloud infrastructure (AWS, Azure) and handled user lifecycle and permissions in Google Workspace and Microsoft 365||Automated report generation using Python scripts (Pandas, NumPy) and Excel macros (VBA).",
    "scholarships.periodLabel": "Period:",
    "scholarships.detailsLabel": "Details:",
    "scholarships.achievementsLabel": "Achievements:",
    "scholarships.institutionLabel": "Institution:",

    // Menu Labels
    "menu.close": "Close menu",
    "menu.open": "Open menu",
    "menu.login": "Login",
    "menu.dashboard": "Dashboard",
    "menu.profile": "Profile",
    "menu.logout": "Logout",

    // Certifications Section
    "certifications.title": "Certifications",
    "certifications.intro": "I have more than 100 Professional certifications that support my experience and technical knowledge.",
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
    "nav.education": "Hezkuntza",
    "nav.scholarships": "Bekak",
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
    "projects.project2.title": "Housing Price API",
    "projects.project2.desc": "Etxebizitzen prezioen aurreikuspena egiteko API garapena Machine Learning erabiliz.",
    "projects.project3.title": "Sentimendua Detektorea",
    "projects.project3.desc": "Sentimendua detektatzeko sistema produktuen iritzietan NLP eta Adimen Artifiziala erabiliz.",
    "projects.viewBtn": "Proiektua ikusi",

    // Work History Section
    "workHistory.title": "Lan Esperientzia",

    // Work item translations (Basque)
    "work.sociedad_servicios_expert.description": "Promovitu nintzen \"Programazio eta Garapen Aditu\" izatera. Nire rola AI eta software soluzio aurreratuak diseinatzea, garatzea eta inplementatzea da, bide azpiegituraren optimizaziorako eta automatizazio proiektu handietarako.",
    "work.sociedad_servicios_expert.bullets": "Azpiegitura Kritikorako CV: Garatu ditut CV eredu aurreratuak (Python, PyTorch, YOLO) errepideen elementuak detektatzeko.||AI Berrikuntza Proiektuak: Arkitektura diseinua analisi geoespazialerako eta sistema predictiveetarako.||Automatizazioa eta Eskalagarria: Pipelinek datu masiboak prozesatzeko eta dashboard interaktiboak integratzeko.||I+G Jarduerak: Soluzio full-stack berriak ikertzen.",

    "work.sociedad_servicios_practicas.description": "Nire praktiketan, soluzio teknologiko aurreratuetan lagundu nuen, prozesu barneak hobetzen eta bide azpiegituraren analisian AI erabiliz.",
    "work.sociedad_servicios_practicas.bullets": "Full Stack Garapena: Intranet seguru bat diseinatu eta inplementatu nuen, JWT autentikazioarekin.||Azpiegitura Kritikorako AI: Computer Vision ereduak garatu eta inplementatu ditut (Python, PyTorch, YOLO).||Datuen Analisia eta Bisualizazioa: Dashboard interaktiboak eta ikuskapen markoa sortu ditut.||Hodeiko Kudeaketa: Datu-baseak kudeatu eta Azure-n zerbitzuak jarri ditut.",

    "work.lapica_pipeeno.description": "Ekintzailetza bat sortu eta zuzendu nuen, kirolarentzako arropa inportatu eta merkaturatzen zuen e-commerce bat; eragiketak eta plataformaren kudeaketa zenuen.",
    "work.lapica_pipeeno.bullets": "Hornitzaileen Kudeaketa: Mundu osoko hornitzaile sare bat eraiki eta negoziatu.||Automatizazioa: Excel (VBA) tresnak garatu prozesuak automatizatzeko.||Finantza Analisia: BI tresnak erabili irabaziak eta marginak monitorizatzeko.||Logistika Optimizazioa: Hornidura katearen kudeaketa inportetik entrega arte.",
  "work.freelance_developer.description": "Nire garapen-espezializazioa eta truke-esperientzia baliatuz, web-aplikazio pertsonalizatuak eraiki nituen enpresa txiki eta startupentzako.",
  "work.freelance_developer.bullets": "UI interaktibo eta erantzunkorrak diseinatu eta eraiki nituen, React eta Angular erabiliz REST API-ak kontsumitzeko.||Django eta FastAPI erabiliz backend eta API sendoak garatu nituen, datu-baseak integratuz (PostgreSQL, MySQL, MongoDB).||Proiektuaren bizitzazko zikloa kudeatu nuen hasieratik deploy-ara arte, CI/CD pipelineak ezarriz testa eta entregak automatizatzeko.||Software arkitektura kontsultoria eskaini nuen, bezeroei stack teknologiko egokia aukeratzen lagunduz (Front, Back, DB).",
    "work.freelance_developer.company": "Autonomoa (Freelance)",
    "work.freelance_developer.title": "Full Stack Garatzaile Autonomoa (Freelance)",

    "work.saez_saez.description": "Sare azpiegitura eta automatizazio tresnen arduraduna enpresa automotriz batean.",
    "work.saez_saez.bullets": "Tokiko Sare Errediseinua: Topologia seguruak planifikatu eta simulatu Cisco Packet Tracer eta GNS3 erabiliz.||Automatizazioa Python eta VBA-rekin: Erreminta pertsonalizatuak garatu bezeroen jarraipena hobetzeko.||Segurtasun Sistemak: CCTV eta sarbide urruneko sistemak ezarri eta kudeatu (SMARTPSS).",

    "work.unab_ayudante.description": "Irakasleekin lankidetzan aritu nintzen ikasleei laguntza zuzena emanez zientzia eta ingeniaritzako kontzeptuak indartzeko.",
    "work.unab_ayudante.bullets": "Ikaskuntza Laguntza eta Aholkularitza: Fisika eta hasierako Matematiketan lagundu.||Irakaskuntza Laguntza Programazioan: Materiala prestatzeko eta proiektuak zuzentzeko lagundu.||Trebetasun Teknikoen Garapena: Kodeari eta algoritmoei buruzko feedback eraikitzailea eman.||Pentsamendu Kritikoa Sustatzea: Arazoen ebazpenean eta analisiaren praktikan lagundu.",
    
    // Education Section
    "education.title": "Hezkuntza",
    "education.gradeLabel": "Nota:",
    "education.skillsLabel": "Gaitasunak:",
    "education.activitiesLabel": "Jarduerak eta taldeak:",
    "education.locationLabel": "Kokapena:",
    "education.datesLabel": "Aldia:",
    "education.currentStatus": "Egiten",
    
    // Scholarships Section
    "scholarships.title": "Bekak eta Sariak",
  // Scholarships content (Basque - eu)
  "scholarships.alura_one.description": "Oracle Next Education (ONE) 9. belaunaldiko bekaren onuradun aukeratua — programak trebetasun tekniko aurreratuak eta garapen profesionala uztartzen ditu. Programa praktikan oinarrituta prestatzen du Data Science profesionala, oinarrizkoetatik hasi eta machine learning aurreraturaino.",
  "scholarships.alura_one.bullets": "Datu Analisia: Python aurreratua Pandas eta NumPy-rekin||Bisualizazio Aurreratua: Dashboard interaktiboak Matplotlib, Seaborn eta Plotly erabiliz||Machine Learning: Eredu iragarleak Scikit-learn eta TensorFlow erabiliz||Proiektu Praktikoak: Kasu errealen analisia eta aurreikuspenak||Big Data: Bolumen handiko datuen prozesamendua||Estatistika Aplikatua: Erabakiak hartzeko analisi estatistikoa",

  "scholarships.coursera_santander.description": "Santander Skills | Skills for Work beka jasotakoa, industriak eskatzen dituen gaitasunak garatzeko programa intentsiboa eta enplegagarritasuna bultzatzeko diseinatua.",
  "scholarships.coursera_santander.bullets": "Digital Lidergoa: Taldeak gidatzea ingurune digitalean||Proiektu Kudeaketa Agilea: Metodologiak eta ziurtagiriak||Enpresa Datu Analitika: Business Intelligence tresnen entrenamendua||Komunikazio Trebetasunak: Aurkezpen teknika aurreratuak||Adimen Emotiboa: Taldeen eta gatazken kudeaketa||Digital Aldaketa: Erakundeen egokitzapenerako estrategiak",

  "scholarships.puj_exchange.description": "Pontificia Universidad Javeriana Cali-ri egindako truke-beka osoa eskuratu; programa selektibo honek immersion akademiko eta kultural osoa eskaintzen du, gaitasun tekniko eta kulturalak garatuz.",
  "scholarships.puj_exchange.bullets": "Akademiko Goi Mailakoa: Nazioarteko ikasleen artean merituz hautatua||Nazioarteko Prestakuntza: Postgrado mailako ikastaroetara sartzea||Kulturarteko Garapena: Nazioarteko proiektu eta jardueren parte-hartzea||Sare Globalak: Nazioarteko sare profesionalaren eraikuntza||Ikerketa Aplikatua: Nazioarteko irakasleekin lankidetza",

  // Education detailed texts (Basque)
  "education.unab_postgrado.description": "Postgraduondoko programa, AI eta optimizazio teknikak aplikatzera bideratua konputazio arazo konplexuak konpontzeko. Modellaketa matematikoa, optimizazioa eta kasu errealetan aplikatutako proiektu praktikoak barne hartzen ditu.",
  "education.unab_postgrado.bullets": "Optimizazio Modellaketa: Heuristika eta metaheuristika aplikazioa||AI Python-en: Algoritmoen garapena eta deployment-a||Modelling Hizkuntzak: AMPL eta Julia erabiltze aurreratua||Proiektu Aplikatuak: Soluzioen integrazioa eremu errealetan",

  "education.uc_diplomado.description": "Proiektu teknologikoen kudeaketa estrategikoari buruzko diplomadua. Metodologia agileak, baliabideen plangintza, arrisku kudeaketa eta interes-taldeen komunikazioa hartzen ditu.",
  "education.uc_diplomado.bullets": "Proiektu Kudeaketa Agile: SCRUM eta Kanban||Planifikazio Estrategikoa: Roadmap-ak eta baliabideen kudeaketa||Lidergoa eta Komunikazioa: Taldeen eta interes-taldeen kudeaketa",

  "education.uc_ingelectrica.description": "Ingeniaritza elektriko integrala, kontrol sistema, potentzia elektronika eta embebatutako sistemetarako aplikazio softwareetan zentratua. Laborategi praktikoak eta hardware-software integrazio proiektuak barne hartzen ditu.",
  "education.uc_ingelectrica.bullets": "Kontrol Sistemetako Diseinua: Kontroladore diseinua||Potentzia Elektronika: Energiaren kudeaketa||Software Aplikazioak: Sistema enbeded-en integrazioa||I+G Proiektuak: Ikerketa aplikatuan parte hartzea",

  "education.unab_diseno_algoritmos.description": "Algoritmoen diseinuari, analisiari eta optimizazioari zuzendutako gradua. Konplexitatearen teoria, datu-egiturak eta optimizazio eta machine learning aplikazio praktikoak barne hartzen ditu.",
  "education.unab_diseno_algoritmos.bullets": "Algoritmo Aurreratuak: Diseinu eta analisi teknikak||Optimizazioa eta Konplexitatea: Eraginkortasuna hobetzearen teknikak||Machine Learning: Ereduen inplementazioa||Big Data: Bolumen handiko prozesamendurako algoritmoak",

  "education.puj_cali.description": "Truke-semestrea: optimizazio logistikoa, zibersegurtasuna eta prozesu industrialen modelaketa bezalako postgraduoko ikastaroak barne. Esperientzia akademiko-kultural honek trebetasun teknikoak eta nazioarteko egokitzapena indartu zituen.",
  "education.puj_cali.bullets": "Prestakuntza Aurreratua: Optimizazio postgraduko ikastaroak||Zibersegurtasuna: Estándar industrialetan oinarritutako prestakuntza||Logistika Modellaketa: Hornidura kateen analisia||Kulturartekotasuna: Ingurune desberdinetan gaitasunen garapena",
  "education.colegio_smp.description": "Matematika, Kimika, Arte bisualak eta Musikan nabarmentzen zen ikaslea. Kluba eta tailer ugaritan parte hartu nuen, ikaskuntza eta lidergo gaitasunak erakutsiz proiektu eskolaretan.",
  "education.colegio_smp.bullets": "Ikasketa Erreferentea: Errendimendu ona STEM eta giza-zientzietan||Parte-hartze Artistikoa: Arte tailer eta koru eskolarreko kidea||Ikasleen Lidergoa: Ikasgelen ordezkaria eta ekitaldi koordinatzailea||Zientzia Proiektuak: Ferietako eta lehiaketetako parte-hartzea",

  // Work item translations (Basque)
  "work.mrcomputer.description": "Praktikante gisa hasi nintzen eta promozionatua izan nintzen gaitasunak azkar garatu eta segurtasun eta software proiektuetan egin nituen ekarpen garrantzitsuei esker. Nire ardura nagusiak izan ziren:",
  "work.mrcomputer.bullets": "Enpresako zibersegurtasuna kudeatu nuen, babes politika (ESET) ezarriz eta ahultasun analisi proaktiboak eginez Kali Linux erabiliz.||Web aplikazioak eta barne softwarea garatu nituen Python (Django, Flask) eta MERN stack erabiliz proiektu Full Stacketarako.||Hodeiko azpiegitura kudeatu nuen (AWS, Azure) eta erabiltzaileen eta baimenen bizitza-zikloa kudeatu Google Workspace eta Microsoft 365-en.||Txosten automatizazioa script-en bidez gauzatu nuen Python (Pandas, NumPy) eta Excel makroekin (VBA).",
    "scholarships.periodLabel": "Aldia:",
    "scholarships.detailsLabel": "Xehetasunak:",
    "scholarships.achievementsLabel": "Lorpenak:",
    "scholarships.institutionLabel": "Erakundea:",

    // Menu Labels
    "menu.close": "Menua itxi",
    "menu.open": "Menua ireki",
    "menu.login": "Hasi saioa",
    "menu.dashboard": "Kontrol-panela",
    "menu.profile": "Profila",
    "menu.logout": "Saioa itxi",

    // Certifications Section
    "certifications.title": "Ziurtagiriak",
    "certifications.intro": "100 Ziurtagiri Profesional baino gehiago ditut nire esperientzia eta ezagutza teknikoa babesten dutenak.",
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
