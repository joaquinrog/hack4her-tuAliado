"use client"

import Link from "next/link"
import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { calcularDiagnostico } from "@/lib/recommendation-engine"
import { MOCK_STATE } from "@/lib/mock-data"
import { buildUrl, getMeta } from "@/lib/state"
import { TicketCard } from "./TicketCard"
import { CanalGrid } from "./CanalGrid"
import { OportunidadesList } from "./OportunidadesList"

export default function Diagnostico() {
  return (
    <Suspense fallback={null}>
      <DiagnosticoContent />
    </Suspense>
  )
}

function DiagnosticoContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const meta = getMeta(searchParams)

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

  const diagnostico = calcularDiagnostico(MOCK_STATE)

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
        <div className="flex flex-1 flex-col">
          <h1 className="font-sans text-body-lg text-on-surface">Tu diagnóstico</h1>
          <p className="font-sans text-caption text-on-surface-variant">Basado en tus últimos 90 días</p>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-stack-lg px-margin-mobile pt-stack-md pb-[120px]">
        <TicketCard monto={diagnostico.ticketPromedioPesos} />
        <CanalGrid porcentajeApp={MOCK_STATE.comportamiento.porcentajePedidosTuali} />
        <section className="flex items-center gap-stack-sm rounded-full border border-outline-variant bg-surface-container p-unit pr-stack-sm">
          <span className="material-symbols-outlined flex h-10 w-10 items-center justify-center rounded-full bg-[#16a34a]/10 text-[#16a34a]">
            stars
          </span>
          <div className="flex flex-1 flex-col">
            <span className="font-sans text-label-md text-[#15803d]">{diagnostico.puntosLoyalty} puntos</span>
            <span className="font-sans text-caption text-on-surface-variant">Gana con Tuali</span>
          </div>
        </section>
        <OportunidadesList oportunidades={diagnostico.oportunidadesDetectadas} />
      </main>

      <div className="fixed bottom-0 w-full max-w-[430px] bg-gradient-to-t from-background via-background to-transparent px-margin-mobile pt-stack-lg pb-margin-mobile">
        <button
          type="button"
          onClick={() => router.push(buildUrl("/recomendaciones", meta))}
          className="flex h-[56px] w-full items-center justify-center rounded-2xl bg-primary-container font-sans text-label-md text-on-primary shadow-[0_4px_14px_rgba(249,115,22,0.1)] transition-transform active:scale-95"
        >
          Ver mis recomendaciones
        </button>
      </div>
    </div>
  )
}
