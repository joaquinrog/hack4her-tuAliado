import type {
  MetaCliente,
  EstadoMock,
  Recomendacion,
  BaselineSnapshot,
  Diagnostico,
  EstrategiaRiesgo,
  Producto,
  Promocion,
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

const PESOS = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function buscarProducto(estado: EstadoMock, productoId: string): Producto | undefined {
  return estado.catalogo.find((producto) => producto.id === productoId)
}

function buscarPromoPorProducto(estado: EstadoMock, productoId: string): Promocion | undefined {
  return estado.promocionesActivas.find((promo) => promo.productoIds.includes(productoId))
}

function productoMasComprado(estado: EstadoMock): Producto | undefined {
  const cantidades = new Map<string, number>()

  estado.historialPedidos.forEach((pedido) => {
    pedido.productos.forEach((item) => {
      cantidades.set(item.productoId, (cantidades.get(item.productoId) ?? 0) + item.cantidad)
    })
  })

  const [productoId] = [...cantidades.entries()].sort((a, b) => b[1] - a[1])[0] ?? []
  return productoId ? buscarProducto(estado, productoId) : undefined
}

function retornoPromo(promo: Promocion, estado: EstadoMock): string {
  const producto = buscarProducto(estado, promo.productoIds[0])
  if (!producto) return `${promo.descuentoPct}% menos en producto con promo activa`

  const ahorro = producto.precioCosto * (promo.descuentoPct / 100)
  return `Ahorro aprox. ${PESOS.format(ahorro)} por ${producto.nombre}`
}

function recPromo(
  id: string,
  titulo: string,
  promo: Promocion,
  estado: EstadoMock,
  accion: string,
  fundamento: string
): Recomendacion {
  return {
    id,
    tipo: "promo",
    nivelRiesgo: "bajo",
    titulo,
    retornoEstimado: retornoPromo(promo, estado),
    fundamento,
    accion,
    productoIds: promo.productoIds,
  }
}

function recPedirPorApp(id: string, titulo: string, fundamento: string): Recomendacion {
  return {
    id,
    tipo: "pedido_sugerido",
    nivelRiesgo: "medio",
    titulo,
    retornoEstimado: "Retorno: historial claro y puntos sin depender del promotor",
    fundamento,
    accion: "Hacer pedido por la app",
    productoIds: [],
  }
}

function recLoyalty(estado: EstadoMock, id = "rec-loyalty"): Recomendacion | null {
  const retoActivo = estado.loyalty.retosActivos.find((reto) => !reto.completado)
  if (!retoActivo) return null

  return {
    id,
    tipo: "loyalty",
    nivelRiesgo: "alto",
    titulo: `Reto: gana ${retoActivo.puntosRecompensa} puntos`,
    retornoEstimado: `+${retoActivo.puntosRecompensa} puntos reales de Gana con Tuali`,
    fundamento: retoActivo.descripcion,
    accion: "Activar reto",
    productoIds: [],
  }
}

function compactar(recs: Array<Recomendacion | null>): Recomendacion[] {
  return recs.filter((rec): rec is Recomendacion => rec !== null).slice(0, 3)
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
  estado: EstadoMock,
  estrategia: EstrategiaRiesgo = "facil"
): { recomendaciones: Recomendacion[]; baseline: BaselineSnapshot } {
  const baseline: BaselineSnapshot = {
    fecha: new Date().toISOString().slice(0, 10),
    ticketPromedio: calcularTicketPromedio(estado.historialPedidos),
    porcentajePedidosTuali: estado.comportamiento.porcentajePedidosTuali,
    usaPromociones: estado.comportamiento.usaPromociones,
    puntosLoyalty: estado.loyalty.puntosAcumulados,
  }

  const promoCoca = buscarPromoPorProducto(estado, "p-001")
  const promoCiel = buscarPromoPorProducto(estado, "p-006")
  const promoVictoria = buscarPromoPorProducto(estado, "p-008")
  const loyalty = recLoyalty(estado)
  const frecuente = productoMasComprado(estado)

  const porMeta: Record<MetaCliente, Record<EstrategiaRiesgo, Array<Recomendacion | null>>> = {
    vender_mas: {
      facil: [
        promoCoca
          ? recPromo(
              "rec-vender-coca",
              "Empieza con promo de Coca-Cola",
              promoCoca,
              estado,
              "Pedir con esta promoción",
              "Coca-Cola 600ml es producto frecuente en los pedidos de Raúl."
            )
          : null,
        recPedirPorApp(
          "rec-vender-app",
          "Haz un pedido por la app",
          "Hoy Raúl hace 80% de sus pedidos con promotor."
        ),
        loyalty,
      ],
      ganancia: [
        loyalty,
        promoCoca
          ? recPromo(
              "rec-vender-coca",
              "Mueve más Coca-Cola con promo",
              promoCoca,
              estado,
              "Pedir con esta promoción",
              "Es producto de alta rotación y tiene descuento activo."
            )
          : null,
        recPedirPorApp(
          "rec-vender-app",
          "Pasa más pedidos a la app",
          "Los pedidos por app dejan historial para medir ticket y puntos."
        ),
      ],
    },
    aprovechar_promos: {
      facil: [
        promoCoca
          ? recPromo(
              "rec-promo-coca",
              "Usa promo de Coca-Cola",
              promoCoca,
              estado,
              "Agregar Coca-Cola",
              "Es la promo más familiar para Raúl por su historial de compra."
            )
          : null,
        promoCiel
          ? recPromo("rec-promo-ciel", "Suma Ciel con descuento", promoCiel, estado, "Agregar Ciel", "Ciel aparece seguido en sus pedidos recientes.")
          : null,
        promoVictoria
          ? recPromo("rec-promo-victoria", "Revisa promo de Victoria", promoVictoria, estado, "Agregar Victoria", "Victoria ya aparece en pedidos anteriores de Raúl.")
          : null,
      ],
      ganancia: [
        promoVictoria
          ? recPromo("rec-promo-victoria", "Mayor ahorro: Victoria", promoVictoria, estado, "Agregar Victoria", "Es la promo con mayor ahorro por paquete en el catálogo mock.")
          : null,
        promoCoca
          ? recPromo("rec-promo-coca", "Coca-Cola con descuento", promoCoca, estado, "Agregar Coca-Cola", "Es producto frecuente y la promo sigue activa.")
          : null,
        promoCiel
          ? recPromo("rec-promo-ciel", "Ciel con descuento", promoCiel, estado, "Agregar Ciel", "Tiene descuento activo y Raúl lo compra seguido.")
          : null,
      ],
    },
    surtir_tienda: {
      facil: [
        frecuente
          ? {
              id: "rec-surtir-frecuente",
              tipo: "pedido_sugerido",
              nivelRiesgo: "bajo",
              titulo: `Resurte ${frecuente.nombre}`,
              retornoEstimado: "Retorno: menos faltantes en productos que ya vendes",
              fundamento: "Es el producto que más aparece en el historial de pedidos.",
              accion: "Agregar a mi pedido",
              productoIds: [frecuente.id],
            }
          : null,
        {
          id: "rec-surtir-sugerido",
          tipo: "pedido_sugerido",
          nivelRiesgo: "medio",
          titulo: "Revisa tu pedido sugerido",
          retornoEstimado: "Retorno: surtido más constante sin adivinar",
          fundamento: "Raúl todavía no usa pedido sugerido en Tuali.",
          accion: "Ver pedido sugerido",
          productoIds: [],
        },
        promoCiel
          ? recPromo("rec-surtir-promo", "Completa con promo de Ciel", promoCiel, estado, "Agregar promo", "Ciel combina con su surtido frecuente y tiene descuento activo.")
          : null,
      ],
      ganancia: [
        promoCiel
          ? recPromo("rec-surtir-promo", "Ahorra al resurtir Ciel", promoCiel, estado, "Agregar promo", "Es una promo compatible con productos que Raúl ya compra.")
          : null,
        {
          id: "rec-surtir-sugerido",
          tipo: "pedido_sugerido",
          nivelRiesgo: "medio",
          titulo: "Usa pedido sugerido",
          retornoEstimado: "Retorno: menos producto agotado en días de venta",
          fundamento: "El historial permite detectar productos que conviene repetir.",
          accion: "Ver pedido sugerido",
          productoIds: [],
        },
        frecuente
          ? {
              id: "rec-surtir-frecuente",
              tipo: "pedido_sugerido",
              nivelRiesgo: "bajo",
              titulo: `No dejes faltar ${frecuente.nombre}`,
              retornoEstimado: "Retorno: proteger venta de un producto frecuente",
              fundamento: "Es el producto que más se repite en sus pedidos.",
              accion: "Agregar a mi pedido",
              productoIds: [frecuente.id],
            }
          : null,
      ],
    },
    como_voy: {
      facil: [
        {
          id: "rec-como-registro",
          tipo: "registro",
          nivelRiesgo: "bajo",
          titulo: "Registra cómo estuvo tu día",
          retornoEstimado: "Retorno: avance visible sin hacer cuentas",
          fundamento: "Con registros diarios, tuAliado puede comparar cambios reales.",
          accion: "Registrar mi día",
          productoIds: [],
        },
        recPedirPorApp("rec-como-app", "Pide por la app una vez", "Así queda historial para saber cómo va tu tienda."),
        loyalty,
      ],
      ganancia: [
        loyalty,
        recPedirPorApp("rec-como-app", "Mide tus pedidos en la app", "Los pedidos por app alimentan el seguimiento de avance."),
        {
          id: "rec-como-registro",
          tipo: "registro",
          nivelRiesgo: "bajo",
          titulo: "Cierra el día con registro",
          retornoEstimado: "Retorno: señales claras para tu resumen semanal",
          fundamento: "Sin registro, el seguimiento solo ve pedidos, no cómo estuvo el día.",
          accion: "Registrar mi día",
          productoIds: [],
        },
      ],
    },
  }

  return { recomendaciones: compactar(porMeta[meta][estrategia]), baseline }
}
