import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
// IMPORTANTE: Mantenemos las llaves { } porque tu archivo useLanguage tiene "export function"
import { LanguageProvider } from "@/hooks/useLanguage"
import SmoothScroll from "@/components/smooth-scroll"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

// ═══════════════════════════════════════════════════
// SEO COMPLETO — Metadata + Keywords + Open Graph + Twitter
// ═══════════════════════════════════════════════════
export const metadata: Metadata = {
  metadataBase: new URL('https://fpereiradev.sppa.cl'),

  title: {
    default: "Felipe Pereira A. | Ingeniero de Software & Desarrollador Web Full Stack",
    template: "%s | Felipe Pereira Dev",
  },

  description:
    "Portafolio profesional de Felipe Pereira Alarcón. Ingeniero Civil Informático, Desarrollador Web Full Stack y especialista en Inteligencia Artificial, Ciberseguridad y Data Science. Disponible en Santiago, Chile y alrededores.",

  // ═══════════════════════════════════════════════════
  // KEYWORDS — Marca personal + Habilidades + SEO Local
  // ═══════════════════════════════════════════════════
  keywords: [
    // ── Marca personal / Variaciones de nombre ──
    "Felipe Pereira",
    "Felipe Pereira Dev",
    "Felipe Pereira Alarcón",
    "Felipe Pereira Alarcon",
    "fpereiradev",
    "fpereira22",
    "Felie Pereira",     // typo intencionado búsquedas reales
    "Felipe Pereira portfolio",
    "Felipe Pereira ingeniero",
    "Felipe Pereira programador",
    "Felipe Pereira desarrollador",
    "Felipe Pereira software",
    "Felipe Pereira Chile",
    "Felipe Pereira Santiago",
    "Felipe Pereira freelance",

    // ── Títulos profesionales ──
    "Ingeniero de Software",
    "Ingeniero Civil Informático",
    "Desarrollador de Software",
    "Desarrollador Web",
    "Desarrollador Full Stack",
    "Programador",
    "Programador Web",
    "Programador Full Stack",
    "Software Engineer",
    "Full Stack Developer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Desarrollador Frontend",
    "Desarrollador Backend",

    // ── Tecnologías y habilidades ──
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Python",
    "Node.js",
    "Angular",
    "Vue.js",
    "PHP",
    "Java",
    "C++",
    "PostgreSQL",
    "AWS",
    "Tailwind CSS",
    "HTML5",
    "CSS3",
    "Express",
    "GitHub",
    "PowerBI",

    // ── Especialidades ──
    "Inteligencia Artificial",
    "Machine Learning",
    "Data Science",
    "Ciencia de Datos",
    "Ciberseguridad",
    "Computer Vision",
    "Visión por Computadora",
    "Análisis de Datos",
    "Cloud Computing",
    "DevOps",
    "Scrum",
    "Metodologías Ágiles",
    "Optimización",
    "Investigación de Operaciones",

    // ── Servicios / Intención de búsqueda ──
    "Desarrollo de aplicaciones web",
    "Desarrollo de páginas web",
    "Crear página web",
    "Diseño web profesional",
    "Desarrollo web a medida",
    "Programador freelance Chile",
    "Contratar desarrollador web",
    "Contratar programador",
    "Desarrollador web freelance",
    "Consultoría informática",
    "Desarrollo de software a medida",
    "Aplicaciones web modernas",
    "Portfolio desarrollador",
    "Portafolio ingeniero informático",

    // ── SEO Local: "cerca de mi" / ciudades / comunas ──
    "Desarrollador web cerca de mi",
    "Programador cerca de mi",
    "Ingeniero de software cerca de mi",
    "Desarrollador web en Chile",
    "Desarrollador web en Santiago",
    "Desarrollador web en Santiago de Chile",
    "Desarrollador web en Paine",
    "Desarrollador web en Buin",
    "Desarrollador web en San Bernardo",
    "Desarrollador web en Puente Alto",
    "Desarrollador web en La Florida",
    "Desarrollador web en Maipú",
    "Desarrollador web en Las Condes",
    "Desarrollador web en Providencia",
    "Desarrollador web en Ñuñoa",
    "Desarrollador web en Peñaflor",
    "Desarrollador web en Talagante",
    "Desarrollador web en Isla de Maipo",
    "Desarrollador web en Calera de Tango",
    "Desarrollador web en Pirque",
    "Desarrollador web en Lo Espejo",
    "Desarrollador web en San Miguel",
    "Desarrollador web en La Cisterna",
    "Desarrollador web en El Bosque",
    "Desarrollador web en La Pintana",
    "Desarrollador web en San Joaquín",
    "Desarrollador web en Pedro Aguirre Cerda",
    "Desarrollador web en Rancagua",
    "Desarrollador web en Región Metropolitana",
    "Desarrollador web en Valparaíso",
    "Desarrollador web en Concepción",

    "Programador en Paine",
    "Programador en Buin",
    "Programador en San Bernardo",
    "Programador en Santiago",
    "Programador en Puente Alto",
    "Programador en Maipú",
    "Programador en La Florida",
    "Programador en Región Metropolitana",

    "Ingeniero informático en Santiago",
    "Ingeniero informático en Paine",
    "Ingeniero informático en Buin",
    "Ingeniero informático en San Bernardo",

    // ── Transaccional: Crear páginas web / Creador de webs ──
    "Crear página web",
    "Crear pagina web",
    "Crear página web cerca de mi",
    "Crear pagina web cerca de mi",
    "Crear página web en Chile",
    "Crear página web en Santiago",
    "Crear página web en Paine",
    "Crear página web en Buin",
    "Crear página web en San Bernardo",
    "Crear página web en Puente Alto",
    "Crear página web en La Florida",
    "Crear página web en Maipú",
    "Crear página web en Región Metropolitana",
    "Creador de webs",
    "Creador de páginas web",
    "Creador de páginas web Chile",
    "Creador de páginas web Santiago",
    "Creador de páginas web cerca de mi",
    "Creador de webs profesional",
    "Creador de webs en Chile",
    "Creador de webs en Santiago",
    "Creador de webs en Paine",
    "Creador de webs en Buin",
    "Creador de webs en San Bernardo",
    "Hacer página web",
    "Hacer pagina web",
    "Hacer una página web",
    "Hacer página web profesional",
    "Hacer página web barata",
    "Hacer página web económica",
    "Hacer una web",
    "Hacer un sitio web",
    "Quiero una página web",
    "Quiero crear una página web",
    "Necesito una página web",
    "Necesito un desarrollador web",
    "Necesito un programador",
    "Busco desarrollador web",
    "Busco programador",
    "Busco creador de páginas web",
    "Diseñador web",
    "Diseñador web Chile",
    "Diseñador web Santiago",
    "Diseñador web cerca de mi",
    "Diseñador web en Paine",
    "Diseñador web en Buin",
    "Diseñador web en San Bernardo",
    "Diseño y desarrollo web",
    "Diseño de páginas web",
    "Diseño web profesional Chile",
    "Diseño web económico",
    "Diseño web para empresas",
    "Diseño web para emprendedores",
    "Diseño web para negocios",
    "Diseño web para pymes",
    "Página web para mi negocio",
    "Página web para mi empresa",
    "Página web para emprendedores",
    "Página web profesional",
    "Página web a medida",
    "Página web personalizada",
    "Sitio web profesional",
    "Sitio web a medida",
    "Sitio web para empresa",
    "Web para mi negocio",
    "Tienda online Chile",
    "Ecommerce Chile",
    "Desarrollo ecommerce",
    "Precio página web Chile",
    "Cuánto cuesta una página web",
    "Cuánto cuesta crear una web",
    "Cotizar página web",
    "Presupuesto página web",

    // ── Geográfico general ──
    "Chile",
    "Santiago",
    "Región Metropolitana",
    "Paine",
    "Buin",
    "San Bernardo",
    "Puente Alto",
    "La Florida",
    "Maipú",

    // ── Educación / Credenciales ──
    "Universidad Andrés Bello",
    "UNAB",
    "Pontificia Universidad Javeriana",
    "Máster en Ingeniería Informática",
    "Licenciatura Ciencias de la Ingeniería",
    "Computer Science Chile",
  ],

  // ── Configuración de iconos ──
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
  manifest: "/site.webmanifest",

  // ── URL canónica ──
  alternates: {
    canonical: "https://fpereiradev.sppa.cl",
    languages: {
      "es-CL": "https://fpereiradev.sppa.cl",
      "en": "https://fpereiradev.sppa.cl",
    },
  },

  // ═══════════════════════════════════════════════════
  // OPEN GRAPH — Para compartir en redes sociales
  // ═══════════════════════════════════════════════════
  openGraph: {
    title: "Felipe Pereira A. | Ingeniero de Software & Desarrollador Full Stack",
    description:
      "Portafolio profesional de Felipe Pereira Alarcón — Ingeniero Civil Informático especializado en Desarrollo Web, IA, Data Science y Ciberseguridad. Santiago, Chile.",
    url: "https://fpereiradev.sppa.cl",
    siteName: "Felipe Pereira Dev — Portfolio",
    locale: "es_CL",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Felipe Pereira — Ingeniero de Software & Desarrollador Full Stack Portfolio",
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  // TWITTER CARD — Para compartir en X/Twitter
  // ═══════════════════════════════════════════════════
  twitter: {
    card: "summary_large_image",
    title: "Felipe Pereira A. | Ingeniero de Software & Desarrollador Full Stack",
    description:
      "Portafolio de Felipe Pereira Alarcón — Ing. Civil Informático. Desarrollo Web, IA, Data Science, Ciberseguridad. Santiago, Chile.",
    images: ["/og-image.png"],
  },

  // ── Robots ──
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Verificación (agrega tus codes de verificación aquí) ──
  // verification: {
  //   google: "TU_CODIGO_GOOGLE_SEARCH_CONSOLE",
  // },

  // ── Categoría del sitio ──
  category: "technology",

  // ── Autor ──
  authors: [{ name: "Felipe Pereira Alarcón", url: "https://fpereiradev.sppa.cl" }],
  creator: "Felipe Pereira Alarcón",
  publisher: "Felipe Pereira Alarcón",
}

// ═══════════════════════════════════════════════════
// JSON-LD Structured Data (Schema.org)
// ═══════════════════════════════════════════════════
const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Felipe Pereira Alarcón",
  alternateName: ["Felipe Pereira", "Felipe Pereira Dev", "fpereiradev", "fpereira22"],
  url: "https://fpereiradev.sppa.cl",
  image: "https://fpereiradev.sppa.cl/og-image.png",
  jobTitle: "Ingeniero Civil Informático",
  description:
    "Ingeniero Civil Informático y Desarrollador Full Stack especializado en React, Next.js, Python, IA y Data Science. Basado en Santiago, Chile.",
  email: "f.pereiraalarcn@gmail.com",
  sameAs: [
    "https://www.linkedin.com/in/felipe-pereira-alarc%C3%B3n/",
    "https://github.com/fpereira22",
    "https://www.instagram.com/_f.pereira14",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santiago",
    addressRegion: "Región Metropolitana",
    addressCountry: "CL",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Universidad Andrés Bello",
      url: "https://www.unab.cl",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Pontificia Universidad Javeriana Cali",
      url: "https://www.javerianacali.edu.co",
    },
  ],
  knowsAbout: [
    "Desarrollo Web",
    "Full Stack Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Python",
    "Node.js",
    "Inteligencia Artificial",
    "Machine Learning",
    "Data Science",
    "Ciberseguridad",
    "PostgreSQL",
    "AWS",
    "Angular",
    "Vue.js",
    "PHP",
    "Java",
    "C++",
    "Computer Vision",
    "Scrum",
    "DevOps",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Ingeniería Civil Informática",
      credentialCategory: "degree",
      recognizedBy: { "@type": "Organization", name: "Universidad Andrés Bello" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Licenciatura en Ciencias de la Ingeniería, Computer Science",
      credentialCategory: "degree",
      recognizedBy: { "@type": "Organization", name: "Universidad Andrés Bello" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Máster en Ingeniería Informática",
      credentialCategory: "degree",
      recognizedBy: { "@type": "Organization", name: "Universidad Andrés Bello" },
    },
  ],
}

const jsonLdProfessionalService = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Felipe Pereira Dev — Desarrollo Web & Software",
  description:
    "Servicios profesionales de desarrollo web, aplicaciones, inteligencia artificial y consultoría informática en Santiago de Chile y Región Metropolitana.",
  url: "https://fpereiradev.sppa.cl",
  image: "https://fpereiradev.sppa.cl/og-image.png",
  telephone: "",
  email: "f.pereiraalarcn@gmail.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santiago",
    addressRegion: "Región Metropolitana",
    addressCountry: "CL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -33.4489,
    longitude: -70.6693,
  },
  areaServed: [
    { "@type": "City", name: "Santiago" },
    { "@type": "City", name: "Paine" },
    { "@type": "City", name: "Buin" },
    { "@type": "City", name: "San Bernardo" },
    { "@type": "City", name: "Puente Alto" },
    { "@type": "City", name: "La Florida" },
    { "@type": "City", name: "Maipú" },
    { "@type": "City", name: "Las Condes" },
    { "@type": "City", name: "Providencia" },
    { "@type": "City", name: "Ñuñoa" },
    { "@type": "City", name: "Peñaflor" },
    { "@type": "City", name: "Talagante" },
    { "@type": "City", name: "Isla de Maipo" },
    { "@type": "City", name: "Calera de Tango" },
    { "@type": "City", name: "Pirque" },
    { "@type": "City", name: "La Cisterna" },
    { "@type": "City", name: "El Bosque" },
    { "@type": "City", name: "San Miguel" },
    { "@type": "City", name: "San Joaquín" },
    { "@type": "City", name: "Pedro Aguirre Cerda" },
    { "@type": "City", name: "Lo Espejo" },
    { "@type": "City", name: "La Pintana" },
    { "@type": "AdministrativeArea", name: "Región Metropolitana" },
    { "@type": "City", name: "Rancagua" },
    { "@type": "City", name: "Valparaíso" },
    { "@type": "City", name: "Concepción" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Desarrollo",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Desarrollo Web Full Stack",
          description:
            "Desarrollo de aplicaciones web modernas con React, Next.js, Node.js y bases de datos.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Desarrollo con Inteligencia Artificial",
          description:
            "Integración de IA, Machine Learning y Computer Vision en aplicaciones.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Consultoría en Ciberseguridad",
          description:
            "Auditorías de seguridad, análisis de vulnerabilidades y fortalecimiento de infraestructura.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Data Science y Análisis de Datos",
          description:
            "Análisis de datos, dashboards con PowerBI, ETL y modelos predictivos con Python.",
        },
      },
    ],
  },
  sameAs: [
    "https://www.linkedin.com/in/felipe-pereira-alarc%C3%B3n/",
    "https://github.com/fpereira22",
  ],
}

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Felipe Pereira Dev",
  alternateName: "fpereiradev",
  url: "https://fpereiradev.sppa.cl",
  description:
    "Portafolio profesional de Felipe Pereira Alarcón — Ingeniero Civil Informático y Desarrollador Full Stack.",
  inLanguage: ["es", "en", "eu"],
  author: {
    "@type": "Person",
    name: "Felipe Pereira Alarcón",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* JSON-LD Structured Data para Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProfessionalService) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      {/* suppressHydrationWarning ayuda a evitar errores de coincidencia HTML/React */}
      <body className={inter.className} suppressHydrationWarning={true}>
        <LanguageProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  )
}
