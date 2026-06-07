import Image from "next/image"
import Link from "next/link"

export default function Splash() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <main className="flex flex-1 flex-col items-center justify-center px-margin-mobile pt-stack-lg">
        <div className="mb-stack-lg w-full max-w-[240px]">
          <Image
            src="/logo-full.svg"
            alt="TuAliado"
            width={240}
            height={96}
            priority
            className="h-auto w-full"
          />
        </div>
        <h1 className="max-w-[280px] text-center font-sans text-body-md text-secondary">
          Tu asesor de crecimiento
        </h1>
      </main>

      <footer className="flex h-[40%] flex-col justify-end px-margin-mobile pt-stack-md pb-stack-lg">
        <Link
          href="/onboarding"
          className="mb-stack-sm flex h-[56px] w-full items-center justify-center rounded-2xl bg-primary-container font-sans text-label-md text-on-primary shadow-[0_8px_16px_-4px_rgba(249,115,22,0.1)] active:scale-[0.98] transition-transform"
        >
          Empezar
        </Link>
        <p className="text-center font-sans text-caption text-secondary">
          Para clientes Tuali
        </p>
      </footer>
    </div>
  )
}
