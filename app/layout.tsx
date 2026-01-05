export const metadata: Metadata = {
  title: "Felipe Pereira - Portfolio",
  description: "Portfolio personal de Felipe Pereira - Desarrollador de Software",
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
  manifest: "/site.webmanifest",
  generator: 'v0.dev',
  
  // --- ESTO ES LO QUE TE FALTA (LA CURA PARA EL ERROR) ---
  alternates: {
    canonical: "https://fpereiradev.sppa.cl",
  },
  
  // --- RECOMENDADO: Agrega esto para que Google entienda mejor tu sitio ---
  openGraph: {
    title: "Felipe Pereira - Portfolio",
    description: "Portfolio personal de Felipe Pereira - Desarrollador de Software",
    url: "https://fpereiradev.sppa.cl",
    siteName: "Felipe Pereira Portfolio",
    locale: "es_CL",
    type: "website",
  },
}
