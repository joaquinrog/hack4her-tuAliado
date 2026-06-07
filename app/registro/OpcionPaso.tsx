interface OpcionPasoProps {
  icono: string
  label: string
  seleccionado: boolean
  onClick: () => void
}

export function OpcionPaso({ icono, label, seleccionado, onClick }: OpcionPasoProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[96px] items-center gap-stack-md rounded-2xl border-2 p-4 text-left transition-transform active:scale-95 ${
        seleccionado ? "border-primary bg-primary-container/10" : "border-outline-variant bg-surface-container-lowest"
      }`}
    >
      <span
        className={`material-symbols-outlined flex h-[48px] w-[48px] items-center justify-center rounded-full text-[32px] ${
          seleccionado ? "bg-primary-container text-primary" : "bg-surface-container-high text-on-surface-variant"
        }`}
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {icono}
      </span>
      <span className="font-sans text-label-md text-on-surface">{label}</span>
    </button>
  )
}
