interface TicketCardProps {
  monto: number
}

export function TicketCard({ monto }: TicketCardProps) {
  return (
    <section className="flex flex-col items-center rounded-2xl border border-outline-variant bg-surface-container-lowest p-stack-md text-center shadow-sm">
      <h2 className="font-sans text-caption text-on-surface-variant">Ticket promedio</h2>
      <p className="mt-stack-sm font-sans text-display-mobile text-primary-container">${monto}</p>
      <p className="mt-unit font-sans text-caption text-on-surface-variant">por pedido</p>
    </section>
  )
}
