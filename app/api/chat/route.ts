import { NextRequest, NextResponse } from "next/server"

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

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

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ reply: "Lo siento, no puedo responder ahora. Intenta más tarde." })
  }

  const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 100, temperature: 0.4 },
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ reply: "No pude generar una respuesta. Intenta de nuevo." })
  }

  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[]
  }
  const reply =
    data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ??
    "No pude generar una respuesta."

  return NextResponse.json({ reply })
}
