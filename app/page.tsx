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
  GraduationCap,
  Award
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
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, sendEmailVerification } from "firebase/auth";

interface ExperienceCardProps {
  company: string;
  title: string;
  dates: string;
  location: string;
  slug?: string;
  description: string;
  bullets: string[]; // Un array de strings
  imageSrc: string;
}
interface CardComponentProps extends ExperienceCardProps {
  index: number;
}

// El tipo para el array de datos (incluye el 'id')
type Experience = ExperienceCardProps & {
  id: number;
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
}

type Education = EducationCardProps & { id: number };
type Scholarship = ScholarshipCardProps & { id: number };

// Datos de Educación
const educationData: Education[] = [
  {
    id: 1,
    institution: "Universidad Andrés Bello",
    slug: "unab_postgrado",
    degree: "Postgrado, Ciencias de la computación",
    dates: "2025",
    location: "Santiago, Chile",
    description: "Programa de postgrado enfocado en la aplicación de técnicas avanzadas de Inteligencia Artificial y optimización para la resolución de problemas computacionales complejos.",
    bullets: [
      "Modelado y Resolución de Problemas de Optimización: Aplicación de heurísticas y metaheurísticas.",
      "Implementación de Soluciones de IA en Python: Desarrollo de algoritmos de Inteligencia Artificial.",
      "Dominio de Lenguajes de Modelado y Programación: Uso avanzado de AMPL y Julia."
    ],
    grade: "En curso",
    imageSrc: "/unab.png",
    skills: ["Programador", "Julia", "Python", "AMPL", "AIOps"]
  },
  {
    id: 2,
    institution: "Pontificia Universidad Católica de Chile (UC)",
    slug: "uc_diplomado",
    degree: "Diplomado en Gestión de proyectos de tecnologías de la información",
    dates: "2025",
    location: "Santiago, Chile",
    description: "Programa especializado en la gestión estratégica de proyectos tecnológicos, abarcando metodologías ágiles, gestión de equipos y planificación de recursos. El diplomado proporciona una sólida base en marcos de trabajo modernos como SCRUM, Kanban y metodologías híbridas, además de herramientas para la gestión efectiva de presupuestos y cronogramas en proyectos TI.",
    bullets: [
      "Gestión Ágil de Proyectos: Implementación de metodologías SCRUM y marcos de trabajo adaptativos.",
      "Planificación Estratégica: Desarrollo de roadmaps y gestión de recursos en proyectos tecnológicos.",
      "Liderazgo y Comunicación: Habilidades para la gestión efectiva de equipos y stakeholders."
    ],
    grade: "6.5",
    imageSrc: "/uc.png"
  },
  {
    id: 3,
    institution: "Pontificia Universidad Católica de Chile (UC)",
    slug: "uc_ingelectrica",
    degree: "Ingeniero Civil Eléctrico",
    dates: "2020 - 2024",
    location: "Santiago, Chile",
    description: "Formación integral en ingeniería eléctrica con énfasis en tecnologías de la información y sistemas computacionales. El programa combina fundamentos sólidos en electricidad y electrónica con aplicaciones avanzadas en software y sistemas de control.",
    bullets: [
      "Especialización en Tecnologías de la Información: Desarrollo de software, bases de datos y sistemas distribuidos.",
      "Sistemas de Control y Automatización: Diseño e implementación de sistemas de control industrial y automatización.",
      "Gestión de Proyectos Tecnológicos: Experiencia en dirección de proyectos de ingeniería y desarrollo de soluciones.",
      "Innovación y Desarrollo: Participación en proyectos de investigación y desarrollo tecnológico."
    ],
    grade: "6.8",
    imageSrc: "/uc.png"
  },
  {
    id: 4,
    institution: "Universidad Andrés Bello",
    slug: "unab_diseno_algoritmos",
    degree: "Grado en Ingeniería, Diseño de algoritmos",
    dates: "2024",
    location: "Santiago, Chile",
    description: "Programa especializado en el diseño y análisis de algoritmos avanzados, con énfasis en la optimización computacional y la resolución de problemas complejos. La formación incluye fundamentos teóricos profundos y aplicaciones prácticas en diversos campos de la ingeniería de software.",
    bullets: [
      "Algoritmos Avanzados: Desarrollo de soluciones eficientes para problemas computacionales complejos.",
      "Optimización y Complejidad: Análisis y mejora de eficiencia algorítmica en sistemas computacionales.",
      "Machine Learning y AI: Implementación de algoritmos de aprendizaje automático y sistemas inteligentes.",
      "Big Data y Procesamiento: Diseño de algoritmos para el manejo eficiente de grandes volúmenes de datos."
    ],
    grade: "PPA 6.8",
    imageSrc: "/unab.png",
    skills: ["Diseño de redes", "Desarrollo web", "Análisis de datos", "Inteligencia artificial"]
  },
  {
    id: 5,
    institution: "Pontificia Universidad Javeriana Cali",
    slug: "puj_cali",
    degree: "Ingeniería de Sistemas y Computación e Industrial",
    dates: "jul. 2023 - dic. 2023",
    location: "Cali, Colombia",
    description: "Programa de intercambio académico internacional que combinó una inmersión cultural completa con una formación académica rigurosa en áreas avanzadas de Ingeniería Industrial e Ingeniería de Sistemas. El programa incluyó cursos de nivel de postgrado y participación en proyectos de investigación aplicada, permitiendo una experiencia educativa integral en un entorno multicultural.",
    bullets: [
      "Formación Avanzada: Participación en cursos de postgrado en optimización de sistemas y gestión de operaciones industriales.",
      "Desarrollo Técnico: Implementación de soluciones en ciberseguridad y arquitectura de sistemas empresariales.",
      "Optimización y Logística: Estudio de modelos avanzados de optimización y gestión de cadenas de suministro.",
      "Desarrollo Personal: Inmersión cultural y lingüística a través de actividades extracurriculares y proyectos internacionales.",
      "Control de Calidad: Aplicación de metodologías avanzadas para el aseguramiento de la calidad en desarrollo de software.",
      "Networking Internacional: Construcción de una red profesional diversa a través de colaboraciones académicas y culturales."
    ],
    imageSrc: "/puj.png",
    skills: ["Optimización de procesos", "Desarrollo de software"]
  },
  {
    id: 6,
    institution: "Colegio Santa María de Paine",
    slug: "colegio_smp",
    degree: "Educación Media",
    dates: "2016 - 2019",
    location: "Paine, Chile",
    description: "Estudiante destacado en Matemáticas, Química, Artes visuales y Música",
    grade: "6.0",
    imageSrc: "/colegio.png",
    skills: ["Matemáticas", "Ciencias"]
  }
];

// Datos de Becas
const scholarshipsData: Scholarship[] = [
  {
    id: 1,
    institution: "Alura Latam",
    slug: "alura_one",
    name: "Data Science - Oracle Next Education (ONE) G9",
    dates: "ago. 2025 - mar. 2026",
    description: "Seleccionado como beneficiario de la prestigiosa beca Oracle Next Education (ONE) Generación 9, una iniciativa de alto impacto que combina formación técnica avanzada con desarrollo profesional. El programa está diseñado para formar profesionales en Data Science con un enfoque 100% práctico, abordando desde fundamentos hasta técnicas avanzadas de análisis de datos y machine learning.",
    bullets: [
      "Análisis de Datos: Dominio avanzado de Python con Pandas y NumPy para manipulación y análisis de datos masivos",
      "Visualización Avanzada: Creación de dashboards interactivos utilizando Matplotlib, Seaborn y Plotly para comunicación efectiva de insights",
      "Machine Learning: Implementación de modelos predictivos y de clasificación usando Scikit-learn y TensorFlow",
      "Proyectos Prácticos: Desarrollo de casos reales de análisis de datos y predicción en entornos empresariales",
      "Big Data: Procesamiento de grandes volúmenes de datos y técnicas de optimización de rendimiento",
      "Estadística Aplicada: Análisis estadístico avanzado para la toma de decisiones basada en datos"
    ],
    imageSrc: "/alura.png"
  },
  {
    id: 2,
    institution: "Coursera",
    slug: "coursera_santander",
    name: "Beca Skills for Work - Banco Santander España",
    dates: "2025",
    description: "Beneficiario de la prestigiosa Beca Santander Skills | Skills for Work, un programa integral de formación diseñado para desarrollar las competencias más demandadas en el mercado laboral actual. Esta iniciativa, respaldada por el Banco Santander y Coursera, se enfoca en cerrar la brecha entre la formación académica y las necesidades empresariales contemporáneas.",
    bullets: [
      "Liderazgo Digital: Desarrollo de competencias para liderar equipos en entornos digitales y remotos",
      "Gestión de Proyectos Ágiles: Certificación en metodologías ágiles y marcos de trabajo modernos",
      "Análisis de Datos Empresariales: Capacitación en herramientas y técnicas de Business Intelligence",
      "Habilidades de Comunicación: Técnicas avanzadas de presentación y comunicación ejecutiva",
      "Inteligencia Emocional: Desarrollo de soft skills para la gestión efectiva de equipos y conflictos",
      "Transformación Digital: Estrategias para la adaptación y liderazgo en la era digital"
    ],
    imageSrc: "/coursera.png"
  },
  {
    id: 3,
    institution: "Pontificia Universidad Javeriana Cali",
    slug: "puj_exchange",
    name: "Beca de Intercambio Académico Internacional",
    dates: "2023",
    description: "Galardonado con una beca completa de intercambio académico que cubrió estudios y alojamiento en una de las universidades más prestigiosas de Colombia. Este programa altamente selectivo permitió una inmersión total en un entorno académico internacional, combinando excelencia académica con enriquecimiento cultural.",
    bullets: [
      "Excelencia Académica: Seleccionado por mérito académico entre estudiantes de múltiples países",
      "Formación Internacional: Acceso a cursos avanzados y programas especializados de postgrado",
      "Desarrollo Multicultural: Participación en proyectos internacionales y eventos culturales",
      "Networking Global: Construcción de una red profesional internacional",
      "Investigación Aplicada: Colaboración en proyectos de investigación con profesores internacionales",
      "Desarrollo Lingüístico: Mejora de competencias en inglés y español en contexto académico"
    ],
    imageSrc: "/puj.png"
  }
];

const experiencesData: Experience[] = [
  {
    id: 1,
    slug: "sociedad_servicios_expert",
    company: "SOCIEDAD DE SERVICIOS GENERALES LTDA",
    title: "AI Software Developer & Full Stack Dev — Experto en Programación y Desarrollo",
    dates: "jul. 2025 - actualidad · 4 meses",
    location: "Gran Santiago, Región Metropolitana de Santiago, Chile",
    imageSrc: "/sociedad-servicios.png",
    description: 'Ascendido a "Experto en Programación y Desarrollo". Tras mi ascenso, mi rol se centra en diseñar, desarrollar e implementar soluciones avanzadas de Inteligencia Artificial y software para la optimización de infraestructura vial y proyectos de automatización a gran escala. Actualmente, mis principales focos son:',
    bullets: [
      "IA Visual para Infraestructura Crítica: Desarrollo de modelos avanzados de Computer Vision con Python, PyTorch y YOLO para la detección de elementos clave en carreteras, incluyendo fisuras, tachas, captafaros, balizas y barreras New Jersey, reduciendo falsos positivos y mejorando la precisión.",
      "Proyectos de Innovación en IA: Diseño de nuevas arquitecturas para análisis geoespacial, integración de sistemas predictivos y uso de datos para optimizar la seguridad vial y la planificación estratégica.",
      "Automatización y Escalabilidad: Implementación de pipelines inteligentes para procesar datos masivos, integrando dashboards interactivos y herramientas de análisis que facilitan la toma de decisiones en tiempo real.",
      "Próximos Desarrollos y Nuevos Retos: Exploración de nuevas soluciones basadas en IA para distintos proyectos tecnológicos internos, combinando desarrollo full stack, procesamiento de datos y modelos inteligentes para generar impacto a nivel organizacional."
    ]
  },
  {
    id: 2,
    slug: "sociedad_servicios_practicas",
    company: "SOCIEDAD DE SERVICIOS GENERALES LTDA",
    title: "AI Software Developer & Full Stack Dev — Formación Avanzada",
    dates: "may. 2025 - jul. 2025 · 3 meses",
    location: "Gran Santiago, Región Metropolitana de Santiago, Chile",
    imageSrc: "/sociedad-servicios.png", // Reutilizamos la imagen
    description: "Durante mis prácticas profesionales, contribuí al desarrollo de soluciones tecnológicas avanzadas, enfocándome en la mejora de procesos internos y el análisis de infraestructura vial mediante Inteligencia Artificial.",
    bullets: [
      "Desarrollo Full Stack: Lideré el diseño y la implementación de una intranet corporativa segura desde cero, utilizando Angular y Bootstrap. La plataforma centralizó recursos clave y mejoró la comunicación interna, integrando un sistema de autenticación robusto basado en JWT.",
      "Inteligencia Artificial para Infraestructura Crítica: Desarrollé y desplegué modelos avanzados de Computer Vision (Python, PyTorch, YOLO) para el análisis de infraestructura vial. El proyecto se centró en la detección automática de fisuras en barreras New Jersey y en la identificación de otros elementos como tachas, captafaros y señalética.",
      "Análisis de Datos y Visualización Avanzada: Transformé datos complejos en insights accionables mediante la creación de dashboards interactivos (Power BI) y desarrollé un framework de visualización a medida integrando Streamlit y Folium para el análisis geoespacial.",
      "Gestión de Infraestructura y Cloud: Administré bases de datos relacionales (MySQL, PostgreSQL) y gestioné el despliegue de aplicaciones y servicios en la nube de Microsoft Azure."
    ]
  },
  {
    id: 3,
    slug: "mrcomputer",
    company: "MRComputer Spa LTDA",
    title: "Ingeniero de TI y Ciberseguridad",
    dates: "ene. 2024 - feb. 2025 · 1 año 2 meses",
    location: "Área metropolitana de Santiago · Presencial",
    imageSrc: "/mrcomputer.png",
    description: "Inicié como Practicante y fui promovido gracias al rápido desarrollo de habilidades y contribuciones clave en proyectos de seguridad y software. Mis responsabilidades incluyeron:",
    bullets: [
      "Gestioné la ciberseguridad del entorno empresarial, implementando políticas de protección (ESET) y realizando análisis proactivos de vulnerabilidades con Kali Linux.",
      "Desarrollé aplicaciones web y software interno utilizando Python (Django, Flask) y la pila MERN para proyectos Full Stack.",
      "Administré la infraestructura en la nube (AWS, Azure) y gestioné el ciclo de vida de usuarios y permisos en Google Workspace y Microsoft 365.",
      "Automaticé la generación de informes mediante scripts en Python (Pandas, NumPy) y macros de Excel (VBA)."
    ]
  },
  {
    id: 4,
    slug: "lapica_pipeeno",
    company: "La picá del Pipeño",
    title: "Fundador y Director",
    dates: "sept. 2021 - ene. 2025 · 3 años 5 meses",
    location: "Paine, Región Metropolitana de Santiago, Chile · Presencial",
    imageSrc: "/lapica-pipeno.png",
    description: "Fundé y lideré un emprendimiento de e-commerce especializado en la importación y comercialización de ropa deportiva. Fui responsable de la gestión integral del negocio:",
    bullets: [
      "Gestión de Proveedores y Comercio Internacional: Desarrollé y gestioné una red global de proveedores en Asia, Europa y América (China, Inglaterra, EE. UU., Colombia y Tailandia).",
      "Desarrollo de Herramientas y Automatización: Diseñé y programé un sistema de gestión de clientes y pedidos en Excel (VBA y Macros) para automatizar el seguimiento de órdenes y la comunicación.",
      "Análisis Financiero y Business Intelligence: Dirigí el análisis financiero empleando Excel y Power BI para monitorear ingresos, costos y márgenes de ganancia.",
      "Optimización Logística y de Operaciones: Orquesté toda la cadena logística, desde la importación hasta la entrega final al cliente."
    ]
  },
  {
    id: 5,
    slug: "saez_saez",
    company: "Saez y Saez Cia Automóviles.",
    title: "Ingeniero de Redes y Telecomunicaciones",
    dates: "sept. 2021 - feb. 2022 · 6 meses",
    location: "Talagante, Región Metropolitana de Santiago, Chile · Presencial",
    imageSrc: "/saez.png", // ¡Asegúrate de tener esta imagen en tu carpeta /public/img/!
    description: "Responsable de la infraestructura de red y el desarrollo de herramientas de automatización.",
    bullets: [
      "Lideré el proyecto de rediseño de la red local de la empresa, utilizando Cisco Packet Tracer y GSN3 para planificar y simular una topología más segura y eficiente.",
      "Desarrollé una herramienta personalizada con Python y VBA para automatizar el proceso de contacto con clientes, mejorando los tiempos de respuesta.",
      "Implementé y administré un nuevo sistema de cámaras de seguridad, configurando el control de movimiento y el acceso remoto (SMARTPSS)."
    ]
  },
  {
    id: 6,
    slug: "unab_ayudante",
    company: "Universidad Andrés Bello",
    title: "Ayudante y Tutor",
    dates: "mar. 2020 - jul. 2020 · 5 meses",
    location: "Providencia, Región Metropolitana de Santiago, Chile · En remoto",
    imageSrc: "/unab.png", // ¡Asegúrate de tener esta imagen en tu carpeta /public/img/!
    description: "Colaboré activamente con el cuerpo docente y brindé apoyo directo a estudiantes de ciencias e ingeniería para fortalecer su comprensión de conceptos fundamentales.",
    bullets: [
      "Apoyo Académico y Mentoría: Guié a estudiantes en las asignaturas de Física General e Introducción a las Matemáticas, simplificando temas complejos.",
      "Colaboración Docente en Programación: Como Ayudante de Cátedra para Introducción a la Programación y Análisis de Algoritmos, asistí en la preparación de material y corrección de proyectos.",
      "Desarrollo de Habilidades Técnicas: Proporcioné retroalimentación constructiva sobre código y algoritmos, ayudando a los estudiantes a depurar sus soluciones.",
      "Fomento del Pensamiento Crítico: Fomenté un ambiente de aprendizaje proactivo donde los estudiantes desarrollaron habilidades de resolución de problemas."
    ]
  },
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
  index
}: CardComponentProps) => {
  return (
    // El 'group' y 'relative' están bien.
    // 'overflow-hidden' en el padre es CLAVE para que las esquinas 
    // redondeadas se respeten durante la animación.
    <div className="relative group bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105">
      
      {/* Contenedor principal (Siempre visible) */}
      <div className="flex flex-col items-center justify-center p-6 space-y-4">
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
        </div>
      </div>

      {/* === CAMBIOS AQUÍ === */}
      {/* Contenido oculto (ahora se expande hacia abajo) 
        1. Quitamos 'absolute', 'inset-0', 'opacity-0', 'group-hover:opacity-100'.
        2. Quitamos 'flex flex-col justify-center'.
        3. Añadimos 'max-h-0' (oculto por defecto).
        4. Añadimos 'group-hover:max-h-[500px]' (revelado en hover).
           (Usa un valor grande, ej. [500px], que sepas que cubrirá tu contenido).
        5. Añadimos 'transition-all duration-500 ease-in-out' para la animación.
        6. Añadimos 'overflow-hidden' para que el contenido no se vea cuando está colapsado.
      */}
      <div 
        className="bg-purple-900 text-white 
                   max-h-0 group-hover:max-h-[500px] 
                   transition-all duration-500 ease-in-out 
                   overflow-hidden"
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
        </div>
      </div>
    </div>
  );
};

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
    setMounted(true);

    // Listener de Firebase para el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Si hay un usuario, actualizamos el estado
        setIsLoggedIn(true);
        setUser({
          name: firebaseUser.displayName && firebaseUser.displayName.trim() !== "" ? firebaseUser.displayName : "Usuario",
          email: firebaseUser.email || "No email",
        });
        // Guardamos en localStorage solo si queremos recordar datos no sensibles
        localStorage.setItem("portfolioUser", JSON.stringify({ name: firebaseUser.displayName && firebaseUser.displayName.trim() !== "" ? firebaseUser.displayName : "Usuario", email: firebaseUser.email }));
      } else {
        // Si no hay usuario, limpiamos el estado
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem("portfolioUser");
      }
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // Limpiamos tanto el listener de scroll como el de auth
    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  const handleLogin = async (userData: { name: string; email: string; isNewUser?: boolean }) => {
    const userInfo = {
      name: userData.name,
      email: userData.email,
      loginTime: new Date().toISOString(),
    }

    // Si es un nuevo usuario, enviar correo de verificación
    if (userData.isNewUser && auth.currentUser && !auth.currentUser.emailVerified) {
      try {
        await sendEmailVerification(auth.currentUser);
        alert("Se ha enviado un correo de verificación. Por favor revisa tu bandeja de entrada.");
      } catch (error) {
        alert("No se pudo enviar el correo de verificación. Intenta más tarde.");
      }
    }

    localStorage.setItem("portfolioUser", JSON.stringify(userInfo))
    setIsLoggedIn(true)
    setUser(userInfo)
    setIsAuthModalOpen(false)
  }

  const handleLogout = () => {
    signOut(auth); // Esto cierra la sesión, y onAuthStateChanged hará el resto.
  };

  const handleOpenDashboard = () => {
    router.push("/dashboard")
  }

  const handleOpenProfile = () => {
    setIsProfileModalOpen(true)
  }

  const handleUpdateUser = (updatedUser: { name: string; email: string }) => {
    setUser(updatedUser)
    if (auth.currentUser && updatedUser.name) {
      import('firebase/auth').then(({ updateProfile, reload }) => {
        updateProfile(auth.currentUser!, { displayName: updatedUser.name })
          .then(() => {
            // Recarga el usuario para obtener el displayName actualizado
            reload(auth.currentUser!).then(() => {
              localStorage.setItem("portfolioUser", JSON.stringify({ name: updatedUser.name, email: updatedUser.email }))
              // Opcional: fuerza un refresco del estado local
              setUser({
                name: updatedUser.name,
                email: updatedUser.email,
              })
            })
          })
      })
    } else {
      localStorage.setItem("portfolioUser", JSON.stringify({ name: updatedUser.name, email: updatedUser.email }))
    }
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
              href="#education"
              className="hover:text-purple-300 transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <GraduationCap size={16} />
              <span>{t("nav.education")}</span>
            </a>
            <a
              href="#scholarships"
              className="hover:text-purple-300 transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <Award size={16} />
              <span>{t("nav.scholarships")}</span>
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
            className="w-128 h-128 rounded-full border-4 border-white overflow-hidden mb-6 relative transition-transform duration-300"
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
                    src="/video.webp" // Ruta del archivo WebP
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
                  <a href="/CVFelipePereiraAlarcon.pdf" download target="_blank" rel="noopener noreferrer">
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
              const descriptionText = descKey ? t(descKey) : exp.description
              const bulletsText = bulletsKey ? t(bulletsKey) : (exp.bullets ? exp.bullets.join('||') : '')
              const bulletsArray = bulletsText ? bulletsText.split('||').map(s => s.trim()).filter(Boolean) : []

              return (
                <ExperienceCard
                  key={exp.id}
                  company={exp.company}
                  title={exp.title}
                  dates={exp.dates}
                  location={exp.location}
                  description={descriptionText}
                  bullets={bulletsArray}
                  imageSrc={exp.imageSrc}
                  index={index}
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
              const descriptionText = descKey ? t(descKey) : edu.description
              const bulletsText = bulletsKey ? t(bulletsKey) : (edu.bullets ? edu.bullets.join('||') : '')
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
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* Scholarships Section */}
      <section id="scholarships" className="py-20 px-4 bg-slate-800 text-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-purple-400 mb-12 text-center">{t("scholarships.title")}</h2>
          
          <div className="space-y-8">
            {scholarshipsData.map((scholarship, index) => {
              const descKey = scholarship.slug ? `scholarships.${scholarship.slug}.description` : null
              const bulletsKey = scholarship.slug ? `scholarships.${scholarship.slug}.bullets` : null
              const descriptionText = descKey ? t(descKey) : scholarship.description
              const bulletsText = bulletsKey ? t(bulletsKey) : (scholarship.bullets ? scholarship.bullets.join('||') : '')
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
                />
              )
            })}
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
                  // src="/img/1.png"
                  src="/tachas.webp"
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
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Python</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Computer Vision</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">IA</span>
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
                  // src="/img/2.jpg"
                  src="/background.webp"
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
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Python</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">FastApi</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">React</span>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  <a href="https://github.com/fpereira22/End-to-End-Housing-Price-API" target="_blank" rel="noopener noreferrer">
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
                  // src="/img/3.png"
                  src="/nlp.webp"
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
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">IA</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Machine Learning</span>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  <a href="https://github.com/fpereira22/Product-Review-Sentiment-Topic-Analysis" target="_blank" rel="noopener noreferrer">
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
                  src="/uc.png"
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
        aria-label="Ir al inicio"
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
          const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
          const provider = new GoogleAuthProvider();
          try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            // Detectar si es un usuario nuevo por metadata
            const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;
            await handleLogin({
              name: user.displayName || "Usuario",
              email: user.email || "No email",
              isNewUser,
            });
            setIsAuthModalOpen(false);
          } catch (error: any) {
            let msg = "Error al iniciar sesión con Google.";
            if (error && typeof error === "object" && "message" in error && typeof error.message === "string") {
              msg += ` ${error.message}`;
            }
            alert(msg);
          }
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
    </div>
  )
}
