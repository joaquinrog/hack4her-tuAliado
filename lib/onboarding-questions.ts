import type { MetaCliente, EstadoOnboarding } from "./types"

export interface OpcionBoton {
  label: string        // 2-4 palabras, lenguaje Raúl
  emoji: string        // refuerzo visual — reduce carga de lectura
  valor: MetaCliente
}

export interface PreguntaOnboarding {
  id: string
  texto: string        // corto, sin tecnicismos
  opciones: OpcionBoton[]
  campoResultado: keyof Pick<EstadoOnboarding, "meta">
}

// ── Sesión 1 — 1 sola pregunta ───────────────────────────────────────────────
// Sin preguntas abiertas. Sin formularios. Solo botones grandes.
// El precio de venta se pide después, de forma contextual.
export const PREGUNTA_META: PreguntaOnboarding = {
  id: "pregunta-meta",
  texto: "¿Qué quieres para tu tienda?",
  opciones: [
    { label: "Vender más", emoji: "📈", valor: "aumentar_ventas" },
    { label: "Gastar menos", emoji: "💰", valor: "ahorrar_en_compras" },
    { label: "Pedir yo solo", emoji: "📱", valor: "usar_mas_tuali" },
    { label: "Aprovechar ofertas", emoji: "🏷️", valor: "aprovechar_promos" },
  ],
  campoResultado: "meta",
}

// ── Preguntas progresivas ────────────────────────────────────────────────────
// Se activan contextualmente — nunca más de 1 por sesión.
// No forman parte del onboarding inicial.

export interface PreguntaPrecioVenta {
  id: string
  texto: string        // ej: "¿Cuánto cobras por Coca-Cola 600ml?"
  productoId: string
  // El input en pantalla usa botones +/- grandes, no teclado manual.
}

export function buildPreguntaPrecio(
  productoId: string,
  nombreProducto: string
): PreguntaPrecioVenta {
  return {
    id: `precio-${productoId}`,
    texto: `¿Cuánto cobras por ${nombreProducto}?`,
    productoId,
  }
}

// Opciones de seguimiento — se muestran después de ~3 pedidos.
export const PREGUNTA_SEGUIMIENTO = {
  id: "pregunta-seguimiento",
  texto: "¿Cómo va tu meta?",
  opciones: [
    { label: "Bien", emoji: "👍", valor: "bien" as const },
    { label: "Regular", emoji: "😐", valor: "regular" as const },
    { label: "Mal", emoji: "👎", valor: "mal" as const },
  ],
}

export type RespuestaSeguimiento = "bien" | "regular" | "mal"
