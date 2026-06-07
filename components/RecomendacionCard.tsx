import type { Recomendacion } from "@/lib/types"

const ESTILO_POR_RIESGO: Record<
  Recomendacion["nivelRiesgo"],
  {
    emoji: string
    etiqueta: string
    emojiBeneficio: string
    accent: string
    badge: string
    beneficio: string
    cta: string
  }
> = {
  bajo: {
    emoji: "🟢",
    etiqueta: "Bajo riesgo",
    emojiBeneficio: "💰",
    accent: "bg-[#22c55e]",
    badge: "bg-[#22c55e]/10 text-[#166534]",
    beneficio: "border-[#22c55e]/20 bg-[#22c55e]/5 text-[#166534]",
    cta: "bg-primary text-on-primary",
  },
  medio: {
    emoji: "🟡",
    etiqueta: "Riesgo medio",
    emojiBeneficio: "⭐",
    accent: "bg-[#eab308]",
    badge: "bg-[#eab308]/10 text-[#854d0e]",
    beneficio: "border-[#eab308]/20 bg-[#eab308]/5 text-[#854d0e]",
    cta: "border-2 border-primary bg-transparent text-primary",
  },
  alto: {
    emoji: "🟠",
    etiqueta: "Mayor ganancia",
    emojiBeneficio: "📈",
    accent: "bg-primary",
    badge: "bg-primary/10 text-primary",
    beneficio: "border-primary/20 bg-primary/5 text-primary",
    cta: "bg-transparent text-primary",
  },
}

interface RecomendacionCardProps {
  recomendacion: Recomendacion
  descripcion: string | null
}

export function RecomendacionCard({ recomendacion, descripcion }: RecomendacionCardProps) {
  const estilo = ESTILO_POR_RIESGO[recomendacion.nivelRiesgo]

  return (
    <article className="relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm">
      <div className={`absolute bottom-0 left-0 top-0 w-1.5 ${estilo.accent}`} />
      <div className="flex flex-col gap-stack-sm p-stack-sm pl-7">
        <span className={`inline-flex w-max items-center gap-stack-sm rounded-full px-stack-sm py-unit font-sans text-caption font-bold ${estilo.badge}`}>
          <span aria-hidden>{estilo.emoji}</span>
          {estilo.etiqueta}
        </span>
        <h2 className="font-sans text-body-lg font-bold text-on-surface">{recomendacion.titulo}</h2>
        {descripcion && <p className="font-sans text-body-md text-on-surface-variant">{descripcion}</p>}
        {recomendacion.beneficioEstimado && (
          <p className={`flex items-center gap-stack-sm rounded-lg border p-stack-sm font-sans text-label-md ${estilo.beneficio}`}>
            <span aria-hidden>{estilo.emojiBeneficio}</span>
            {recomendacion.beneficioEstimado}
          </p>
        )}
        <button
          type="button"
          className={`mt-unit flex h-[48px] w-full items-center justify-center rounded-full font-sans text-label-md transition-transform active:scale-[0.98] ${estilo.cta}`}
        >
          {recomendacion.accion}
        </button>
      </div>
    </article>
  )
}
