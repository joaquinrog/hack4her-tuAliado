"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { calcularTicketPromedio } from "@/lib/recommendation-engine"
import { MOCK_STATE } from "@/lib/mock-data"
import { getMeta } from "@/lib/state"
import { enviarMensaje, MENSAJE_INICIAL } from "@/lib/chat"
import type { Mensaje } from "@/lib/types"
import { ChatSheet } from "./ChatSheet"

const horaActual = () => new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })

export function ChatbotButton() {
  return (
    <Suspense fallback={null}>
      <ChatbotButtonContent />
    </Suspense>
  )
}

function ChatbotButtonContent() {
  const searchParams = useSearchParams()
  const meta = getMeta(searchParams)

  const [abierto, setAbierto] = useState(false)
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { rol: "asistente", texto: MENSAJE_INICIAL, hora: horaActual() },
  ])
  const [escribiendo, setEscribiendo] = useState(false)

  async function manejarEnvio(texto: string) {
    setMensajes((prev) => [...prev, { rol: "usuario", texto, hora: horaActual() }])
    setEscribiendo(true)

    const respuesta = await enviarMensaje(texto, {
      nombre: MOCK_STATE.perfil.nombre,
      meta: meta ?? "crecer su negocio",
      ticketPromedio: calcularTicketPromedio(MOCK_STATE.historialPedidos),
    })

    setMensajes((prev) => [...prev, { rol: "asistente", texto: respuesta, hora: horaActual() }])
    setEscribiendo(false)
  }

  return (
    <>
      <button
        type="button"
        aria-label="Abrir chat con tuAliado"
        onClick={() => setAbierto(true)}
        className="fixed right-6 bottom-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary-container text-on-primary shadow-[0_4px_14px_rgba(249,115,22,0.3)] transition-transform active:scale-90"
      >
        <span className="material-symbols-outlined text-[28px]">chat_bubble</span>
        <span
          className="material-symbols-outlined absolute top-1 right-1 text-[14px] text-on-primary"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          auto_awesome
        </span>
      </button>

      {abierto && (
        <ChatSheet
          mensajes={mensajes}
          escribiendo={escribiendo}
          onEnviar={manejarEnvio}
          onCerrar={() => setAbierto(false)}
        />
      )}
    </>
  )
}
