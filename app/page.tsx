"use client"

import type React from "react"


//no se que chicha este wea
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
  GraduationCap,
  Search,
  Award,
  Globe,
  Github
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "../components/language-selector"
import { AuthModal } from "../components/auth-modal"
import { SocialMediaPanel } from "../components/social-media-panel"
import { AIChatbot } from "../components/ai-chatbot"
import { UserMenu } from "../components/user-menu"
import { ProfileModal } from "../components/profile-modal"
import { LinuxTerminal } from "../components/linux-terminal"
import { TechGrid } from "../components/tech-grid"
import { useLanguage } from "../hooks/useLanguage"
import { useRouter } from "next/navigation"
import { WebsiteCarousel } from "@/components/website-carousel"


interface ExperienceCardProps {
  company: string;
  title: string;
  dates: string;
  location: string;
  slug?: string;
  description: string;
  bullets: string[];
  imageSrc: string;
  skills?: string[]; // Added skills prop
  isOpen: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}
interface CardComponentProps extends ExperienceCardProps {
  index: number;
}

// El tipo para el array de datos (incluye el 'id')
// Modificado para usar fechas numéricas y calcular duración dinámicamente
type ExperienceData = {
  id: number;
  slug: string;
  company: string;
  title: string;
  startYear: number;
  startMonth: number; // 1-12
  endYear: number | null; // null = actualidad
  endMonth: number | null; // null = actualidad
  location: string;
  description: string;
  bullets: string[];
  imageSrc: string;
  skills?: string[]; // Added skills property
};

// Función para calcular duración formateada
const formatDuration = (
  startYear: number,
  startMonth: number,
  endYear: number | null,
  endMonth: number | null,
  t: (key: string) => string
): string => {
  const monthKeys = [
    "duration.months.jan", "duration.months.feb", "duration.months.mar",
    "duration.months.apr", "duration.months.may", "duration.months.jun",
    "duration.months.jul", "duration.months.aug", "duration.months.sep",
    "duration.months.oct", "duration.months.nov", "duration.months.dec"
  ];

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // getMonth() es 0-indexed

  const actualEndYear = endYear ?? currentYear;
  const actualEndMonth = endMonth ?? currentMonth;

  // Calcular meses totales
  const totalMonths = (actualEndYear - startYear) * 12 + (actualEndMonth - startMonth) + 1;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  // Formatear fecha inicio
  const startMonthStr = t(monthKeys[startMonth - 1]);
  const startStr = `${startMonthStr}. ${startYear}`;

  // Formatear fecha fin
  let endStr: string;
  if (endYear === null || endMonth === null) {
    endStr = t("duration.present");
  } else {
    const endMonthStr = t(monthKeys[endMonth - 1]);
    endStr = `${endMonthStr}. ${endYear}`;
  }

  // Formatear duración
  let durationStr = "";
  if (years > 0) {
    durationStr += `${years} ${years === 1 ? t("duration.year") : t("duration.years")}`;
    if (months > 0) {
      durationStr += ` ${months} ${months === 1 ? t("duration.month") : t("duration.months")}`;
    }
  } else {
    durationStr = `${months} ${months === 1 ? t("duration.month") : t("duration.months")}`;
  }

  return `${startStr} - ${endStr} · ${durationStr}`;
};


// Interfaces para Educación y Becas
interface EducationCardProps {
  institution: string;
  degree: string;
  slug?: string;
  dates: string;
  location?: string;
  description: string;
  bullets?: string[];
  grade?: string;
  imageSrc: string;
  skills?: string[];
}

interface ScholarshipCardProps {
  slug?: string;
  institution: string;
  name: string;
  dates: string;
  description: string;
  bullets?: string[];
  imageSrc: string;
  skills?: string[]; // Added skills property
}

type Education = EducationCardProps & { id: number };
type Scholarship = ScholarshipCardProps & { id: number };

// Datos de Educación
const educationData: Education[] = [
  {
    id: 1,
    institution: "Universidad Andrés Bello",
    slug: "unab_civil",
    degree: "Ingeniería Civil Informática",
    dates: "2025",
    location: "Santiago, Chile",
    description: "Etapa cúlmine de mi formación integra la ingeniería de software avanzada con la ciencia de datos estratégica, validada mediante mi tesis sobre optimización combinatoria. Título profesional de Ingeniero Civil Informático, aprobado con distinción.",
    bullets: [
      "Desarrollo Full Stack Moderno: Arquitectura y construcción de aplicaciones escalables utilizando React, Next.js y Angular. Integración de servicios backend robustos y APIs eficientes.",
      "Cloud Data Engineering & Analytics: Gestión de ecosistemas de datos en GCP (BigQuery) y Azure. Implementación de pipelines ETL, análisis profundo con Python y estrategias corporativas de Gobernanza de Datos.",
      "Ciberseguridad Aplicada: Desarrollo bajo principios de Security by Design, asegurando la integridad de la infraestructura y el código en entornos productivos.",
      "Innovación y Simulación: Desarrollo de videojuegos y entornos interactivos complejos con Unity, aplicando lógica matemática y física avanzada.",
      "Investigación: Resolución de problemas complejos mediante algoritmos de optimización e Inteligencia Artificial."
    ],
    imageSrc: "/img/logos/unab.png",
    skills: ["Desarrollo Full Stack", "Cloud Data", "Ciberseguridad", "Unity", "IA"]
  },
  {
    id: 2,
    institution: "Universidad Andrés Bello",
    slug: "unab_licenciatura",
    degree: "Licenciatura en Ciencias de la Ingeniería, Computer Science",
    dates: "2020 - 2024",
    location: "Santiago, Chile",
    description: "Obtención del grado de Licenciado en Ciencias de la Ingeniería, aprobado con distinción. Este hito consolida mi base científica y tecnológica, certificando la capacidad analítica para resolver desafíos complejos en la industria TI.",
    bullets: [
      "Actividades y grupos: Delegado académico y participación activa en proyectos de investigación aplicada. Enfoque en el desarrollo de soluciones tecnológicas innovadoras mediante metodologías ágiles y análisis de datos.",
      "Investigación de Operaciones: Resolución de problemas de optimización combinatoria y complejidad NP, enfocada en eficiencia algorítmica y toma de decisiones.",
      "Desarrollo de Software Avanzado: Diseño de arquitecturas escalables (Next.js, React, Angular, TypeScript) y gestión eficiente de bases de datos SQL y NoSQL.",
      "Infraestructura y Seguridad: Despliegue de servicios en la nube (Azure, AWS) e implementación de principios de Ciberseguridad en aplicaciones.",
      "Data Science e IA: Entrenamiento de modelos de Machine Learning, procesos ETL y desarrollo de soluciones de Visión por Computadora."
    ],
    grade: "Distinción Máxima",
    imageSrc: "/img/logos/unab.png",
    skills: ["Inteligencia artificial", "Análisis de datos", "Optimización"]
  },
  {
    id: 3,
    institution: "Universidad Andrés Bello",
    slug: "unab_postgrado",
    degree: "Postgrado, Máster en Ingeniería Informática",
    dates: "dic. 2025 – mar. 2027",
    location: "Santiago, Chile",
    description: "Cursando programa de postgrado con foco en la especialización avanzada en Ingeniería de Software, Ciencia de Datos e Inteligencia Artificial. El programa integra conocimientos teóricos con aplicación práctica en tecnologías de vanguardia, incluyendo trayectorias formativas desarrolladas y certificadas por IBM en Data Science & AI.",
    bullets: [
      "Objetivo: Profundizar en el diseño y despliegue de arquitecturas de software complejas y soluciones empresariales basadas en datos y modelos predictivos."
    ],
    grade: "En curso",
    imageSrc: "/img/logos/unab.png",
    skills: ["Ingeniería de Software", "Ciencia de Datos", "Inteligencia Artificial"]
  },
  {
    id: 4,
    institution: "Pontificia Universidad Javeriana Cali",
    slug: "puj_exchange",
    degree: "Ingeniería de Sistemas y Computación e Industrial",
    dates: "jul. 2023 – dic. 2023",
    location: "Cali, Colombia",
    description: "Programa de intercambio académico internacional enfocado en la profundización de conocimientos en áreas avanzadas de Ingeniería Industrial e Ingeniería de Sistemas. La experiencia combinó un riguroso plan de estudios con una inmersión cultural completa. Durante el semestre, cursé asignaturas de alto nivel, incluyendo tópicos de magíster, para complementar mi formación de pregrado.",
    bullets: [
      "Magíster en Ing. Industrial: Participé en cursos de especialización en optimización de logística, cadenas de suministro y control de calidad.",
      "Optimización Avanzada: Estudio de modelos y algoritmos complejos a nivel de postgrado.",
      "Ciberseguridad: Formación práctica basada en Cisco.",
      "Modelación Logística y Procesos Industriales: Análisis y diseño de sistemas productivos y logísticos.",
      "Control de Calidad de Software: Aplicación de metodologías para asegurar la calidad en el desarrollo de software.",
      "Actividades y grupos: Participé activamente en la vida universitaria para potenciar el intercambio cultural y lingüístico; incluyendo grupos deportivos y eventos culturales."
    ],
    imageSrc: "/img/logos/puj.png",
    skills: ["Optimización de procesos", "Desarrollo de software", "Intercambio Cultural"]
  },
  {
    id: 5,
    institution: "Alura Latam",
    slug: "alura_one_bg",
    degree: "Becado: Data Science - Oracle Next Education (ONE) G9",
    dates: "ago. 2025 – mar. 2026",
    location: "Online",
    description: "Actualmente estoy cursando la especialización en Data Science como beneficiario de la beca del programa Oracle Next Education (ONE), Generación 9. Esta iniciativa de formación e inclusión tecnológica de Oracle y Alura Latam está diseñada para desarrollar profesionales con un enfoque 100% práctico. Nota: En proceso.",
    bullets: [
      "Python para Data Science: Dominio de librerías clave como Pandas y NumPy para la manipulación, limpieza y análisis exploratorio de datos (EDA).",
      "Visualización de Datos: Creación de dashboards e historias visuales impactantes usando Matplotlib y Seaborn.",
      "Machine Learning: Desarrollo y evaluación de modelos predictivos (regresión y clasificación) con Scikit-learn.",
      "Proyectos Prácticos (Challenges): Apliqué todo lo aprendido en proyectos del mundo real, como el 'Challenge Alura Store', donde analicé patrones de ventas y comportamiento del cliente para generar insights de negocio."
    ],
    imageSrc: "/img/logos/alura.png",
    skills: ["Data Science", "Python", "Machine Learning", "EDA", "Matplotlib"]
  },
  {
    id: 6,
    institution: "Coursera",
    slug: "coursera_skills_work",
    degree: "Beca Skills for Work - Banco Santander España",
    dates: "2025 – Actualidad",
    location: "Online",
    description: "Actualmente desarrollo mis competencias profesionales como beneficiario de la Beca Santander Skills | Skills for Work. Este es un programa de formación de alto rendimiento patrocinado por el Banco Santander y ejecutado en la plataforma Coursera. El objetivo del programa es cerrar la brecha de habilidades demandadas por las empresas hoy en día.",
    bullets: [
      "Habilidades Interpersonales (Soft Skills): Comunicación efectiva, liderazgo de equipos, inteligencia emocional, negociación y resolución de conflictos.",
      "Habilidades Digitales y de Negocio (Hard Skills): Metodologías Ágiles (Agile), fundamentos de análisis de datos, pensamiento crítico y gestión de proyectos.",
      "Estoy comprometido a aprovechar al máximo esta oportunidad para mejorar mi empleabilidad y estar preparado para los nuevos desafíos del sector."
    ],
    imageSrc: "/img/logos/coursera.png",
    skills: ["Soft Skills", "Liderazgo", "Agile", "Gestión de Proyectos"]
  },
  {
    id: 7,
    institution: "Alura Latam",
    slug: "alura_selection_phase",
    degree: "Fase de Selección y Formación Inicial - Beca ONE",
    dates: "jun. 2025 – ago. 2025",
    location: "Online",
    description: "Fui seleccionado para participar en la fase inicial de formación y selección de G9 del prestigioso programa ONE. Esta etapa fundamental no consistía en una simple postulación, sino en un proceso de filtro activo diseñado para identificar y preparar a los candidatos con el mayor potencial.",
    bullets: [
      "Fundamentos de la Programación: Completé con éxito la ruta de Lógica de Programación, sentando las bases esenciales del pensamiento algorítmico, estructuras de datos, variables, funciones y buenas prácticas.",
      "Desarrollo Personal (Soft Skills): Absorbí activamente los módulos de desarrollo profesional, enfocándome en cultivar una Mentalidad de Crecimiento, técnicas de autogestión, productividad y la habilidad de aprender a aprender."
    ],
    imageSrc: "/img/logos/alura.png",
    skills: ["Lógica de Programación", "Algoritmos", "Productividad"]
  },
  {
    id: 8,
    institution: "Colegio Santa María de Paine",
    slug: "colegio_smp",
    degree: "Estudiante",
    dates: "Egresado",
    location: "Paine, Chile",
    description: "Estudiante. nivel alto Matemáticas, Química, Artes visuales y Música. Nota: Egresado de Cuarto Medio con Promedio 6.0.",
    bullets: [],
    grade: "6.0",
    imageSrc: "/img/logos/colegio.png",
    skills: ["Matemáticas", "Formación"]
  }
];

// Datos de Becas
const scholarshipsData: Scholarship[] = [];

const experiencesData: ExperienceData[] = [
  {
    id: 1,
    slug: "sociedad_servicios_expert",
    company: "SOCIEDAD DE SERVICIOS GENERALES LTDA",
    title: "MLOps Engineer & Full Stack Dev | Encargado Marketing Digital | Experto en Programación y Desarrollo",
    startYear: 2025,
    startMonth: 7, // julio
    endYear: null, // actualidad
    endMonth: null,
    location: "Gran Santiago, Región Metropolitana de Santiago, Chile",
    imageSrc: "/img/logos/sociedad-servicios.png",
    description: 'Ascendido a "Experto en Programación y Desarrollo". Tras mi ascenso, mi rol se centra en diseñar, desarrollar e implementar soluciones avanzadas de Inteligencia Artificial y software para la optimización de infraestructura vial y proyectos de automatización a gran escala. Actualmente, mis principales focos son:',
    bullets: [
      "IA Visual para Infraestructura Crítica: Desarrollo de modelos de Computer Vision (Python, PyTorch, YOLO) para la detección detallada de fisuras en barreras New Jersey y la medición por imágenes de fisuras y baches en pavimento.",
      "Ingeniería y Análisis de Datos Predictivo: Aplicación de ingeniería de datos y modelos de Machine Learning (Python, R, Macros) para el análisis y predicción de futuros daños en infraestructura vial, optimizando el manejo de datos para mantenimiento.",
      "Automatización y Escalabilidad: Implementación de pipelines inteligentes para procesar datos masivos, integrando dashboards interactivos y herramientas de análisis que facilitan la toma de decisiones en tiempo real.",
      "Liderazgo en Marketing Digital y Desarrollo Web (Full Stack): Como Encargado de Marketing y Soluciones Digitales, lidero la modernización de la identidad corporativa: Diseño y Desarrollo Web de sitio oficial y Estrategia Digital & RRSS.",
      "Próximos Desarrollos y Nuevos Retos: Exploración de nuevas soluciones basadas en IA para distintos proyectos tecnológicos internos, combinando desarrollo full stack, procesamiento de datos y modelos inteligentes."
    ],
    skills: ["Computer Vision", "Python", "PyTorch", "YOLO", "Data Engineering", "Machine Learning", "Marketing Digital"]
  },
  {
    id: 2,
    slug: "sociedad_servicios_practicas",
    company: "SOCIEDAD DE SERVICIOS GENERALES LTDA",
    title: "AI Software Developer & Full Stack Dev — Formación Avanzada",
    startYear: 2025,
    startMonth: 5, // mayo
    endYear: 2025,
    endMonth: 7, // julio
    location: "Gran Santiago, Región Metropolitana de Santiago, Chile",
    imageSrc: "/img/logos/sociedad-servicios.png",
    description: "Durante mis prácticas profesionales, contribuí al desarrollo de soluciones tecnológicas avanzadas, enfocándome en la mejora de procesos internos y el análisis de infraestructura vial mediante Inteligencia Artificial.",
    bullets: [
      "Desarrollo Full Stack: Lideré el diseño y la implementación de una intranet corporativa segura desde cero, utilizando Angular y Bootstrap. La plataforma centralizó recursos clave y mejoró la comunicación interna, integrando un sistema de autenticación robusto basado en JWT.",
      "Inteligencia Artificial para Infraestructura Crítica: Desarrollé y desplegué modelos avanzados de Computer Vision (Python, PyTorch, YOLO) para el análisis de infraestructura vial. El proyecto se centró en la detección automática de fisuras en barreras New Jersey y en la identificación de otros elementos como tachas, captafaros y señalética, optimizando directamente los procesos de mantenimiento y seguridad.",
      "Análisis de Datos y Visualización Avanzada: Transformé datos complejos en insights accionables mediante la creación de dashboards interactivos. Para ello, utilicé Power BI y, adicionalmente, desarrollé un framework de visualización a medida integrando Streamlit y Folium para el análisis geoespacial y la detección de patrones complejos, facilitando así la toma de decisiones estratégicas.",
      "Gestión de Infraestructura y Cloud: Administré bases de datos relacionales (MySQL, PostgreSQL) y gestioné el despliegue de aplicaciones y servicios en la nube de Microsoft Azure, asegurando la disponibilidad, escalabilidad y rendimiento de las soluciones."
    ],
    skills: ["Angular", "Bootstrap", "Computer Vision", "Python", "Power BI", "Azure", "SQL"]
  },
  {
    id: 3,
    slug: "mrcomputer",
    company: "MRComputer Chile SPA",
    title: "Ingeniero en Ciberseguridad - TI",
    startYear: 2024,
    startMonth: 1, // enero
    endYear: 2025,
    endMonth: 4, // abril
    location: "Área metropolitana de Santiago · Presencial",
    imageSrc: "/img/logos/mrcomputer.png",
    description: "Inicié como Practicante y fui promovido gracias al rápido desarrollo de habilidades y contribuciones clave en proyectos de seguridad y software.",
    bullets: [
      "Gestioné la ciberseguridad del entorno empresarial (ESET, Kali Linux) y lideré procesos de compliance y accountability para clientes clave como la Fundación San Vicente de Paul.",
      "Desarrollé aplicaciones web y software interno utilizando Python con frameworks como Django y Flask, y la pila MERN para proyectos Full Stack.",
      "Administré infraestructura en AWS/Azure y gestioné servicios TI de alto nivel en Google Workspace y Microsoft 365 para clientes corporativos.",
      "Automaticé la generación de informes mediante scripts en Python (Pandas, NumPy) y macros de Excel (VBA), reduciendo significativamente el tiempo de análisis manual de datos."
    ],
    skills: ["Ciberseguridad", "Kali Linux", "Python", "MERN Stack", "AWS", "Google Workspace"]
  },
  {
    id: 4,
    slug: "lapica_pipeeno",
    company: "La picá del Pipeño",
    title: "Fundador y Director",
    startYear: 2021,
    startMonth: 9, // septiembre
    endYear: 2025,
    endMonth: 1, // enero
    location: "Paine, Región Metropolitana de Santiago, Chile · Presencial",
    imageSrc: "/img/logos/lapica-pipeno.png",
    description: "Fundé y lideré un emprendimiento de e-commerce especializado en la importación y comercialización de ropa deportiva. Fui responsable de la gestión integral del negocio, desde la estrategia de sourcing global hasta la ejecución de ventas y el análisis financiero.",
    bullets: [
      "Gestión de Proveedores y Comercio Internacional: Desarrollé y gestioné una red global de proveedores en Asia, Europa y América (China, Inglaterra, EE. UU., Colombia y Tailandia).",
      "Desarrollo de Herramientas y Automatización: Diseñé y programé un sistema de gestión de clientes y pedidos en Excel, utilizando Visual Basic (VBA) y Macros.",
      "Análisis Financiero y Business Intelligence: Dirigí el análisis financiero del negocio, empleando Excel y Power BI para monitorear ingresos, costos y márgenes de ganancia.",
      "Optimización Logística y de Operaciones: Orquesté toda la cadena logística, desde la importación hasta la entrega final al cliente."
    ],
    skills: ["E-commerce", "Sourcing Global", "VBA", "Power BI", "Gestión Financiera", "Logística"]
  },
  {
    id: 5,
    slug: "freelance_developer",
    company: "Profesional independiente",
    title: "Desarrollador full stack",
    startYear: 2023,
    startMonth: 8, // agosto
    endYear: 2023,
    endMonth: 12, // diciembre
    location: "Gran Santiago, Región Metropolitana de Santiago, Chile · En remoto",
    imageSrc: "/img/logos/freelance.png",
    description: "Capitalicé mi especialización en desarrollo y las habilidades de mi intercambio para construir aplicaciones web a medida para pequeñas empresas y startups.",
    bullets: [
      "Diseñé y construí interfaces de usuario (UI) interactivas y responsivas, utilizando React y Angular para consumir APIs RESTful.",
      "Desarrollé servicios de backend y APIs robustas usando Django y FastAPI, integrando diversas bases de datos según los requisitos del proyecto (PostgreSQL, MySQL y MongoDB).",
      "Gestioné el ciclo de vida completo de proyectos, desde la toma de requisitos hasta el despliegue, implementando pipelines de CI/CD para la automatización de pruebas y entregas.",
      "Brindé consultoría sobre arquitectura de software, ayudando a clientes a seleccionar el stack tecnológico (Front, Back, DB) óptimo para sus necesidades."
    ],
    skills: ["React", "Angular", "FastAPI", "Django", "CI/CD", "Arquitectura de Software"]
  },
  {
    id: 6,
    slug: "saez_saez",
    company: "Saez y Saez Cia Automóviles.",
    title: "Ingeniero de Redes y Telecomunicaciones",
    startYear: 2021,
    startMonth: 1, // enero
    endYear: 2023,
    endMonth: 3, // marzo
    location: "Talagante, Región Metropolitana de Santiago, Chile · Presencial",
    imageSrc: "/img/logos/saez.png",
    description: "Lideré el proyecto de rediseño de la red local de la empresa, utilizando Cisco Packet Tracer y GSN3 para planificar y simular una topología más segura y eficiente.",
    bullets: [
      "Brindé soporte técnico integral a usuarios (hardware, software y redes), diagnosticando y resolviendo incidencias para asegurar la continuidad operativa.",
      "Administré servidores locales (Windows Server), incluyendo la gestión de copias de seguridad (backups), permisos de usuario y políticas de acceso a datos.",
      "Desarrollé una herramienta personalizada con Python y VBA para automatizar el proceso de contacto con clientes, mejorando los tiempos de respuesta y la gestión.",
      "Gestioné el ciclo de vida de activos TI, coordinando la adquisición de equipos, renovación de licencias de software y la relación con proveedores tecnológicos.",
      "Implementé y administré un nuevo sistema de cámaras de seguridad, configurando el control de movimiento y el acceso remoto a través de la plataforma SMARTPSS."
    ],
    skills: ["Redes (Cisco)", "Windows Server", "Python", "VBA", "Soporte TI", "Seguridad Física (CCTV)"]
  },
  {
    id: 7,
    slug: "unab_ayudante",
    company: "Universidad Andrés Bello",
    title: "Ayudante y Tutor",
    startYear: 2020,
    startMonth: 3, // marzo
    endYear: 2020,
    endMonth: 7, // julio
    location: "Providencia, Región Metropolitana de Santiago, Chile · En remoto",
    imageSrc: "/img/logos/unab.png",
    description: "Durante mi rol como asistente académico, colaboré activamente con el cuerpo docente y brindé apoyo directo a estudiantes de ciencias e ingeniería. Mi objetivo fue fortalecer su comprensión de conceptos fundamentales y desarrollar sus habilidades analíticas para asegurar una base académica sólida.",
    bullets: [
      "Apoyo Académico y Mentoría: Guié a estudiantes en las asignaturas de Física General e Introducción a las Matemáticas, simplificando temas complejos y resolviendo dudas.",
      "Colaboración Docente en Programación: Como Ayudante de Cátedra para Introducción a la Programación y Análisis de Algoritmos, asistí al profesor en la preparación de material didáctico, la corrección de proyectos y la conducción de laboratorios prácticos.",
      "Desarrollo de Habilidades Técnicas: Proporcioné retroalimentación constructiva sobre código y algoritmos, ayudando a los estudiantes a depurar sus soluciones y a comprender principios clave de eficiencia y buenas prácticas de programación.",
      "Fomento del Pensamiento Crítico: Fomenté un ambiente de aprendizaje proactivo donde los estudiantes desarrollaron habilidades de resolución de problemas, aplicando la teoría a desafíos prácticos y preparándolos para cursos más avanzados."
    ],
    skills: ["Docencia", "Mentoria", "Física", "Matemáticas", "Algoritmos"]
  }
];

// --- COMPONENTE REUTILIZABLE PARA CADA TARJETA DE EXPERIENCIA ---
// Este componente usa 'group' de Tailwind para manejar el hover
// const ExperienceCard = ({ 
//   company, 
//   title, 
//   dates, 
//   location, 
//   description, 
//   bullets, 
//   imageSrc,
//   index 
// }: CardComponentProps) => { // <-- 1. Aquí aplicamos el tipo
//   return (
//     // 'group' activa el hover para los elementos hijos
//     <div className="group bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-700 ease-in-out hover:shadow-2xl">
//       <div className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>

//         {/* --- Imagen --- */}
//         <div className="md:w-56 md:h-auto flex-shrink-0 p-6 flex items-center justify-center bg-gray-50 md:bg-white">
//           <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg">
//             <Image
//               src={imageSrc}
//               alt={company}
//               width={160}
//               height={160}
//               className="object-cover w-full h-full"
//             />
//           </div>
//         </div>

//         {/* --- Contenido de Texto --- */}
//         <div className="flex-grow p-6">

//           {/* === PARTE SIEMPRE VISIBLE === */}
//           <div>
//             <h3 className="text-2xl font-bold text-purple-600">{company}</h3>
//             <p className="text-xl font-semibold text-gray-800 mt-1">{title}</p>
//             <p className="text-md text-gray-600 mt-1">{dates}</p>
//           </div>

//           {/* === PARTE OCULTA (APARECE EN HOVER) === */}
//           <div className="group bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-700 ease-in-out hover:shadow-2xl">
//             <p className="text-gray-700 italic font-medium">{location}</p>
//             <p className="text-gray-700 mt-4">
//               {description}
//             </p>
//             <ul className="list-disc ml-6 mt-3 space-y-1 text-gray-700">
//               {/* 2. Aquí especificamos los tipos para 'bullet' e 'index' */}
//               {bullets.map((bullet: string, index: number) => (
//                 <li key={index}>{bullet}</li>
//               ))}
//             </ul>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };
// este codigo sirve para menu desplegable
// const ExperienceCard = ({ 
//   company, 
//   title, 
//   dates, 
//   location, 
//   description, 
//   bullets, 
//   imageSrc,
//   index 
// }: CardComponentProps) => {
//   return (
//     <div className="relative group bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105">
//       {/* Contenedor principal */}
//       <div className="flex flex-col items-center justify-center p-6 space-y-4">
//         {/* Logo de la empresa */}
//         <div className="w-20 h-20 rounded-full overflow-hidden shadow-md">
//           <Image
//             src={imageSrc}
//             alt={company}
//             width={80}
//             height={80}
//             className="object-cover w-full h-full"
//           />
//         </div>

//         {/* Información básica */}
//         <div className="text-center">
//           <h3 className="text-lg font-bold text-gray-800">{company}</h3>
//           <p className="text-sm font-medium text-purple-600">{title}</p>
//           <p className="text-sm text-gray-500">{dates}</p>
//         </div>
//       </div>

//       {/* Contenido oculto (aparece al hacer hover) */}
//       <div className="absolute inset-0 bg-purple-900 text-white p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center">
//         <h4 className="text-lg font-bold mb-2">{company}</h4>
//         <p className="text-sm mb-4">{description}</p>
//         <ul className="list-disc ml-4 space-y-1 text-sm">
//           {bullets.map((bullet, index) => (
//             <li key={index}>{bullet}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

const ExperienceCard = ({
  company,
  title,
  dates,
  location,
  description,
  bullets,
  imageSrc,
  index,
  skills,
  isOpen,
  onClick,
  onMouseEnter,
  onMouseLeave
}: CardComponentProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only scroll on mobile (screens smaller than lg/1024px)
    // This prevents jittery behavior on desktop when hovering
    const isMobile = window.innerWidth < 1024;

    if (isOpen && cardRef.current && isMobile) {
      // Pequeño timeout para asegurar que el DOM ha actualizado las clases de altura
      setTimeout(() => {
        if (cardRef.current) {
          const headerOffset = 100; // Ajuste para el header sticky
          const elementPosition = cardRef.current.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 300); // Esperar un poco a que la transición empiece
    }
  }, [isOpen]);

  return (
    <div
      ref={cardRef}
      className={`relative bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] ${isOpen ? 'scale-[1.01] ring-2 ring-purple-500/50' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >

      {/* Contenedor principal (Siempre visible) - Clickable para toggle */}
      <div
        className="flex flex-col items-center justify-center p-6 space-y-4 cursor-pointer"
        onClick={onClick}
      >
        {/* Logo de la empresa */}
        <div className="w-20 h-20 rounded-full overflow-hidden shadow-md">
          <Image
            src={imageSrc}
            alt={company}
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Información básica */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800">{company}</h3>
          <p className="text-sm font-medium text-purple-600">{title}</p>
          <p className="text-sm text-gray-500">{dates}</p>
          {/* Indicador de expansión */}
          <div className={`mt-2 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDown className="w-5 h-5 text-gray-400 mx-auto" />
          </div>
        </div>
      </div>

      {/* Contenido oculto (Expandible) */}
      <div
        className={`bg-purple-900 text-white transition-all duration-500 ease-in-out border-t border-purple-800
        ${isOpen ? 'max-h-[2000px] overflow-visible opacity-100' : 'max-h-0 overflow-hidden opacity-0'}`}
      >
        {/* Es buena práctica poner el padding en un div INTERNO.
          Si pones 'p-6' en el mismo div que 'max-h-0', el padding 
          también se animará y se verá extraño.
        */}
        <div className="p-6">
          <h4 className="text-lg font-bold mb-2">{company}</h4>
          <p className="text-sm mb-4">{description}</p>
          <ul className="list-disc ml-4 space-y-1 text-sm">
            {bullets.map((bullet, index) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>

          {/* Skills Section */}
          {skills && skills.length > 0 && (
            <div className="mt-4 pt-4 border-t border-purple-700/50">
              <h5 className="text-xs font-semibold text-purple-300 mb-2 uppercase tracking-wider">Aptitudes</h5>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-purple-800/50 text-purple-100 text-xs rounded-full border border-purple-600/50 backdrop-blur-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false)
  // const [mounted, setMounted] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const { t } = useLanguage()
  const [rotation, setRotation] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showTerminalEasterEgg, setShowTerminalEasterEgg] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Estados para controlar qué tarjeta está abierta en cada sección
  const [openExperienceId, setOpenExperienceId] = useState<number | null>(null);
  const [openEducationId, setOpenEducationId] = useState<number | null>(null);
  const [openScholarshipId, setOpenScholarshipId] = useState<number | null>(null);

  const toggleExperience = (id: number) => {
    setOpenExperienceId(prev => prev === id ? null : id);
  };

  const toggleEducation = (id: number) => {
    setOpenEducationId(prev => prev === id ? null : id);
  };

  const toggleScholarship = (id: number) => {
    setOpenScholarshipId(prev => prev === id ? null : id);
  };

  // Helper para manejar hover solo en desktop
  const handleHover = (id: number | null, setFn: (id: number | null) => void) => {
    if (window.innerWidth >= 1024) { // Solo para pantallas lg o mayores (Desktop)
      setFn(id);
    }
  };

  useEffect(() => {
    // setMounted(true);

    // Cargar usuario desde localStorage
    const savedUser = localStorage.getItem("portfolioUser");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setIsLoggedIn(true);
        setUser(userData);
      } catch {
        localStorage.removeItem("portfolioUser");
      }
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogin = async (userData: { name: string; email: string; isNewUser?: boolean }) => {
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
    localStorage.removeItem("portfolioUser");
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleOpenDashboard = () => {
    router.push("/dashboard")
  }

  const handleOpenProfile = () => {
    setIsProfileModalOpen(true)
  }

  const handleUpdateUser = (updatedUser: { name: string; email: string }) => {
    setUser(updatedUser);
    localStorage.setItem("portfolioUser", JSON.stringify({ name: updatedUser.name, email: updatedUser.email }));
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

  useEffect(() => {
    if (user?.email) {
      setProfileImage(localStorage.getItem(`profileImage-${user.email}`));
    }
  }, [user]);

  // if (!mounted) {
  //   return null
  // }

  // const profileImage = user?.email ? localStorage.getItem(`profileImage-${user.email}`) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 text-white">
      {/* Header/Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-purple-900/90 backdrop-blur-sm shadow-md" : "bg-transparent"}`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-nowrap items-center justify-between gap-2">
          {/* Logo y nombre */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Code className="w-8 h-8" />
            <span className="text-lg md:text-xl font-bold whitespace-nowrap">{t("hero.name")}</span>
          </div>

          {/* Navegación */}
          {/* Navegación - Solo visible en lg+ (1024px+) */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4 flex-nowrap">
            <a
              href="#about"
              className="hover:text-purple-300 transition-colors flex items-center gap-1 whitespace-nowrap p-2 rounded-lg hover:bg-white/10"
              title={t("nav.about")}
            >
              <User size={16} />
              <span className="hidden xl:inline text-sm">{t("nav.about")}</span>
            </a>
            <a
              href="#experience"
              className="hover:text-purple-300 transition-colors flex items-center gap-1 whitespace-nowrap p-2 rounded-lg hover:bg-white/10"
              title={t("nav.experience")}
            >
              <Briefcase size={16} />
              <span className="hidden xl:inline text-sm">{t("nav.experience")}</span>
            </a>
            <a
              href="#education"
              className="hover:text-purple-300 transition-colors flex items-center gap-1 whitespace-nowrap p-2 rounded-lg hover:bg-white/10"
              title={t("nav.education")}
            >
              <GraduationCap size={16} />
              <span className="hidden xl:inline text-sm">{t("nav.education")}</span>
            </a>
            <a
              href="#scholarships"
              className="hover:text-purple-300 transition-colors flex items-center gap-1 whitespace-nowrap p-2 rounded-lg hover:bg-white/10"
              title={t("nav.scholarships")}
            >
              <Award size={16} />
              <span className="hidden xl:inline text-sm">{t("nav.scholarships")}</span>
            </a>
            <a
              href="#projects"
              className="hover:text-purple-300 transition-colors flex items-center gap-1 whitespace-nowrap p-2 rounded-lg hover:bg-white/10"
              title={t("nav.projects")}
            >
              <Code size={16} />
              <span className="hidden xl:inline text-sm">{t("nav.projects")}</span>
            </a>
            <a
              href="#websites"
              className="hover:text-purple-300 transition-colors flex items-center gap-1 whitespace-nowrap p-2 rounded-lg hover:bg-white/10"
              title={t("nav.websites")}
            >
              <Globe size={16} />
              <span className="hidden xl:inline text-sm">{t("nav.websites")}</span>
            </a>
            <a
              href="#certifications"
              className="hover:text-purple-300 transition-colors flex items-center gap-1 whitespace-nowrap p-2 rounded-lg hover:bg-white/10"
              title={t("certifications.title")}
            >
              <Monitor size={16} />
              <span className="hidden xl:inline text-sm">{t("certifications.title")}</span>
            </a>
            <a
              href="#contact"
              className="hover:text-purple-300 transition-colors flex items-center gap-1 whitespace-nowrap p-2 rounded-lg hover:bg-white/10"
              title={t("nav.contact")}
            >
              <Mail size={16} />
              <span className="hidden xl:inline text-sm">{t("nav.contact")}</span>
            </a>
          </nav>

          {/* Auth, Language Selector y menú móvil */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto lg:ml-0 lg:order-2">
            {/* Auth Button / User Menu - OCULTO TEMPORALMENTE */}
            {/* TODO: Habilitar cuando se necesite el sistema de login */}
            {isLoggedIn && user && (
              <div className="order-1">
                <UserMenu
                  user={user}
                  isLoggedIn={isLoggedIn}
                  onLogout={handleLogout}
                  onOpenDashboard={handleOpenDashboard}
                  onOpenProfile={handleOpenProfile}
                  profileImage={profileImage} // <-- pásala como prop
                />
              </div>
            )}
            {/* Botón de login oculto para uso futuro
            <div className="order-1">
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                variant="ghost"
                size="sm"
                className="text-white hover:text-purple-300 hover:bg-white/10"
              >
                <LogIn className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">{t("menu.login")}</span>
              </Button>
            </div>
            */}

            <div className="order-2">
              <LanguageSelector />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden order-3"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={t("aria.openMenu")}
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-purple-900/95 shadow-lg z-50 animate-fade-in">
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
                href="#education"
                className="py-2 text-white font-semibold hover:text-purple-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.education")}
              </a>
              <a
                href="#scholarships"
                className="py-2 text-white font-semibold hover:text-purple-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.scholarships")}
              </a>
              <a
                href="#projects"
                className="py-2 text-white font-semibold hover:text-purple-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.projects")}
              </a>
              <a
                href="#websites"
                className="py-2 text-white font-semibold hover:text-purple-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sitios Web
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
      <section className="min-h-[100dvh] flex flex-col items-center justify-center relative px-4 pt-16">
        {/* Fondo con imagen y degradado */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/img/backgrounds/background.jpg"
            alt="Fondo Hero"
            fill
            className="object-cover opacity-60 animate-slow-zoom-blur"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-violet-800/70 to-indigo-900/90"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Profile Image with Cyan-White Glow */}
          <div className="relative mb-6">
            {/* Outer glow rings - animated */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-400 via-white to-cyan-300 opacity-30 blur-xl animate-pulse"></div>
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-white via-cyan-200 to-white opacity-40 blur-md"></div>

            {/* Inner glow ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-cyan-400/60 via-white/80 to-cyan-300/60 blur-sm"></div>

            {/* Profile Image Container - respeta animación existente */}
            <div
              ref={profileRef}
              className="relative w-128 h-128 rounded-full border-4 border-white/80 overflow-hidden transition-transform duration-300 shadow-[0_0_40px_rgba(6,182,212,0.5),0_0_80px_rgba(255,255,255,0.3)]"
              style={{ transform: `scale(${rotation !== 0 ? 1.1 : 1}) rotate(${rotation}deg)` }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src="/img/profile/profile.jpg"
                alt="Profile"
                width={200}
                height={200}
                className="object-cover"
                priority
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-2">{t("hero.name")}</h1>
          <h2 className="text-xl md:text-2xl mb-4">{t("hero.title")}</h2>
          <p className="max-w-2xl text-center mb-8">{t("hero.description")}</p>

          <div className="grid grid-cols-2 gap-4 w-full max-w-sm sm:max-w-none sm:flex sm:flex-row sm:justify-center mb-12 sm:mb-0">
            <Button asChild className="w-full sm:w-auto bg-white text-purple-900 hover:bg-purple-100">
              <a
                href="https://www.linkedin.com/in/felipe-pereira-alarc%C3%B3n/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <User className="mr-2 h-4 w-4" /> Linkedin
              </a>
            </Button>
            <Button asChild className="w-full sm:w-auto bg-white text-purple-900 hover:bg-purple-100">
              <a
                href="https://github.com/fpereira22"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" /> GitHub
              </a>
            </Button>
            <Button asChild className="col-span-2 w-full sm:w-auto bg-white text-purple-900 hover:bg-purple-100">
              <a href="mailto:f.pereiraalarcn@gmail.com">
                <Mail className="mr-2 h-4 w-4" /> {t("hero.contactBtn")}
              </a>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <button
            type="button"
            aria-label={t("aria.goToAbout")}
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
            {/* <div className="flex justify-center mb-8 lg:mb-0">
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
            </div> */}
            {/* Profile WebP */}
            <div className="flex justify-center mb-8 lg:mb-0">
              <div className="relative">
                <div className="w-64 h-80 sm:w-80 sm:h-[28rem] rounded-3xl border-4 border-purple-500 overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-105 mx-auto">
                  <Image
                    src="/img/profile/video.webp" // Ruta del archivo WebP
                    alt="Felipe Pereira A."
                    width={320}
                    height={400}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* About Content */}
            <div className="space-y-6 max-w-xl mx-auto">
              <div>
                <h2
                  className="text-4xl font-bold text-purple-600 mb-4 cursor-pointer hover:text-purple-500 transition-all select-none group inline-flex items-center gap-2"
                  onClick={() => setShowTerminalEasterEgg(true)}
                  title={t("terminal.hint") || "🤫 Click me..."}
                >
                  {t("about.title")}
                  {/* Pista sutil: cursor parpadeante que aparece en hover */}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-400 text-2xl animate-pulse font-mono">_</span>
                </h2>
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
                  <a href="/docs/CVFelipePereiraAlarcon.pdf" download target="_blank" rel="noopener noreferrer">
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
                  <span className="text-emerald-400 font-bold tracking-wide">{t("experience.professionalExp")}</span>{" "}
                  {t("experience.con")}{" "}
                  <span className="text-yellow-400 font-bold tracking-wide">{t("experience.formation")}</span>{" "}
                  {t("experience.prepIn")}{" "}
                  <span className="text-black-400 font-semibold">{t("experience.faculty")}</span>{" "}
                  {t("experience.prepOf")}{" "}
                  {t("experience.university") && (
                    <span className="text-red-400 font-semibold">{t("experience.university")}</span>
                  )}
                  {t("experience.developing")}{" "}
                  <span className="text-blue-400 font-semibold">{t("experience.personal")}</span> {t("experience.and")}{" "}
                  <span className="text-blue-400 font-semibold">{t("experience.professional")}</span>
                  {t("experience.consolidated")}{" "}
                  <span className="text-purple-400 font-semibold">{t("experience.skills")}</span>
                  {t("experience.comma1")}{" "}
                  <span className="text-green-400 font-semibold">{t("experience.dataAnalysis")}</span>
                  {t("experience.comma2")}{" "}
                  <span className="text-blue-400 font-semibold">{t("experience.softwareDevelopment")}</span>
                  {t("experience.comma3")}{" "}
                  <span className="text-orange-400 font-semibold">{t("experience.cloudDevelopment")}</span>
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
                  {" "}
                  <span className="text-blue-400 font-semibold">{t("experience.softwareDev")}</span>
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
            {/* Technologies Grid - Modern Component */}
            <div className="w-full lg:w-auto">
              <TechGrid />
            </div>
          </div>
        </div>
      </section>

      {/* Historial Cronológico */}
      <section id="work-history" className="py-20 px-4 bg-gray-50 text-gray-800">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-purple-600 mb-12 text-center">{t("workHistory.title")}</h2>

          {/* Aquí mapeamos el array de experiencias.
            'space-y-8' añade espacio entre cada tarjeta.
          */}
          <div className="space-y-8">
            {experiencesData.map((exp, index) => {
              // Si la experiencia tiene un slug, intentamos buscar traducciones
              const descKey = exp.slug ? `work.${exp.slug}.description` : null
              const bulletsKey = exp.slug ? `work.${exp.slug}.bullets` : null
              const companyKey = exp.slug ? `work.${exp.slug}.company` : null
              const titleKey = exp.slug ? `work.${exp.slug}.title` : null

              // Traducción segura para Description y Bullets
              const translatedDesc = descKey ? t(descKey) : null
              const descriptionText = translatedDesc && translatedDesc !== descKey ? translatedDesc : exp.description

              const translatedBullets = bulletsKey ? t(bulletsKey) : null
              const bulletsText = translatedBullets && translatedBullets !== bulletsKey ? translatedBullets : (exp.bullets && exp.bullets.length > 0 ? exp.bullets.join('||') : '')
              const bulletsArray = bulletsText ? bulletsText.split('||').map(s => s.trim()).filter(Boolean) : []

              // Traducción segura para Company y Title
              let companyText = exp.company
              if (companyKey) {
                const translatedCompany = t(companyKey)
                companyText = translatedCompany && translatedCompany !== companyKey ? translatedCompany : exp.company
              }

              let titleText = exp.title
              if (titleKey) {
                const translatedTitle = t(titleKey)
                titleText = translatedTitle && translatedTitle !== titleKey ? translatedTitle : exp.title
              }

              // Calcular fechas dinámicamente
              const datesText = formatDuration(
                exp.startYear,
                exp.startMonth,
                exp.endYear,
                exp.endMonth,
                t
              );

              return (
                <ExperienceCard
                  key={exp.id}
                  company={companyText}
                  title={titleText}
                  dates={datesText}
                  location={exp.location}
                  description={descriptionText}
                  bullets={bulletsArray}
                  imageSrc={exp.imageSrc}
                  index={index}
                  skills={exp.skills}
                  isOpen={openExperienceId === exp.id}
                  onClick={() => toggleExperience(exp.id)}
                  onMouseEnter={() => handleHover(exp.id, setOpenExperienceId)}
                  onMouseLeave={() => handleHover(null, setOpenExperienceId)}
                />
              )
            })}
          </div>

        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 bg-purple-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-purple-300 mb-12 text-center">{t("education.title")}</h2>

          <div className="space-y-8">
            {educationData.map((edu, index) => {
              const descKey = edu.slug ? `education.${edu.slug}.description` : null
              const bulletsKey = edu.slug ? `education.${edu.slug}.bullets` : null

              const translatedDesc = descKey ? t(descKey) : null
              const descriptionText = translatedDesc && translatedDesc !== descKey ? translatedDesc : edu.description

              const translatedBullets = bulletsKey ? t(bulletsKey) : null
              const bulletsText = translatedBullets && translatedBullets !== bulletsKey ? translatedBullets : (edu.bullets && edu.bullets.length > 0 ? edu.bullets.join('||') : '')
              const bulletsArray = bulletsText ? bulletsText.split('||').map(s => s.trim()).filter(Boolean) : []

              return (
                <ExperienceCard
                  key={edu.id}
                  company={edu.institution}
                  title={edu.degree}
                  dates={`${t("education.datesLabel")} ${edu.dates}`}
                  location={edu.location ? `${t("education.locationLabel")} ${edu.location}` : ""}
                  description={descriptionText}
                  bullets={bulletsArray}
                  imageSrc={edu.imageSrc}
                  index={index}
                  skills={edu.skills}
                  isOpen={openEducationId === edu.id}
                  onClick={() => toggleEducation(edu.id)}
                  onMouseEnter={() => handleHover(edu.id, setOpenEducationId)}
                  onMouseLeave={() => handleHover(null, setOpenEducationId)}
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* Scholarships Section */}
      {scholarshipsData.length > 0 && (
        <section id="scholarships" className="py-20 px-4 bg-slate-800 text-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-purple-400 mb-12 text-center">{t("scholarships.title")}</h2>

            <div className="space-y-8">
              {scholarshipsData.map((scholarship, index) => {
                const descKey = scholarship.slug ? `scholarships.${scholarship.slug}.description` : null
                const bulletsKey = scholarship.slug ? `scholarships.${scholarship.slug}.bullets` : null

                const translatedDesc = descKey ? t(descKey) : null
                const descriptionText = translatedDesc && translatedDesc !== descKey ? translatedDesc : scholarship.description

                const translatedBullets = bulletsKey ? t(bulletsKey) : null
                const bulletsText = translatedBullets && translatedBullets !== bulletsKey ? translatedBullets : (scholarship.bullets && scholarship.bullets.length > 0 ? scholarship.bullets.join('||') : '')
                const bulletsArray = bulletsText ? bulletsText.split('||').map(s => s.trim()).filter(Boolean) : []

                return (
                  <ExperienceCard
                    key={scholarship.id}
                    company={`${t("scholarships.institutionLabel")} ${scholarship.institution}`}
                    title={scholarship.name}
                    dates={`${t("scholarships.periodLabel")} ${scholarship.dates}`}
                    location=""
                    description={descriptionText}
                    bullets={bulletsArray}
                    imageSrc={scholarship.imageSrc}
                    index={index}
                    skills={scholarship.skills}
                    isOpen={openScholarshipId === scholarship.id}
                    onClick={() => toggleScholarship(scholarship.id)}
                    onMouseEnter={() => handleHover(scholarship.id, setOpenScholarshipId)}
                    onMouseLeave={() => handleHover(null, setOpenScholarshipId)}
                  />
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gray-50 text-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-purple-600 mb-4">{t("projects.title")}</h2>
            <div className="w-16 h-1 bg-purple-600 mx-auto"></div>
          </div>

          {/* Projects Data Definition - internal for now to keep it simple */}
          {(() => {
            const projectsData = [
              {
                slug: "project1",
                imageSrc: "/img/projects/tachas.webp",
                tags: ["Python", "Computer Vision", "IA"],
                link: "https://github.com/GaztelakoFelipeI/tatxas/"
              },
              {
                slug: "project2",
                imageSrc: "/img/projects/background.webp",
                tags: ["Python", "FastApi", "React"],
                link: "https://github.com/fpereira22/End-to-End-Housing-Price-API"
              },
              {
                slug: "project3",
                imageSrc: "/img/projects/nlp.webp",
                tags: ["Python", "IA", "Machine Learning"],
                link: "https://github.com/fpereira22/Product-Review-Sentiment-Topic-Analysis"
              },
              {
                slug: "project4",
                imageSrc: "/img/projects/knapsack_project.png",
                tags: ["Julia", "C", "AMPL", "Optimization"],
                link: "https://github.com/fpereira22/knapsack-optimization-research"
              },
              {
                slug: "project5",
                imageSrc: "/img/projects/impostor_fc.png",
                tags: ["Node.js", "Socket.IO", "JavaScript"],
                link: "https://github.com/fpereira22/Impostor-FC"
              },
              {
                slug: "project6",
                imageSrc: "/img/projects/telecom_churn.png",
                tags: ["Python", "Pandas", "Scikit-Learn"],
                link: "https://github.com/fpereira22/2nd-Challenge-TelecomX-AluraLatam"
              }
            ];

            return (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData.map((project, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col">
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 p-4 relative overflow-hidden group">
                      <Image
                        src={project.imageSrc}
                        alt={t(`projects.${project.slug}.title`)}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-3">
                        <Code className="w-5 h-5 text-purple-600 flex-shrink-0" />
                        <h3 className="text-xl font-bold leading-tight">{t(`projects.${project.slug}.title`)}</h3>
                      </div>
                      <p className="text-gray-600 mb-4 flex-grow text-sm">{t(`projects.${project.slug}.desc`)}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, i) => (
                          <span key={i} className={`px-3 py-1 rounded-full text-xs font-medium 
                            ${i % 3 === 0 ? 'bg-purple-100 text-purple-800' :
                              i % 3 === 1 ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 mt-auto"
                      >
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {t("projects.viewBtn")}
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          <div className="mt-12 text-center">
            <a
              href="https://github.com/fpereira22"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all hover:scale-105 shadow-xl hover:shadow-2xl border border-gray-700"
            >
              <Github className="w-6 h-6" />
              Ver más en GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Websites Developed Section */}
      <section id="websites" className="py-20 px-4 bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              {t("websites.title")}
            </h2>
            <p className="text-lg text-purple-200 max-w-2xl mx-auto">
              {t("websites.subtitle")}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Featured Project - Roadwise */}
          <div className="mb-12">
            <a href="https://roadwise.cl/" target="_blank" rel="noopener noreferrer" className="block group relative bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden border-2 border-orange-500 shadow-2xl shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-500 hover:scale-[1.02] cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 relative overflow-hidden">
                  <div className="aspect-video lg:aspect-auto lg:h-full relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/img/websites/previews/roadwise-preview.webp"
                      alt="Roadwise.cl"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-transparent to-transparent lg:bg-gradient-to-r"></div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold rounded-full shadow-lg animate-pulse">
                      {t("websites.latestBadge")}
                    </span>
                  </div>
                  {/* Logo badge */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl p-2 shadow-lg border border-white/30 group-hover:scale-110 transition-transform">
                    <Image
                      // src="/img/logos/websites/roadwise.jpeg"
                      src="/img/logos/websites/icon.svg"
                      alt="Roadwise Logo"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-orange-300 transition-colors">{t("websites.roadwise.title")}</h3>
                  <p className="text-orange-200 text-lg mb-6 leading-relaxed">
                    {t("websites.roadwise.desc")}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-blue-500/30 border border-blue-400/50 rounded-full text-sm">React</span>
                    <span className="px-3 py-1 bg-purple-500/30 border border-purple-400/50 rounded-full text-sm">Three.js / 3D</span>
                    <span className="px-3 py-1 bg-orange-500/30 border border-orange-400/50 rounded-full text-sm">Next.js</span>
                    <span className="px-3 py-1 bg-green-500/30 border border-green-400/50 rounded-full text-sm">Python</span>
                    <span className="px-3 py-1 bg-yellow-500/30 border border-yellow-400/50 rounded-full text-sm">IA/CV</span>
                  </div>
                  <div className="w-fit bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg shadow-orange-500/25 px-4 py-2 rounded-lg flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    {t("websites.visitBtn")}
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Other Projects Grid */}
          {/* Websites Grid with Show More */}
          {/* Websites Grid with Show More */}
          {/* Infinite Carousel of Other Projects */}
          <WebsiteCarousel />
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
              <h3 className="text-xl font-bold mb-2">IBM AI Developer Professional</h3>
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
            {/* UCc */}
            <div className="bg-purple-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <Image
                  src="/img/logos/uc.png"
                  alt="IBM"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Minería de Datos</h3>
              <p className="text-gray-600 mb-4">Pontífice Universidad Católica de Chile (UC)- 2025</p>
              <a
                href="https://www.coursera.org/account/accomplishments/verify/11S9V3ITMPJ9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-4 h-4" />
                Ver credencial
              </a>
            </div>
            {/* Cisco */}
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
              <h3 className="text-xl font-bold mb-2">Certified Ethical Hacker</h3>
              <p className="text-gray-600 mb-4">Cisco - 2025</p>
              <a
                href="https://www.credly.com/badges/9be60aca-2c54-4cc9-9f56-57f7f8112e2a"
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
              <h3 className="text-xl font-bold mb-2">Python Essentials 1 y 2</h3>
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
            {/* Esade */}
            <div className="bg-purple-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <Image
                  src="/img/logos/udemy.png"
                  alt="Esade"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Universidad Java - de Cero a Experto</h3>
              <p className="text-gray-600 mb-4">Udemy - 2025</p>
              <a
                href="https://www.udemy.com/certificate/UC-35b8d1d5-47ab-4a78-8f4c-00abfacf2035/?utm_campaign=email&utm_medium=email&utm_source=sendgrid.com"
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
              <h3 className="text-xl font-bold mb-2">Software Engineering Essentials</h3>
              <p className="text-gray-600 mb-4">IBM - 2025</p>
              <a
                href="https://www.credly.com/badges/c0121319-02f3-4d89-8739-69eab233aa8e/public_url"
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
            <form className="space-y-4" action="https://formspree.io/f/xqalqzon" method="POST">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-2">
                    {t("contact.name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
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
                    name="email"
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
                  name="subject"
                  className="w-full px-4 py-2 rounded-md bg-white/20 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder:text-gray-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2">
                  {t("contact.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
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
        aria-label={t("aria.goToTop")}
      >
        <svg className="w-7 h-7 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </a>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={async (userData) => {
          // Si el usuario es nuevo, pasamos isNewUser=true
          await handleLogin({ ...userData, isNewUser: userData.isNewUser });
        }}
        onGoogleLogin={async () => {
          // Simulación de login con Google para demo local
          // const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
          setTimeout(() => {
            const mockGoogleUser = {
              name: "Usuario Demo Google",
              email: "demo.google@example.com",
              isNewUser: true
            };
            handleLogin(mockGoogleUser);
            setIsAuthModalOpen(false);
            // alert("Google login simulado (Firebase removido para despliegue sin errores)");
          }, 1000);
        }}
      />

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

      {/* Terminal Easter Egg Modal */}
      {showTerminalEasterEgg && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowTerminalEasterEgg(false)}
        >
          <div
            className="relative w-full max-w-2xl transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón de cerrar */}
            <button
              onClick={() => setShowTerminalEasterEgg(false)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm flex items-center gap-1 transition-colors"
            >
              <span>ESC</span>
              <span className="text-xs border border-white/30 px-2 py-0.5 rounded">✕</span>
            </button>
            <LinuxTerminal />
          </div>
        </div>
      )}
    </div>
  )
}
