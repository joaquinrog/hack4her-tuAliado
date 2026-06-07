# Handoff Context — Estado actual del proyecto

> Leer este archivo al inicio de cualquier sesión nueva.
> Actualizar cuando el estado del proyecto cambie.

---

## Identificación del proyecto

| Campo | Valor |
|---|---|
| Hackathon | Hack4Her |
| Reto | Tuali Growth Agent |
| Producto de trabajo | tuAliado |
| Tech Lead | Tech Lead del equipo |

### Qué está hecho y qué falta

| Módulo | Estado |
|---|---|
| Proyecto Next.js 15 inicializado | ✅ Hecho |
| `lib/types.ts` — contratos TypeScript | ✅ Hecho |
| `lib/mock-data.ts` — perfil Raúl, pedidos, productos, promos, loyalty | ✅ Hecho |
| `lib/onboarding-questions.ts` — estructura de preguntas | ✅ Hecho |
| `lib/recommendation-engine.ts` — motor determinístico | ✅ Hecho |
| `lib/gemini.ts` — capa de explicación | ✅ Hecho |
| `lib/state.ts` — URL params + localStorage | ✅ Hecho |
| Pantallas core (onboarding, diagnóstico, recomendaciones, seguimiento) | 🔄 Placeholders listos |
| Chatbot flotante + `/api/chat` | 🔄 `/api/chat` listo — falta UI |
| **Chat de voz** (diferenciador clave — F13) | ⬜ Pendiente |

## Contexto del equipo

El Tech Lead es el único programador. El proyecto depende de continuidad de contexto entre sesiones de AI, por eso existe esta documentación.

## Qué pidió Tuali

Diseñar un prototipo de un **Agente de Crecimiento** dentro de Tuali que responda de forma inteligente y personalizada a:

> ¿Cómo ayudamos a los clientes de Tuali a crecer su negocio?

El agente debe ayudar al cliente a:
- definir una meta,
- aumentar ventas,
- incrementar ticket promedio,
- recibir recomendaciones personalizadas,
- dar seguimiento a su avance,
- aprender y ajustar con base en qué funcionó y qué no.

## Problema que resolvemos

Los clientes de Tuali tienen datos útiles disponibles (pedidos, promociones, loyalty, pedido sugerido) pero no hay nada dentro de la app que use esa información para acompañarlos a crecer su negocio con una meta clara y recomendaciones entendibles.

## Respuestas confirmadas de Tuali

| Pregunta | Respuesta de Tuali | Implicación |
|---|---|---|
| ¿Para quién es el agente? | Priorizar el cliente; luego Tuali/Arca. Van conectados. | El cliente es el usuario prioritario. |
| ¿Qué significa crecimiento? | Ticket promedio y autonomía del cliente dentro de Tuali. | Dos métricas principales. |
| ¿Qué datos tendrá el agente? | Tuali no tiene el precio de venta final — se puede pedir al cliente. Yomp! sí lo colecta. | Dato crítico que hay que solicitar. |
| ¿El agente sugiere o actúa? | Lo que haga que crezca más. | No limitarse a recomendaciones pasivas. |
| ¿Qué arquetipo priorizar? | Dueño apoyado, con menos tecnología. | MVP dirigido a Raúl. |
| ¿Qué no quieren ver? | Incoherencia en los datos. | Crítico: cualquier número debe tener origen claro. |
| ¿Cómo debe comportarse? | Evaluar comportamiento del usuario dentro de la app. | El agente debe usar señales de la app. |

## Dirección del MVP: tuAliado

Flujo base:
```
Diagnóstico → Meta → Recomendación → Acción → Seguimiento
```

Puntos clave:
- Usuario prioritario: **dueño apoyado** (Raúl) — baja habilidad tecnológica.
- Métrica principal: **ticket promedio**.
- Métrica secundaria: **autonomía del cliente dentro de Tuali**.
- Motor determinístico primero; LLM solo para explicar en lenguaje natural.
- **Chat de voz es diferenciador principal** — Web Speech API + speechSynthesis, mismo backend `/api/chat`. Se desarrolla en paralelo con diseño en Stitch. Raúl no quiere leer.
- El chatbot es apoyo, no el centro.
- Una meta + tres recomendaciones concretas.
- Integrar: promociones, pedido sugerido, loyalty.
- Pedir al cliente su precio de venta para estimar ganancia.
- Interfaz simple, lenguaje claro.

## Recursos disponibles (confirmados)

- Protopersonas (Fernanda, Raúl, Rosario).
- Journeys de usuario para los tres arquetipos.
- Contexto de promociones.
- Contexto de pedido sugerido / resurtido.
- Contexto de loyalty (Gana con Tuali: 1 punto por cada $20 MXN comprados).
- Funciones actuales de Tuali descritas en los docs.

## Datos que faltan o no están confirmados

- No hay dataset estructurado de clientes cifrados sin PEI disponible para uso en el prototipo.
- Tuali no tiene el precio de venta final del cliente.
- El volumen y detalle del historial de comportamiento no está definido como dataset utilizable.

## Riesgos principales

Ver `docs/risk-register.md` para la lista completa.

Los más críticos para este hackathon:
1. Incoherencia de datos — lo que Tuali explícitamente no quiere ver.
2. Convertirse en chatbot genérico.
3. Overbuild — querer implementar todo.
4. No tener dataset real utilizable.

## Stack técnico

**Confirmado:**
- Next.js (App Router) + TypeScript
- Tailwind CSS (estilos)
- Módulos TypeScript mock en `/lib/mock-data.ts`
- Motor determinístico en `/lib/recommendation-engine.ts`
- Gemini API en `/lib/gemini.ts` (solo capa de explicación)
- Deploy: Vercel

No habrá dataset real de Tuali. Solo los datos de `01-contexto-reto-tuali.md`.

## Constraints de UX confirmados

- **Mobile únicamente** (375px–430px). Sin layouts de desktop.
- **Visuales sobre texto**: iconos, barras, números grandes. Texto mínimo y corto.

## Lo que está hecho

### Proyecto Next.js inicializado (2026-06-06)
- Next.js 15 + TypeScript + Tailwind CSS — App Router.
- Deploy target: Vercel.

### Esquema de datos mock implementado (2026-06-06)

Tres archivos en `/lib/`:

| Archivo | Contenido |
|---|---|
| `lib/types.ts` | Todos los contratos TypeScript. Campos anotados por origen: TUALI, CLIENTE o ESTIMACION. |
| `lib/mock-data.ts` | Perfil Raúl, 10 pedidos (90 días), 15 productos Arca/Tuali, 3 promociones activas, estado loyalty. |
| `lib/onboarding-questions.ts` | Estructura de preguntas del onboarding. 1 pregunta en sesión 1 (botones grandes). Precio de venta: progresivo. |

**Números clave del mock:**
- Ticket promedio Raúl: ~$450 MXN.
- Canal: 80% promotor / 20% app.
- Loyalty: 180 puntos acumulados, retos no activados.
- Promociones activas: Coca-Cola 600ml (10%), Ciel 1L (15%), Victoria x12 (8%).
- Comportamiento: no usa promos, no usa pedido sugerido, no ha activado retos → 3 oportunidades inmediatas para el motor.

**Separación de orígenes implementada:**
- `TUALI`: historial, comportamiento, loyalty, catálogo, promociones.
- `CLIENTE`: meta elegida en onboarding, precios de venta (progresivos).
- `ESTIMACION`: cualquier cálculo de margen/ganancia — devuelve `null` si no hay precio del cliente.

## FASE 0 completada (2026-06-06)

Todos los módulos de lógica están listos:

| Archivo | Qué hace |
|---|---|
| `lib/state.ts` | `getMeta`, `buildUrl`, `guardarBaseline`, `cargarBaseline`, `guardarEntradaDiaria`, `cargarEntradasDiarias`, `guardarRacha`, `cargarRacha`, `actualizarRacha` |
| `lib/recommendation-engine.ts` | `calcularTicketPromedio`, `calcularDiagnostico`, `calcularRecomendaciones(meta, estado)` → `{ recomendaciones, baseline }` |
| `lib/gemini.ts` | `explicarRecomendacion(rec, perfil)` → string, `responderChat(msg, ctx)` → string |
| `app/api/chat/route.ts` | POST `/api/chat` → `{ reply }` usando Gemini Flash |
| `lib/mock-data.ts` | +`ENTRADAS_DEMO` (4 entradas coherentes con historial de Raúl) |
| `lib/onboarding-questions.ts` | Corregidas metas a valores confirmados (`vender_mas`, `aprovechar_promos`, `surtir_tienda`, `como_voy`) |
| `app/layout.tsx` | `max-w-[430px]`, `lang="es"`, `bg-white`, title="tuAliado" |
| Rutas placeholder | `/onboarding`, `/diagnostico`, `/recomendaciones`, `/registro`, `/seguimiento` |

**Build Next.js pasa limpio. TypeScript 0 errores.**

Ticket promedio de Raúl (calculado por motor): **$450 MXN**. Objetivo sugerido: **$518 MXN** (+15%).

## Assets de diseño Stitch recibidos (2026-06-06 20:11)

La compañera de diseño subió exports de Stitch para 6 pantallas + brand identity en `design/assets/`:
splash, onboarding, diagnóstico, recomendaciones (+ calculador de ganancia), registro (4 pasos), chatbot.
Cada una incluye `code.html`, `screen.png` y `DESIGN.md` (sistema "Warm & Approachable Advisor").

**Validado contra el código actual — esto SÍ coincide:**
- Las 4 metas del onboarding coinciden exactamente con `decisions.md` y `lib/onboarding-questions.ts`.
- Números del diagnóstico ($450 ticket, 20%/80% canal, 180 puntos loyalty) coinciden con `mock-data.ts`.
- Viewport consistente en 375px, sin breakpoints `lg:`/`xl:`/`2xl:`. Tap targets de 56–160px (superan el mínimo de 44px).

## ⚠️ Contradicciones encontradas — requieren decisión antes de implementar pantallas (2026-06-06 20:11)

1. **Incoherencia de precio (CRÍTICO — esto es justo lo que Tuali no quiere ver):**
   El diseño "Calculador de ganancia" (`design/assets/recomendaciones/tualiado_calculador_de_ganancia_v3`) muestra
   *"Coca-Cola 600ml · $15.50 en Tuali"*, pero `lib/mock-data.ts` (p-001) tiene `precioCosto: 11.5`.
   → Hay que avisar a la diseñadora que use los precios de `mock-data.ts` como fuente única, o corregir el mock si $15.50 es el dato correcto.

2. **Falta el campo `nivelRiesgo` en `Recomendacion`:**
   `mvp-plan.md` (F4) dice "Recomendaciones (3 niveles de riesgo)" y el diseño `tualiado_recomendaciones_v2`
   muestra explícitamente 3 badges: 🟢 Bajo riesgo / 🟡 Riesgo medio / 🟠 Mayor ganancia — pero
   `lib/types.ts → Recomendacion` no tiene ningún campo de riesgo, y el motor tampoco lo asigna.
   → Pendiente: agregar `nivelRiesgo: "bajo" | "medio" | "alto"` (o equivalente) a `Recomendacion` y que `calcularRecomendaciones` lo determine.

3. **Las "oportunidades" del diagnóstico no calzan con lo que genera el motor:**
   Diseño muestra: "No usas las promociones activas" / **"Pides por promotor, no por app"** / "Retos de loyalty sin activar".
   Motor genera (`calcularDiagnostico`): "Tienes N promociones sin usar" / **"No usas el pedido sugerido todavía"** / "Tienes N reto(s) de puntos sin activar".
   → La oportunidad #2 no coincide: el diseño apunta a **autonomía de canal** (métrica secundaria confirmada), el motor apunta a pedido sugerido.
   Si se implementa la pantalla con el texto del diseño tal cual, quedaría incoherente con lo que el motor realmente detecta.

4. **Recomendación B para "Vender más" no coincide:**
   Diseño muestra "Pide por la app esta semana" (autonomía de canal); el motor genera "Activa el pedido sugerido" para esa meta.
   Refuerza el punto 3 — el diseño está más alineado con la métrica de autonomía que el motor actual.

5. **Naming de marca — mayúscula/minúscula:**
   El logo (`brand identity/wordmark.svg`) usa **"TuAliado"** (A mayúscula); `decisions.md` y `CLAUDE.md` confirman el nombre como **"tuAliado"** (t minúscula).
   → Puede ser intencional por legibilidad tipográfica del logo, pero el texto de la app debe usar "tuAliado". Confirmar con la diseñadora.

6. **Bottom nav bar en inglés con secciones que no existen en nuestro flujo:**
   Las pantallas `/registro` paso 2 y 3 incluyen una barra de navegación inferior fija con 4 tabs:
   "Progress", "Check-in", "Insights", "Profile" — **en inglés**.
   - Raúl no lee inglés (ni mucho texto en general).
   - Implica una arquitectura de navegación por tabs que no coincide con el flujo lineal confirmado
     (Diagnóstico → Meta → Recomendación → Acción → Seguimiento) ni con las rutas ya creadas.
   → Probablemente sea scaffolding genérico de Stitch sin personalizar. Confirmar con la diseñadora antes de implementar — no copiar tal cual.

## Próximo paso

**Antes de FASE 1:** resolver los puntos 1–6 de arriba con la diseñadora/Tech Lead (decisiones de producto, no técnicas).

**FASE 1 — Pantallas core.** Empezar por:
1. `app/page.tsx` — Splash (T1.1)
2. `app/onboarding/page.tsx` — 4 botones grandes (T1.2)
3. `app/diagnostico/page.tsx` — Diagnóstico visual (T1.3a–e)
