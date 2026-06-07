interface BarraCanalProps {
  icono: string
  etiqueta: string
  porcentaje: number
}

function BarraCanal({ icono, etiqueta, porcentaje }: BarraCanalProps) {
  return (
    <div className="flex items-center gap-stack-sm">
      <span className="material-symbols-outlined flex h-10 w-10 items-center justify-center rounded-full bg-secondary-container/50 text-secondary">
        {icono}
      </span>
      <div className="flex flex-1 flex-col gap-unit">
        <span className="font-sans text-caption text-on-surface-variant">{etiqueta}</span>
        <div className="h-3 w-full overflow-hidden rounded-full bg-surface-container-low">
          <div
            className="h-full rounded-full bg-secondary transition-all duration-700"
            style={{ width: `${porcentaje}%` }}
          />
        </div>
      </div>
      <span className="font-sans text-label-md text-on-surface">{porcentaje}%</span>
    </div>
  )
}

interface ComparacionCanalProps {
  porcentajeApp: number | null
}

export function ComparacionCanal({ porcentajeApp }: ComparacionCanalProps) {
  return (
    <section className="flex flex-col gap-stack-sm rounded-2xl border border-outline-variant bg-surface-container-lowest p-stack-md">
      <h2 className="font-sans text-caption text-on-surface-variant">Cómo piden tus clientes</h2>
      {porcentajeApp === null ? (
        <p className="font-sans text-body-md text-on-surface-variant">
          Aún no tienes pedidos registrados esta semana.
        </p>
      ) : (
        <div className="flex flex-col gap-stack-sm">
          <BarraCanal icono="storefront" etiqueta="Por app" porcentaje={porcentajeApp} />
          <BarraCanal icono="groups" etiqueta="Por promotor" porcentaje={100 - porcentajeApp} />
        </div>
      )}
    </section>
  )
}
