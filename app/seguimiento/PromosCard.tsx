interface PromosCardProps {
  cantidad: number
}

export function PromosCard({ cantidad }: PromosCardProps) {
  return (
    <section className="flex items-center gap-stack-sm rounded-2xl border border-outline-variant bg-surface-container-lowest p-stack-md">
      <span className="material-symbols-outlined flex h-12 w-12 items-center justify-center rounded-full bg-primary-container/20 text-primary-container">
        local_offer
      </span>
      <div className="flex flex-1 flex-col">
        <span className="font-sans text-display-mobile text-on-surface">{cantidad}</span>
        <span className="font-sans text-caption text-on-surface-variant">Promos aplicadas</span>
      </div>
    </section>
  )
}
