export const metadata: Metadata = {
  title: "Felipe Pereira - Portfolio",
  description: "Portfolio personal de Felipe Pereira - Desarrollador de Software",
  // ESTAS SON LAS LÍNEAS QUE FALTABAN:
  metadataBase: new URL("https://fpereiradev.sppa.cl"),
  alternates: {
    canonical: "/",
  },
  // ------------------------------------
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
  manifest: "/site.webmanifest",
  generator: 'v0.dev',
  // Opcional: Esto ayuda a que los robots indexen mejor
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}
