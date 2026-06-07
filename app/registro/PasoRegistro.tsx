interface PasoRegistroProps {
  titulo: string
  children: React.ReactNode
}

export function PasoRegistro({ titulo, children }: PasoRegistroProps) {
  return (
    <section className="flex flex-1 flex-col">
      <h2 className="mb-stack-lg text-center font-sans text-headline-lg-mobile text-on-background">{titulo}</h2>
      <div className="flex flex-col gap-stack-md">{children}</div>
    </section>
  )
}
