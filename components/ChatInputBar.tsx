"use client"

import { useState } from "react"
import { CHIPS_RESPUESTA_RAPIDA } from "@/lib/chat"

interface ChatInputBarProps {
  onEnviar: (texto: string) => void
  deshabilitado: boolean
}

export function ChatInputBar({ onEnviar, deshabilitado }: ChatInputBarProps) {
  const [texto, setTexto] = useState("")

  function enviar(valor: string) {
    const limpio = valor.trim()
    if (!limpio || deshabilitado) return
    onEnviar(limpio)
    setTexto("")
  }

  return (
    <div className="border-t border-outline-variant bg-surface-container-lowest pt-2 pb-margin-mobile">
      {texto === "" && (
        <div className="hide-scrollbar flex gap-2 overflow-x-auto px-margin-mobile py-2">
          {CHIPS_RESPUESTA_RAPIDA.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => enviar(chip)}
              className="whitespace-nowrap rounded-full border border-primary px-4 py-2 font-sans text-[14px] text-primary"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 px-margin-mobile pt-2">
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviar(texto)}
          placeholder="Escríbeme algo…"
          className="h-12 flex-1 rounded-full border-none bg-surface-container-low px-5 font-sans text-[16px] text-on-surface outline-none placeholder:text-on-surface-variant/60"
        />
        <button
          type="button"
          aria-label="Enviar mensaje"
          onClick={() => enviar(texto)}
          disabled={deshabilitado || texto.trim() === ""}
          className="material-symbols-outlined flex h-12 w-12 items-center justify-center rounded-full bg-primary-container text-on-primary shadow-sm transition-transform active:scale-90 disabled:opacity-40"
        >
          arrow_upward
        </button>
      </div>
    </div>
  )
}
