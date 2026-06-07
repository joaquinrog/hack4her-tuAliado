interface MetaOptionButtonProps {
  icono: string
  label: string
  seleccionado: boolean
  onClick: () => void
}

export function MetaOptionButton({ icono, label, seleccionado, onClick }: MetaOptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[160px] flex-col items-center justify-center rounded-2xl border-2 p-4 text-center transition-transform active:scale-95 ${
        seleccionado
          ? "border-primary bg-primary-container/10"
          : "border-outline-variant bg-surface-container-lowest"
      }`}
    >
      <span
        className={`material-symbols-outlined mb-stack-sm text-[48px] ${
          seleccionado ? "text-primary" : "text-on-surface-variant"
        }`}
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {icono}
      </span>
      <span className="font-sans text-label-md text-on-surface">{label}</span>
    </button>
  )
}
