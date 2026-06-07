interface ProgressBarProps {
  current: number
  target: number
  label: string
}

export function ProgressBar({ current, target, label }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((current / target) * 100))

  return (
    <div className="flex flex-col gap-stack-sm">
      <div className="h-4 w-full overflow-hidden rounded-full bg-surface-container-low">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="font-sans text-caption text-on-surface-variant">
        {pct}% {label}
      </p>
    </div>
  )
}
