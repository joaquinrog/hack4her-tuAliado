# tuAliado

> TuAliado es un sistema de acompañamiento que convierte metas de negocio en acciones concretas y medibles para cada tendero.

**Hackathon:** Hack4Her — Reto **Tuali Growth Agent**
**Equipo:** Picafresitas
**Demo en vivo:** https://hack4her-tu-aliado.vercel.app/
**Video / capturas / Devpost:** https://devpost.com/software/tualiado · https://youtube.com/shorts/Dmv-8YtmCt8?feature=share

---

## El problema

Los clientes de Tuali (dueños de tiendas de abarrotes) tienen acceso a una app con pedidos, promociones, puntos de loyalty y pedido sugerido — pero nada dentro de Tuali los acompaña a usar esa información para crecer su negocio. El resultado: no saben qué les conviene pedir, no aprovechan sus promociones, y dependen del promotor para decisiones que podrían tomar solos.

Diseñamos para **Raúl**, el arquetipo de **dueño apoyado**: el perfil con menor habilidad digital de las protopersonas del reto. Si el producto funciona para él — que evita procesos complejos y depende de otros para usar herramientas tecnológicas —, funciona para cualquier perfil más digital. Diseñar para el caso más difícil es diseñar para todos.

## La solución: tuAliado

tuAliado **no es un chatbot que responde preguntas**. Es un sistema de acompañamiento que convierte una meta de negocio en un plan de acciones concretas, con seguimiento continuo — más parecido a la guía de un promotor que a un asistente conversacional genérico.

El flujo es lineal y simple:

```
Diagnóstico → Meta → Recomendaciones → Acción → Seguimiento
```

1. **Diagnóstico** — tuAliado muestra el estado actual del negocio (ticket promedio, canal de pedido, puntos de loyalty, oportunidades) usando comportamiento real dentro de la app.
2. **Meta** — Raúl elige qué quiere lograr, con botones grandes y visuales (sin formularios largos).
3. **Recomendaciones** — el motor determinístico prioriza hasta 3 acciones concretas conectadas a esa meta: una promoción activa, pedir por la app, activar un reto de loyalty.
4. **Acción → Registro** — Raúl reporta señales simples de su día (check-in de 2-3 preguntas, no captura de ventas complejas).
5. **Seguimiento** — tuAliado muestra el avance hacia la meta, comparación de canal y racha de uso.

Un chat flotante (texto y **voz**) acompaña todo el flujo para resolver dudas puntuales — pero **explica, no decide**: las recomendaciones siempre salen del motor determinístico.

## Por qué no es "otro chatbot con IA"

La IA (Gemini) no es el producto. Es el motor que traduce lo que ya calculó la lógica determinística a lenguaje simple y cercano. **El motor decide qué recomendar; Gemini solo lo explica** — y si Gemini no responde, el flujo completo sigue funcionando porque las recomendaciones no dependen de él.

Esto importa porque Tuali fue explícito: lo que no quieren ver es **incoherencia en los datos**. Un chatbot genérico improvisa texto; tuAliado siempre parte de números reales del mock (ticket, canal, promociones, loyalty) y solo usa el LLM para ponerlos en palabras que Raúl entienda.

## Diferenciador principal

**Acompañamiento accesible para usuarios con baja habilidad digital**, antes que cualquier feature aislada. Eso se traduce en:

- flujo estructurado y lineal (no navegación libre por menús),
- lenguaje claro y visual (íconos, números grandes, barras de progreso sobre párrafos),
- recomendaciones siempre justificadas con datos reales,
- **interacción por voz** — para Raúl, que prefiere hablar a escribir o navegar interfaces complejas,
- seguimiento continuo, no una recomendación de una sola vez.

## Para Tuali / Arca Continental

La promesa es **convertir interacción cotidiana en inteligencia comercial**: cada vez que Raúl registra su día o sigue una recomendación, tuAliado capta señales que permiten personalizar mejor, impulsar promociones y loyalty, y — como resultado — mover las dos métricas que Tuali definió como objetivo:

| Métrica | Qué mide |
|---|---|
| **Ticket promedio** | Valor promedio de los pedidos del cliente (métrica principal) |
| **Autonomía dentro de Tuali** | Que el cliente pida más por app y dependa menos del promotor (métrica secundaria) |

## Datos usados en la demo

> **No usamos datos reales de clientes.** Trabajamos con un mock TypeScript construido a partir de las protopersonas, journeys y contexto oficial del reto que compartió Tuali. El objetivo es demostrar cómo funcionaría el flujo completo — diagnóstico, recomendación, seguimiento — sobre un escenario realista, no entregar analítica sobre datos de producción.

Cada dato del mock está anotado por origen en `lib/types.ts`:

| Origen | Significa |
|---|---|
| `TUALI` | Viene del contexto/datos que Tuali compartió (historial, comportamiento, loyalty, catálogo, promociones) |
| `CLIENTE` | Lo aporta el cliente dentro del flujo (meta elegida, precio de venta) |
| `ESTIMACION` | Cálculo derivado (p. ej. margen/ganancia) — siempre `null` si falta el dato base, nunca se inventa |

Números destacados del perfil de Raúl en la demo (todos calculados por el motor sobre el mock, no inventados):

- Ticket promedio: **$440 MXN** → meta sugerida **$506 MXN**
- Canal de pedido: **20% app / 80% promotor**
- Loyalty: **180 puntos** acumulados, retos sin activar
- 3 oportunidades reales detectadas: promociones sin usar, bajo uso de la app para pedir, reto de loyalty sin activar

## Camino de demo recomendado

```text
/ → /onboarding → /diagnostico?meta=vender_mas → /recomendaciones?meta=vender_mas → /registro?meta=vender_mas → /seguimiento?meta=vender_mas
```

Se recorre una sola meta (**Vender más**) de punta a punta — es la más fácil de entender y la que conecta más directo con el ticket promedio. El `/diagnostico` se ve igual sin importar la meta elegida a propósito: es la "foto base" del negocio antes de decidir qué hacer; la personalización ocurre después, en recomendaciones, registro y seguimiento. (Más detalle en `docs/demo-flow.md`.)

## Qué está implementado hoy

- Flujo completo: Splash, Onboarding, Diagnóstico, Recomendaciones, Registro diario y Seguimiento
- Motor determinístico de diagnóstico y recomendaciones (`lib/recommendation-engine.ts`)
- Capa de explicación con Gemini (`lib/gemini.ts`) — con respaldo de segunda API key
- Chat flotante de texto, integrado en todo el flujo
- **Modo voz** (Web Speech API: STT + TTS) — diferenciador clave para usuarios que prefieren hablar a escribir
- Sistema de racha / streak de uso diario
- UX mobile-first (375–430px) con visuales sobre texto

## Próximos pasos

En orden de impacto para el siguiente sprint (ver detalle y estimaciones en `docs/mvp-plan.md`):

1. **Calculador de ganancia** (F6) — modal en `/recomendaciones` para pedir el precio de venta de Raúl y mostrar el beneficio estimado; diseño ya recibido (`design/assets/recomendaciones/tualiado_calculador_de_ganancia_v3`), falta conectarlo al motor.
2. **Pop-ups guiados** (F16) — tour de primera visita que señala "esto es para ti, Raúl".
3. **Sustitución de recomendaciones** (F5) — botón "no me convence, ver otra" para que el producto se sienta vivo, no estático.
4. **Asesoramiento financiero** (F8) y **perfil del cliente editable** (F2) — más profundidad y credibilidad en la demo.
5. **Piloto con datos reales** — conectar el motor a datos productivos de Tuali/Arca Continental con un grupo pequeño de clientes, y validar que las recomendaciones siguen siendo coherentes fuera del mock.

## Visión a futuro

Aprendizaje adaptativo en tiempo real, modelos predictivos de comportamiento, predicciones estacionales, evaluación dinámica de riesgo, y conexión completa con datos productivos reales de Tuali y Arca Continental. Lo de hoy es un prototipo funcional sobre datos mock — el siguiente paso natural es pilotear con datos reales de un grupo pequeño de clientes.

## Stack técnico

- **Framework:** Next.js (App Router) + TypeScript
- **Estilos:** Tailwind CSS — mobile-first, sin breakpoints de escritorio
- **Datos:** módulos TypeScript mock en `lib/mock-data.ts`
- **Motor:** funciones puras determinísticas en `lib/recommendation-engine.ts`
- **LLM:** Gemini API — solo como capa de explicación en lenguaje natural (`lib/gemini.ts`)
- **Diseño:** assets generados con Stitch (`design/stitch-prompts/`, `design/assets/`)
- **Deploy:** Vercel

## Documentación del proyecto

Este proyecto es **docs-first**: la continuidad de contexto entre sesiones de desarrollo importa tanto como el código. Toda la documentación vive en `docs/`:

| Archivo | Contenido |
|---|---|
| `docs/handoff-context.md` | Resumen de contexto y estado actual, sesión a sesión |
| `docs/mvp-current-direction.md` | Dirección del MVP |
| `docs/decisions.md` | Decisiones de producto confirmadas |
| `docs/demo-flow.md` | Guion y camino exacto de la demo |
| `docs/data-assumptions.md` | Qué datos hay, cuáles son reales y cuáles supuestos |
| `docs/risk-register.md` | Riesgos identificados y mitigaciones |
| `01-contexto-reto-tuali.md` | Contexto oficial del reto, protopersonas y journeys |

## Equipo — Picafresitas

| Nombre | Rol |
|---|---|
| Joaquín Rosales González | Tech Lead / Ingeniería |
| Fernanda Sánchez Estudillo | Diseño UX/UI |
| Isabel Mejía Franco | Producto / Estrategia |
| Katia Iveth Uribe Briones | Presentación / Pitch |

---

> Capturas adicionales de la demo: ver el [Devpost del proyecto](https://devpost.com/software/tualiado). Preguntas abiertas de producto en `docs/producto-preguntas.md`.
