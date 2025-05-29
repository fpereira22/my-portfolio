import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { LanguageProvider } from "@/hooks/useLanguage"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Felipe Pereira - Portfolio",
  description: "Portfolio personal de Felipe Pereira - Desarrollador de Software",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className} suppressHydrationWarning={true}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
