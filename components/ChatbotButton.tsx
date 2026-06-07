"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { calcularTicketPromedio } from "@/lib/recommendation-engine"
import { MOCK_STATE } from "@/lib/mock-data"
import { getMeta } from "@/lib/state"
import { enviarMensaje, MENSAJE_INICIAL } from "@/lib/chat"
import { detenerEscucha, detenerHabla, hablar, iniciarEscucha, mensajeErrorEscucha, soportaVoz } from "@/lib/voice"
import type { EstadoVoz, Mensaje } from "@/lib/types"
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

  const [tieneSoporteVoz, setTieneSoporteVoz] = useState(false)
  const [modoVoz, setModoVoz] = useState(false)
  const [estadoVoz, setEstadoVoz] = useState<EstadoVoz>("idle")
  const [transcript, setTranscript] = useState("")
  const [errorVoz, setErrorVoz] = useState<string | null>(null)
  const [hablanteVoz, setHablanteVoz] = useState<"usuario" | "asistente">("usuario")

  // Chrome/Android puede cortar el reconocimiento solo por silencio (onFin) sin que
  // el usuario toque "terminar" — esta ref evita procesar la misma sesión dos veces
  // (una vez por resultado final, otra por el corte automático).
  const transcriptRef = useRef("")
  const sesionVozProcesadaRef = useRef(true)
  const escuchaActivaRef = useRef(false)

  // Se incrementa al cerrar el chat o salir del modo voz — invalida respuestas
  // async en curso para que no "revivan" el modo voz tras cambiar de contexto.
  const generacionVozRef = useRef(0)

  useEffect(() => setTieneSoporteVoz(soportaVoz()), [])

  // Corta cualquier escucha/habla en curso al cerrar el chat o desmontar — evita procesos de audio colgados.
  useEffect(() => {
    if (!abierto) {
      generacionVozRef.current += 1
      sesionVozProcesadaRef.current = true
      escuchaActivaRef.current = false
      detenerEscucha()
      detenerHabla()
      setModoVoz(false)
      setEstadoVoz("idle")
      setErrorVoz(null)
    }
    return () => {
      generacionVozRef.current += 1
      sesionVozProcesadaRef.current = true
      escuchaActivaRef.current = false
      detenerEscucha()
      detenerHabla()
    }
  }, [abierto])

  async function obtenerRespuesta(texto: string) {
    return enviarMensaje(texto, {
      nombre: MOCK_STATE.perfil.nombre,
      meta: meta ?? "crecer su negocio",
      ticketPromedio: calcularTicketPromedio(MOCK_STATE.historialPedidos),
    })
  }

  async function manejarEnvio(texto: string) {
    setMensajes((prev) => [...prev, { rol: "usuario", texto, hora: horaActual() }])
    setEscribiendo(true)
    const respuesta = await obtenerRespuesta(texto)
    setMensajes((prev) => [...prev, { rol: "asistente", texto: respuesta, hora: horaActual() }])
    setEscribiendo(false)
  }

  async function manejarRespuestaVoz(textoUsuario: string) {
    const generacion = generacionVozRef.current
    setMensajes((prev) => [...prev, { rol: "usuario", texto: textoUsuario, hora: horaActual() }])
    setEstadoVoz("pensando")
    const respuesta = await obtenerRespuesta(textoUsuario)
    setMensajes((prev) => [...prev, { rol: "asistente", texto: respuesta, hora: horaActual() }])
    // Si el usuario cerró el chat o salió del modo voz mientras esperábamos la
    // respuesta, no la "hablamos" — evita revivir el modo voz fuera de contexto.
    if (generacionVozRef.current !== generacion) return
    setHablanteVoz("asistente")
    setTranscript(respuesta)
    setEstadoVoz("respondiendo")
    hablar(respuesta, { onFin: () => setEstadoVoz("idle") })
  }

  // Procesa la transcripción de la sesión de escucha actual una sola vez,
  // sin importar si llegó por un resultado final, un toque manual o un corte automático.
  function procesarTranscriptVoz(texto: string) {
    if (sesionVozProcesadaRef.current) return
    sesionVozProcesadaRef.current = true
    escuchaActivaRef.current = false
    detenerEscucha()
    const textoUsuario = texto.trim()
    if (textoUsuario) manejarRespuestaVoz(textoUsuario)
    else setEstadoVoz("idle")
  }

  function manejarToqueBotonVoz() {
    if (estadoVoz === "escuchando") {
      procesarTranscriptVoz(transcriptRef.current)
      return
    }

    // escuchaActivaRef evita que dos toques rápidos (antes del re-render) inicien
    // dos sesiones de reconocimiento a la vez.
    if (estadoVoz === "idle" && !escuchaActivaRef.current) {
      escuchaActivaRef.current = true
      sesionVozProcesadaRef.current = false
      transcriptRef.current = ""
      generacionVozRef.current += 1
      setHablanteVoz("usuario")
      setTranscript("")
      setErrorVoz(null)
      setEstadoVoz("escuchando")
      iniciarEscucha({
        onResultado: ({ transcripcion, esFinal }) => {
          transcriptRef.current = transcripcion
          setTranscript(transcripcion)
          if (esFinal) procesarTranscriptVoz(transcripcion)
        },
        onError: (codigo) => {
          sesionVozProcesadaRef.current = true
          escuchaActivaRef.current = false
          setEstadoVoz("idle")
          setErrorVoz(mensajeErrorEscucha(codigo))
        },
        // El reconocimiento puede terminar solo por silencio (Android/Chrome) sin
        // disparar un resultado final — usamos lo último capturado en ese caso.
        onFin: () => procesarTranscriptVoz(transcriptRef.current),
      })
    }
  }

  function alternarModoVoz() {
    generacionVozRef.current += 1
    sesionVozProcesadaRef.current = true
    escuchaActivaRef.current = false
    detenerEscucha()
    detenerHabla()
    setEstadoVoz("idle")
    setTranscript("")
    setErrorVoz(null)
    setModoVoz((prev) => !prev)
  }

  return (
    <>
      <button
        type="button"
        aria-label="Abrir chat con tuAliado"
        onClick={() => setAbierto(true)}
        // bottom-[136px]: deja libre la barra de CTA fija (~124px) de Diagnóstico/Recomendaciones/Registro
        className="fixed right-6 bottom-[136px] z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary-container text-on-primary shadow-[0_4px_14px_rgba(249,115,22,0.3)] transition-transform active:scale-90"
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
          soportaVoz={tieneSoporteVoz}
          modoVoz={modoVoz}
          onToggleModoVoz={alternarModoVoz}
          estadoVoz={estadoVoz}
          transcript={transcript}
          errorVoz={errorVoz}
          hablanteVoz={hablanteVoz}
          onTocarBotonVoz={manejarToqueBotonVoz}
        />
      )}
    </>
  )
}
