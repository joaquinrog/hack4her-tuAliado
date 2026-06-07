"use client"

import Link from "next/link"
import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  actualizarRacha,
  buildUrl,
  getMeta,
  guardarEntradaDiaria,
} from "@/lib/state"
import type { EntradaDiaria, MetaCliente } from "@/lib/types"
import { OpcionPaso } from "./OpcionPaso"
import { PasoRegistro } from "./PasoRegistro"

type Paso = "dia" | "pedido" | "meta" | "cierre"
type ComoEstuvoElDia = EntradaDiaria["comoEstuvoElDia"]
type RespuestaPedido = "app" | "promotor" | "no"

interface RespuestasRegistro {
  comoEstuvoElDia: ComoEstuvoElDia | null
  pedido: RespuestaPedido | null
  respuestaMeta: boolean | null
}

const RESPUESTAS_INICIALES: RespuestasRegistro = {
  comoEstuvoElDia: null,
  pedido: null,
  respuestaMeta: null,
}

const PREGUNTA_META: Record<
  Exclude<MetaCliente, "como_voy">,
  { texto: string; campo: "sePidioAlgoQueNoTenia" | "aplicoPromo" | "seAcaboAlgoHoy" }
> = {
  vender_mas: { texto: "¿Te pidieron algo que no tenías?", campo: "sePidioAlgoQueNoTenia" },
  aprovechar_promos: { texto: "¿Usaste alguna promoción hoy?", campo: "aplicoPromo" },
  surtir_tienda: { texto: "¿Se te acabó algo hoy?", campo: "seAcaboAlgoHoy" },
}

export default function Registro() {
  return (
    <Suspense fallback={null}>
      <RegistroContent />
    </Suspense>
  )
}

function RegistroContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const meta = getMeta(searchParams)

  const [paso, setPaso] = useState<Paso>("dia")
  const [rachaActual, setRachaActual] = useState<number | null>(null)
  const [respuestas, setRespuestas] = useState<RespuestasRegistro>(RESPUESTAS_INICIALES)

  if (!meta) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-stack-md bg-background px-margin-mobile text-center">
        <p className="font-sans text-body-md text-on-surface-variant">Primero elige tu meta principal.</p>
        <Link
          href="/onboarding"
          className="flex h-[56px] w-full items-center justify-center rounded-xl bg-primary font-sans text-label-md text-on-primary"
        >
          Ir al inicio
        </Link>
      </div>
    )
  }

  const tienePreguntaMeta = meta !== "como_voy"
  const totalPasos = tienePreguntaMeta ? 3 : 2
  const pasoActual = paso === "dia" ? 1 : paso === "pedido" ? 2 : totalPasos

  function terminarRegistro(respuestasFinales: RespuestasRegistro) {
    if (!respuestasFinales.comoEstuvoElDia || !respuestasFinales.pedido || !meta) return

    const hizoPedido = respuestasFinales.pedido !== "no"
    const entrada: EntradaDiaria = {
      fecha: new Date().toISOString().slice(0, 10),
      comoEstuvoElDia: respuestasFinales.comoEstuvoElDia,
      hizoPedido,
      pidioporApp: hizoPedido ? respuestasFinales.pedido === "app" : null,
      sePidioAlgoQueNoTenia: meta === "vender_mas" ? respuestasFinales.respuestaMeta : null,
      aplicoPromo: meta === "aprovechar_promos" ? respuestasFinales.respuestaMeta : null,
      seAcaboAlgoHoy: meta === "surtir_tienda" ? respuestasFinales.respuestaMeta : null,
    }

    guardarEntradaDiaria(entrada)
    const racha = actualizarRacha(entrada.fecha)
    setRachaActual(racha.rachaActual)
    setPaso("cierre")

    window.setTimeout(() => {
      router.push(buildUrl("/seguimiento", meta))
    }, 1200)
  }

  function seleccionarDia(comoEstuvoElDia: ComoEstuvoElDia) {
    setRespuestas((actual) => ({ ...actual, comoEstuvoElDia }))
    setPaso("pedido")
  }

  function seleccionarPedido(pedido: RespuestaPedido) {
    const actualizado = { ...respuestas, pedido }
    setRespuestas(actualizado)

    if (tienePreguntaMeta) {
      setPaso("meta")
      return
    }

    terminarRegistro(actualizado)
  }

  function seleccionarRespuestaMeta(respuestaMeta: boolean) {
    const actualizado = { ...respuestas, respuestaMeta }
    setRespuestas(actualizado)
    terminarRegistro(actualizado)
  }

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
          <h1 className="font-sans text-body-lg text-on-surface">Registro del día</h1>
          <p className="font-sans text-caption text-on-surface-variant">
            {paso === "cierre" ? "Listo por hoy" : `${pasoActual} de ${totalPasos}`}
          </p>
        </div>
      </header>

      <main className="flex flex-1 flex-col px-margin-mobile pt-stack-lg pb-[120px]">
        {paso === "dia" && (
          <PasoRegistro titulo="¿Cómo estuvo el día en tu tienda?">
            <OpcionPaso
              icono="sentiment_very_satisfied"
              label="Muy bien"
              seleccionado={respuestas.comoEstuvoElDia === "bien"}
              onClick={() => seleccionarDia("bien")}
            />
            <OpcionPaso
              icono="sentiment_neutral"
              label="Regular"
              seleccionado={respuestas.comoEstuvoElDia === "regular"}
              onClick={() => seleccionarDia("regular")}
            />
            <OpcionPaso
              icono="sentiment_dissatisfied"
              label="Mal"
              seleccionado={respuestas.comoEstuvoElDia === "mal"}
              onClick={() => seleccionarDia("mal")}
            />
          </PasoRegistro>
        )}

        {paso === "pedido" && (
          <PasoRegistro titulo="¿Pediste productos a Tuali hoy?">
            <OpcionPaso
              icono="shopping_cart"
              label="Sí, por la app"
              seleccionado={respuestas.pedido === "app"}
              onClick={() => seleccionarPedido("app")}
            />
            <OpcionPaso
              icono="support_agent"
              label="Sí, con el promotor"
              seleccionado={respuestas.pedido === "promotor"}
              onClick={() => seleccionarPedido("promotor")}
            />
            <OpcionPaso
              icono="remove_shopping_cart"
              label="No pedí hoy"
              seleccionado={respuestas.pedido === "no"}
              onClick={() => seleccionarPedido("no")}
            />
          </PasoRegistro>
        )}

        {paso === "meta" && meta !== "como_voy" && (
          <PasoRegistro titulo={PREGUNTA_META[meta].texto}>
            <OpcionPaso
              icono="check_circle"
              label="Sí"
              seleccionado={respuestas.respuestaMeta === true}
              onClick={() => seleccionarRespuestaMeta(true)}
            />
            <OpcionPaso
              icono="cancel"
              label="No"
              seleccionado={respuestas.respuestaMeta === false}
              onClick={() => seleccionarRespuestaMeta(false)}
            />
          </PasoRegistro>
        )}

        {paso === "cierre" && (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <span
              className="material-symbols-outlined mb-stack-md text-[64px] text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <h2 className="mb-2 font-sans text-headline-lg-mobile text-on-background">
              ¡Llevas {rachaActual ?? 1} días seguidos!
            </h2>
            <p className="font-sans text-body-md text-on-surface-variant">Guardamos tu registro de hoy.</p>
          </div>
        )}
      </main>
    </div>
  )
}
