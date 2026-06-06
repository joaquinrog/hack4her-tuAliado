# Contexto del reto dado por Tuali

## Reto

**Tuali Growth Agent**

Diseñar un prototipo de un **Agente de Crecimiento** dentro de Tuali que responda de forma inteligente y personalizada a la pregunta:

> ¿Cómo ayudamos a los clientes de Tuali a crecer su negocio?

## Problema central

Tuali cuenta con información valiosa sobre clientes, comportamiento, promociones, pedido sugerido, loyalty y datos de clientes cifrados sin PEI, pero no existe una forma clara de usar esa información para ayudar al cliente a alcanzar un objetivo de crecimiento.

El problema también se expresó como:

> No existe un espacio dentro de Tuali que acompañe al cliente para empezar a crecer su negocio, definir una meta, recibir recomendaciones personalizadas, dar seguimiento a su avance y ajustar con base en lo que funcionó o no.

## Objetivo del reto

Diseñar un agente de crecimiento para clientes de Tuali.

El agente debe ayudar al cliente a crecer su negocio, especialmente a través de:

- Definir una meta.
- Aumentar ventas.
- Incrementar ticket promedio.
- Recibir recomendaciones personalizadas.
- Dar seguimiento a su avance.
- Aprender y ajustar con base en qué funcionó y qué no.

## Recursos esperados / entregados

Los recursos mencionados para el reto son:

- Protopersonas.
- Journeys de usuario.
- Contexto de promociones.
- Contexto de pedido sugerido.
- Contexto de loyalty.
- Datos de clientes cifrados sin PEI.

## Estado de los recursos

Con los materiales recibidos hasta ahora, sí hay contexto de:

- Protopersonas.
- Journeys de usuario.
- Promociones.
- Pedido sugerido / resurtido.
- Loyalty / recompensas.
- Funciones actuales de Tuali.
- Dolor del cliente y oportunidades dentro del journey.

Lo que todavía no aparece claramente como dataset utilizable:

- Tabla o archivo estructurado de datos de clientes cifrados sin PEI listo para análisis.

## Contexto de funcionalidades actuales de Tuali

Tuali se presenta como una app para comprar productos de Arca Continental y administrar la tienda desde el celular.

Mensajes y funciones relevantes:

- “Tu aliado para hacer crecer tu negocio.”
- “Una app inteligente que te conoce.”
- Tuali recuerda productos más vendidos, pedidos frecuentes y recomienda lo que más se vende en la zona.
- “Vuelve a surtir”: repetir productos anteriores de forma rápida.
- “Tus más vendidos”: acceder rápido a lo que más se vende en la tienda.
- “Se venden bien”: productos que generan ganancias en tiendas similares.
- Promociones fáciles de encontrar mediante etiqueta verde.
- Promociones y beneficios exclusivos.
- Pedido sugerido / resurtido.
- Control de stock como oportunidad mencionada.
- Pop-ups guiados como posible apoyo para aprender funcionamiento.
- Chat guiado como posible apoyo.

## Contexto de loyalty: Gana con Tuali

El programa **Gana con Tuali** funciona como sistema de puntos y recompensas.

Elementos relevantes:

- Todos ganan por cada pedido que se haga en Tuali.
- Por cada $20 MXN en compras se obtiene 1 punto.
- Solo compras hechas en Tuali suman puntos.
- Los puntos no son transferibles.
- Los puntos se otorgan por pedidos liquidados.
- Existen retos personalizados para ganar puntos adicionales.
- Es necesario activar el reto para participar.
- Los puntos pueden canjearse por productos del portafolio Coca-Cola.
- Los beneficios incluyen:
  - integración completa a Tuali,
  - compras que suman puntos,
  - canje por producto,
  - recompensas en el siguiente pedido,
  - retos personalizados para ganar más puntos.

## Protopersonas

### Fernanda — Madre emprendedora

Frase:

> “Busco que la tienda funcione sin que yo esté encima, para poder hacer otras cosas.”

Datos:

- Edad: 34 años.
- Género: femenino.
- Rol: dueña.
- Tiempo en el negocio: 4 años.
- Nivel socioeconómico: C-.
- Es madre, dejó su carrera para emprender y estar con su hija.
- Es organizada, directa y enfocada en optimizar tiempo.
- Busca que la tienda esté estable para poder dedicar tiempo a otras responsabilidades.
- Motivadores: independencia, eficiencia, control del negocio.
- Jobs to be Done: repetir pedidos, confirmar rápido, visibilidad de crédito y mantener stock.
- Frustraciones: errores de entrega, lentitud, promociones confusas.
- Necesidades: flujo ágil, información clara, confirmación visual y soporte rápido.
- Habilidades digitales: media.
- Canales: app principalmente, promotor como apoyo y WhatsApp ocasional.

### Raúl — Dueño apoyado

Frase:

> “A mí se me dificulta eso de la tecnología, para eso están los jóvenes.”

Datos:

- Edad: 63 años.
- Género: masculino.
- Rol: dueño.
- Tiempo en el negocio: 18 años.
- Nivel socioeconómico: C-.
- Dueño tradicional con movilidad limitada.
- Se apoya en promotores e hijos.
- Rechaza los cambios.
- Quiere mantener ingresos del hogar sin depender de sus hijos.
- Motivadores: seguir siendo útil y sostener a su familia.
- Jobs to be Done: pedir como siempre, con ayuda, sin aprender cosas nuevas.
- Frustraciones: apps confusas, procesos nuevos, falta de ayuda.
- Necesidades: sistema simple, confianza sin interacción digital compleja.
- Habilidades digitales: baja.
- Canales: promotor principalmente, llamada y app con ayuda.
- Canal donde hace su pedido: casi siempre promotor.

### Fernanda / Rosario — Familiar comprometida

Frase:

> “Somos familia, y estamos para apoyarnos siempre.”

Datos:

- Edad: 43 años.
- Género: femenino.
- Rol: ayudante.
- Tiempo en el negocio: 5 años.
- Nivel socioeconómico: C-.
- Familiar que tomó la tienda tras enfermedad del hermano.
- No necesariamente tiene sueldo, pero mantiene todo funcionando.
- Busca mantener ingresos familiares y cuidar a su hermano.
- Motivadores: apoyo familiar y estabilidad del hogar.
- Jobs to be Done: pedidos simples, entregas claras, seguimiento fácil.
- Frustraciones: falta de claridad, promociones engañosas, procesos lentos.
- Necesidades: app directa, pedidos repetidos, soporte humano.
- Habilidades digitales: media-baja.
- Canales: app, promotor y poco WhatsApp.

## Journeys de usuario

Los journeys cubren etapas como:

- Necesidad / motivación.
- Revisión de inventario.
- Decisión de compra.
- Búsqueda de producto.
- Selección de producto.
- Confirmación de producto.
- Espera del producto.
- Recepción del producto.
- Uso del producto.
- Recompra.
- Soporte.

## Journey de Fernanda — puntos relevantes

- Usa principalmente la app.
- Necesita hacer el pedido en momentos específicos del día porque tiene otras responsabilidades.
- Cuenta inventario y calcula cuánto necesita para llegar a una cantidad fija.
- Considera demanda de fin de semana, clima o temporada.
- Busca promociones y se pregunta cuántos productos debería pedir cuando hay descuento.
- Pain points:
  - no entender rentabilidad de productos con descuento,
  - poco tiempo para seguimiento detallado,
  - falta de herramientas para ampliar ganancias,
  - promociones confusas,
  - errores de entrega,
  - soporte sin solución.
- Love point:
  - encontrar promociones en productos con mayor rotación.
- Oportunidades:
  - información de rentabilidad dentro de promociones,
  - iconografía para promociones,
  - recomendaciones basadas en comportamiento,
  - recordatorios de pedido,
  - rastreo de pedido,
  - seguimiento y soporte más resolutivo.

## Journey de Raúl — puntos relevantes

- Usa principalmente promotor.
- Tiene baja habilidad digital.
- El promotor le recuerda hacer pedidos.
- Cuenta inventario con ayuda del promotor.
- Dicta productos al promotor.
- El promotor hace el pedido desde el celular del cliente.
- Le cuesta leer letras pequeñas y usar la app.
- Tiene miedo a equivocarse haciendo pedidos.
- Depende del promotor para resolver problemas.
- Pain points:
  - que el promotor no lo visite,
  - dificultad con tecnología,
  - letras pequeñas,
  - miedo a equivocarse,
  - dependencia de terceros,
  - entregas incompletas,
  - no saber cómo atraer clientes.
- Oportunidades:
  - experiencia más accesible,
  - botones grandes,
  - lenguaje simple,
  - apoyo del promotor,
  - recomendaciones de bajo riesgo,
  - capacitación y asesoramiento.

## Journey de Rosario — puntos relevantes

- Usa app y promotor.
- El promotor le ayuda a entender promociones.
- Hace inventario y calcula productos faltantes.
- Considera si es fin de semana o temporada alta.
- Se confunde con promociones y combinaciones.
- Se pregunta cuánto le está ganando a cada producto.
- Tiene presión por confirmar pedidos antes de la hora límite.
- Recompra usando app cuando no la visita el promotor.
- Pain points:
  - tener que hacer pedido sin asesoría del promotor,
  - promociones poco claras,
  - no saber si conviene combinar promociones,
  - hora límite de pedido,
  - entregas con errores,
  - problemas sin resolución rápida.
- Oportunidades:
  - explicar ahorro/promoción,
  - simplificar descripción de promociones,
  - alarmas de tiempo restante para pedido,
  - rastreo,
  - reportes mejor asignados,
  - acompañamiento cuando no está el promotor.

## Patrones comunes en los journeys

- El promotor sigue siendo clave.
- Las promociones son una oportunidad, pero también causan confusión.
- El pedido sugerido y resurtido ahorran tiempo.
- El crecimiento debe ser simple, medible y entendible.
- Entrega y soporte afectan confianza.
- El agente debería adaptarse al perfil del cliente.
- No todos los clientes saben finanzas o tecnología.
- El negocio puede ser el principal sustento del cliente.

## Preguntas respondidas por Tuali / aclaraciones obtenidas

### Sobre el comportamiento dentro de la app

Respuesta obtenida:

> El programa tiene que evaluar el comportamiento del usuario dentro de la aplicación.

Implicación de contexto:

- El agente debe usar señales de comportamiento dentro de Tuali.
- No debe sentirse como una herramienta aislada.
- El crecimiento debe conectarse con cómo el cliente usa la app.

### Usuario principal

Pregunta:

> ¿El agente debe estar pensado principalmente para cliente/tendero, promotor/asesor comercial o ambos?

Respuesta obtenida:

> Priorizar el cliente, y luego a Arca Continental / Tuali. Van conectadas. El objetivo es que el cliente crezca su negocio y que esto le dé ganancias a Tuali, o sea priorizar los productos que provee Tuali.

Implicación de contexto:

- El cliente final es prioridad.
- El beneficio para Tuali/Arca debe estar conectado.
- Deben priorizarse productos que Tuali provee.
- La solución debe mostrar beneficio para cliente y para Tuali.

### Métrica de crecimiento

Pregunta:

> ¿Crecimiento significa ventas totales, ticket promedio, frecuencia, promociones, retención u otra cosa?

Respuesta obtenida:

> Ticket promedio y autonomía del cliente de pedir más por Tuali que por otros métodos.

Implicación de contexto:

- Métrica principal: ticket promedio.
- Métrica secundaria/estratégica: autonomía del cliente dentro de Tuali.
- La solución debe incentivar que el cliente pida más por Tuali en lugar de depender de otros métodos.

### Datos disponibles / dato de ganancia

Pregunta:

> ¿Qué datos reales tendría el agente?

Respuesta obtenida:

> Pedirle en cuánto vende el producto para ganancia, porque esta información no está disponible en Tuali. Clientes con Yomp! ya colectan esta información.

Implicación de contexto:

- Tuali puede no tener el precio de venta final del cliente.
- El agente puede pedir al cliente en cuánto vende el producto.
- Con ese dato se puede estimar ganancia.
- El dato debe tratarse con cuidado para evitar incoherencias.

### Acción del agente

Pregunta:

> ¿El agente debería solo sugerir acciones o también tomar acciones?

Respuesta obtenida:

> Lo que haga que crezca más, el cliente y Tuali.

Implicación de contexto:

- No se limita a recomendaciones pasivas.
- El criterio es crecimiento para cliente y Tuali.
- Las acciones deben conectar con impacto concreto.

### Protopersona prioritaria

Pregunta:

> ¿Cuál arquetipo conviene priorizar para el MVP?

Respuesta obtenida:

> Dueño apoyado, con menos tecnología. Si lo puede entender alguien que no le sabe tanto a la tecnología, alguien que sí le sabe le sabrá más.

Implicación de contexto:

- El MVP debe priorizar a Raúl / dueño apoyado.
- La experiencia debe ser simple y accesible.
- Si funciona para alguien con baja habilidad digital, también puede funcionar para usuarios más tecnológicos.

### Qué no quieren ver

Pregunta:

> ¿Qué definitivamente no quieren ver?

Respuesta obtenida:

> Incoherencia en los datos.

Implicación de contexto:

- Debe cuidarse la consistencia de números.
- Cualquier cálculo o estimación debe tener origen claro.
- No se deben inventar datos sin explicación.
- El prototipo debe separar claramente datos reales, datos simulados y estimaciones.

## Notas adicionales del nuevo contexto

### Posibles usuarios

- Cliente dueño.
- Asesor comercial.
- Equipo interno de Tuali.

### Propuestas de producto consideradas

1. Agente de metas, recomendaciones y acompañamiento.
2. Copiloto gestor de cuenta.
3. Simulador de promociones y de costos promedio.

### Lista de funciones consideradas

- Ayudar al cliente a elegir una meta.
- Diagnóstico personalizado.
- Recomendaciones concretas.
- Opciones de sustitución.
- Chatbot como apoyo.
- Feedback semanal.
- Personalización del lenguaje.
- Updates de acuerdo al progreso.
- Recomendaciones de acuerdo a locación geográfica.
- Asesoramiento.
- Sistema de puntuación.
- Desglose de puntajes:
  - qué dio más puntos,
  - qué promociones convienen más,
  - etc.
- Barras de progreso y porcentajes.
- Pop-ups guiados para aprender funcionamiento.
- Chat de voz.
- Interfaz simple.

### Campos considerados para diagnóstico / personalización

- Edad.
- Género.
- Rol en el negocio.
- Tiempo en el negocio.
- Nivel socioeconómico.
- Quiénes son.
- Objetivo del negocio.
- Localización del negocio.
- Motivadores.
- Jobs to be Done.
- Frustraciones.
- Necesidades / expectativas.
- Personalidad.
- Habilidades digitales.
- Canales de interacción.
- Apps que usa.
- Canal donde hace su pedido.
- Zona demográfica.
- Contexto de la zona.

### Notas de negocio

- El asesor de tienda es el vendedor que visita cada cliente.
- Objetivo: que el cliente crezca.
- Aspectos de Tuali a considerar: promos, loyalty, etc.
- Considerar Arca Continental y asociados.
- Considerar productos/categorías como jugos y Santa Clara.
- Considerar porcentajes por categorías o productos.
- Considerar ticket promedio.
- La autonomía del cliente implica pedir más por Tuali que por el asesor u otros métodos.
- Puede pensarse en automatización del proceso y redirección a la aplicación de Tuali.
- En Tuali entran el promotor y el reparto.
- Tuali recomienda con base en compras y ventas de clientes similares al usuario.
- El cliente registra ventas, aunque no todas ni siempre.
- Tuali crea historial.
- Importa la zona demográfica y qué se vende bien en el área.
- Nota mencionada: Tuali recopila datos todos los días a las 6 PM.

## Riesgos identificados en el contexto

| Riesgo | Tipo | Mitigación o nota registrada |
|---|---|---|
| Depender demasiado del LLM | Técnico | Motor determinístico primero; LLM solo como capa de explicación. |
| Parecer chatbot genérico | Producto | Interfaz basada en meta → plan → acción → seguimiento. El chatbot es solamente apoyo. |
| No tener dataset real | Datos | Usar protopersonas y journeys como base de simulación y explicar cómo se conectaría a datos reales. Transparencia sobre incertidumbre y riesgos. |
| Demasiada complejidad para clientes | UX/Diseño | Gráficos simples, fáciles de seguir y lenguaje personalizado de acuerdo al diagnóstico. |
| Querer meter todo | Alcance | Eliminar funciones no necesarias o difíciles de implementar/personalizar. Enfocarse en una meta principal y tres recomendaciones. |
| Recomendar productos sin considerar margen real | Negocio | Riesgo identificado; falta definir mitigación completa. |
| Ignorar al promotor | Humano | Riesgo identificado; el promotor forma parte del contexto real de uso. |
| Falta de consistencia o engagement con la aplicación | Humano | Conectar sistema de puntuación con metas que va alcanzando el cliente. |
| Incoherencia de datos | Producto / datos | Cuidar consistencia de datos, cálculos, estimaciones y origen de información. |
