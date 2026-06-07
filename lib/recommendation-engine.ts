import type {
  MetaCliente,
  EstadoMock,
  Recomendacion,
  BaselineSnapshot,
  Diagnostico,
} from "./types"

// ── Helpers ────────────────────────────────────────────────────────────────

export function calcularTicketPromedio(historial: EstadoMock["historialPedidos"]): number {
  if (historial.length === 0) return 0
  const total = historial.reduce((sum, p) => sum + p.montoTotal, 0)
  return Math.round(total / historial.length)
}

function nivelEngagement(c: EstadoMock["comportamiento"]): Diagnostico["nivelEngagement"] {
  const score =
    (c.usaPromociones ? 1 : 0) +
    (c.usaPedidoSugerido ? 1 : 0) +
    (c.interactuaConLoyalty ? 1 : 0) +
    (c.porcentajePedidosTuali >= 50 ? 1 : 0)
  if (score >= 3) return "alto"
  if (score >= 1) return "medio"
  return "bajo"
}

// Nivel de riesgo por tipo de recomendación — calca los ejemplos de
// design/stitch-prompts/03-recomendaciones.md (Card A=promo/bajo, B=pedido_sugerido/medio,
// C=loyalty/mayor ganancia):
// - promo → "bajo" (aprovechar un descuento ya activo, acción segura e inmediata)
// - pedido_sugerido → "medio" (implica cambiar un hábito, requiere algo de esfuerzo)
// - loyalty / precio_venta → "alto" (badge: 🟠 Mayor ganancia — más cambio, mayor potencial)
const NIVEL_RIESGO_POR_TIPO: Record<Recomendacion["tipo"], Recomendacion["nivelRiesgo"]> = {
  promo: "bajo",
  pedido_sugerido: "medio",
  loyalty: "alto",
  precio_venta: "alto",
}

// ── Diagnóstico ────────────────────────────────────────────────────────────

export function calcularDiagnostico(estado: EstadoMock): Diagnostico {
  const ticketPromedioPesos = calcularTicketPromedio(estado.historialPedidos)
  const oportunidades: string[] = []

  if (!estado.comportamiento.usaPromociones && estado.promocionesActivas.length > 0)
    oportunidades.push(`Tienes ${estado.promocionesActivas.length} promociones sin usar`)
  if (estado.comportamiento.porcentajePedidosTuali < 50)
    oportunidades.push("Pides por promotor, no por app")
  if (!estado.comportamiento.interactuaConLoyalty && estado.loyalty.retosActivos.length > 0)
    oportunidades.push(`Tienes ${estado.loyalty.retosActivos.length} reto de puntos sin activar`)

  return {
    ticketPromedioPesos,
    ticketObjetivoSugerido: Math.round(ticketPromedioPesos * 1.15), // ESTIMACION: +15%
    nivelEngagement: nivelEngagement(estado.comportamiento),
    usaPromociones: estado.comportamiento.usaPromociones,
    usaPedidoSugerido: estado.comportamiento.usaPedidoSugerido,
    puntosLoyalty: estado.loyalty.puntosAcumulados,
    oportunidadesDetectadas: oportunidades,
  }
}

// ── Motor ──────────────────────────────────────────────────────────────────

export function calcularRecomendaciones(
  meta: MetaCliente,
  estado: EstadoMock
): { recomendaciones: Recomendacion[]; baseline: BaselineSnapshot } {
  const baseline: BaselineSnapshot = {
    fecha: new Date().toISOString().slice(0, 10),
    ticketPromedio: calcularTicketPromedio(estado.historialPedidos),
    porcentajePedidosTuali: estado.comportamiento.porcentajePedidosTuali,
    usaPromociones: estado.comportamiento.usaPromociones,
    puntosLoyalty: estado.loyalty.puntosAcumulados,
  }

  const recs: Recomendacion[] = []

  // Rec A — promos no aprovechadas (aplica en todas las metas)
  const promoSinUsar = estado.promocionesActivas[0]
  if (!estado.comportamiento.usaPromociones && promoSinUsar) {
    recs.push({
      id: "rec-promo-a",
      tipo: "promo",
      nivelRiesgo: NIVEL_RIESGO_POR_TIPO.promo,
      titulo: `Usa: ${promoSinUsar.nombre}`,
      beneficioEstimado: `${promoSinUsar.descuentoPct}% menos en tu próximo pedido`,
      accion: "Pedir con esta promoción",
      productoIds: promoSinUsar.productoIds,
      nivelRiesgo: "bajo",
    })
  }

  // Rec B — según meta
  // "vender_mas": apunta a autonomía de canal (mismo criterio usado para resolver
  // la oportunidad "Pides por promotor, no por app" del diagnóstico).
  if (meta === "vender_mas" && estado.comportamiento.porcentajePedidosTuali < 50) {
    recs.push({
      id: "rec-pide-por-app",
      tipo: "pedido_sugerido",
      nivelRiesgo: NIVEL_RIESGO_POR_TIPO.pedido_sugerido,
      titulo: "Pide por la app esta semana",
      beneficioEstimado: "Llevas tu historial y acumulas puntos automáticamente",
      accion: "Hacer pedido por la app",
      productoIds: [],
    })
  }

  // "surtir_tienda": apunta a resurtido — pedido sugerido es la herramienta correcta.
  if (meta === "surtir_tienda" && !estado.comportamiento.usaPedidoSugerido) {
    recs.push({
      id: "rec-pedido-sugerido",
      tipo: "pedido_sugerido",
      nivelRiesgo: NIVEL_RIESGO_POR_TIPO.pedido_sugerido,
      titulo: "Activa el pedido sugerido",
      beneficioEstimado: "Nunca te quedas sin producto en momentos de venta",
      accion: "Ver pedido sugerido",
      productoIds: [],
      nivelRiesgo: "medio",
    })
  }

  if (meta === "aprovechar_promos" && estado.promocionesActivas.length > 1) {
    const promo2 = estado.promocionesActivas[1]
    recs.push({
      id: "rec-promo-b",
      tipo: "promo",
      nivelRiesgo: NIVEL_RIESGO_POR_TIPO.promo,
      titulo: `También: ${promo2.nombre}`,
      beneficioEstimado: `${promo2.descuentoPct}% de descuento`,
      accion: "Agregar al pedido",
      productoIds: promo2.productoIds,
      nivelRiesgo: "bajo",
    })
  }

  if (meta === "como_voy" && !estado.comportamiento.usaPedidoSugerido) {
    recs.push({
      id: "rec-app",
      tipo: "pedido_sugerido",
      nivelRiesgo: NIVEL_RIESGO_POR_TIPO.pedido_sugerido,
      titulo: "Empieza a pedir por la app",
      beneficioEstimado: "Ves tu historial y acumulas puntos automáticamente",
      accion: "Hacer pedido por app",
      productoIds: [],
      nivelRiesgo: "medio",
    })
  }

  // Rec C — reto de loyalty sin activar (aplica en todas las metas)
  const retoActivo = estado.loyalty.retosActivos.find((r) => !r.completado)
  if (retoActivo) {
    recs.push({
      id: "rec-loyalty",
      tipo: "loyalty",
      nivelRiesgo: NIVEL_RIESGO_POR_TIPO.loyalty,
      titulo: `Reto: gana ${retoActivo.puntosRecompensa} puntos`,
      beneficioEstimado: retoActivo.descripcion,
      accion: "Activar reto",
      productoIds: [],
      nivelRiesgo: "alto",
    })
  }

  return { recomendaciones: recs.slice(0, 3), baseline }
}
