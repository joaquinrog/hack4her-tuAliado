# Registro de riesgos

> Riesgos identificados durante la discusión del reto y el MVP.
> Actualizar cuando aparezcan nuevos riesgos o cuando cambien las mitigaciones.

---

| # | Riesgo | Tipo | Probabilidad | Impacto | Mitigación actual |
|---|---|---|---|---|---|
| R1 | Depender demasiado del LLM para recomendaciones | Técnico | Media | Alto | Motor determinístico primero. LLM solo como capa de explicación. |
| R2 | Parecer un chatbot genérico | Producto | Alta | Alto | Interfaz basada en flujo estructurado: meta → plan → acción → seguimiento. Chatbot solo como apoyo. |
| R3 | No tener dataset real utilizable | Datos | Alta | Medio | Usar protopersonas y journeys como base de simulación. Ser transparentes en la presentación sobre qué es mock y qué sería real. |
| R4 | Demasiada complejidad para usuarios con baja habilidad digital | UX | Media | Alto | Diseño simple. Una cosa a la vez. Lenguaje adaptado al perfil del cliente. Priorizar Raúl como arquetipo de prueba. |
| R5 | Overbuild — querer meter todo | Alcance | Alta | Alto | Enfocarse en una meta + tres recomendaciones. No implementar módulos opcionales antes de tener el flujo core. |
| R6 | Recomendar productos sin considerar margen o precio de venta real | Negocio | Alta | Medio | Pedir al cliente su precio de venta. Marcar estimaciones como estimaciones. No presentar ganancias como datos exactos si no lo son. |
| R7 | Ignorar el papel del promotor en el contexto real | Humano | Baja | Medio | Reconocer en el diagnóstico si el cliente depende del promotor. El agente puede ser el "promotor digital" para estos casos. |
| R8 | Incoherencia de datos | Producto / Datos | Media | Crítico | Separar claramente datos reales, mock y estimaciones. Todos los números con origen explícito. Validar consistencia antes de la demo. |
| R9 | Falta de engagement — el cliente no vuelve | Producto | Media | Alto | Conectar sistema de puntuación con metas que va alcanzando el cliente. Feedback semanal. Recordatorios de avance. |
| R10 | No tener tiempo suficiente durante el hackathon | Ejecución | Alta | Alto | Priorizar flujo core. Docs-first para no perder contexto entre sesiones. Tareas acotadas. Aprobar antes de implementar. |

---

## Detalle de riesgos críticos

### R8 — Incoherencia de datos (Crítico)

Este riesgo fue mencionado explícitamente por Tuali como **lo que definitivamente no quieren ver**.

Escenarios de riesgo:
- Mostrar un porcentaje de ganancia que no cuadra con los datos de pedido.
- Cambiar un número entre pantallas sin explicación.
- Calcular puntos de loyalty con una regla diferente a la real (1 pto por $20 MXN).
- Mostrar recomendaciones basadas en datos que no están disponibles como si fueran datos reales.

Mitigación concreta:
- Todos los números en la UI deben tener un `data-source` explícito en los datos mock.
- Si algo es estimación, etiquetarlo como estimación.
- Si algo es simulado, no presentarlo como dato real.
- Validar coherencia antes de cada demo.

---

### R2 — Chatbot genérico (Alto impacto)

Tuali tiene su propio contexto de app conocida. Un chatbot genérico daña la credibilidad del producto.

El diferenciador es el flujo estructurado: el cliente no abre una pantalla en blanco preguntando "¿en qué te ayudo?" — llega con un diagnóstico, una meta activa y recomendaciones ya calculadas.

---

### R5 — Overbuild (Alto en hackathon)

El hackathon tiene tiempo limitado. Es tentador implementar loyalty + chatbot + barras de progreso + sustitución de productos + chat de voz + pop-ups + feedback semanal.

La regla es: primero el flujo core funciona de punta a punta. Después se agrega.
