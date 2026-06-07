import type { Recomendacion, PerfilCliente } from "./types"

export async function obtenerExplicacion(
  recomendacion: Recomendacion,
  perfil: PerfilCliente
): Promise<string | null> {
  try {
    const res = await fetch("/api/explicar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recomendacion, perfil }),
    })

    if (!res.ok) return null

    const data = (await res.json()) as { descripcion?: string | null }
    return data.descripcion ?? null
  } catch {
    return null
  }
}
