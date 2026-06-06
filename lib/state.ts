import type { BaselineSnapshot, EntradaDiaria, MetaCliente, RachaDiaria } from "./types"

const KEYS = {
  baseline: "tualiado_baseline",
  entradas: "tualiado_entradas",
  racha: "tualiado_racha",
} as const

// ── URL params ────────────────────────────────────────────────────────────────

const METAS_VALIDAS: MetaCliente[] = ["vender_mas", "aprovechar_promos", "surtir_tienda", "como_voy"]

export function getMeta(searchParams: URLSearchParams): MetaCliente | null {
  const v = searchParams.get("meta")
  return METAS_VALIDAS.includes(v as MetaCliente) ? (v as MetaCliente) : null
}

export function buildUrl(base: string, meta: MetaCliente): string {
  return `${base}?meta=${meta}`
}

// ── Baseline ──────────────────────────────────────────────────────────────────

export function guardarBaseline(b: BaselineSnapshot): void {
  localStorage.setItem(KEYS.baseline, JSON.stringify(b))
}

export function cargarBaseline(): BaselineSnapshot | null {
  const raw = localStorage.getItem(KEYS.baseline)
  return raw ? (JSON.parse(raw) as BaselineSnapshot) : null
}

// ── Entradas diarias ─────────────────────────────────────────────────────────

export function guardarEntradaDiaria(e: EntradaDiaria): void {
  const prev = cargarEntradasDiarias()
  const sinHoy = prev.filter((x) => x.fecha !== e.fecha)
  localStorage.setItem(KEYS.entradas, JSON.stringify([...sinHoy, e]))
}

export function cargarEntradasDiarias(): EntradaDiaria[] {
  const raw = localStorage.getItem(KEYS.entradas)
  return raw ? (JSON.parse(raw) as EntradaDiaria[]) : []
}

// ── Racha ─────────────────────────────────────────────────────────────────────

export function guardarRacha(r: RachaDiaria): void {
  localStorage.setItem(KEYS.racha, JSON.stringify(r))
}

export function cargarRacha(): RachaDiaria {
  const raw = localStorage.getItem(KEYS.racha)
  return raw
    ? (JSON.parse(raw) as RachaDiaria)
    : { rachaActual: 0, rachaMaxima: 0, ultimoRegistro: null }
}

export function actualizarRacha(fecha: string): RachaDiaria {
  const racha = cargarRacha()
  const ayer = new Date(new Date(fecha).getTime() - 86_400_000).toISOString().slice(0, 10)

  let nueva: number
  if (racha.ultimoRegistro === fecha) nueva = racha.rachaActual
  else if (racha.ultimoRegistro === ayer) nueva = racha.rachaActual + 1
  else nueva = 1

  const result: RachaDiaria = {
    rachaActual: nueva,
    rachaMaxima: Math.max(racha.rachaMaxima, nueva),
    ultimoRegistro: fecha,
  }
  guardarRacha(result)
  return result
}
