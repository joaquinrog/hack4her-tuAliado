import type { Recomendacion, PerfilCliente } from "./types"

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent"

const GEMINI_API_KEYS = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
  process.env.GEMINI_API_KEY_4,
  process.env.GEMINI_API_KEY_5,
  process.env.GEMINI_API_KEY_6,
].filter((key): key is string => Boolean(key))

interface GenerationConfig {
  maxOutputTokens: number
  temperature: number
}

export async function generarContenidoGemini(
  prompt: string,
  generationConfig: GenerationConfig
): Promise<string> {
  for (const apiKey of GEMINI_API_KEYS) {
    const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig,
      }),
    })

    if (!res.ok) continue

    const data = (await res.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[]
    }
    return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? ""
  }

  return ""
}

async function llamarGemini(prompt: string): Promise<string> {
  return generarContenidoGemini(prompt, { maxOutputTokens: 80, temperature: 0.3 })
}

export async function explicarRecomendacion(
  rec: Recomendacion,
  perfil: PerfilCliente
): Promise<string> {
  const prompt = `Eres un asistente de negocios para ${perfil.nombre}, dueño de una tienda de abarrotes.
En 1 oración corta (máximo 20 palabras), explica por qué le conviene: "${rec.titulo}".
Habla en español, tutéalo, sin tecnicismos.`

  return llamarGemini(prompt)
}

export async function responderChat(
  mensaje: string,
  ctx: { nombre: string; meta: string; ticketPromedio: number }
): Promise<string> {
  const prompt = `Eres tuAliado, el asistente de crecimiento de ${ctx.nombre} en Tuali.
Meta del cliente: ${ctx.meta}. Ticket promedio actual: $${ctx.ticketPromedio} MXN.
Responde en 1-2 oraciones cortas en español, sin tecnicismos. Sé amigable y práctico.
Pregunta del cliente: ${mensaje}`

  return llamarGemini(prompt)
}
