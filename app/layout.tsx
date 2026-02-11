import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
// IMPORTANTE: Mantenemos las llaves { } porque tu archivo useLanguage tiene "export function"
import { LanguageProvider } from "@/hooks/useLanguage"
import SmoothScroll from "@/components/smooth-scroll"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

// --- AQUÍ ESTÁN TUS MEJORAS DE SEO ---
export const metadata: Metadata = {
  title: "Felipe Pereira A. | Ingeniero de Software & Portfolio",
  description: "Portafolio profesional de Felipe Pereira Alarcón. Experto en Desarrollo Web, Ciberseguridad e IA.",
  keywords: ["Felipe Pereira", "Felipe Pereira Dev", "Ingeniero de Software", "Desarrollador Full Stack", "Portafolio", "Chile", "Desarrollo Web", "Inteligencia Artificial"],
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL('https://fpereiradev.sppa.cl'),

  // SOLUCIÓN AL ERROR DE GOOGLE (URL CANÓNICA)
  alternates: {
    canonical: "https://fpereiradev.sppa.cl",
  },

  // MEJORA RECOMENDADA (OPEN GRAPH)
  openGraph: {
    title: "Felipe Pereira - Portfolio",
    description: "Portfolio personal de Felipe Pereira - Desarrollador de Software",
    url: "https://fpereiradev.sppa.cl",
    siteName: "Felipe Pereira Portfolio",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "/og-image.png", // Asegúrate de tener una imagen o borra esta línea si no
        width: 1200,
        height: 630,
        alt: "Felipe Pereira Portfolio",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
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
