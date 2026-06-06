# Supuestos y estado de los datos

> Este documento distingue lo que sabemos que existe, lo que podría existir, y lo que no está confirmado.
> La incoherencia de datos es el riesgo más crítico identificado por Tuali — este doc ayuda a evitarla.

---

## Leyenda

| Etiqueta | Significado |
|---|---|
| ✅ Confirmado | Existe y fue mencionado explícitamente en los materiales del reto |
| ⚠️ Probable | Mencionado como posible pero no entregado como dataset |
| ❌ No disponible | Explícitamente mencionado como no disponible |
| ❓ Sin confirmar | No aparece claramente en los materiales disponibles |

---

## Datos disponibles

### Protopersonas ✅

Tres arquetipos documentados:
- **Fernanda** — Madre emprendedora, 34 años, habilidad digital media, usa la app principalmente.
- **Raúl** — Dueño apoyado, 63 años, baja habilidad digital, usa principalmente el promotor.
- **Rosario** — Familiar comprometida, 43 años, habilidad digital media-baja, usa app y promotor.

Uso en el MVP: base para datos mock y personalización del lenguaje.

---

### Journeys de usuario ✅

Journeys completos para los tres arquetipos, cubriendo etapas desde necesidad/motivación hasta recompra y soporte.

Incluyen pain points, love points y oportunidades por etapa.

Uso en el MVP: base para entender en qué momentos el agente puede intervenir.

---

### Contexto de promociones ✅

Descripción general del sistema de promociones de Tuali:
- Etiqueta verde para identificar promos.
- Promociones y beneficios exclusivos.
- Clientes no siempre entienden si una promo conviene.
- Oportunidad: información de rentabilidad dentro de la promo.

Lo que no está disponible: catálogo estructurado de promociones activas con datos reales.

---

### Pedido sugerido / resurtido ✅

Función documentada dentro de Tuali:
- "Vuelve a surtir": repetir pedidos anteriores rápido.
- "Tus más vendidos": acceso rápido a lo que más se vende en la tienda.
- "Se venden bien": productos que generan ganancias en tiendas similares.
- Tuali recomienda con base en compras y ventas de clientes similares.

Lo que no está disponible: dataset estructurado de pedidos sugeridos por cliente.

---

### Loyalty — Gana con Tuali ✅

Reglas documentadas:
- 1 punto por cada $20 MXN en compras.
- Solo compras hechas en Tuali suman puntos.
- Los puntos no son transferibles.
- Los puntos se otorgan por pedidos liquidados.
- Existen retos personalizados para ganar puntos adicionales (hay que activarlos).
- Los puntos se canjean por productos del portafolio Coca-Cola.

Uso en el MVP: mostrar puntos actuales, impacto de recomendaciones en puntos, retos activos.

---

### Comportamiento dentro de la app ⚠️

Mencionado como dato que el agente debería evaluar:
- si usa promociones,
- si usa pedido sugerido,
- si repite pedidos,
- si pide por Tuali o por otros canales,
- si interactúa con loyalty,
- si activa retos,
- si registra ventas,
- frecuencia y ticket de pedidos.

No hay un dataset estructurado de este comportamiento disponible como archivo para el hackathon.

En el MVP: simular este comportamiento con datos mock coherentes basados en los protopersonas.

---

### Datos de clientes cifrados sin PEI ⚠️

Mencionados como recurso esperado del reto pero **no entregados como dataset utilizable** en los materiales disponibles.

No asumir que están disponibles hasta confirmarlo con el equipo de Tuali.

---

## Datos no disponibles

### Precio de venta final del cliente ❌

Tuali explícitamente confirmó que **no tiene este dato**.

El cliente vende los productos a sus clientes finales pero Tuali no registra ese precio.

Solución discutida: pedir al cliente en cuánto vende el producto para estimar ganancia.

Nota: clientes con Yomp! ya tienen este dato registrado.

Implicación: cualquier cálculo de ganancia mostrado en el MVP debe estar marcado como **estimación basada en precio ingresado por el cliente**, no como dato real de Tuali.

---

## Datos que el cliente puede ingresar

El cliente puede ingresar su precio de venta para cada producto. Con ese dato se puede:
- Estimar ganancia por producto.
- Calcular conveniencia de una promoción.
- Comparar opciones de pedido por rentabilidad.

Este dato debe:
- Estar claramente marcado como ingresado por el cliente.
- No mezclarse con datos de costo de Tuali como si fueran lo mismo.
- Tratarse con precaución para evitar incoherencias.

---

## Historial del cliente ⚠️

Tuali crea historial de compras del cliente dentro de la app. Los clientes también pueden registrar ventas (aunque no todos lo hacen siempre).

Tuali recopila datos todos los días a las 6 PM (mencionado en el contexto).

No hay un formato de dataset explícito disponible para el hackathon.

En el MVP: usar datos mock que simulen el historial de pedidos del arquetipo elegido.

---

## Datos de zona / contexto geográfico ⚠️

Tuali menciona que recomienda con base en ventas de clientes similares en la misma zona.

La zona demográfica y contexto local son parte del diagnóstico considerado.

No hay un dataset geográfico disponible como archivo para el hackathon.

---

## Reglas para el MVP

1. **No presentar como datos reales lo que es simulado.** Si es mock, es mock.
2. **Marcar estimaciones como estimaciones.** Especialmente ganancia y margen.
3. **Usar la regla de loyalty correctamente:** 1 punto por cada $20 MXN.
4. **No inventar comportamiento de usuario** sin base en los protopersonas y journeys.
5. **Si un número cambia entre pantallas, debe cambiar de forma coherente.**
6. **Documentar la fuente de cada dato mock** en el código o en un archivo de datos.


## Datos que da Tuali
Nombre
Correo
Teléfono

## Datos que hay que preguntar para el perfil:

Perfil del tendero
Fecha de nacimiento

Género:
Mujer
Hombre
Prefiero no responder
Otro

Nivel de estudios:
Primaria
Secundaria
Preparatoria
Carrera técnica
Universidad

Perfil del negocio
¿Cuánto tiempo lleva abierto tu negocio?
Menos de 1 año
1-3 años
3-10 años
Más de 10 años

¿Quién atiende el negocio?
Yo solo
Mi familia y yo
Empleados
Familia y empleados

¿Cuántas personas atienden el negocio?
1
2-3
4-5
Más de 5

¿Requiere apoyo adicional para realizar actividades físicas? (Levantar cajas, mover estanterías y productos, etc.)
Sí
No

¿Cuál es tu principal tipo de negocio?
Tienda de abarrotes 
Miscélanea
Depósito
Papelería
Tienda de conveniencia
Otro

Ubicación:
Estado
Municipio/Ciudad
Zona:
Urbana
Suburbana 
Rural

** NOTAS: "La mayor parte de la personalización proviene de los datos transaccionales ya disponibles en Tuali y Arca Continental, reduciendo la carga para el usuario." 
