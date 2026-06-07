import { NextRequest, NextResponse } from "next/server"
import { explicarRecomendacion } from "@/lib/gemini"
import type { Recomendacion, PerfilCliente } from "@/lib/types"

interface ExplicarRequest {
  recomendacion: Recomendacion
  perfil: PerfilCliente
}

export async function POST(req: NextRequest) {
  const { recomendacion, perfil } = (await req.json()) as ExplicarRequest

  const descripcion = await explicarRecomendacion(recomendacion, perfil)

  return NextResponse.json({ descripcion: descripcion || null })
}
