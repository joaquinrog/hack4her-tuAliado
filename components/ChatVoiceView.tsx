import type { EstadoVoz } from "@/lib/types"

interface ChatVoiceViewProps {
  estado: EstadoVoz
  transcript: string
  hablante: "usuario" | "asistente"
  error: string | null
  onTocarBoton: () => void
  onCambiarAModoTexto: () => void
}

const COPY_POR_ESTADO: Record<EstadoVoz, { pill: string; pillClase: string; boton: string }> = {
  idle: { pill: "Toca para hablar", pillClase: "bg-tertiary-container/15 text-on-tertiary-container", boton: "Toca para hablar" },
  escuchando: { pill: "Te escucho…", pillClase: "bg-primary-container/15 text-on-primary-container", boton: "Toca para terminar" },
  pensando: { pill: "Pensando…", pillClase: "bg-surface-container-high text-on-surface-variant", boton: "Pensando…" },
  respondiendo: { pill: "tuAliado te responde", pillClase: "bg-tertiary-container/15 text-on-tertiary-container", boton: "tuAliado está hablando" },
}

export function ChatVoiceView({ estado, transcript, hablante, error, onTocarBoton, onCambiarAModoTexto }: ChatVoiceViewProps) {
  const copy = COPY_POR_ESTADO[estado]
  const anillosActivos = estado === "respondiendo"
  const botonDeshabilitado = estado === "pensando" || estado === "respondiendo"

  // El error solo es relevante en idle: si el usuario ya volvió a tocar el botón,
  // errorVoz se limpia y el estado avanza a "escuchando" antes de que esto se lea.
  const mostrarError = estado === "idle" && Boolean(error)
  const pillTexto = mostrarError ? error : copy.pill
  const pillClase = mostrarError ? "bg-error-container/40 text-on-error-container" : copy.pillClase

  return (
    <div className="flex flex-1 flex-col items-center justify-between px-margin-mobile py-stack-md">
      <div className="flex flex-1 flex-col items-center justify-center gap-stack-md">
        <div className="relative flex h-40 w-40 items-center justify-center">
          <span className="absolute h-32 w-32 rounded-full bg-primary-container/10" />
          <span className="material-symbols-outlined relative text-[56px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            auto_awesome
          </span>
          <div className="absolute -bottom-2 flex items-end gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`w-2 rounded-full ${i % 2 === 0 ? "bg-primary-container" : "bg-tertiary-container"} ${
                  anillosActivos ? "animate-pulse" : ""
                }`}
                style={{
                  height: anillosActivos ? `${16 + (i % 3) * 8}px` : "8px",
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        </div>

        <span className={`rounded-full px-4 py-2 font-sans text-label-md ${pillClase}`}>{pillTexto}</span>

        <div className="flex min-h-[84px] w-full flex-col items-center gap-1 text-center">
          {transcript && (
            <>
              <span className="font-sans text-[12px] text-on-surface-variant">
                {hablante === "usuario" ? "Tú dijiste" : "tuAliado dice"}
              </span>
              <p className="line-clamp-2 font-sans text-body-lg text-on-surface">{transcript}</p>
            </>
          )}
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-3">
        <button
          type="button"
          onClick={onTocarBoton}
          disabled={botonDeshabilitado}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary-container font-sans text-label-md text-on-primary shadow-[0_4px_14px_rgba(249,115,22,0.3)] transition-transform active:scale-95 disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[24px]">graphic_eq</span>
          {copy.boton}
        </button>
        <button type="button" onClick={onCambiarAModoTexto} className="font-sans text-[14px] text-on-surface-variant underline">
          ¿Prefieres escribir?
        </button>
      </div>
    </div>
  )
}
