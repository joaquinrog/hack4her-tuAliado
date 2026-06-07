# tuAliado — Tuali Growth Agent

**Hackathon:** Hack4Her
**Reto:** Tuali Growth Agent
**Equipo:** Picafresitas

---

## Problema

Los clientes de Tuali (dueños de tiendas de abarrotes y similares) tienen acceso a una app con datos de sus pedidos, promociones, puntos de loyalty y pedido sugerido, pero no existe un espacio dentro de Tuali que los acompañe para crecer su negocio, definir una meta, recibir recomendaciones personalizadas y dar seguimiento a su avance.

El resultado: el cliente no sabe qué le conviene pedir, no aprovecha las promociones de forma óptima, y depende del promotor para tomar decisiones que podría tomar solo.

## Solución: tuAliado

Un agente de crecimiento para clientes de Tuali que:

- evalúa el comportamiento del cliente dentro de la app,
- lo ayuda a elegir una meta de negocio,
- da recomendaciones concretas y entendibles,
- integra promociones, pedido sugerido y el programa de loyalty,
- da seguimiento al progreso hacia la meta,
- usa lenguaje simple adaptado al perfil del cliente.

El usuario prioritario es el **dueño apoyado**: dueño de tienda con baja habilidad tecnológica que normalmente depende del promotor.

## Estado actual

**Fase:** Esquema de datos mock implementado. Motor de recomendaciones pendiente. Diseño en progreso.

## Métricas objetivo

| Métrica | Descripción |
|---|---|
| Ticket promedio | Aumentar el valor promedio de los pedidos del cliente |
| Autonomía en Tuali | Que el cliente pida más por app que por promotor u otros métodos |

## Documentación importante

| Archivo | Contenido |
|---|---|
| `docs/handoff-context.md` | Resumen de contexto para inicio rápido de sesión |
| `docs/mvp-current-direction.md` | Dirección del MVP definida hasta ahora |
| `docs/project-brief.md` | Descripción del problema y la solución |
| `docs/decisions.md` | Decisiones confirmadas |
| `docs/risk-register.md` | Riesgos identificados y mitigaciones |
| `docs/data-assumptions.md` | Qué datos hay y qué no está confirmado |
| `docs/pitch-context.md` | Contexto para la presentación |
| `CLAUDE.md` | Instrucciones operativas para Claude Code |
| `AGENTS.md` | Flujo de trabajo con agentes de AI |

## Archivos fuente del reto

- `01-contexto-reto-tuali.md` — Contexto oficial, protopersonas, journeys, respuestas de Tuali.
- `02-posible-mvp-tuali-crece.md` — Dirección del MVP discutida hasta ahora (doc fuente original).

## Assets de diseño

Todos los assets viven en `design/assets/`. Los prompts para generarlos están en `design/stitch-prompts/`.

### Identidad de marca (`design/stitch-prompts/brand-identity.md`)

| Asset | Archivo | Formato |
|---|---|---|
| Ícono del logo (solo) | `assets/logo-mark.svg` | SVG |
| Wordmark (solo nombre) | `assets/wordmark.svg` | SVG |
| Logo completo (ícono + nombre) | `assets/logo-full.svg` | SVG |
| Paleta de colores con hex | `assets/palette.png` | PNG |
| Ícono meta: Vender más | `assets/icons/vender-mas.svg` | SVG |
| Ícono meta: Aprovechar las promociones | `assets/icons/aprovechar-promos.svg` | SVG |
| Ícono meta: Surtir mejor mi tienda | `assets/icons/surtir-tienda.svg` | SVG |
| Ícono meta: Saber cómo me está yendo | `assets/icons/como-voy.svg` | SVG |

### Pantallas (`design/stitch-prompts/0X-*.md`)

| Asset | Archivo | Prompt fuente |
|---|---|---|
| Splash screen | `assets/screens/00-splash.png` | `00-splash.md` |
| Onboarding — sin selección | `assets/screens/01-onboarding-default.png` | `01-onboarding.md` |
| Onboarding — meta seleccionada (botón activo) | `assets/screens/01-onboarding-selected.png` | `01-onboarding.md` |
| Diagnóstico | `assets/screens/02-diagnostico.png` | `02-diagnostico.md` |
| Recomendaciones — 3 tarjetas | `assets/screens/03-recomendaciones.png` | `03-recomendaciones.md` |
| Modal precio de venta | `assets/screens/03-modal-precio-venta.png` | `03-recomendaciones.md` |
| Seguimiento y progreso | `assets/screens/04-seguimiento.png` | `04-seguimiento.md` |
| Chatbot — botón flotante (FAB) | `assets/screens/05-chatbot-fab.png` | `05-chatbot.md` |
| Chatbot — bottom sheet abierto | `assets/screens/05-chatbot-sheet.png` | `05-chatbot.md` |
| Registro — P1: ¿Cómo estuvo el día? | `assets/screens/06-registro-p1.png` | `06-registro.md` |
| Registro — P2: ¿Pediste a Tuali? | `assets/screens/06-registro-p2.png` | `06-registro.md` |
| Registro — P3: pregunta por meta (cualquier versión) | `assets/screens/06-registro-p3.png` | `06-registro.md` |
| Registro — pantalla de completado con racha | `assets/screens/06-registro-completado.png` | `06-registro.md` |

**Total: 8 assets de identidad + 13 pantallas = 21 archivos.**

### Paleta de colores

| Token | Uso | Hex |
|---|---|---|
| Primario | CTAs, botones principales | `#F97316` |
| Secundario | Datos informativos, progreso | `#2563EB` |
| Fondo | Fondo de pantalla | `#FAFAF9` |
| Superficie | Tarjetas, modales | `#FFFFFF` |
| Texto | Texto principal | `#1C1917` |
| Texto muted | Labels, subtítulos | `#78716C` |

---

## Equipo — Picafresitas

| Nombre | Rol |
|---|---|
| Joaquín Rosales González | Tech Lead / Ingeniería |
| Fernanda Sánchez Estudillo | Diseño UX/UI |
| Isabel Mejía Franco | Producto / Estrategia |
| Katia Iveth Uribe Briones | Presentación / Pitch |

---

> Los documentos en `docs/` son la fuente de verdad del proyecto. Los prompts de diseño en `design/stitch-prompts/` son la fuente de verdad para los assets.
