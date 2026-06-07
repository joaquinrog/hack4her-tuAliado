"use client"

import { useEffect, useRef } from "react"
import type { EstadoVoz, Mensaje } from "@/lib/types"
import { ChatMessageBubble, ChatTypingBubble } from "./ChatMessageBubble"
import { ChatInputBar } from "./ChatInputBar"
import { ChatVoiceView } from "./ChatVoiceView"

interface ChatSheetProps {
  mensajes: Mensaje[]
  escribiendo: boolean
  onEnviar: (texto: string) => void
  onCerrar: () => void
  soportaVoz: boolean
  modoVoz: boolean
  onToggleModoVoz: () => void
  estadoVoz: EstadoVoz
  transcript: string
  errorVoz: string | null
  hablanteVoz: "usuario" | "asistente"
  onTocarBotonVoz: () => void
}

export function ChatSheet(props: ChatSheetProps) {
  const { mensajes, escribiendo, onEnviar, onCerrar, soportaVoz, modoVoz, onToggleModoVoz } = props
  const finRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [mensajes, escribiendo])

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex h-3/4 w-full max-w-[430px] flex-col self-center rounded-t-[32px] bg-surface-container-lowest shadow-[0_-10px_40px_rgba(0,0,0,0.12)]">
      <div className="flex justify-center pt-3 pb-2">
        <div className="h-1 w-10 rounded-full bg-outline-variant" />
      </div>

      <div className="flex items-center justify-between px-margin-mobile py-2">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[20px] text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            auto_awesome
          </span>
          <span className="font-sans text-label-md text-on-surface">tuAliado</span>
        </div>
        <div className="flex items-center gap-2">
          {soportaVoz && (
            <button
              type="button"
              onClick={onToggleModoVoz}
              className="font-sans text-[13px] text-primary underline"
            >
              {modoVoz ? "Escribir en su lugar" : "Hablar en su lugar"}
            </button>
          )}
          <button
            type="button"
            aria-label="Cerrar chat"
            onClick={onCerrar}
            className="material-symbols-outlined flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant"
          >
            close
          </button>
        </div>
      </div>

      {modoVoz ? (
        <ChatVoiceView
          estado={props.estadoVoz}
          transcript={props.transcript}
          error={props.errorVoz}
          hablante={props.hablanteVoz}
          onTocarBoton={props.onTocarBotonVoz}
          onCambiarAModoTexto={onToggleModoVoz}
        />
      ) : (
        <>
          <div className="hide-scrollbar flex-1 space-y-stack-md overflow-y-auto px-margin-mobile py-4">
            {mensajes.map((mensaje, i) => (
              <ChatMessageBubble key={i} mensaje={mensaje} />
            ))}
            {escribiendo && <ChatTypingBubble />}
            <div ref={finRef} />
          </div>

          <ChatInputBar onEnviar={onEnviar} deshabilitado={escribiendo} />
        </>
      )}
    </div>
  )
}
