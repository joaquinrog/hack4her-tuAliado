import { NextRequest, NextResponse } from "next/server"
import { generarContenidoGemini } from "@/lib/gemini"

interface ChatRequest {
  message: string
  contexto?: { nombre: string; meta: string; ticketPromedio: number }
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as ChatRequest
  const { message, contexto } = body

  const nombre = contexto?.nombre ?? "el dueño"
  const meta = contexto?.meta ?? "crecer su negocio"
  const ticket = contexto?.ticketPromedio ?? 450

  const prompt = `Eres tuAliado, asistente de crecimiento de ${nombre} en Tuali.
Meta del cliente: ${meta}. Ticket promedio: $${ticket} MXN.
Responde en máximo 2 oraciones cortas en español, sin tecnicismos. Sé amigable y práctico.
Pregunta: ${message}`

  const reply = await generarContenidoGemini(prompt, { maxOutputTokens: 100, temperature: 0.4 })

  if (!reply) {
    return NextResponse.json({ reply: "No pude generar una respuesta. Intenta de nuevo." })
  }

  return NextResponse.json({ reply })
}
