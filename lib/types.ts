// ── Origen de datos ─────────────────────────────────────────────────────────
// Cada campo en EstadoMock está anotado con su origen para evitar incoherencias.
export type OrigenDato = "TUALI" | "CLIENTE" | "ESTIMACION"

// ── Perfil del cliente ───────────────────────────────────────────────────────
export interface PerfilCliente {
  id: string
  nombre: string
  edad: number
  tiempoEnNegocio: number     // años
  nivelDigital: "bajo" | "medio" | "alto"
  zona: string
}

// ── Comportamiento dentro de la app ─────────────────────────────────────────
// origen: TUALI
export interface ComportamientoApp {
  usaPromociones: boolean
  usaPedidoSugerido: boolean
  interactuaConLoyalty: boolean
  porcentajePedidosTuali: number  // 0–100
  diasEntrePedidos: number        // promedio de días entre pedidos
}

// ── Loyalty — Gana con Tuali ─────────────────────────────────────────────────
// origen: TUALI
export interface EstadoLoyalty {
  puntosAcumulados: number
  retosActivos: RetoCatalogo[]
  retosCompletados: number
  regla: "1 punto por cada $20 MXN en compras"  // constante confirmada por Tuali
}

export interface RetoCatalogo {
  id: string
  descripcion: string
  puntosRecompensa: number
  completado: boolean
}

// ── Catálogo de productos ────────────────────────────────────────────────────
// origen: TUALI
export interface Producto {
  id: string
  nombre: string
  categoria: string
  precioCosto: number         // precio que el cliente paga a Tuali
  esPromocion: boolean
  descuentoPromoPct?: number  // solo si esPromocion === true
}

// ── Pedidos ──────────────────────────────────────────────────────────────────
// origen: TUALI
export interface Pedido {
  id: string
  fecha: string               // ISO date
  montoTotal: number
  canal: "app" | "promotor" | "otro"
  productos: ItemPedido[]
}

export interface ItemPedido {
  productoId: string
  cantidad: number
  subtotal: number
}

// ── Promociones activas ──────────────────────────────────────────────────────
// origen: TUALI
export interface Promocion {
  id: string
  nombre: string
  productoIds: string[]
  descuentoPct: number
  vigenciaHasta: string       // ISO date
}

// ── Onboarding del cliente ───────────────────────────────────────────────────
// origen: CLIENTE
export type MetaCliente =
  | "aumentar_ventas"
  | "ahorrar_en_compras"
  | "usar_mas_tuali"
  | "aprovechar_promos"

// Precios de venta por productoId — lo que el cliente dice que cobra a sus clientes.
// Tuali no tiene este dato. Se pide de forma progresiva (no en onboarding inicial).
export type PreciosVentaCliente = Record<string, number>

export interface EstadoOnboarding {
  completado: boolean
  meta: MetaCliente | null
  preciosVenta: PreciosVentaCliente  // origen: CLIENTE
}

// ── Diagnóstico ──────────────────────────────────────────────────────────────
// Computado por el motor determinístico. Mezcla TUALI + ESTIMACION.
export interface Diagnostico {
  ticketPromedioPesos: number             // TUALI: promedio histórico
  ticketObjetivoSugerido: number          // ESTIMACION: +15% sobre promedio histórico
  nivelEngagement: "bajo" | "medio" | "alto"  // TUALI: calculado de ComportamientoApp
  usaPromociones: boolean                 // TUALI
  usaPedidoSugerido: boolean              // TUALI
  puntosLoyalty: number                   // TUALI
  oportunidadesDetectadas: string[]       // ESTIMACION: textos generados por el motor
}

// ── Recomendaciones ──────────────────────────────────────────────────────────
// Producidas por recommendation-engine.ts. beneficioEstimado es null
// cuando no hay precio de venta del cliente — nunca se inventa un número.
export interface Recomendacion {
  id: string
  tipo: "promo" | "loyalty" | "pedido_sugerido" | "precio_venta"
  titulo: string
  beneficioEstimado: string | null  // ESTIMACION o null si faltan preciosVenta
  accion: string                    // texto del CTA
  productoIds: string[]
}

// ── Estado global del mock ───────────────────────────────────────────────────
export interface EstadoMock {
  perfil: PerfilCliente
  comportamiento: ComportamientoApp   // origen: TUALI
  loyalty: EstadoLoyalty              // origen: TUALI
  historialPedidos: Pedido[]          // origen: TUALI
  promocionesActivas: Promocion[]     // origen: TUALI
  catalogo: Producto[]                // origen: TUALI
  onboarding: EstadoOnboarding        // origen: CLIENTE
}
