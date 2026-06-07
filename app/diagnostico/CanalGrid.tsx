interface CanalPillProps {
  icono: string
  etiqueta: string
  porcentaje: number
}

function CanalPill({ icono, etiqueta, porcentaje }: CanalPillProps) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-outline-variant bg-surface-container-low p-stack-sm text-center">
      <span className="material-symbols-outlined mb-unit flex h-10 w-10 items-center justify-center rounded-full bg-secondary-container/50 text-secondary">
        {icono}
      </span>
      <span className="font-sans text-caption text-on-surface-variant">{etiqueta}</span>
      <span className="mt-1 font-sans text-label-md text-on-surface">{porcentaje}%</span>
    </div>
  )
}

interface CanalGridProps {
  porcentajeApp: number
}

export function CanalGrid({ porcentajeApp }: CanalGridProps) {
  return (
    <section className="grid grid-cols-2 gap-gutter">
      <CanalPill icono="storefront" etiqueta="Por app" porcentaje={porcentajeApp} />
      <CanalPill icono="groups" etiqueta="Por promotor" porcentaje={100 - porcentajeApp} />
    </section>
  )
}
