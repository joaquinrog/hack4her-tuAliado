const COLORES_BULLET = ["text-error", "text-primary-container", "text-[#eab308]"]

interface OportunidadesListProps {
  oportunidades: string[]
}

export function OportunidadesList({ oportunidades }: OportunidadesListProps) {
  return (
    <section className="flex flex-col gap-stack-sm">
      <h3 className="px-unit font-sans text-label-md text-on-surface">
        {oportunidades.length} oportunidades detectadas
      </h3>
      <ul className="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest">
        {oportunidades.map((texto, i) => (
          <li
            key={texto}
            className={`flex min-h-[48px] items-center gap-stack-sm p-stack-sm ${
              i < oportunidades.length - 1 ? "border-b border-surface-variant" : ""
            }`}
          >
            <span className={`text-[10px] ${COLORES_BULLET[i % COLORES_BULLET.length]}`}>●</span>
            <span className="flex-1 font-sans text-caption text-on-surface">{texto}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
