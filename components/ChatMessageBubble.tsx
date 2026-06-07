import type { Mensaje } from "@/lib/types"

interface ChatMessageBubbleProps {
  mensaje: Mensaje
}

export function ChatMessageBubble({ mensaje }: ChatMessageBubbleProps) {
  const esUsuario = mensaje.rol === "usuario"

  return (
    <div className={`flex ${esUsuario ? "justify-end" : ""}`}>
      <div
        className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
          esUsuario
            ? "rounded-tr-none bg-primary-container text-on-primary"
            : "rounded-tl-none border border-outline-variant bg-surface-container-lowest text-on-surface"
        }`}
      >
        <p className="font-sans text-[15px] leading-relaxed">{mensaje.texto}</p>
      </div>
    </div>
  )
}

export function ChatTypingBubble() {
  return (
    <div className="flex h-[44px] w-[60px] items-center justify-center rounded-2xl rounded-tl-none border border-outline-variant bg-surface-container-lowest shadow-sm">
      <span className="flex gap-1">
        <span className="h-2 w-2 animate-pulse rounded-full bg-on-surface-variant/40" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-on-surface-variant/40 [animation-delay:0.2s]" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-on-surface-variant/40 [animation-delay:0.4s]" />
      </span>
    </div>
  )
}
