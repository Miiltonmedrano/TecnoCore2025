import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TecnoCore",
  description:
    "Tu tienda especializada en tecnología, con los mejores precios del mercado. Encontrá dispositivos y accesorios de calidad garantizada.",
  keywords: ["tecnología", "smartphones", "iPhone", "gaming", "consolas", "Apple Watch", "Rosario", "Argentina"],
  authors: [{ name: "TecnoCore" }],
  creator: "TecnoCore",
  publisher: "TecnoCore",
  robots: "index, follow",
  openGraph: {
    title: "TecnoCore - Tecnología al mejor precio",
    description:
      "Tu tienda especializada en tecnología, con los mejores precios del mercado. Encontrá dispositivos y accesorios de calidad garantizada.",
    type: "website",
    locale: "es_AR",
    siteName: "TecnoCore",
  },
  twitter: {
    card: "summary_large_image",
    title: "TecnoCore - Tecnología al mejor precio",
    description: "Tu tienda especializada en tecnología, con los mejores precios del mercado.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
