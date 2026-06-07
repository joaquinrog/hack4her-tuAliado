import type { ChatContexto } from "./types"

export const MENSAJE_INICIAL =
  "Hola, soy tuAliado 👋 ¿Tienes dudas sobre alguna de tus recomendaciones?"

export const CHIPS_RESPUESTA_RAPIDA = [
  "¿Qué es esta promo?",
  "¿Cómo activo los retos?",
  "Explícame más simple",
] as const

export async function enviarMensaje(mensaje: string, contexto: ChatContexto): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: mensaje, contexto }),
  })

  if (!res.ok) return "No pude generar una respuesta. Intenta de nuevo."

  const data = (await res.json()) as { reply?: string }
  return data.reply ?? "No pude generar una respuesta."
}
