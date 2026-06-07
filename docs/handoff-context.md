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
| Splash, Onboarding, Diagnóstico (T1.1–T1.3) | ✅ Hecho |
| Pantallas core restantes (recomendaciones, registro, seguimiento) | 🔄 Placeholders listos |
| Chatbot flotante (modo texto) + `/api/chat` | 🔄 `components/ChatbotButton.tsx` listo — falta montarlo en `layout.tsx` |
| **Chat de voz** (diferenciador clave — F13) | 🔄 `lib/voice.ts` listo. Modo voz se integrará dentro del bottom sheet de `ChatbotButton` |

## 🔜 Próxima tarea síncrona (requiere coordinar con el otro agente)

**Montar `<ChatbotButton />` en `app/layout.tsx`.**

Es un cambio de una línea (import + `<ChatbotButton />` dentro del `<body>`, junto al resto de
children), pero `layout.tsx` está siendo editado activamente por el agente de T1 — por eso se
dejó fuera del trabajo en paralelo (ver sección `components/ChatbotButton.tsx` más abajo).

Hacerlo en síncrono, una vez que T1 converja, porque:
- Es el único punto de integración real entre ambos focos de trabajo.
- Es también el primer momento en que se puede probar el chatbot visualmente en navegador
  (hasta ahora solo se verificó con `tsc --noEmit` y `npm run build`, nunca renderizado).
- Conviene revisar juntos que el FAB no choque visualmente con elementos de T1 (headers,
  bottom nav, CTAs) en las pantallas ya implementadas (Splash, Onboarding, Diagnóstico).

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

## Nuevo prompt de Stitch pendiente de generar (2026-06-06 20:18)

Se creó `design/stitch-prompts/07-chat-de-voz.md` — prompt para el **modo voz** dentro del chatbot
(diferenciador clave F13, ver fila "Chat de voz" arriba). Diseñado a propósito para no verse como
micrófono/walkie-talkie/Alexa: usa la marca de tuAliado animada, anillos suaves tipo ecualizador,
caption en vivo del transcript y un botón pill de ancho completo. Falta correrlo en Google Stitch
y exportar el resultado a `design/assets/`.

## FASE 1 — Splash, Onboarding y Diagnóstico implementados (2026-06-06 21:40)

Se construyeron las 3 primeras "pantallas core" con el sistema visual "Warm & Approachable
Advisor" de los assets Stitch:

| Archivo | Qué hace |
|---|---|
| `app/globals.css` | Bloque `@theme inline` (Tailwind v4) con paleta de color, spacing y tipografía Outfit tomados de `design/assets/*/code.html` |
| `app/layout.tsx` | Fuente cambiada de Geist a **Outfit**, `<link>` a Material Symbols Outlined, contenedor `max-w-[430px]` |
| `app/page.tsx` | Splash (T1.1): logo, tagline "Tu asesor de crecimiento", CTA "Empezar" → `/onboarding` |
| `app/onboarding/page.tsx` + `MetaOptionButton.tsx` | Onboarding (T1.2): grid 2x2 de metas con íconos Material Symbols, navega a `/diagnostico?meta=...` |
| `app/diagnostico/page.tsx` + `TicketCard.tsx`, `CanalGrid.tsx`, `OportunidadesList.tsx` | Diagnóstico (T1.3a–e): ticket promedio, canal app/promotor, badge loyalty, lista de oportunidades, CTA → `/recomendaciones` |
| `public/logo-full.svg`, `logo-mark.svg`, `wordmark.svg` | Copiados de `design/assets/brand identity/` |

**Contradicción #3 resuelta — opción A confirmada por el Tech Lead:**
Se cambió la detección de oportunidad en `calcularDiagnostico` (`lib/recommendation-engine.ts`)
de "pedido sugerido" a **autonomía de canal**, usando el dato real `porcentajePedidosTuali`:

```ts
// Antes:
if (!estado.comportamiento.usaPedidoSugerido)
  oportunidades.push("No usas el pedido sugerido todavía")
// Ahora:
if (estado.comportamiento.porcentajePedidosTuali < 50)
  oportunidades.push("Pides por promotor, no por app")
```

Esto alinea el motor con el copy del diseño Stitch y con la métrica secundaria confirmada
(autonomía del cliente dentro de Tuali) — sin inventar datos: el 20%/80% ya existía en el mock.

**Verificación:**
- `npx tsc --noEmit` → 0 errores. `npm run build` → compila limpio, todas las rutas estáticas.
- Contenido verificado vía `curl` contra el dev server para las 3 pantallas: textos, las 4
  metas, y los números del diagnóstico — **ticket $440** (cálculo real de `calcularTicketPromedio`
  sobre `historialPedidos`; el "~$450" de este doc era una aproximación, el valor exacto del mock
  es 440), canal 20% app / 80% promotor, loyalty 180 puntos, y las 3 oportunidades correctas
  incluyendo "Pides por promotor, no por app".
- ✅ **Prueba visual en navegador a 375px — RESUELTA (2026-06-06 21:22):**
  El bloqueo era que el Chrome DevTools MCP buscaba el binario en `/opt/google/chrome/chrome`
  (no existe en este entorno) y crear el symlink a `/usr/bin/chromium-browser` requería sudo.
  Se arregló sin sudo creando `.mcp.json` a nivel de proyecto que sobreescribe el servidor
  `chrome-devtools` del plugin, pasándole `--executablePath /usr/bin/chromium-browser` y un
  `--userDataDir` propio (para no chocar con el perfil del servidor del plugin). Requiere
  reiniciar la sesión de Claude Code para que tome el `.mcp.json` del proyecto.

  **Revisión visual a 375px (Splash, Onboarding, Diagnóstico) — sin problemas:**
  - Splash, grid 2x2 de metas y diagnóstico se ven correctos, sin overflow horizontal.
  - Flujo de navegación probado de extremo a extremo: seleccionar meta → "Continuar" se
    habilita y resalta la card elegida → navega a `/diagnostico?meta=vender_mas` con los
    datos correctos ($440, 20%/80%, 180 puntos, 3 oportunidades).
  - El CTA fijo "Ver mis recomendaciones" en Diagnóstico tapa visualmente el final de la
    lista de oportunidades cuando la pantalla está sin hacer scroll — es el comportamiento
    esperado de un botón fijo sobre contenido scrolleable (`pb-[120px]` en `<main>` ya
    reserva el espacio); al hacer scroll las 3 oportunidades quedan completamente visibles
    y el botón no las tapa. No es un bug.

## `lib/voice.ts` — capa de voz adelantada en paralelo (2026-06-06 21:03)

Mientras se trabajaba T1 (Splash/Onboarding/Diagnóstico), se adelantó en paralelo la pieza de
lógica del **chat de voz** (F13, diferenciador clave): un archivo nuevo y aislado, sin tocar
nada de `app/`, así que no tuvo solapamiento con T1.

`lib/voice.ts` envuelve Web Speech API (sin dependencias externas, mismo estilo que `lib/state.ts`):

| Función | Qué hace |
|---|---|
| `soportaVoz()` | Feature detection de `SpeechRecognition`/`webkitSpeechRecognition` + `speechSynthesis` — para el fallback a modo texto si el navegador no soporta voz |
| `iniciarEscucha(opciones)` / `detenerEscucha()` | STT: transcripción en vivo (resultados parciales y finales vía `onResultado`), una sola instancia activa a la vez |
| `hablar(texto, opciones)` / `detenerHabla()` | TTS vía `speechSynthesis`, con callbacks `onInicio`/`onFin` para mapear a los estados "Pensando…" / "tuAliado te responde" del diseño |

Incluye también las interfaces ambientales mínimas para `SpeechRecognition` (no están en
`lib.dom.d.ts` de TypeScript, sólo `SpeechSynthesisUtterance` sí lo está).

**Verificación:** `npx tsc --noEmit` → 0 errores en modo `strict`.

**Actualización:** `components/ChatbotButton.tsx` ya existe (ver sección siguiente). El modo voz
se conectará ahí — `iniciarEscucha`/`hablar` todavía no están cableados a la UI, queda como
siguiente paso hacia F13.

## `components/ChatbotButton.tsx` — chat de texto, FAB + bottom sheet (2026-06-06)

Construido en paralelo a T1, siguiendo `design/stitch-prompts/05-chatbot.md` y
`design/assets/chatbot/tualiado_chat_con_asistente/code.html`. Es además el contenedor donde
después vivirá el **modo voz** (F13 — el prompt `07-chat-de-voz.md` dice explícitamente que esa
vista reutiliza el mismo bottom sheet).

| Archivo | Responsabilidad |
|---|---|
| `components/ChatbotButton.tsx` | FAB (56x56, esquina inferior derecha) + estado abierto/cerrado + historial de mensajes + orquesta el envío a `/api/chat` |
| `components/ChatSheet.tsx` | Shell del bottom sheet: drag handle, header, lista scrollable de mensajes, input |
| `components/ChatMessageBubble.tsx` | Burbuja de mensaje (asistente/usuario) + `ChatTypingBubble` (dots animados de "escribiendo…") |
| `components/ChatInputBar.tsx` | Input + botón enviar + chips de respuesta rápida del diseño |
| `lib/chat.ts` (nuevo) | `enviarMensaje(mensaje, contexto)` → llama `/api/chat` y devuelve `reply`; `MENSAJE_INICIAL`, `CHIPS_RESPUESTA_RAPIDA` |
| `lib/types.ts` (+tipos) | `Mensaje { rol, texto, hora }`, `ChatContexto { nombre, meta, ticketPromedio }` — espeja el contrato de `app/api/chat/route.ts` |

El contexto que se manda a Gemini se arma con `MOCK_STATE.perfil.nombre`,
`calcularTicketPromedio(MOCK_STATE.historialPedidos)` y `getMeta(useSearchParams())` (con
fallback `"crecer su negocio"` si no hay `?meta=` en la URL, igual que ya hace la propia ruta).

**Verificación:** `npx tsc --noEmit` y `npm run build` → 0 errores, compila limpio.

**⚠️ Pendiente — paso de integración (1 línea, intencionalmente no hecho aquí):**
Falta montar `<ChatbotButton />` en `app/layout.tsx` para que aparezca en todas las pantallas.
No se tocó porque `layout.tsx` está modificado activamente por el otro agente ahora mismo —
para evitar conflicto, el componente quedó listo pero sin montar. Tampoco se pudo probar
visualmente en navegador por la misma razón (no está renderizado en ninguna ruta todavía).

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

3. **✅ RESUELTO (2026-06-06 21:40, opción A) — Las "oportunidades" del diagnóstico no calzaban con lo que genera el motor:**
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

## Próximo paso (actualizado 2026-06-06 21:40)

**T1.1, T1.2 y T1.3 (Splash, Onboarding, Diagnóstico) ya están implementadas** — ver sección
"FASE 1 — Splash, Onboarding y Diagnóstico implementados" arriba.

**Siguiente: T1.4 — Recomendaciones (`app/recomendaciones/page.tsx`).**
Ahí se deben resolver las contradicciones pendientes que tocan esta pantalla:
- **#2** — agregar `nivelRiesgo` a `Recomendacion` y que el motor lo determine (3 badges:
  🟢 Bajo riesgo / 🟡 Riesgo medio / 🟠 Mayor ganancia).
- **#4** — alinear la Recomendación B de "vender_mas" con el copy del diseño ("Pide por la
  app esta semana") en vez de "Activa el pedido sugerido", siguiendo la misma lógica de
  autonomía de canal usada para resolver la #3.
- **#1** (precio Coca-Cola $15.50 vs `precioCosto: 11.5`) afecta el "Calculador de ganancia"
  dentro de esta misma pantalla — confirmar con la diseñadora cuál es la fuente correcta antes
  de construir esa sección.

Puntos #5 (naming TuAliado/tuAliado) y #6 (bottom nav en inglés, afecta `/registro`) siguen
pendientes de confirmar con la diseñadora — no bloquean T1.4.
