"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { PREGUNTA_META } from "@/lib/onboarding-questions"
import { buildUrl } from "@/lib/state"
import type { MetaCliente } from "@/lib/types"
import { MetaOptionButton } from "./MetaOptionButton"

const ICONOS: Record<MetaCliente, string> = {
  vender_mas: "trending_up",
  aprovechar_promos: "sell",
  surtir_tienda: "inventory_2",
  como_voy: "bar_chart",
}

export default function Onboarding() {
  const router = useRouter()
  const [meta, setMeta] = useState<MetaCliente | null>(null)

  return (
    <div className="relative flex flex-1 flex-col bg-surface text-on-surface">
      <header className="flex flex-col items-center px-margin-mobile pt-8 pb-4">
        <span className="mb-stack-md rounded-full bg-surface-container-high px-3 py-1 font-sans text-caption text-on-surface-variant">
          1 de 1
        </span>
        <Image src="/logo-mark.svg" alt="tuAliado" width={32} height={32} className="mb-stack-md h-8 w-auto" />
        <h1 className="mb-2 text-center font-sans text-headline-lg-mobile text-on-background">
          ¿Qué quieres lograr?
        </h1>
        <p className="text-center font-sans text-body-md text-on-surface-variant">Elige tu meta principal</p>
      </header>

      <main className="flex-1 overflow-y-auto px-margin-mobile pb-[100px]">
        <div className="mt-stack-sm grid grid-cols-2 gap-4">
          {PREGUNTA_META.opciones.map((opcion) => (
            <MetaOptionButton
              key={opcion.valor}
              icono={ICONOS[opcion.valor]}
              label={opcion.label}
              seleccionado={meta === opcion.valor}
              onClick={() => setMeta(opcion.valor)}
            />
          ))}
        </div>
      </main>

      <footer className="absolute bottom-0 w-full bg-gradient-to-t from-surface via-surface to-transparent px-margin-mobile py-6">
        <button
          type="button"
          disabled={!meta}
          onClick={() => meta && router.push(buildUrl("/diagnostico", meta))}
          className="flex h-[56px] w-full items-center justify-center rounded-xl bg-primary font-sans text-label-md text-on-primary transition-transform active:scale-95 disabled:opacity-40"
        >
          Continuar
        </button>
      </footer>
    </div>
  )
}
