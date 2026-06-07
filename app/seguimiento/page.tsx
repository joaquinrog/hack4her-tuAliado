"use client"

import Link from "next/link"
import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { calcularDiagnostico } from "@/lib/recommendation-engine"
import { MOCK_STATE } from "@/lib/mock-data"
import { PREGUNTA_META } from "@/lib/onboarding-questions"
import { buildUrl, cargarBaseline, cargarEntradasDiarias, getMeta } from "@/lib/state"
import { ProgressBar } from "@/components/ProgressBar"
import { ComparacionCanal } from "./ComparacionCanal"
import { PromosCard } from "./PromosCard"

export default function Seguimiento() {
  return (
    <Suspense fallback={null}>
      <SeguimientoContent />
    </Suspense>
  )
}

function SeguimientoContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const meta = getMeta(searchParams)
  const baseline = cargarBaseline()

  if (!meta || !baseline) {
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
  const objetivo = calcularDiagnostico(MOCK_STATE).ticketObjetivoSugerido
  const entradas = cargarEntradasDiarias()
  const conPedido = entradas.filter((e) => e.hizoPedido)
  const porcentajeApp =
    conPedido.length > 0
      ? Math.round((conPedido.filter((e) => e.pidioporApp === true).length / conPedido.length) * 100)
      : null
  const promosAplicadas = entradas.filter((e) => e.aplicoPromo === true).length

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
        <h1 className="font-sans text-body-lg text-on-surface">Tu avance</h1>
      </header>

      <main className="flex flex-1 flex-col gap-stack-md px-margin-mobile pt-stack-md pb-[120px]">
        {opcionMeta && (
          <span className="inline-flex w-max items-center gap-stack-sm rounded-full bg-surface-container px-stack-sm py-unit font-sans text-label-md text-on-surface">
            <span aria-hidden>{opcionMeta.emoji}</span>
            Meta: {opcionMeta.label}
          </span>
        )}

        <section className="flex flex-col gap-stack-sm rounded-2xl border border-outline-variant bg-surface-container-lowest p-stack-md text-center">
          <h2 className="font-sans text-caption text-on-surface-variant">Ticket promedio</h2>
          <p className="font-sans text-display-mobile text-primary-container">${baseline.ticketPromedio}</p>
          <p className="font-sans text-caption text-on-surface-variant">Meta: ${objetivo}</p>
          <ProgressBar current={baseline.ticketPromedio} target={objetivo} label="del objetivo" />
        </section>

        <ComparacionCanal porcentajeApp={porcentajeApp} />
        <PromosCard cantidad={promosAplicadas} />
      </main>

      <div className="fixed bottom-0 w-full max-w-[430px] bg-gradient-to-t from-background via-background to-transparent px-margin-mobile pt-stack-lg pb-margin-mobile">
        <button
          type="button"
          onClick={() => router.push(buildUrl("/registro", meta))}
          className="flex h-[56px] w-full items-center justify-center rounded-2xl bg-primary-container font-sans text-label-md text-on-primary shadow-[0_4px_14px_rgba(249,115,22,0.1)] transition-transform active:scale-95"
        >
          Registrar mi día
        </button>
      </div>
    </div>
  )
}
