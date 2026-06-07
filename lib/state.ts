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

// ── Historial demo (antes/después del pitch) ────────────────────────────────
// Mismo patrón narrativo de los 4 días de Raúl que ya estaba validado como
// coherente con HISTORIAL_PEDIDOS, pero con fechas relativas a "hoy" para que
// el check-in en vivo continúe la racha sin importar qué día sea el pitch real.
// origen: CLIENTE (simulado para demo)
const PATRON_HISTORIAL_DEMO: Omit<EntradaDiaria, "fecha">[] = [
  {
    comoEstuvoElDia: "regular",
    hizoPedido: false,
    pidioporApp: null,
    sePidioAlgoQueNoTenia: true,
    aplicoPromo: false,
    seAcaboAlgoHoy: true,
  },
  {
    comoEstuvoElDia: "bien",
    hizoPedido: true,
    pidioporApp: true,
    sePidioAlgoQueNoTenia: false,
    aplicoPromo: true,
    seAcaboAlgoHoy: false,
  },
  {
    comoEstuvoElDia: "bien",
    hizoPedido: false,
    pidioporApp: null,
    sePidioAlgoQueNoTenia: false,
    aplicoPromo: false,
    seAcaboAlgoHoy: false,
  },
  {
    comoEstuvoElDia: "bien",
    hizoPedido: false,
    pidioporApp: null,
    sePidioAlgoQueNoTenia: false,
    aplicoPromo: false,
    seAcaboAlgoHoy: false,
  },
]

function fechaRelativa(diasAtras: number): string {
  return new Date(Date.now() - diasAtras * 86_400_000).toISOString().slice(0, 10)
}

function fechasHistorialDemo(): Set<string> {
  const dias = PATRON_HISTORIAL_DEMO.length
  return new Set(Array.from({ length: dias }, (_, i) => fechaRelativa(dias - i)))
}

function recalcularRachaDesde(entradas: EntradaDiaria[]): void {
  localStorage.removeItem(KEYS.racha)
  const ordenadas = [...entradas].sort((a, b) => (a.fecha < b.fecha ? -1 : 1))
  ordenadas.forEach((entrada) => actualizarRacha(entrada.fecha))
}

export function sembrarHistorialDemo(): void {
  const dias = PATRON_HISTORIAL_DEMO.length

  PATRON_HISTORIAL_DEMO.forEach((patron, i) => {
    const fecha = fechaRelativa(dias - i)
    guardarEntradaDiaria({ ...patron, fecha })
  })

  // Recalcula la racha en orden cronológico para encadenar con el registro en
  // vivo de "hoy" si ya existe (o con el que el presentador complete después).
  recalcularRachaDesde(cargarEntradasDiarias())
}

export function limpiarHistorialDemo(): void {
  const fechasSembradas = fechasHistorialDemo()
  const restantes = cargarEntradasDiarias().filter((e) => !fechasSembradas.has(e.fecha))
  localStorage.setItem(KEYS.entradas, JSON.stringify(restantes))
  recalcularRachaDesde(restantes)
}

export function hayHistorialSembrado(): boolean {
  const fechasSembradas = fechasHistorialDemo()
  return cargarEntradasDiarias().some((e) => fechasSembradas.has(e.fecha))
}
