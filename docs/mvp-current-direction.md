# Dirección del MVP — tuAliado

> Este documento refleja únicamente lo que ya ha sido discutido y confirmado.
> No agregar funcionalidades no mencionadas en los docs fuente.

## Nombre de trabajo

**tuAliado**

Descripción:
> Un asesor enfocado en objetivos que sugiere pasos a seguir a la medida, detalla niveles de riesgo y beneficio, integra ofertas y programas de lealtad, y facilita resúmenes para comunicación vía WhatsApp o con asesores.

## Usuario prioritario

**Cliente dueño — arquetipo: dueño apoyado.**

Raúl: 63 años, baja habilidad tecnológica, usa principalmente el promotor, necesita lenguaje simple, tiene miedo a equivocarse, le da trabajo la tecnología.

Razón para priorizar este arquetipo: si funciona para alguien con poca habilidad digital, funciona para todos los demás también.

## Métricas del MVP

| Métrica | Tipo | Descripción |
|---|---|---|
| Ticket promedio | Principal | Aumentar el valor promedio del pedido del cliente |
| Autonomía en Tuali | Secundaria | Que el cliente pida más por app que por promotor u otros métodos |

## Flujo base

```
Diagnóstico → Meta → Recomendación → Acción → Seguimiento
```

Cada paso tiene propósito claro:

- **Diagnóstico:** entender el perfil del cliente y su comportamiento dentro de la app.
- **Meta:** ayudar al cliente a elegir una meta concreta (ticket promedio, usar más Tuali, aprovechar promos).
- **Recomendación:** dar 1 meta principal y hasta 3 recomendaciones concretas.
- **Acción:** facilitar que el cliente tome la acción dentro de Tuali.
- **Seguimiento:** mostrar avance hacia la meta de forma visual y simple.

## Diagnóstico personalizado

El diagnóstico puede considerar:
- comportamiento dentro de la app (si usa promos, pedido sugerido, loyalty, si repite pedidos),
- perfil del cliente (edad, rol, tiempo en el negocio, habilidades digitales),
- zona y contexto del negocio,
- historial de compras y pedidos,
- si hace pedidos por Tuali o por otros canales.

## Metas del cliente (4 confirmadas para onboarding)

| Botón | Etiqueta | Qué resuelve el motor |
|---|---|---|
| 1 | Vender más | Ticket promedio — promos, productos top, pedido sugerido ampliado |
| 2 | Aprovechar las promociones | Detecta promos activas no usadas por el cliente |
| 3 | Surtir mejor mi tienda | Pedido sugerido, resurtido, productos de zona |
| 4 | Saber cómo me está yendo | Activa diagnóstico + seguimiento |

**Decisión:** 4 botones, no 6. Las metas "Organizar mejor mi negocio" y "Ahorrar para una meta importante" fueron descartadas por no tener output concreto en el motor determinístico. "Tener siempre producto" y "Saber qué productos pedir" se fusionaron en "Surtir mejor mi tienda" (el motor las resuelve igual: pedido sugerido). Ver `docs/decisions.md`.

## Recomendaciones

Las recomendaciones deben estar conectadas a:
- productos del portafolio Tuali,
- promociones activas,
- pedido sugerido / resurtido,
- loyalty (Gana con Tuali),
- compras pasadas del cliente,
- comportamiento dentro de la app,
- productos que se venden bien en clientes similares,
- zona geográfica o demográfica cuando sea relevante.

## Dato faltante: precio de venta del cliente

Tuali no tiene el precio al que el cliente vende los productos.

Solución discutida: pedir al cliente en cuánto vende el producto para poder estimar ganancia o conveniencia de una promoción.

Contexto:
- Clientes con Yomp! ya tienen este dato registrado.
- El cliente puede registrar ventas en la app, aunque no siempre lo hace.
- Este dato debe tratarse con cuidado para evitar incoherencias.

## Riesgo y beneficio

Parte del concepto incluye mostrar al cliente:
- qué acción es más segura (bajo riesgo),
- qué acción puede traer más ganancia,
- qué promoción le conviene según su meta,
- qué recomendación tiene más sentido para su situación.

## Indicadores visuales de progreso

- Barras de progreso hacia metas.
- Porcentajes de avance.
- Seguimiento simple y entendible.

## Feedback semanal

- Resumen de avance.
- Qué funcionó y qué no.
- Siguiente recomendación.

## Sistema de puntuación

Conectado al programa de loyalty existente (Gana con Tuali):
- mostrar qué acciones dieron más puntos,
- qué promociones son más convenientes,
- avance hacia metas ligado a engagement con la app.

## Chatbot

El chatbot **es apoyo**, no el centro del producto.

Usos posibles:
- explicar una recomendación en lenguaje simple,
- responder dudas sobre una promoción,
- dar el resumen semanal,
- adaptar el lenguaje al perfil del cliente.

No debe ser el punto de entrada principal ni reemplazar el flujo estructurado.

## Chat de voz

Mencionado como posible función para mejorar accesibilidad con usuarios de baja habilidad digital. No confirmado como parte del MVP mínimo.

## Pop-ups guiados

Para usuarios con poca experiencia tecnológica, guiar el funcionamiento de la app con pop-ups cortos y claros.

## Evaluación de comportamiento dentro de la app

Señales que el agente debería considerar:
- si el usuario usa o no promociones,
- si usa pedido sugerido,
- si repite productos,
- si depende del promotor,
- si abandona procesos sin completarlos,
- si pide por Tuali o por otros canales,
- si interactúa con loyalty,
- si activa retos,
- si registra ventas,
- si aumenta su ticket promedio.

## Decisión técnica: motor determinístico primero

La lógica de recomendaciones debe ser determinística — basada en reglas claras, no en generación libre de un LLM.

El LLM se usa solo como **capa de explicación**: toma una recomendación ya calculada y la traduce a lenguaje entendible para el cliente.

Esto evita el riesgo de recomendaciones incoherentes o que parezcan inventadas.

## Alcance del MVP

Priorizar: **una meta + tres recomendaciones**.

No intentar cubrir todos los módulos posibles al mismo tiempo. La profundidad sobre uno funciona mejor que una experiencia superficial sobre diez.

## Plataforma: Mobile únicamente

El MVP debe funcionar y verse bien **solo en móvil**. Los clientes no tienen acceso a computadora.

- Viewport objetivo: 375px – 430px.
- Sin layouts de desktop.
- Botones y tap targets grandes (mínimo 44x44px).
- Fuentes legibles (mínimo 16px).
- Sin interacciones que solo funcionen con hover o mouse.

## Principio de UX: Visuales sobre texto

Confirmado: cuesta mucho a los usuarios leer. Los visuales comunican más rápido y reducen la carga cognitiva.

Guías concretas:
- Una pantalla = una idea principal + una acción.
- Usar barras de progreso, iconos y números grandes para mostrar avance.
- Las recomendaciones deben verse como tarjetas visuales, no como listas de texto.
- Los números importantes (ticket promedio, puntos, progreso) son el elemento más grande en pantalla.
- El texto que aparece debe ser corto, directo y en lenguaje simple — siempre preguntarse: ¿lo entiende Raúl?
