// Wrapper de Web Speech API: reconocimiento de voz (STT) + síntesis (TTS).
// Usado por el modo voz del chat (componente ChatbotButton, F13 — diferenciador clave).

const IDIOMA_DEFECTO = "es-MX"

export interface ResultadoEscucha {
  transcripcion: string
  esFinal: boolean
}

interface OpcionesEscucha {
  idioma?: string
  onResultado: (resultado: ResultadoEscucha) => void
  onError?: (mensaje: string) => void
  onFin?: () => void
}

interface OpcionesHabla {
  idioma?: string
  onInicio?: () => void
  onFin?: () => void
}

// ── Tipos mínimos de Web Speech API (no incluidos en lib.dom.d.ts) ───────────

interface SpeechRecognitionAlternative {
  transcript: string
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean
  readonly length: number
  [index: number]: SpeechRecognitionAlternative
}

interface SpeechRecognitionResultList {
  readonly length: number
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string
}

interface SpeechRecognition extends EventTarget {
  lang: string
  continuous: boolean
  interimResults: boolean
  start(): void
  stop(): void
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
}

type SpeechRecognitionConstructor = new () => SpeechRecognition

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }
}

function obtenerConstructorReconocimiento(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null
}

// ── Soporte ───────────────────────────────────────────────────────────────────

export function soportaVoz(): boolean {
  if (typeof window === "undefined") return false
  return Boolean(obtenerConstructorReconocimiento()) && "speechSynthesis" in window
}

// ── Reconocimiento de voz (STT) ───────────────────────────────────────────────

let reconocimientoActivo: SpeechRecognition | null = null

export function iniciarEscucha(opciones: OpcionesEscucha): () => void {
  const Reconocimiento = obtenerConstructorReconocimiento()
  if (!Reconocimiento) {
    opciones.onError?.("Tu navegador no soporta reconocimiento de voz")
    return () => {}
  }

  detenerEscucha()

  const reconocimiento = new Reconocimiento()
  reconocimiento.lang = opciones.idioma ?? IDIOMA_DEFECTO
  reconocimiento.continuous = true
  reconocimiento.interimResults = true

  reconocimiento.onresult = (evento) => {
    const ultimo = evento.results[evento.results.length - 1]
    opciones.onResultado({
      transcripcion: ultimo[0].transcript,
      esFinal: ultimo.isFinal,
    })
  }
  reconocimiento.onerror = (evento) => opciones.onError?.(evento.error)
  reconocimiento.onend = () => {
    reconocimientoActivo = null
    opciones.onFin?.()
  }

  reconocimiento.start()
  reconocimientoActivo = reconocimiento
  return detenerEscucha
}

export function detenerEscucha(): void {
  reconocimientoActivo?.stop()
  reconocimientoActivo = null
}

// Traduce los códigos de error de SpeechRecognition (ver MDN SpeechRecognitionErrorEvent.error)
// a mensajes en lenguaje simple para Raúl — nunca mostrar el código técnico crudo.
export function mensajeErrorEscucha(codigo: string): string {
  switch (codigo) {
    case "no-speech":
      return "No te escuché. Intenta de nuevo."
    case "not-allowed":
    case "service-not-allowed":
      return "Necesito permiso para usar tu micrófono."
    case "audio-capture":
      return "No encontré un micrófono disponible."
    case "network":
      return "El servicio de voz no respondió. Intenta de nuevo o escribe."
    default:
      return "No pude escucharte. Intenta de nuevo o escribe."
  }
}

// ── Síntesis de voz (TTS) ─────────────────────────────────────────────────────

export function hablar(texto: string, opciones: OpcionesHabla = {}): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return

  detenerHabla()

  const mensaje = new SpeechSynthesisUtterance(texto)
  mensaje.lang = opciones.idioma ?? IDIOMA_DEFECTO
  mensaje.onstart = () => opciones.onInicio?.()
  mensaje.onend = () => opciones.onFin?.()

  window.speechSynthesis.speak(mensaje)
}

export function detenerHabla(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel()
  }
}
