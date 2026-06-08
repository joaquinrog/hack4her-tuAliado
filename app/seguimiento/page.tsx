"use client"

import Link from "next/link"
import { Suspense, useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { calcularDiagnostico } from "@/lib/recommendation-engine"
import { MOCK_STATE } from "@/lib/mock-data"
import { PREGUNTA_META } from "@/lib/onboarding-questions"
import {
  buildUrl,
  cargarBaseline,
  cargarEntradasDiarias,
  cargarRacha,
  getMeta,
  hayHistorialSembrado,
  limpiarHistorialDemo,
  sembrarHistorialDemo,
} from "@/lib/state"
import type { BaselineSnapshot } from "@/lib/types"
import { ProgressBar } from "@/components/ProgressBar"
import { ComparacionCanal } from "./ComparacionCanal"
import { PromosCard } from "./PromosCard"

const DURACION_GESTO_MS = 800

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
  const [baseline, setBaseline] = useState<BaselineSnapshot | null | undefined>(undefined)
  const [, setVersion] = useState(0)
  const presionTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Lectura única de localStorage al montar: debe ir en efecto (no en lazy initializer)
    // para que el primer render coincida con el del servidor y evite mismatch de hidratación.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBaseline(cargarBaseline())
  }, [])

  function iniciarGestoDemo() {
    presionTimer.current = setTimeout(() => {
      if (hayHistorialSembrado()) limpiarHistorialDemo()
      else sembrarHistorialDemo()
      setVersion((v) => v + 1)
    }, DURACION_GESTO_MS)
  }

  function cancelarGestoDemo() {
    if (presionTimer.current) clearTimeout(presionTimer.current)
    presionTimer.current = null
  }

  if (baseline === undefined) {
    return null
  }

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
  const racha = cargarRacha()
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
        <h1
          className="select-none font-sans text-body-lg text-on-surface"
          onPointerDown={iniciarGestoDemo}
          onPointerUp={cancelarGestoDemo}
          onPointerLeave={cancelarGestoDemo}
        >
          Tu avance
        </h1>
      </header>

      <main className="flex flex-1 flex-col gap-stack-md px-margin-mobile pt-stack-md pb-[120px]">
        <div className="flex flex-wrap items-center gap-stack-sm">
          {opcionMeta && (
            <span className="inline-flex w-max items-center gap-stack-sm rounded-full bg-surface-container px-stack-sm py-unit font-sans text-label-md text-on-surface">
              <span aria-hidden>{opcionMeta.emoji}</span>
              Meta: {opcionMeta.label}
            </span>
          )}
          {racha.rachaActual > 0 && (
            <span className="inline-flex w-max items-center gap-stack-sm rounded-full bg-surface-container px-stack-sm py-unit font-sans text-label-md text-on-surface">
              <span className="material-symbols-outlined text-[18px] text-primary" aria-hidden style={{ fontVariationSettings: "'FILL' 1" }}>
                local_fire_department
              </span>
              {racha.rachaActual === 1 ? "1 día seguido" : `${racha.rachaActual} días seguidos`}
            </span>
          )}
        </div>

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
