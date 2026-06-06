import type {
  PerfilCliente,
  ComportamientoApp,
  EstadoLoyalty,
  Pedido,
  Promocion,
  Producto,
  EstadoOnboarding,
  EstadoMock,
  EntradaDiaria,
} from "./types"

// ════════════════════════════════════════════════════════════════════════════
// DATOS TUALI
// Basados en la protopersona "Raúl" de los docs de contexto del hackathon.
// Representan lo que Tuali ya sabe del cliente. No requieren input del usuario.
// ════════════════════════════════════════════════════════════════════════════

// origen: TUALI
export const PERFIL_RAUL: PerfilCliente = {
  id: "cliente-001",
  nombre: "Raúl",
  edad: 63,
  tiempoEnNegocio: 18,       // años
  nivelDigital: "bajo",
  zona: "CDMX Norte",
}

// origen: TUALI
// Raúl pide mayoritariamente por promotor. Baja autonomía digital.
export const COMPORTAMIENTO_RAUL: ComportamientoApp = {
  usaPromociones: false,
  usaPedidoSugerido: false,
  interactuaConLoyalty: false,
  porcentajePedidosTuali: 20,  // 80% de sus pedidos los hace con el promotor
  diasEntrePedidos: 9,
}

// origen: TUALI — Regla real: 1 punto por cada $20 MXN en compras liquidadas.
export const LOYALTY_RAUL: EstadoLoyalty = {
  puntosAcumulados: 180,
  retosActivos: [
    {
      id: "reto-001",
      descripcion: "Haz 3 pedidos por la app este mes",
      puntosRecompensa: 50,
      completado: false,
    },
  ],
  retosCompletados: 2,
  regla: "1 punto por cada $20 MXN en compras",
}

// origen: TUALI — 15 productos del portafolio Arca/Coca-Cola disponibles en Tuali.
export const CATALOGO_PRODUCTOS: Producto[] = [
  // Refrescos
  { id: "p-001", nombre: "Coca-Cola 600ml", categoria: "refresco", precioCosto: 11.5, esPromocion: true, descuentoPromoPct: 10 },
  { id: "p-002", nombre: "Coca-Cola 2L", categoria: "refresco", precioCosto: 22.0, esPromocion: false },
  { id: "p-003", nombre: "Sprite 600ml", categoria: "refresco", precioCosto: 10.5, esPromocion: false },
  { id: "p-004", nombre: "Fanta Naranja 600ml", categoria: "refresco", precioCosto: 10.5, esPromocion: false },
  { id: "p-005", nombre: "Coca-Cola Sin Azúcar 600ml", categoria: "refresco", precioCosto: 11.5, esPromocion: false },
  // Agua
  { id: "p-006", nombre: "Ciel 1L", categoria: "agua", precioCosto: 6.5, esPromocion: true, descuentoPromoPct: 15 },
  { id: "p-007", nombre: "Ciel 500ml paquete 12", categoria: "agua", precioCosto: 55.0, esPromocion: false },
  // Cerveza
  { id: "p-008", nombre: "Victoria 355ml paquete 12", categoria: "cerveza", precioCosto: 120.0, esPromocion: true, descuentoPromoPct: 8 },
  { id: "p-009", nombre: "Modelo Especial 355ml x6", categoria: "cerveza", precioCosto: 75.0, esPromocion: false },
  // Botanas
  { id: "p-010", nombre: "Sabritas Original 45g", categoria: "botana", precioCosto: 12.0, esPromocion: false },
  { id: "p-011", nombre: "Ruffles 45g", categoria: "botana", precioCosto: 12.5, esPromocion: false },
  { id: "p-012", nombre: "Doritos Nacho 45g", categoria: "botana", precioCosto: 12.0, esPromocion: false },
  // Lácteos
  { id: "p-013", nombre: "Leche Lala Entera 1L", categoria: "lacteo", precioCosto: 18.5, esPromocion: false },
  { id: "p-014", nombre: "Leche Lala Semidescremada 1L", categoria: "lacteo", precioCosto: 18.5, esPromocion: false },
  // Jugos
  { id: "p-015", nombre: "Del Valle Mango 1L", categoria: "jugo", precioCosto: 19.0, esPromocion: false },
]

// origen: TUALI — 10 pedidos de los últimos 90 días. Canal: mayoritariamente promotor.
// Ticket promedio resultante: ~$450 MXN. Frecuencia: cada 9 días aprox.
export const HISTORIAL_PEDIDOS: Pedido[] = [
  {
    id: "ped-001",
    fecha: "2026-03-10",
    montoTotal: 412.5,
    canal: "promotor",
    productos: [
      { productoId: "p-001", cantidad: 12, subtotal: 138.0 },
      { productoId: "p-006", cantidad: 12, subtotal: 78.0 },
      { productoId: "p-010", cantidad: 6, subtotal: 72.0 },
      { productoId: "p-013", cantidad: 6, subtotal: 111.0 },
      { productoId: "p-015", cantidad: 1, subtotal: 13.5 },
    ],
  },
  {
    id: "ped-002",
    fecha: "2026-03-19",
    montoTotal: 385.0,
    canal: "promotor",
    productos: [
      { productoId: "p-001", cantidad: 12, subtotal: 138.0 },
      { productoId: "p-006", cantidad: 6, subtotal: 39.0 },
      { productoId: "p-008", cantidad: 1, subtotal: 120.0 },
      { productoId: "p-010", cantidad: 4, subtotal: 48.0 },
      { productoId: "p-011", cantidad: 3, subtotal: 37.5 },
    ],
  },
  {
    id: "ped-003",
    fecha: "2026-03-28",
    montoTotal: 467.5,
    canal: "app",
    productos: [
      { productoId: "p-001", cantidad: 18, subtotal: 207.0 },
      { productoId: "p-006", cantidad: 12, subtotal: 78.0 },
      { productoId: "p-013", cantidad: 6, subtotal: 111.0 },
      { productoId: "p-010", cantidad: 6, subtotal: 72.0 },
    ],
  },
  {
    id: "ped-004",
    fecha: "2026-04-06",
    montoTotal: 440.0,
    canal: "promotor",
    productos: [
      { productoId: "p-002", cantidad: 6, subtotal: 132.0 },
      { productoId: "p-006", cantidad: 12, subtotal: 78.0 },
      { productoId: "p-008", cantidad: 1, subtotal: 120.0 },
      { productoId: "p-010", cantidad: 4, subtotal: 48.0 },
      { productoId: "p-015", cantidad: 2, subtotal: 38.0 },
      { productoId: "p-012", cantidad: 2, subtotal: 24.0 },
    ],
  },
  {
    id: "ped-005",
    fecha: "2026-04-15",
    montoTotal: 396.0,
    canal: "promotor",
    productos: [
      { productoId: "p-001", cantidad: 12, subtotal: 138.0 },
      { productoId: "p-006", cantidad: 12, subtotal: 78.0 },
      { productoId: "p-010", cantidad: 5, subtotal: 60.0 },
      { productoId: "p-013", cantidad: 6, subtotal: 111.0 },
    ],
  },
  {
    id: "ped-006",
    fecha: "2026-04-24",
    montoTotal: 503.0,
    canal: "promotor",
    productos: [
      { productoId: "p-001", cantidad: 18, subtotal: 207.0 },
      { productoId: "p-008", cantidad: 2, subtotal: 240.0 },
      { productoId: "p-010", cantidad: 3, subtotal: 36.0 },
    ],
  },
  {
    id: "ped-007",
    fecha: "2026-05-03",
    montoTotal: 441.0,
    canal: "promotor",
    productos: [
      { productoId: "p-001", cantidad: 12, subtotal: 138.0 },
      { productoId: "p-006", cantidad: 12, subtotal: 78.0 },
      { productoId: "p-013", cantidad: 6, subtotal: 111.0 },
      { productoId: "p-010", cantidad: 5, subtotal: 60.0 },
      { productoId: "p-015", cantidad: 3, subtotal: 57.0 },
    ],
  },
  {
    id: "ped-008",
    fecha: "2026-05-12",
    montoTotal: 425.5,
    canal: "app",
    productos: [
      { productoId: "p-001", cantidad: 12, subtotal: 138.0 },
      { productoId: "p-006", cantidad: 12, subtotal: 78.0 },
      { productoId: "p-010", cantidad: 5, subtotal: 60.0 },
      { productoId: "p-014", cantidad: 6, subtotal: 111.0 },
      { productoId: "p-012", cantidad: 3, subtotal: 36.0 },
    ],
  },
  {
    id: "ped-009",
    fecha: "2026-05-21",
    montoTotal: 478.0,
    canal: "promotor",
    productos: [
      { productoId: "p-001", cantidad: 18, subtotal: 207.0 },
      { productoId: "p-006", cantidad: 12, subtotal: 78.0 },
      { productoId: "p-008", cantidad: 1, subtotal: 120.0 },
      { productoId: "p-010", cantidad: 4, subtotal: 48.0 },
      { productoId: "p-015", cantidad: 1, subtotal: 19.0 },
    ],
  },
  {
    id: "ped-010",
    fecha: "2026-05-30",
    montoTotal: 451.0,
    canal: "promotor",
    productos: [
      { productoId: "p-001", cantidad: 12, subtotal: 138.0 },
      { productoId: "p-006", cantidad: 12, subtotal: 78.0 },
      { productoId: "p-013", cantidad: 6, subtotal: 111.0 },
      { productoId: "p-010", cantidad: 5, subtotal: 60.0 },
      { productoId: "p-011", cantidad: 4, subtotal: 50.0 },
    ],
  },
]

// origen: TUALI — 3 promociones activas en productos de alta rotación de Raúl.
export const PROMOCIONES_ACTIVAS: Promocion[] = [
  {
    id: "promo-001",
    nombre: "10% en Coca-Cola 600ml",
    productoIds: ["p-001"],
    descuentoPct: 10,
    vigenciaHasta: "2026-06-30",
  },
  {
    id: "promo-002",
    nombre: "15% en Ciel 1L",
    productoIds: ["p-006"],
    descuentoPct: 15,
    vigenciaHasta: "2026-06-22",
  },
  {
    id: "promo-003",
    nombre: "8% en Victoria 355ml x12",
    productoIds: ["p-008"],
    descuentoPct: 8,
    vigenciaHasta: "2026-06-15",
  },
]

// ════════════════════════════════════════════════════════════════════════════
// DATOS CLIENTE
// Vacíos por defecto. Se llenan progresivamente durante el uso de la app.
// Solo la meta se pregunta en la sesión inicial (1 pregunta, botones grandes).
// ════════════════════════════════════════════════════════════════════════════

// origen: CLIENTE
export const ONBOARDING_INICIAL: EstadoOnboarding = {
  completado: false,
  meta: null,
  preciosVenta: {},
}

// ════════════════════════════════════════════════════════════════════════════
// ESTADO GLOBAL
// ════════════════════════════════════════════════════════════════════════════

export const MOCK_STATE: EstadoMock = {
  perfil: PERFIL_RAUL,
  comportamiento: COMPORTAMIENTO_RAUL,  // origen: TUALI
  loyalty: LOYALTY_RAUL,               // origen: TUALI
  historialPedidos: HISTORIAL_PEDIDOS, // origen: TUALI
  promocionesActivas: PROMOCIONES_ACTIVAS, // origen: TUALI
  catalogo: CATALOGO_PRODUCTOS,        // origen: TUALI
  onboarding: ONBOARDING_INICIAL,      // origen: CLIENTE
}

// ════════════════════════════════════════════════════════════════════════════
// ENTRADAS DEMO
// 4 entradas pre-cargadas para el demo. Representan los últimos 4 días de Raúl.
// Coherentes con HISTORIAL_PEDIDOS: Raúl empezó a usar la app y las promos.
// origen: CLIENTE (simulado)
// ════════════════════════════════════════════════════════════════════════════
export const ENTRADAS_DEMO: EntradaDiaria[] = [
  {
    // Día 1 — regular, se le acabó producto
    fecha: "2026-06-02",
    comoEstuvoElDia: "regular",
    hizoPedido: false,
    pidioporApp: null,
    sePidioAlgoQueNoTenia: true,
    aplicoPromo: false,
    seAcaboAlgoHoy: true,
  },
  {
    // Día 2 — bueno, pidió por app y usó promo (primera vez)
    fecha: "2026-06-03",
    comoEstuvoElDia: "bien",
    hizoPedido: true,
    pidioporApp: true,
    sePidioAlgoQueNoTenia: false,
    aplicoPromo: true,
    seAcaboAlgoHoy: false,
  },
  {
    // Día 3 — bueno, sin pedido
    fecha: "2026-06-04",
    comoEstuvoElDia: "bien",
    hizoPedido: false,
    pidioporApp: null,
    sePidioAlgoQueNoTenia: false,
    aplicoPromo: false,
    seAcaboAlgoHoy: false,
  },
  {
    // Día 4 — bueno, sin pedido
    fecha: "2026-06-05",
    comoEstuvoElDia: "bien",
    hizoPedido: false,
    pidioporApp: null,
    sePidioAlgoQueNoTenia: false,
    aplicoPromo: false,
    seAcaboAlgoHoy: false,
  },
]
