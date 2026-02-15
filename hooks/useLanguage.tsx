
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
    "nav.websites": "Webs",
    "nav.contact": "Contacto",
    "aria.openMenu": "Abrir menú",
    "aria.goToAbout": "Ir a Sobre Mí",
    "aria.goToTop": "Ir al inicio",

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
      "Ingeniero de Software especializado en Desarrollo Full Stack Web y Móvil e Inteligencia Artificial. Con experiencia en Ciencia de Datos, Visión por Computadora e Investigación de Operaciones.",
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
    "experience.intro": "Combinando mi",
    "experience.professionalExp": "experiencia profesional",
    "experience.con": "con mi",
    "experience.formation": "formación",
    "experience.prepIn": "en",
    "experience.faculty": "la facultad de Ingeniería",
    "experience.prepOf": "de la",
    "experience.university": "Universidad Andres Bello",
    "experience.developing": ", he estado desarrollando tanto ",
    "experience.personal": "proyectos personales",
    "experience.and": "como",
    "experience.professional": "proyectos profesionales",
    "experience.consolidated": ". Esto me ha permitido consolidar mis",
    "experience.skills": "habilidades técnicas",
    "experience.comma1": " en",
    "experience.dataAnalysis": "análisis de datos",
    "experience.comma2": ",",
    "experience.cybersecurity": "ciberseguridad",
    "experience.softwareDevelopment": "desarrollo de software",
    "experience.cloudDevelopment": "desarrollo en la nube",
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
    "experience.softwareDev": "del desarrollo de software",
    "experience.improve": ", lo que me permite mejorar continuamente mi",
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
    "projects.project1.title": "Análisis de Infraestructura Avanzada",
    "projects.project1.desc":
      "IA para detección de tachas, captafaros, balizas, señalética y fisuras en pavimento o barreras New Jersey. Optimiza el mantenimiento vial mediante visión computacional avanzada.",
    "projects.project2.title": "Housing Price API",
    "projects.project2.desc": "Arquitectura escalable de API para la predicción de valores inmobiliarios. Utiliza modelos de regresión avanzados entrenados con Scikit-Learn y desplegados en ecosistemas cloud.",
    "projects.project3.title": "Detector de Sentimientos",
    "projects.project3.desc": "Herramienta de Procesamiento de Lenguaje Natural (NLP) para el análisis de reseñas. Emplea técnicas de tokenización y modelos de clasificación para identificar polaridad y tópicos clave.",
    "projects.viewBtn": "Ver Proyecto",
    "projects.project4.title": "Optimización Mochila",
    "projects.project4.desc":
      "Tesis de investigación sobre 'Hard Knapsack Problems' (Pissinger). Desarrollada en Julia, C y Python, implementa modelos de fuerza bruta, heurísticas y algoritmos genéticos multihilo.",
    "projects.project5.title": "Impostor Futbolero",
    "projects.project5.desc": "Experiencia multijugador en tiempo real con Socket.IO y Node.js. Integra mecánicas de sincronización de estado, diseño UI moderno y una temática inspirada en el fútbol chileno.",
    "projects.project6.title": "Telecom Churn AI",
    "projects.project6.desc": "Pipeline integral de Data Science para la retención estratégica de clientes. Incluye procesos ETL complejos, análisis estadístico profundo y modelos predictivos para identificar patrones de fuga.",

    // Work History Section
    "workHistory.title": "Experiencia Laboral",

    "work.sociedad_servicios_expert.description": 'Ascendido a "Experto en Programación y Desarrollo". Tras mi ascenso, mi rol se centra en diseñar, desarrollar e implementar soluciones avanzadas de Inteligencia Artificial y software para la optimización de infraestructura vial y proyectos de automatización a gran escala. Actualmente, mis principales focos son:',
    "work.sociedad_servicios_expert.bullets": "IA Visual para Infraestructura Crítica: Desarrollo de modelos de Computer Vision (Python, PyTorch, YOLO) para la detección detallada de fisuras en barreras New Jersey y la medición por imágenes de fisuras y baches en pavimento.||Ingeniería y Análisis de Datos Predictivo: Aplicación de ingeniería de datos y modelos de Machine Learning (Python, R, Macros) para el análisis y predicción de futuros daños en infraestructura vial, optimizando el manejo de datos para mantenimiento.||Automatización y Escalabilidad: Implementación de pipelines inteligentes para procesar datos masivos, integrando dashboards interactivos y herramientas de análisis que facilitan la toma de decisiones en tiempo real.||Liderazgo en Marketing Digital y Desarrollo Web (Full Stack): Como Encargado de Marketing y Soluciones Digitales, lidero la modernización de la identidad corporativa: Diseño y Desarrollo Web de sitio oficial y Estrategia Digital & RRSS.||Próximos Desarrollos y Nuevos Retos: Exploración de nuevas soluciones basadas en IA para distintos proyectos tecnológicos internos, combinando desarrollo full stack, procesamiento de datos y modelos inteligentes.",

    "work.sociedad_servicios_practicas.description": "Durante mis prácticas profesionales, contribuí al desarrollo de soluciones tecnológicas avanzadas, enfocándome en la mejora de procesos internos y el análisis de infraestructura vial mediante Inteligencia Artificial.",
    "work.sociedad_servicios_practicas.bullets": "Desarrollo Full Stack: Lideré el diseño y la implementación de una intranet corporativa segura desde cero, utilizando Angular y Bootstrap. La plataforma centralizó recursos clave y mejoró la comunicación interna, integrando un sistema de autenticación robusto basado en JWT.||Inteligencia Artificial para Infraestructura Crítica: Desarrollé y desplegué modelos avanzados de Computer Vision (Python, PyTorch, YOLO) para el análisis de infraestructura vial. El proyecto se centró en la detección automática de fisuras en barreras New Jersey y en la identificación de otros elementos como tachas, captafaros y señalética, optimizando directamente los procesos de mantenimiento y seguridad.||Análisis de Datos y Visualización Avanzada: Transformé datos complejos en insights accionables mediante la creación de dashboards interactivos. Para ello, utilicé Power BI y, adicionalmente, desarrollé un framework de visualización a medida integrando Streamlit y Folium para el análisis geoespacial y la detección de patrones complejos, facilitando así la toma de decisiones estratégicas.||Gestión de Infraestructura y Cloud: Administré bases de datos relacionales (MySQL, PostgreSQL) y gestioné el despliegue de aplicaciones y servicios en la nube de Microsoft Azure, asegurando la disponibilidad, escalabilidad y rendimiento de las soluciones.",

    "work.lapica_pipeeno.description": "Fundé y lideré un emprendimiento de e-commerce especializado en la importación y comercialización de ropa deportiva. Fui responsable de la gestión integral del negocio, desde la estrategia de sourcing global hasta la ejecución de ventas y el análisis financiero.",
    "work.lapica_pipeeno.bullets": "Gestión de Proveedores y Comercio Internacional: Desarrollé y gestioné una red global de proveedores en Asia, Europa y América (China, Inglaterra, EE. UU., Colombia y Tailandia).||Desarrollo de Herramientas y Automatización: Diseñé y programé un sistema de gestión de clientes y pedidos en Excel, utilizando Visual Basic (VBA) y Macros.||Análisis Financiero y Business Intelligence: Dirigí el análisis financiero del negocio, empleando Excel y Power BI para monitorear ingresos, costos y márgenes de ganancia.||Optimización Logística y de Operaciones: Orquesté toda la cadena logística, desde la importación hasta la entrega final al cliente.",

    "work.freelance_developer.company": "Profesional independiente",
    "work.freelance_developer.title": "Desarrollador full stack",
    "work.freelance_developer.description": "Capitalicé mi especialización en desarrollo y las habilidades de mi intercambio para construir aplicaciones web a medida para pequeñas empresas y startups.",
    "work.freelance_developer.bullets": "Diseñé y construí interfaces de usuario (UI) interactivas y responsivas, utilizando React y Angular para consumir APIs RESTful.||Desarrollé servicios de backend y APIs robustas usando Django y FastAPI, integrando diversas bases de datos según los requisitos del proyecto (PostgreSQL, MySQL y MongoDB).||Gestioné el ciclo de vida completo de proyectos, desde la toma de requisitos hasta el despliegue, implementando pipelines de CI/CD para la automatización de pruebas y entregas.||Brindé consultoría sobre arquitectura de software, ayudando a clientes a seleccionar el stack tecnológico (Front, Back, DB) óptimo para sus necesidades.",

    "work.saez_saez.description": "Lideré el proyecto de rediseño de la red local de la empresa, utilizando Cisco Packet Tracer y GSN3 para planificar y simular una topología más segura y eficiente.",
    "work.saez_saez.bullets": "Brindé soporte técnico integral a usuarios (hardware, software y redes), diagnosticando y resolviendo incidencias para asegurar la continuidad operativa.||Administré servidores locales (Windows Server), incluyendo la gestión de copias de seguridad (backups), permisos de usuario y políticas de acceso a datos.||Desarrollé una herramienta personalizada con Python y VBA para automatizar el proceso de contacto con clientes, mejorando los tiempos de respuesta y la gestión.||Gestioné el ciclo de vida de activos TI, coordinando la adquisición de equipos, renovación de licencias de software y la relación con proveedores tecnológicos.||Implementé y administré un nuevo sistema de cámaras de seguridad, configurando el control de movimiento y el acceso remoto a través de la plataforma SMARTPSS.",

    "work.unab_ayudante.description": "Durante mi rol como asistente académico, colaboré activamente con el cuerpo docente y brindé apoyo directo a estudiantes de ciencias e ingeniería. Mi objetivo fue fortalecer su comprensión de conceptos fundamentales y desarrollar sus habilidades analíticas para asegurar una base académica sólida.",
    "work.unab_ayudante.bullets": "Apoyo Académico y Mentoría: Guié a estudiantes en las asignaturas de Física General e Introducción a las Matemáticas, simplificando temas complejos y resolviendo dudas.||Colaboración Docente en Programación: Como Ayudante de Cátedra para Introducción a la Programación y Análisis de Algoritmos, asistí al profesor en la preparación de material didáctico, la corrección de proyectos y la conducción de laboratorios prácticos.||Desarrollo de Habilidades Técnicas: Proporcioné retroalimentación constructiva sobre código y algoritmos, ayudando a los estudiantes a depurar sus soluciones y a comprender principios clave de eficiencia y buenas prácticas de programación.||Fomento del Pensamiento Crítico: Fomenté un ambiente de aprendizaje proactivo donde los estudiantes desarrollaron habilidades de resolución de problemas, aplicando la teoría a desafíos prácticos y preparándolos para cursos más avanzados.",

    // Education Section
    "education.title": "Formación Académica",
    "education.gradeLabel": "Nota:",
    "education.skillsLabel": "Aptitudes:",
    "education.activitiesLabel": "Actividades y grupos:",
    "education.locationLabel": "Ubicación:",
    "education.datesLabel": "Periodo:",
    "education.currentStatus": "En curso",

    // Scholarships Section - Merged into Education, keeping title for potential future use or if section is re-enabled
    "scholarships.title": "Becas y Reconocimientos",

    // Education detailed texts (Spanish)
    "education.unab_civil.degree": "Ingeniería Civil Informático",
    "education.unab_civil.description": "Etapa cúlmine de mi formación integra la ingeniería de software avanzada con la ciencia de datos estratégica, validada mediante mi tesis sobre optimización combinatoria. Título profesional de Ingeniero Civil Informático, aprobado con distinción.",
    "education.unab_civil.bullets": "Desarrollo Full Stack Moderno: Arquitectura y construcción de aplicaciones escalables utilizando React, Next.js y Angular. Integración de servicios backend robustos y APIs eficientes.||Cloud Data Engineering & Analytics: Gestión de ecosistemas de datos en GCP (BigQuery) y Azure. Implementación de pipelines ETL, análisis profundo con Python y estrategias corporativas de Gobernanza de Datos.||Ciberseguridad Aplicada: Desarrollo bajo principios de Security by Design, asegurando la integridad de la infraestructura y el código en entornos productivos.||Innovación y Simulación: Desarrollo de videojuegos y entornos interactivos complejos con Unity, aplicando lógica matemática y física avanzada.||Investigación: Resolución de problemas complejos mediante algoritmos de optimización e Inteligencia Artificial.",

    "education.unab_licenciatura.degree": "Licenciatura en Ciencias de la Ingeniería, Computer Science",
    "education.unab_licenciatura.description": "Obtención del grado de Licenciado en Ciencias de la Ingeniería, aprobado con distinción. Este hito consolida mi base científica y tecnológica, certificando la capacidad analítica para resolver desafíos complejos en la industria TI.",
    "education.unab_licenciatura.bullets": "Actividades y grupos: Delegado académico y participación activa en proyectos de investigación aplicada. Enfoque en el desarrollo de soluciones tecnológicas innovadoras mediante metodologías ágiles y análisis de datos.||Investigación de Operaciones: Resolución de problemas de optimización combinatoria y complejidad NP, enfocada en eficiencia algorítmica y toma de decisiones.||Desarrollo de Software Avanzado: Diseño de arquitecturas escalables (Next.js, React, Angular, TypeScript) y gestión eficiente de bases de datos SQL y NoSQL.||Infraestructura y Seguridad: Despliegue de servicios en la nube (Azure, AWS) e implementación de principios de Ciberseguridad en aplicaciones.||Data Science e IA: Entrenamiento de modelos de Machine Learning, procesos ETL y desarrollo de soluciones de Visión por Computadora.",

    "education.unab_postgrado.degree": "Postgrado, Máster en Ingeniería Informática",
    "education.unab_postgrado.description": "Cursando programa de postgrado con foco en la especialización avanzada en Ingeniería de Software, Ciencia de Datos e Inteligencia Artificial. El programa integra conocimientos teóricos con aplicación práctica en tecnologías de vanguardia, incluyendo trayectorias formativas desarrolladas y certificadas por IBM en Data Science & AI.",
    "education.unab_postgrado.bullets": "Objetivo: Profundizar en el diseño y despliegue de arquitecturas de software complejas y soluciones empresariales basadas en datos y modelos predictivos.",

    "education.puj_exchange.degree": "Ingeniería de Sistemas y Computación e Industrial",
    "education.puj_exchange.description": "Programa de intercambio académico internacional enfocado en la profundización de conocimientos en áreas avanzadas de Ingeniería Industrial e Ingeniería de Sistemas. La experiencia combinó un riguroso plan de estudios con una inmersión cultural completa. Durante el semestre, cursé asignaturas de alto nivel, incluyendo tópicos de magíster, para complementar mi formación de pregrado.",
    "education.puj_exchange.bullets": "Magíster en Ing. Industrial: Participé en cursos de especialización en optimización de logística, cadenas de suministro y control de calidad.||Optimización Avanzada: Estudio de modelos y algoritmos complejos a nivel de postgrado.||Ciberseguridad: Formación práctica basada en Cisco.||Modelación Logística y Procesos Industriales: Análisis y diseño de sistemas productivos y logísticos.||Control de Calidad de Software: Aplicación de metodologías para asegurar la calidad en el desarrollo de software.||Actividades y grupos: Participé activamente en la vida universitaria para potenciar el intercambio cultural y lingüístico; incluyendo grupos deportivos y eventos culturales.",

    "education.colegio_smp.degree": "Estudiante",
    "education.colegio_smp.description": "Estudiante. nivel alto Matemáticas, Química, Artes visuales y Música. Nota: Egresado de Cuarto Medio con Promedio 6.0.",
    "education.colegio_smp.bullets": "",

    "scholarships.alura_one_bg.name": "Becado: Data Science - Oracle Next Education (ONE) G9",
    "scholarships.alura_one_bg.description": "Actualmente estoy cursando la especialización en Data Science como beneficiario de la beca del programa Oracle Next Education (ONE), Generación 9. Esta iniciativa de formación e inclusión tecnológica de Oracle y Alura Latam está diseñada para desarrollar profesionales con un enfoque 100% práctico. Nota: En proceso.",
    "scholarships.alura_one_bg.bullets": "Python para Data Science: Dominio de librerías clave como Pandas y NumPy para la manipulación, limpieza y análisis exploratorio de datos (EDA).||Visualización de Datos: Creación de dashboards e historias visuales impactantes usando Matplotlib y Seaborn.||Machine Learning: Desarrollo y evaluación de modelos predictivos (regresión y clasificación) con Scikit-learn.||Proyectos Prácticos (Challenges): Apliqué todo lo aprendido en proyectos del mundo real, como el 'Challenge Alura Store', donde analicé patrones de ventas y comportamiento del cliente para generar insights de negocio.",

    "scholarships.coursera_skills_work.name": "Becado: Skills for Work - Banco Santander España",
    "scholarships.coursera_skills_work.description": "Actualmente desarrollo mis competencias profesionales como beneficiario de la Beca Santander Skills | Skills for Work. Este es un programa de formación de alto rendimiento patrocinado por el Banco Santander y ejecutado en la plataforma Coursera. El objetivo del programa es cerrar la brecha de habilidades demandadas por las empresas hoy en día.",
    "scholarships.coursera_skills_work.bullets": "Habilidades Interpersonales (Soft Skills): Comunicación efectiva, liderazgo de equipos, inteligencia emocional, negociación y resolución de conflictos.||Habilidades Digitales y de Negocio (Hard Skills): Metodologías Arinak (Agile), fundamentos de análisis de datos, pensamiento crítico y gestión de proyectos.||Estoy comprometido a aprovechar al máximo esta oportunidad para mejorar mi empleabilidad y estar preparado para los nuevos desafíos del sector.",

    "scholarships.alura_selection_phase.name": "Fase de Selección y Formación Inicial - Beca ONE",
    "scholarships.alura_selection_phase.description": "Fui seleccionado para participar en la fase inicial de formación y selección de G9 del prestigioso programa ONE. Esta etapa fundamental no consistía en una simple postulación, sino en un proceso de filtro activo diseñado para identificar y preparar a los candidatos con el mayor potencial.",
    "scholarships.alura_selection_phase.bullets": "Fundamentos de la Programación: Completé con éxito la ruta de Lógica de Programación, sentando las bases esenciales del pensamiento algorítmico, estructuras de datos, variables, funciones y buenas prácticas.||Desarrollo Personal (Soft Skills): Absorbí activamente los módulos de desarrollo profesional, enfocándome en cultivar una Mentalidad de Crecimiento, técnicas de autogestión, productividad y la habilidad de aprender a aprender.",

    "scholarships.beca_alianza_pacifico.name": "Beca Alianza del Pacífico - Movilidad Internacional",
    "scholarships.beca_alianza_pacifico.description": "Galardonado con la Beca Alianza del Pacífico por excelencia académica. Este reconocimiento financió integralmente mi estadía, alojamiento y manutención durante mi semestre de intercambio internacional, premiando mi destacado rendimiento universitario.",
    "scholarships.beca_alianza_pacifico.bullets": "Movilidad Estudiantil Internacional: Selección basada en mérito académico para representar a Chile y la UNAB en Colombia.||Excelencia Académica: Reconocimiento otorgado a estudiantes de alto rendimiento para fomentar la integración regional.",

    "work.sociedad_servicios_expert.title": "MLOps Engineer & Full Stack Dev | Encargado Marketing Digital | Experto en Programación y Desarrollo",
    "work.sociedad_servicios_practicas.title": "AI Software Developer & Full Stack Dev — Formación Avanzada",
    "work.mrcomputer.title": "Ingeniero en Ciberseguridad - TI",
    "work.lapica_pipeeno.title": "Fundador y Director",
    "work.saez_saez.title": "Ingeniero de Redes y Telecomunicaciones",
    "work.unab_ayudante.title": "Ayudante y Tutor",

    // Work item translations (Spanish)
    "work.mrcomputer.description": "Inicié como Practicante y fui promovido gracias al rápido desarrollo de habilidades y contribuciones clave en proyectos de seguridad y software. Mis responsabilidades incluyeron:",
    "work.mrcomputer.bullets": "Gestioné la ciberseguridad del entorno empresarial, implementando políticas de protección (ESET) y realizando análisis proactivos de vulnerabilidades con Kali Linux.||Desarrollé aplicaciones web y software interno utilizando Python (Django, Flask) y la pila MERN para proyectos Full Stack.||Administré infraestructura en AWS/Azure y gestioné servicios TI de alto nivel en Google Workspace y Microsoft 365 para clientes corporativos.||Automaticé la generación de informes mediante scripts en Python (Pandas, NumPy) y macros de Excel (VBA).",
    "scholarships.periodLabel": "Periodo:",
    "scholarships.detailsLabel": "Detalles:",
    "scholarships.achievementsLabel": "Logros alcanzados:",
    "scholarships.institutionLabel": "Institución:",

    // Certifications Section
    "certifications.title": "Certificaciones",
    "certifications.intro": "Cuento con más de 130 certificaciones profesionales que respaldan mi experiencia y conocimientos técnicos.",
    "certifications.more": "Vea más certificaciones",
    "certifications.button": "Click aquí",

    // Websites Section
    "websites.title": "Sitios Web Desarrollados",
    "websites.subtitle": "Proyectos web personalizados que he diseñado y desarrollado, desde portfolios personales hasta plataformas empresariales.",
    "websites.latestBadge": "🚀 Más Reciente",
    "websites.visitBtn": "Visitar Sitio",
    "websites.viewProject": "Ver proyecto",
    "websites.roadwise.title": "ROADWISE.CL",
    "websites.roadwise.desc": "Plataforma web corporativa para empresa de análisis y monitoreo de infraestructura vial. Desarrollada con React y Three.js, presenta modelos 3D interactivos de equipamiento vial, animaciones fluidas y un diseño moderno que transmite innovación tecnológica.",
    "websites.ssgl.title": "SSGL.CL",
    "websites.ssgl.desc": "Sitio corporativo para Sociedad de Servicios Generales Ltda., empresa líder en mantención vial. Desarrollado con React y diseño moderno responsive.",
    "websites.sppa.title": "SPPA.CL",
    "websites.sppa.desc": "Portal hub de servicios profesionales para familia Pereira Alarcón: Desarrollo y Fotografía.",
    "websites.fpereiradev.title": "Felipe Pereira - Portfolio",
    "websites.fpereiradev.desc": "Portfolio profesional de desarrollo de software y soluciones tecnológicas.",
    "websites.manuel.title": "Manuel Pereira - Fotografía",
    "websites.manuel.desc": "Sitio de marca personal, fotografía profesional y edición artística. Desarrollado con React para una experiencia visual fluida.",
    "websites.ourtransfer.title": "Our Transfer SSGL",
    "websites.ourtransfer.desc": "Aplicación web segura y moderna para la transferencia de archivos, diseñada para el ámbito corporativo. Inspirada en WeTransfer, permite subir archivos a la nube y generar enlaces compartibles al instante.",
    "websites.centroestetica.title": "Centro Estética Fernando Gonzalez",
    "websites.centroestetica.desc": "Plataforma web responsiva gestión de citas y blog de noticias. Desarrollada con React, GCP y Shadcn UI.",
    "websites.mrcomputer.title": "MRComputer Enterprise",
    "websites.mrcomputer.desc": "Sistema de gestión de inventario y landing page corporativa. Incluye dashboard moderno, control de stock personalizado y base de datos SQL.",
    "websites.jody.title": "Jody Carrillo - Preparador Físico",
    "websites.jody.desc": "Landing page y sistema de agendamiento para servicios deportivos. Integración con APIs locales y GCP para gestión de citas personalizada.",
    "websites.smartcare.title": "Centro Médico SmartCare",
    "websites.smartcare.desc": "Landing page profesional para la Dra. Cecilia Salinas. Incluye mapas interactivos y presentación de servicios médicos en el sur de Chile.",
    "websites.otherProjects.title": "Más Proyectos y Colaboraciones",

    // Duration/Time translations
    "duration.present": "actualidad",
    "duration.year": "año",
    "duration.years": "años",
    "duration.month": "mes",
    "duration.months": "meses",
    "duration.months.jan": "ene",
    "duration.months.feb": "feb",
    "duration.months.mar": "mar",
    "duration.months.apr": "abr",
    "duration.months.may": "may",
    "duration.months.jun": "jun",
    "duration.months.jul": "jul",
    "duration.months.aug": "ago",
    "duration.months.sep": "sept",
    "duration.months.oct": "oct",
    "duration.months.nov": "nov",
    "duration.months.dec": "dic",

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

    // Terminal Section
    "terminal.title": "💻 Vista Rápida",
    "terminal.subtitle": "Un vistazo a mi perfil, estilo hacker",
    "terminal.hint": "🤫 Click me...",
  },

  en: {
    // Navigation
    "nav.about": "About Me",
    "nav.experience": "Experience",
    "nav.education": "Education",
    "nav.scholarships": "Scholarships",
    "nav.projects": "Projects",
    "nav.websites": "Websites",
    "nav.contact": "Contact",
    "aria.openMenu": "Open menu",
    "aria.goToAbout": "Go to About Me",
    "aria.goToTop": "Go to top",

    // Hero Section
    "hero.name": "Felipe Pereira A.",
    "hero.title": "Computer Science",
    "hero.description": "Software Engineer specialized in Full Stack Web and Mobile Development and Artificial Intelligence. Experienced in Data Science, Computer Vision, and Operations Research.",
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
    "experience.intro": "Combining my",
    "experience.professionalExp": "professional experience",
    "experience.con": "with my",
    "experience.formation": "studies",
    "experience.prepIn": "at",
    "experience.faculty": "the Faculty of Engineering",
    "experience.prepOf": "of",
    "experience.university": "Universidad Andrés Bello",
    "experience.developing": ", I have been developing both ",
    "experience.personal": "personal projects",
    "experience.and": "and",
    "experience.professional": "professional projects",
    "experience.consolidated": ". This has allowed me to consolidate my",
    "experience.skills": "technical skills",
    "experience.comma1": " in",
    "experience.dataAnalysis": "data analysis",
    "experience.comma2": ",",
    "experience.cybersecurity": "cybersecurity",
    "experience.softwareDevelopment": "software development",
    "experience.cloudDevelopment": "cloud development",
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
    "experience.softwareDev": "of software development",
    "experience.improve": ", which allows me to continuously improve my",
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
    "projects.project1.title": "Advanced Infrastructure Analysis",
    "projects.project1.desc": "AI system for detecting road studs, markers, beacons, signage, and cracks in pavement or New Jersey barriers. Optimizes road maintenance through computer vision.",
    "projects.project2.title": "Housing Price API",
    "projects.project2.desc": "Scalable API architecture for predicting real estate values. Utilizes advanced regression models trained with Scikit-Learn and deployed in cloud ecosystems.",
    "projects.project3.title": "Sentiment Detector",
    "projects.project3.desc": "Natural Language Processing (NLP) tool for automated review analysis. Employs tokenization techniques and classification models to identify polarity and key topics.",
    "projects.viewBtn": "View Project",
    "projects.project4.title": "Knapsack Optimization",
    "projects.project4.desc":
      "Research thesis on 'Hard Knapsack Problems' (Pissinger). Developed in Julia, C and Python, implementing brute force, heuristics and multi-threaded genetic algorithms.",
    "projects.project5.title": "Impostor FC",
    "projects.project5.desc": "Real-time multiplayer experience with Socket.IO and Node.js. Integrates state synchronization mechanics, modern UI design and a theme inspired by Chilean football culture.",
    "projects.project6.title": "Telecom Churn AI",
    "projects.project6.desc": "Comprehensive Data Science pipeline for strategic customer retention. Includes complex ETL processes, deep statistical analysis, and predictive models to identify churn patterns.",

    "workHistory.title": "Work Experience",

    "education.unab_civil.degree": "B.S. in Computer Science & Civil Engineering",
    "education.unab_licenciatura.degree": "Bachelor of Engineering Science, Computer Science",
    "education.unab_postgrado.degree": "Postgraduate, Master's Degree in Software Engineering",
    "education.puj_exchange.degree": "Systems, Computing & Industrial Engineering",
    "education.colegio_smp.degree": "Student",
    "scholarships.alura_one_bg.name": "Scholarship: Data Science - Oracle Next Education (ONE) G9",
    "scholarships.coursera_skills_work.name": "Scholarship: Skills for Work - Banco Santander Spain",
    "scholarships.alura_selection_phase.name": "Selection Phase & Initial Training - ONE Scholarship",
    "work.sociedad_servicios_expert.title": "MLOps Engineer & Full Stack Dev | Digital Marketing Manager | Programming & Development Expert",
    "work.sociedad_servicios_practicas.title": "AI Software Developer & Full Stack Dev — Advanced Training",
    "work.mrcomputer.title": "Cybersecurity Engineer - IT",
    "work.lapica_pipeeno.title": "Founder & Director",
    "work.freelance_developer.title": "Full Stack Developer",
    "work.saez_saez.title": "Network & Telecommunications Engineer",
    "work.unab_ayudante.title": "Teaching Assistant & Tutor",

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
    // Scholarships content merged into education and removed to cleanup

    // Education detailed texts (English)
    // Education detailed texts (English)

    // 4. Alura ONE BG
    "scholarships.alura_one_bg.description": "Currently taking the Data Science specialization as a beneficiary of the Oracle Next Education (ONE) program scholarship, Generation 9. This Oracle and Alura Latam technological training and inclusion initiative is designed to develop professionals with a 100% practical approach. Note: In progress.",
    "scholarships.alura_one_bg.bullets": "Python for Data Science: Mastery of key libraries like Pandas and NumPy for data manipulation, cleaning, and exploratory data analysis (EDA).||Data Visualization: Creation of impactful dashboards and visual stories using Matplotlib and Seaborn.||Machine Learning: Development and evaluation of predictive models (regression and classification) with Scikit-learn.||Practical Projects (Challenges): Applied everything learned in real-world projects, such as the 'Alura Store Challenge', where I analyzed sales patterns and customer behavior to generate business insights.",

    // 5. Coursera Skills
    "scholarships.coursera_skills_work.description": "Currently developing my professional competencies as a beneficiary of the Santander Skills | Skills for Work Scholarship. This is a high-performance training program sponsored by Banco Santander and executed on the Coursera platform. The program's objective is to close the skills gap demanded by companies today.",
    "scholarships.coursera_skills_work.bullets": "Soft Skills: Effective communication, team leadership, emotional intelligence, negotiation, and conflict resolution.||Hard Skills: Agile Methodologies, data analysis fundamentals, critical thinking, and project management.||I am committed to making the most of this opportunity to improve my employability and be prepared for the sector's new challenges.",

    // 6. Alura Selection
    "scholarships.alura_selection_phase.description": "Selected to participate in the initial training and selection phase of G9 of the prestigious ONE program. This fundamental stage was not just a simple application, but an active filter process designed to identify and prepare candidates with the greatest potential.",
    "scholarships.alura_selection_phase.bullets": "Programming Fundamentals: Successfully completed the Logic of Programming track, laying the essential foundations of algorithmic thinking, data structures, variables, functions, and good practices.||Personal Development (Soft Skills): Actively absorbed professional development modules, focusing on cultivating a Growth Mindset, self-management techniques, productivity, and the ability to learn to learn.",

    "scholarships.beca_alianza_pacifico.name": "Pacific Alliance Scholarship - International Mobility",
    "scholarships.beca_alianza_pacifico.description": "Awarded the Pacific Alliance Scholarship for academic excellence. This recognition fully funded my stay, accommodation, and living expenses during my international exchange semester, rewarding my outstanding university performance.",
    "scholarships.beca_alianza_pacifico.bullets": "International Student Mobility: Selection based on academic merit to represent Chile and UNAB in Colombia.||Academic Excellence: Recognition granted to high-performance students to foster regional integration.",


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
    "certifications.intro": "I have more than 130 Professional certifications that support my experience and technical knowledge.",
    "certifications.more": "View more certifications",
    "certifications.button": "Click here",

    // Websites Section
    "websites.title": "Developed Websites",
    "websites.subtitle": "Custom web projects I have designed and developed, from personal portfolios to enterprise platforms.",
    "websites.latestBadge": "🚀 Latest",
    "websites.visitBtn": "Visit Site",
    "websites.viewProject": "View project",
    "websites.roadwise.title": "ROADWISE.CL",
    "websites.roadwise.desc": "Corporate web platform for a road infrastructure analysis and monitoring company. Built with React and Three.js, featuring interactive 3D models of road equipment, smooth animations, and a modern design that conveys technological innovation.",
    "websites.ssgl.title": "SSGL.CL",
    "websites.ssgl.desc": "Corporate website for Sociedad de Servicios Generales Ltda., a leading company in road maintenance. Developed with React and modern responsive design.",
    "websites.sppa.title": "SPPA.CL",
    "websites.sppa.desc": "Professional services hub portal for the Pereira Alarcón family: Development and Photography.",
    "websites.fpereiradev.title": "Felipe Pereira - Portfolio",
    "websites.fpereiradev.desc": "Professional portfolio for software development and technological solutions.",
    "websites.manuel.title": "Manuel Pereira - Photography",
    "websites.manuel.desc": "Personal branding site, professional photography and artistic editing. Built with React for a smooth visual experience.",
    "websites.ourtransfer.title": "Our Transfer SSGL",
    "websites.ourtransfer.desc": "Secure and modern file transfer web app for corporate use. Inspired by WeTransfer, allows instant file uploads and shareable link generation.",
    "websites.centroestetica.title": "Fernando Gonzalez Aesthetic Center",
    "websites.centroestetica.desc": "Responsive web platform for appointment scheduling and news blog. Built with React, GCP, and Shadcn UI.",
    "websites.mrcomputer.title": "MRComputer Enterprise",
    "websites.mrcomputer.desc": "Inventory management system and corporate landing page. Features a modern dashboard, custom stock control, and SQL database.",
    "websites.jody.title": "Jody Carrillo - Fitness Coach",
    "websites.jody.desc": "Landing page and scheduling system for fitness services. Integrated with local APIs and GCP for custom appointment management.",
    "websites.smartcare.title": "SmartCare Medical Center",
    "websites.smartcare.desc": "Professional landing page for Dr. Cecilia Salinas. Includes interactive maps and medical service showcase in southern Chile.",
    "websites.otherProjects.title": "More Projects and Collaborations",

    // Duration/Time translations
    "duration.present": "present",
    "duration.year": "year",
    "duration.years": "years",
    "duration.month": "month",
    "duration.months": "months",
    "duration.months.jan": "Jan",
    "duration.months.feb": "Feb",
    "duration.months.mar": "Mar",
    "duration.months.apr": "Apr",
    "duration.months.may": "May",
    "duration.months.jun": "Jun",
    "duration.months.jul": "Jul",
    "duration.months.aug": "Aug",
    "duration.months.sep": "Sep",
    "duration.months.oct": "Oct",
    "duration.months.nov": "Nov",
    "duration.months.dec": "Dec",

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

    // Terminal Section
    "terminal.title": "💻 Quick Overview",
    "terminal.subtitle": "A glimpse into my profile, hacker style",
    "terminal.hint": "🤫 Click me...",
  },

  eu: {
    // Navigation
    "nav.about": "Niri buruz",
    "nav.experience": "Esperientzia",
    "nav.education": "Hezkuntza",
    "nav.scholarships": "Bekak",
    "nav.projects": "Proiektuak",
    "nav.websites": "Webguneak",
    "nav.contact": "Kontaktua",
    "aria.openMenu": "Menua ireki",
    "aria.goToAbout": "Niri buruz ataleara joan",
    "aria.goToTop": "Hasierara joan",

    // Hero Section
    "hero.name": "Felipe Pereira A.",
    "hero.title": "Informatikako Garatzaile Ingeniari",
    "hero.description":
      "Software Ingeniaria. Full Stack Web, Mugikor Garapenean eta Adimen Artifizialean espezializatua. Datu-zientzian, Ordenagailu Bidezko Ikusmenean eta Eragiketa Ikerketan esperientziarekin.",
    "hero.contactBtn": "Kontaktatu",

    // About Section
    "about.title": "Niri buruz",
    "about.engineer": "Informatikako Garatzaile Ingeniari",
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
    "experience.intro": "Nire",
    "experience.professionalExp": "esperientzia profesionala",
    "experience.con": "eta",
    "experience.formation": "ikasketetan",
    "experience.prepIn": "",
    "experience.faculty": "Ingeniaritza Fakultatean",
    "experience.prepOf": "",
    "experience.university": "Universidad Andrés Bello",
    "experience.developing": ", ",
    "experience.personal": "proiektu pertsonalak",
    "experience.and": "eta",
    "experience.professional": "proiektu profesionalak",
    "experience.consolidated": " garatzen egon naiz. Honek nire",
    "experience.skills": "trebetasun teknikoak",
    "experience.comma1": " sendotzea ahalbidetu dit",
    "experience.dataAnalysis": "datu-analisian",
    "experience.comma2": ",",
    "experience.cybersecurity": "ziberseguritasunean",
    "experience.softwareDevelopment": "software garapenean",
    "experience.cloudDevelopment": "hodei garapenean",
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
    "experience.softwareDev": "software garapenari buruz",
    "experience.improve": " eman dit,",
    "experience.professionalCapacity": "eta honek nire gaitasun profesionala",
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
    "projects.project1.title": "Bide-azpiegitura Analisi Aurreratua",
    "projects.project1.desc": "Tachak, markagailuak, balizak, seinaleak eta zoruaren edo New Jersey barreren arrakalak detektatzeko AI sistema. Bide-mantentzea optimizatzen du ikusmen aurreratuaren bidez.",
    "projects.project2.title": "Housing Price API",
    "projects.project2.desc": "Higiezinen balioen iragarpenarako API arkitektura. Scikit-Learn-ekin trebatutako erregresio-eredu aurreratuak eta hodeiko ekosistemetan kokatutako soluzioak erabiltzen ditu.",
    "projects.project3.title": "Sentimendua Detektorea",
    "projects.project3.desc": "Hizkuntzaren Prozesamendu Naturaleko (NLP) tresna iritziak aztertzeko. Polaritatea eta gai nagusiak identifikatzeko tokenizazio-teknikak eta sailkapen-ereduak baliatzen ditu.",
    "projects.viewBtn": "Proiektua ikusi",
    "projects.project4.title": "Motxila Optimizazioa",
    "projects.project4.desc":
      "Tesia 'Hard Knapsack Problems' (Pissinger) buruzkoa. Julia, C eta Python-en garatua, indar gordina, heuristikoak eta algoritmo genetiko multiharidunak inplementatuz.",
    "projects.project5.title": "Impostor FC",
    "projects.project5.desc": "Socket.IO eta Node.js-ekin garatutako jokalari anitzeko esperientzia. Egoera sinkronizatzeko mekanikak, UI diseinu modernoa eta Txileko futbol-kulturan oinarritutako gaia.",
    "projects.project6.title": "Telecom Churn AI",
    "projects.project6.desc": "Bezeroen atxikipen estrategikorako Data Science bide integral bat. ETL prozesu konplexuak, analisi estatistiko sakona eta ihes-patroiak identifikatzeko eredu prediktiboak biltzen ditu.",

    // Work History Section
    "workHistory.title": "Lan Esperientzia",
    "scholarships.beca_alianza_pacifico.name": "Pazifikoko Aliantzako Beka - Nazioarteko Mugikortasuna",
    "education.unab_civil.degree": "Informatika Ingeniaritza Zibila",
    "education.unab_licenciatura.degree": "Ingeniaritza Zientzietako lizentziatura, Ordenagailu Zientziak",
    "education.unab_postgrado.degree": "Graduondokoa, Informatika Ingeniaritzako Masterra",
    "education.puj_exchange.degree": "Sistema eta Konputazio Ingeniaritza eta Industriala",
    "education.colegio_smp.degree": "Ikaslea",
    "scholarships.alura_one_bg.name": "Bekaduna: Data Science - Oracle Next Education (ONE) G9",
    "scholarships.coursera_skills_work.name": "Bekaduna: Skills for Work - Banco Santander Espainia",
    "scholarships.alura_selection_phase.name": "Hautaketa Fasea eta Hasierako Prestakuntza - ONE Beka",
    "work.sociedad_servicios_expert.title": "MLOps Engineer & Full Stack Dev | Marketin Digitaleko Arduraduna | Programazio eta Garapen Aditua",
    "work.sociedad_servicios_practicas.title": "AI Software Developer & Full Stack Dev — Prestakuntza Aurreratua",
    "work.mrcomputer.title": "Zibersegurtasun Ingeniaria - IT",
    "work.lapica_pipeeno.title": "Sortzailea eta Zuzendaria",
    "work.freelance_developer.title": "Full Stack Garatzailea",
    "work.saez_saez.title": "Sare eta Telekomunikazio Ingeniaria",
    "work.unab_ayudante.title": "Laguntzaile eta Tutorea",

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
    // Scholarships content merged/removed

    // Education detailed texts (Basque)
    // Education detailed texts (Basque)

    // 4. Alura ONE BG
    "scholarships.alura_one_bg.description": "Gaur egun Data Science espezializazioa egiten ari naiz Oracle Next Education (ONE) programako beka baten onuradun gisa, 9. belaunaldian. Oracle eta Alura Latam-en prestakuntza teknologikorako eta inklusiorako ekimen hau %100 praktikoa den ikuspegiarekin profesionalak garatzeko diseinatuta dago. Oharra: Prozesuan.",
    "scholarships.alura_one_bg.bullets": "Python Data Sciencerako: Pandas eta NumPy bezalako liburutegi gakoen menperatzea datuen manipulazio, garbiketa eta analisi esploratoriorako (EDA).||Datuen Bisualizazioa: Dashboard eta historia bisual inpaktanteak sortzea Matplotlib eta Seaborn erabiliz.||Machine Learning: Eredu prediktiboen garapena eta ebaluazioa (erregresioa eta klasifikazioa) Scikit-learn erabiliz.||Proiektu Praktikoak (Challenges): Ikasitako guztia mundu errealeko proiektuetan aplikatu nuen, 'Alura Store Challenge' bezalakoetan, non salmenta ereduak eta bezeroen portaera aztertu nituen negozio insights-ak sortzeko.",

    // 5. Coursera Skills
    "scholarships.coursera_skills_work.description": "Gaur egun nire gaitasun profesionalak garatzen ari naiz Santander Skills | Skills for Work Bekaren onuradun gisa. Hau etekin handiko prestakuntza programa bat da, Banco Santanderrek babestua eta Coursera plataforman gauzatua. Programaren helburua gaur egungo enpresek eskatzen dituzten gaitasunen arrakala ixtea da.",
    "scholarships.coursera_skills_work.bullets": "Trebetasun Pertsonalak (Soft Skills): Komunikazio eraginkorra, talde lidergoa, adimen emozionala, negoziazioa eta gatazken ebazpena.||Trebetasun Digitalak eta Negoziozkoak (Hard Skills): Metodologia Arinak (Agile), datu-analisiaren oinarriak, pentsamendu kritikoa eta proiektu kudeaketa.||Konprometituta nago aukera hau maximizatzeko nire enpleagarritasuna hobetzeko eta sektorearen erronka berrietarako prestatuta egoteko.",

    // 6. Alura Selection
    "scholarships.alura_selection_phase.description": "ONE programa ospetsuaren G9ko hasierako prestakuntza eta hautaketa fasean parte hartzeko hautatua izan nintzen. Funtsezko etapa hau ez zen postu soil bat izan, baizik eta potentzial handiena duten hautagaiak identifikatzeko eta prestatzeko diseinatutako iragazte prozesu aktibo bat.",
    "scholarships.alura_selection_phase.bullets": "Programazioaren Oinarriak: Programazio Logikako bidea arrakastaz osatu nuen, pentsamendu algoritmikoaren, datu-egituren, aldagaien, funtzio eta praktika onen oinarriak ezarriz.||Garapen Pertsonala (Soft Skills): Garapen profesionaleko moduluak aktiboki bereganatu nituen, Hazkunde Pentsamoldea, autokudeaketa teknikak, produktibitatea eta ikasten ikasteko gaitasuna lantzean zentratuz.",

    // 7. Pazifikoko Aliantza Beka
    "scholarships.beca_alianza_pacifico.description": "Pazifikoko Aliantza Beka jaso nuen bikaintasun akademikoagatik. Aitorpen honek nire egonaldia, ostatua eta mantenu gastuah erabat finantzatu zituen nazioarteko truke seihilekoan, unibertsitateko errendimendu bikaina sarituz.",
    "scholarships.beca_alianza_pacifico.bullets": "Nazioarteko Ikasle Mugikortasuna: Meritu akademikoan oinarritutako hautaketa Txile eta UNAB Kolonbian ordezkatzeko.||Bikaintasun Akademikoa: Errendimendu altuko ikasleei emandako aitorpena eskualdeko integrazioa sustatzeko.",


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
    "certifications.intro": "130 Ziurtagiri Profesional baino gehiago ditut nire esperientzia eta ezagutza teknikoa babesten dutenak.",
    "certifications.more": "Ziurtagiri gehiago ikusi",
    "certifications.button": "Egin click",

    // Websites Section
    "websites.title": "Garatutako Webguneak",
    "websites.subtitle": "Portfolio pertsonaletatik enpresa plataformetara, diseinatu eta garatu ditudan web proiektu pertsonalizatuak.",
    "websites.latestBadge": "🚀 Azken",
    "websites.visitBtn": "Webgunea Bisitatu",
    "websites.viewProject": "Proiektua ikusi",
    "websites.roadwise.title": "ROADWISE.CL",
    "websites.roadwise.desc": "Bide azpiegituren analisi eta jarraipenerako enpresa baten web plataforma korporatiboa. React eta Three.js-rekin garatua, bide ekipamenduaren 3D eredu interaktiboak, animazio leunak eta berrikuntza teknologikoa transmititzen duen diseinu modernoa ditu.",
    "websites.ssgl.title": "SSGL.CL",
    "websites.ssgl.desc": "Sociedad de Servicios Generales Ltda.-ren webgune korporatiboa, bide mantentze sektorearen enpresa liderra. React eta diseinu moderno erantzunkor batekin garatua.",
    "websites.sppa.title": "SPPA.CL",
    "websites.sppa.desc": "Pereira Alarcón familiaren zerbitzu profesionalen hub ataria: Garapena eta Argazkigintza.",
    "websites.fpereiradev.title": "Felipe Pereira - Portfolioa",
    "websites.fpereiradev.desc": "Software garapenerako eta soluzio teknologikoetarako portfolio profesionala.",
    "websites.manuel.title": "Manuel Pereira - Argazkigintza",
    "websites.manuel.desc": "Marka pertsonaleko webgunea, argazkigintza profesionala eta edizio artistikoa. React erabiliz garatua esperientzia bisuala leunago baterako.",
    "websites.ourtransfer.title": "Our Transfer SSGL",
    "websites.ourtransfer.desc": "Fitxategiak transferitzeko web aplikazio segurua eta modernoa, ingurune korporatiborako. WeTransfer-en inspiratua.",
    "websites.centroestetica.title": "Fernando Gonzalez Estetika Zentroa",
    "websites.centroestetica.desc": "Hitzorduak kudeatzeko eta albisteetarako web plataforma moldagarria. React, GCP eta Shadcn UI-rekin garatua.",
    "websites.mrcomputer.title": "MRComputer Enterprise",
    "websites.mrcomputer.desc": "Inbentario kudeaketa sistema eta enpresa orria. Dashboard modernoa eta SQL datu-basea ditu.",
    "websites.jody.title": "Jody Carrillo - Prestatzaile Fisikoa",
    "websites.jody.desc": "Kirol zerbitzuetarako landing page-a eta hitzordu sistema. API lokalekin eta GCP-rekin integratua.",
    "websites.smartcare.title": "SmartCare Mediku Zentroa",
    "websites.smartcare.desc": "Cecilia Salinas Dr.-aren orri profesionala. Mapa interaktiboak eta zerbitzu medikuen aurkezpena Txileko hegoaldean.",
    "websites.otherProjects.title": "Proiektu eta Elkarlan Gehiago",

    // Duration/Time translations
    "duration.present": "orain",
    "duration.year": "urte",
    "duration.years": "urte",
    "duration.month": "hilabete",
    "duration.months": "hilabete",
    "duration.months.jan": "Urt",
    "duration.months.feb": "Ots",
    "duration.months.mar": "Mar",
    "duration.months.apr": "Api",
    "duration.months.may": "Mai",
    "duration.months.jun": "Eka",
    "duration.months.jul": "Uzt",
    "duration.months.aug": "Abu",
    "duration.months.sep": "Ira",
    "duration.months.oct": "Urr",
    "duration.months.nov": "Aza",
    "duration.months.dec": "Abe",

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

    // Terminal Section
    "terminal.title": "💻 Begirada Azkarra",
    "terminal.subtitle": "Nire profilari begirada bat, hacker estiloan",
    "terminal.hint": "🤫 Klikatu...",
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
    //if (!mounted) return key // Return key during SSR

    try {
      const translation = translations[language][key as keyof (typeof translations)[typeof language]]
      return translation !== undefined ? translation : key
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
