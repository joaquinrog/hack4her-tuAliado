import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import { ChatbotButton } from "@/components/ChatbotButton"
import "./globals.css"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })

export const metadata: Metadata = {
  title: "tuAliado",
  description: "Tu agente de crecimiento",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${outfit.variable} h-dvh`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-dvh bg-background text-on-background antialiased font-sans">
        <div className="mx-auto max-w-[430px] min-h-dvh flex flex-col">
          {children}
        </div>
        <ChatbotButton />
      </body>
    </html>
  )
}
