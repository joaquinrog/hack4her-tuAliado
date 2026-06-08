"use client"

import Link from "next/link"
import { Suspense, useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { calcularRecomendaciones } from "@/lib/recommendation-engine"
import { MOCK_STATE } from "@/lib/mock-data"
import { PREGUNTA_META } from "@/lib/onboarding-questions"
import { buildUrl, cargarBaseline, getMeta, guardarBaseline } from "@/lib/state"
import { obtenerExplicacion } from "@/lib/explicaciones"
import { RecomendacionCard } from "@/components/RecomendacionCard"
import type { EstrategiaRiesgo, MetaCliente } from "@/lib/types"

const ENFOQUE_POR_META: Record<MetaCliente, Record<EstrategiaRiesgo, { titulo: string; texto: string }>> = {
  vender_mas: {
    facil: {
      titulo: "Tu plan más fácil",
      texto: "Empieza con una promo segura y un pedido por la app.",
    },
    ganancia: {
      titulo: "Tu plan con más ganancia",
      texto: "Primero activa puntos y usa productos de alta rotación.",
    },
  },
  aprovechar_promos: {
    facil: {
      titulo: "Promos fáciles de usar",
      texto: "Arranca con productos que Raúl ya compra seguido.",
    },
    ganancia: {
      titulo: "Promos con mayor retorno",
      texto: "Ordenamos por ahorro real calculado desde el costo Tuali.",
    },
  },
  surtir_tienda: {
    facil: {
      titulo: "Surtido sin complicarte",
      texto: "Primero repite lo que ya vendes y evita faltantes.",
    },
    ganancia: {
      titulo: "Surtido con mejor retorno",
      texto: "Combina pedido sugerido con promos compatibles.",
    },
  },
  como_voy: {
    facil: {
      titulo: "Mide tu tienda fácil",
      texto: "Registra el día y deja que tuAliado haga las cuentas.",
    },
    ganancia: {
      titulo: "Mide lo que más suma",
      texto: "Prioriza puntos, pedidos por app y señales de avance.",
    },
  },
}

const ESTRATEGIAS: { valor: EstrategiaRiesgo; label: string }[] = [
  { valor: "facil", label: "Más fácil" },
  { valor: "ganancia", label: "Más ganancia" },
]

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
  const [estrategia, setEstrategia] = useState<EstrategiaRiesgo>("facil")
  const [descripciones, setDescripciones] = useState<Record<string, string | null>>({})

  const resultado = useMemo(
    () => (meta ? calcularRecomendaciones(meta, MOCK_STATE, estrategia) : null),
    [meta, estrategia]
  )
  const recomendaciones = useMemo(() => resultado?.recomendaciones ?? [], [resultado])

  useEffect(() => {
    if (resultado && !cargarBaseline()) guardarBaseline(resultado.baseline)
  }, [resultado])

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
  }, [meta, recomendaciones])

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
  const enfoque = ENFOQUE_POR_META[meta][estrategia]

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
          <span className="inline-flex w-max max-w-full items-center gap-stack-sm rounded-full bg-surface-container px-stack-sm py-unit font-sans text-label-md text-on-surface">
            <span aria-hidden>{opcionMeta.emoji}</span>
            Meta: {opcionMeta.label}
          </span>
        )}

        <section className="rounded-2xl bg-primary-container/10 p-stack-md">
          <p className="mb-unit font-sans text-caption text-primary">Tu plan</p>
          <h2 className="mb-unit font-sans text-headline-lg-mobile text-on-background">{enfoque.titulo}</h2>
          <p className="font-sans text-body-md text-on-surface-variant">{enfoque.texto}</p>
        </section>

        <div className="grid grid-cols-2 rounded-full bg-surface-container p-unit" role="group" aria-label="Estrategia">
          {ESTRATEGIAS.map((opcion) => {
            const activa = estrategia === opcion.valor
            return (
              <button
                key={opcion.valor}
                type="button"
                aria-pressed={activa}
                onClick={() => setEstrategia(opcion.valor)}
                className={`h-[44px] rounded-full font-sans text-label-md transition-colors ${
                  activa ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant"
                }`}
              >
                {opcion.label}
              </button>
            )
          })}
        </div>

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
