"use client"

import Link from "next/link"
import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { calcularRecomendaciones } from "@/lib/recommendation-engine"
import { MOCK_STATE } from "@/lib/mock-data"
import { PREGUNTA_META } from "@/lib/onboarding-questions"
import { buildUrl, cargarBaseline, getMeta, guardarBaseline } from "@/lib/state"
import { obtenerExplicacion } from "@/lib/explicaciones"
import { RecomendacionCard } from "@/components/RecomendacionCard"
import type { MetaCliente } from "@/lib/types"

const ENFOQUE_POR_META: Record<MetaCliente, { titulo: string; texto: string }> = {
  vender_mas: {
    titulo: "Sube tu venta esta semana",
    texto: "Empieza con una promo segura y mueve más pedidos a la app.",
  },
  aprovechar_promos: {
    titulo: "Usa promos que ya tienes",
    texto: "El plan prioriza descuentos activos para que no dejes dinero en la mesa.",
  },
  surtir_tienda: {
    titulo: "Evita quedarte sin producto",
    texto: "El plan se enfoca en surtido y hábitos de pedido más constantes.",
  },
  como_voy: {
    titulo: "Mide cómo va tu tienda",
    texto: "El plan empieza con acciones simples para tener más señales de avance.",
  },
}

export default function Recomendaciones() {
  return (
    <Suspense fallback={null}>
      <RecomendacionesContent />
    </Suspense>
  )
}

function RecomendacionesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const meta = getMeta(searchParams)
  const [descripciones, setDescripciones] = useState<Record<string, string | null>>({})
  const resultado = meta ? calcularRecomendaciones(meta, MOCK_STATE) : null
  const recomendaciones = resultado?.recomendaciones ?? []

  useEffect(() => {
    if (resultado && !cargarBaseline()) guardarBaseline(resultado.baseline)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta])

  useEffect(() => {
    if (!meta) return
    let cancelado = false

    recomendaciones.forEach((rec) => {
      obtenerExplicacion(rec, MOCK_STATE.perfil).then((descripcion) => {
        if (!cancelado) setDescripciones((prev) => ({ ...prev, [rec.id]: descripcion }))
      })
    })

    return () => {
      cancelado = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta])

  if (!meta) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-stack-md bg-background px-margin-mobile text-center">
        <p className="font-sans text-body-md text-on-surface-variant">
          Primero elige tu meta principal.
        </p>
        <Link
          href="/onboarding"
          className="flex h-[56px] w-full items-center justify-center rounded-xl bg-primary font-sans text-label-md text-on-primary"
        >
          Ir al inicio
        </Link>
      </div>
    )
  }

  const opcionMeta = PREGUNTA_META.opciones.find((o) => o.valor === meta)
  const enfoque = ENFOQUE_POR_META[meta]

  return (
    <div className="relative flex flex-1 flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-stack-sm border-b border-outline-variant bg-surface px-margin-mobile">
        <button
          type="button"
          aria-label="Regresar"
          onClick={() => router.back()}
          className="material-symbols-outlined flex h-[44px] w-[44px] items-center justify-center rounded-full text-primary"
        >
          arrow_back
        </button>
        <h1 className="font-sans text-body-lg text-on-surface">Tus recomendaciones</h1>
      </header>

      <main className="flex flex-1 flex-col gap-stack-md px-margin-mobile pt-stack-md pb-[120px]">
        {opcionMeta && (
          <span className="inline-flex w-max items-center gap-stack-sm rounded-full bg-surface-container px-stack-sm py-unit font-sans text-label-md text-on-surface">
            <span aria-hidden>{opcionMeta.emoji}</span>
            Meta: {opcionMeta.label}
          </span>
        )}

        <section className="rounded-2xl bg-primary-container/10 p-stack-md">
          <p className="mb-unit font-sans text-caption text-primary">Tu plan</p>
          <h2 className="mb-unit font-sans text-headline-lg-mobile text-on-background">{enfoque.titulo}</h2>
          <p className="font-sans text-body-md text-on-surface-variant">{enfoque.texto}</p>
        </section>

        {recomendaciones.map((rec) => (
          <RecomendacionCard
            key={rec.id}
            recomendacion={rec}
            descripcion={descripciones[rec.id] ?? null}
            onAction={() => router.push(buildUrl("/registro", meta))}
          />
        ))}
      </main>
    </div>
  )
}
