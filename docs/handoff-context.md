# Handoff Context — Estado actual del proyecto

> Leer este archivo al inicio de cualquier sesión nueva.
> Actualizar cuando el estado del proyecto cambie.

---

## ✅ T1.6 — Seguimiento implementada, FASE 1 / T1 cerrada (2026-06-07 12:30)

`app/seguimiento/page.tsx` reescrito (placeholder → pantalla completa). Codex (`codex exec`)
quedó colgado ~16 min sin producir output (proceso esperando en stdin), así que escribí el
código directamente siguiendo el spec ya preparado.

**Fix previo necesario**: `guardarBaseline()` nunca se invocaba — `app/recomendaciones/page.tsx`
calculaba el baseline pero lo descartaba. Agregado un `useEffect` que llama
`guardarBaseline(resultado.baseline)` solo si `cargarBaseline()` es `null` (evita sobreescribir
en visitas repetidas).

**Decisión confirmada con Joaquín**: la tarjeta de "puntos de loyalty semanales" del spec de
diseño (`design/stitch-prompts/04-seguimiento.md`) requería un dato semanal que no existe en
el mock → reemplazada por conteo de `aplicoPromo: true` en entradas diarias (dato real,
alineado con T1.6d de `docs/mvp-plan.md`).

Archivos nuevos:
- `components/ProgressBar.tsx` — barra animada reutilizable (`current`/`target`/`label`)
- `app/seguimiento/ComparacionCanal.tsx` — comparación % app vs. promotor, degrada sin
  inventar datos si no hay pedidos registrados ("Aún no tienes pedidos registrados esta semana")
- `app/seguimiento/PromosCard.tsx` — conteo de promos aplicadas

Verificación: `npx tsc --noEmit` y `npm run build` sin errores. Probado en navegador
(390x844) con Chrome DevTools: guard sin baseline → CTA a `/onboarding`, pantalla completa
con datos simulados en localStorage, degradación sin pedidos, sin overflow horizontal, CTA
"Registrar mi día" navega a `/registro`. localStorage de prueba limpiado al terminar.

Esto cierra **FASE 1 / T1 (Pantallas Core)** completa: Splash, Onboarding, Diagnóstico,
Recomendaciones, Registro y Seguimiento implementados y verificados.

---

## Identificación del proyecto

| Campo | Valor |
|---|---|
| Hackathon | Hack4Her |
| Reto | Tuali Growth Agent |
| Producto de trabajo | TuAliado |
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
| Recomendaciones (T1.4) | ✅ Hecho — 3 tarjetas + texto Gemini vía `/api/explicar` |
| Pantallas core restantes (registro, seguimiento) | 🔄 Placeholders listos |
| Chatbot flotante (modo texto) + `/api/chat` | ✅ Montado en `layout.tsx`, probado en navegador (FAB + bottom sheet + `/api/chat`) |
| **Chat de voz** (diferenciador clave — F13) | ✅ Hecho — integrado en `ChatbotButton`/`ChatSheet`, ver entrada 23:01 |

## ✅ Cambio de decisión confirmada: "tuAliado" → "TuAliado" (2026-06-07 03:25)

A petición explícita del Tech Lead, se cambió la capitalización confirmada del nombre de marca
de **"tuAliado"** (t minúscula) a **"TuAliado"** (A mayúscula) — para que el copy de toda la app
coincida con el wordmark del logo (`design/assets/brand identity/wordmark.svg`), que ya usaba
"TuAliado". Antes, esta era exactamente la incoherencia documentada en el punto #5 de
"Contradicciones encontradas" (ver más abajo).

**Archivos actualizados (reemplazo `tuAliado` → `TuAliado` en texto/copy, no en rutas/nombres de
asset que usan minúsculas como `tualiado_chat_con_asistente`):**
`CLAUDE.md`, `AGENTS.md`, `README.md`, `app/layout.tsx`, `app/page.tsx`, `app/onboarding/page.tsx`,
`components/ChatbotButton.tsx`, `components/ChatSheet.tsx`, `components/ChatVoiceView.tsx`,
`lib/chat.ts`, `lib/gemini.ts`, `app/api/chat/route.ts`, `docs/decisions.md`,
`docs/handoff-context.md`, `docs/mvp-current-direction.md`, `docs/mvp-plan.md`,
`docs/project-brief.md`, `docs/pitch-context.md`, `docs/app-functions.md`,
`docs/validation-plan.md`, `design/README.md`, `design/stitch-prompts/*.md`,
`02-posible-mvp-tuali-crece.md`.

**Decisión actualizada en `docs/decisions.md`** (sección "Nombre de trabajo del producto") y el
punto "Capitalización de marca" de la lista de pendientes se marcó como resuelto. No se tocó
`wordmark.svg` — ya estaba correcto con la nueva decisión.

## ✅ Dev server por IP LAN habilitado para pruebas mobile (2026-06-07)

Joaquín reportó que en mobile, entrando por `http://10.22.210.160:3000`, los botones no respondían bien y pidió revisar shell/network. Codex diagnosticó y aplicó este fix puntual por solicitud explícita de Joaquín, aunque su rol normal en este repo es solo lectura.

**Causa real encontrada:** Next.js 16 bloqueaba recursos de desarrollo desde la IP LAN porque el origen no estaba en `allowedDevOrigins`. En `.next/dev/logs/next-development.log` aparecía:

```text
Blocked cross-origin request to Next.js dev resource /_next/webpack-hmr from "10.22.210.160".
```

También se reprodujo por network:

```text
GET http://10.22.210.160:3000/_next/webpack-hmr
403 Forbidden
Unauthorized
```

**Cambio aplicado:** `next.config.ts` ahora incluye:

```ts
allowedDevOrigins: ["10.22.210.160"],
```

Esto permite que el celular use la IP LAN durante desarrollo sin que Next bloquee `/_next/webpack-hmr` y otros recursos dev relacionados. Después de este cambio hay que reiniciar `npm run dev` para que Next cargue la config nueva.

**Nota para Claude:** este cambio solo arregla el error real de red/dev por IP LAN. Durante el diagnóstico también se observó una posible causa independiente de taps difíciles en mobile: overlays fijos/absolutos como el footer de onboarding (`app/onboarding/page.tsx`) pueden capturar toques en su zona transparente. Eso NO se corrigió aquí porque Joaquín pidió arreglar por esta vez solo el error real de red/dev.

**Pendiente reportado por Joaquín antes de dormir (2026-06-07):** en su teléfono, el flujo de voz no está pidiendo permisos de micrófono; aparece/queda el mensaje "Necesito permiso para usar tu micrófono". Claude debe revisar después si el navegador móvil está bloqueando permisos por origen/IP, si `SpeechRecognition` requiere HTTPS/contexto seguro en ese dispositivo, o si la UI necesita guiar al usuario a habilitar el micrófono manualmente.

→ **Resuelto, ver entrada siguiente "Investigación delegada a Codex"** (2026-06-07 09:30): causa confirmada — IP LAN por HTTP no es "secure context".

## ✅ Investigación delegada a Codex — bottom nav en inglés (#6) y permiso de micrófono Android (2026-06-07 09:30)

Mientras otro agente trabajaba en T1 (pantallas core), se delegaron a Codex (`codex exec`,
agente secundario, solo lectura, en background) dos investigaciones que no tocan esos archivos.
Reporte completo en `/tmp/codex-investigacion.txt` (no versionado).

**0. Hallazgo previo (de Claude, antes de delegar) — contradicción #1 (precio Coca-Cola) ya no existe:**
Se revisó `design/assets/recomendaciones/tualiado_calculador_de_ganancia_v3/tuAliado_calcular_ganancia_completo.html`
— el archivo actual del diseño muestra **"Coca-Cola 600ml · $11.50 en Tuali"**, igual que
`precioCosto: 11.5` en `lib/mock-data.ts` (p-001). El "$15.50" documentado como contradicción #1
ya no aparece en ningún asset de diseño actual — solo en nuestros propios docs, como referencia
histórica del problema. **Contradicción #1 cerrada: diseño y mock ya coinciden, no requiere
ningún cambio de código.**

**1. Contradicción #6 — bottom nav en inglés (`Progress`/`Check-in`/`Insights`/`Profile`):**
Codex confirmó, leyendo los 4 `code.html` de `/registro`, que la barra:
- SÍ aparece en `tualiado_check_in_paso_2` y `tualiado_check_in_paso_3` (4 labels en inglés,
  iconos Material Symbols `analytics`/`edit_note`/`lightbulb`/`person`, `nav fixed bottom-0 h-16`).
- NO aparece en `tualiado_check_in_paso_1` ni `tualiado_check_in_logrado` (esta última trae el
  comentario "Transactional screen, no TopAppBar/BottomNavBar").
- NO aparece en ningún otro grupo de pantallas (splash, diagnóstico, onboarding, recomendaciones,
  chatbot) — confirma que es scaffolding genérico de Stitch aplicado de forma inconsistente, no
  un patrón de navegación intencional del producto.

Propuesta de Codex para Isabel/Tech Lead (3 opciones, de mayor a menor preferencia):
1. **No incluirla** — el flujo confirmado es lineal (Diagnóstico → Meta → Recomendación → Acción
   → Seguimiento); una barra de tabs sugiere navegación libre entre secciones que no existe en
   el producto.
2. **Convertirla en footer de acción del flujo** — un solo CTA grande ("Siguiente"/"Finalizar
   registro"/"Ver mi avance") según el paso, alineado con "una pantalla = una idea + una acción".
3. **Si se quiere conservar algo visual, solo indicador de progreso** ("1 de 3", "2 de 3"...)
   sin tabs ni navegación persistente.

→ **`app/registro/page.tsx` (T1.5b) ya implementa la opción 3** (stepper con indicador "X de Y",
sin bottom nav) — el camino que tomamos coincide con la recomendación de Codex. Contradicción #6
queda cerrada: no se requiere cambiar nada en código, solo informar a Isabel que la bottom nav de
sus mockups de `/registro` no se va a implementar tal cual (es scaffolding de Stitch).

**2. Permiso de micrófono en Android — causa confirmada:**
Codex investigó por qué el navegador no muestra el diálogo nativo de permiso de micrófono al
entrar por la IP LAN (`http://10.22.210.160:3000`):
- **Causa raíz: `http://<ip-lan>` NO es un "secure context".** Chrome restringe
  `getUserMedia`/`SpeechRecognition` (features "powerful") a orígenes seguros: `https://`,
  `localhost`, `127.0.0.1`, `file://` (fuentes: Chromium security docs, MDN Secure Contexts —
  ver `/tmp/codex-investigacion.txt` para URLs).
- En ese caso Chrome **no muestra el diálogo nativo** — dispara `onerror` con
  `not-allowed`/`service-not-allowed` directamente, que es exactamente lo que la app traduce a
  "Necesito permiso para usar tu micrófono" vía `mensajeErrorEscucha` (`lib/voice.ts`, ya
  implementado correctamente — **el código no tiene ningún bug aquí**).
- Hay reportes confirmados de este mismo patrón en Android/Chrome (Stack Overflow): sin HTTPS,
  Chrome deniega de inmediato; con HTTPS se resuelve.

Opciones para que Joaquín pueda probar el modo voz en su Android (de más a menos recomendable):
1. **Port forwarding USB de Chrome DevTools** → abrir `http://localhost:3000` en el teléfono
   (Chrome trata `localhost` como confiable, sin necesitar HTTPS real). Guía oficial:
   `developer.chrome.com/docs/devtools/remote-debugging/local-server`.
2. **Túnel HTTPS** (`ngrok`, `cloudflared tunnel`) → abrir la URL `https://...` en Android.
3. **HTTPS local con certificado self-signed/`mkcert`** — funciona pero consume más tiempo
   (hay que confiar el certificado en el Android).
4. Flag `chrome://flags/#unsafely-treat-insecure-origin-as-secure` — Codex no lo recomienda como
   primera opción porque en Android suele requerir modo desarrollador/root.

**Conclusión:** el comportamiento del código ya es correcto (degrada con un mensaje claro en
español); el "bug" no está en `lib/voice.ts`/`ChatbotButton.tsx` sino en cómo se accede al dev
server desde el teléfono. Recomendación para Joaquín: probar con **port forwarding USB →
`localhost:3000`** (opción 1) la próxima vez que quiera probar el modo voz en su Android real.

## ✅ ChatbotButton montado en layout.tsx (2026-06-06 22:05)

Se integró `<ChatbotButton />` en `app/layout.tsx` (import + render dentro de `<body>`, como
hermano del contenedor `max-w-[430px]` que envuelve `{children}`). El bloqueo de "layout.tsx en
edición activa" ya no aplicaba — FASE 1 (T1) está completa.

**Verificación:**
- `npx tsc --noEmit` y `npm run build` → 0 errores, compila limpio.
- Prueba visual con Chrome DevTools MCP a 390x844 en `/`, `/onboarding` y `/diagnostico`:
  - El FAB abre el bottom sheet (`ChatSheet`) con el mensaje inicial y los chips de respuesta
    rápida.
  - Enviar un mensaje dispara `POST /api/chat` con el contexto correcto
    (`{ nombre: "Raúl", meta: "crecer su negocio" (fallback), ticketPromedio: 440 }`) y
    devuelve `200`. La respuesta mostrada es el fallback de `lib/gemini.ts`
    ("No pude generar una respuesta...") — la API de Gemini no respondió en este entorno
    sandbox (probablemente acceso de red restringido); no es un problema de la integración,
    `GEMINI_API_KEY` sí está configurada en `.env.local`.
- **Bug encontrado y corregido durante la verificación:** el FAB en su posición original
  (`bottom-6`, 24px del fondo, según el prompt original de Stitch) chocaba visualmente con la
  barra de CTA fija de Diagnóstico (`fixed bottom-0`, ~124px de alto:
  `pt-stack-lg` 48px + botón 56px + `pb-margin-mobile` 20px). Se ajustó a `bottom-[136px]` en
  `components/ChatbotButton.tsx` para que quede libre de esa barra — afecta también a
  Recomendaciones/Registro/Seguimiento, que siguen el mismo patrón de CTA fijo. En Splash y
  Onboarding (sin barra fija) se ve igual de bien con el nuevo offset.

## ✅ Ahorro de tokens (parte 2): mediciones reales + parámetros concretos (2026-06-07 03:42)

Sesión de seguimiento a la entrada de abajo "Ahorro de tokens: reglas de subagents +
Codex como agente secundario" (2026-06-06 22:16) — esta vez con datos medidos
directamente sobre los `.jsonl` de sesiones reales (`jq` sobre
`~/.claude/projects/-home-joaquinrog-hack4her-tuAliado/`), sin spawnear subagentes
(habría sido irónico gastar tokens investigando el gasto de tokens). Plan completo en
`~/.claude/plans/investiga-o-delegale-a-whimsical-crayon.md`.

**Hallazgo #1 — confirmado y cuantificado: las capturas de chrome-devtools dominan el gasto.**
En una sola sesión, 7 `take_screenshot` consumieron 652,213 caracteres = 93% de todo
el volumen de tool-results de esa sesión (~93K chars/captura, hasta 123K). Causa raíz
verificada en los `tool_use.input` reales: se usaba `format: "png"` (default, sin
comprimir) y/o `fullPage: true` (página completa, no solo viewport), sin resize
consistente a viewport móvil. **Cambio aplicado en `AGENTS.md`** ("Verificación de
frontend"): ahora prescribe parámetros concretos — `format: "jpeg", quality: 60`,
nunca `fullPage: true` salvo necesidad explícita, `resize_page` a 390x844 antes de
capturar, y usar `filePath` (guarda en disco sin adjuntar al contexto) cuando la
captura es solo "para que la vea Joaquín".

**Hallazgo #2 — el hook de TypeScript es menos costoso de lo que parecía.**
Se sospechaba que el `PostToolUse` de `.claude/settings.json` (corre `npx tsc --noEmit`
en cada Edit/Write a `app/`/`components/`, 233 ediciones históricas) era una fuente
relevante de gasto. Medido: el `tsconfig.json` ya tiene `incremental: true`, cada
corrida tarda ~0.9s y agrega solo ~1KB de output — no es un problema real. No se tocó
nada aquí: cambiar `npx tsc` por el binario directo solo ahorraría ~0.15s/corrida, y
requiere autorización explícita para editar `.claude/settings.json` (el clasificador
de auto-mode lo bloqueó por ser un archivo que controla el propio comportamiento del
agente — Joaquín decidirá si vale la pena).

**Hallazgo #3 — reforzado con caso real: `Explore` re-derivando estado ya documentado.**
Un agente gastó 42k tokens "encontrando el estado de T1" cuando esa tabla ya está en
este mismo archivo (sección "Qué está hecho y qué falta", arriba). **Cambio aplicado
en `AGENTS.md`** ("Uso de subagents"): regla explícita de leer `handoff-context.md` /
`mvp-current-direction.md` / `decisions.md` antes de delegar preguntas de "¿en qué
estado está X?" a `Explore`.

**Hallazgo lateral:** `AGENTS.md` mencionaba un skill `verify` que no existe en el
repo (busqué en `.claude/commands/`, `.claude/skills/`, plugins). Se reescribió esa
línea para apuntar solo a "subagent" como alternativa real.

### Cómo empezar una conversación nueva para ahorrar tokens (checklist rápido)

1. **Leer primero esta tabla de arriba ("Qué está hecho y qué falta") y
   `mvp-current-direction.md` / `decisions.md` directo con `Read`** — no preguntar
   "¿en qué estamos?" a un subagente `Explore`; esa pregunta casi siempre ya tiene
   respuesta documentada.
2. **Si el path de un archivo se conoce, `Read`/`grep` directo** — no `Explore`.
3. **Para verificar UI:** preferir `evaluate_script` / `list_console_messages` /
   `list_network_requests` (texto, baratos) sobre capturas. Si hace falta una
   captura: `format: "jpeg", quality: 60`, sin `fullPage`, `resize_page` a 390x844
   primero, y manejar la sesión de chrome-devtools desde un subagent (aísla el
   payload pesado del hilo principal).
4. **Delegar a Codex** lo genérico/externo de solo lectura (investigación de
   librerías, segunda opinión sobre diffs) — su ventana de ~5h es un recurso aparte
   de la de Claude, no compite por el mismo presupuesto.

## ✅ Ahorro de tokens: reglas de subagents + Codex como agente secundario (2026-06-06 22:16)

Sesión enfocada en reducir consumo de tokens de Claude (no cambios de producto). Cambios en `AGENTS.md` y `docs/decisions.md`:

**1. Reglas de uso de subagents (`AGENTS.md` → "Uso de subagents (ahorro de tokens)"):**
- Si el path de un archivo ya se conoce, leer directo con `Read`/`grep` — no delegar a `Explore` (spawnear un subagent duplica el costo de procesar el archivo).
- Verificación de frontend: preferir `evaluate_script`/`list_console_messages`/`list_network_requests` (texto, baratos) sobre `take_snapshot`/`take_screenshot` (payloads pesados); reservar capturas para chequeos visuales reales; hacer `resize_page` a viewport móvil antes de capturar; delegar la sesión de verificación al skill `verify` o un subagent para aislar el payload pesado.
- Hallazgo que motivó esto: de las llamadas históricas a chrome-devtools-mcp en este proyecto, 14 fueron `take_screenshot` y 6 `take_snapshot` — las más costosas con diferencia.

**2. Codex como agente secundario (`AGENTS.md` → nueva sección "Codex — Agente secundario"; `docs/decisions.md` → "Uso de Codex como agente secundario"):**
- Claude Code sigue siendo el agente principal (dueño del contexto, de las MCP tools exclusivas como chrome-devtools, y de las decisiones de producto/código).
- Codex se habilita como agente **secundario de solo lectura**: investigación externa, segunda opinión sobre diffs, lectura/resumen de documentación. **No edita código, no toca `docs/`/`.ai/`, no toma decisiones**.
- Razón: Joaquín tiene Claude Pro y GPT Plus, ambos con ventana de uso de ~5h — el recurso escaso es esa ventana, no "tokens" en abstracto. Las MCP tools y el contexto profundo del proyecto son no-transferibles a Codex; conviene proteger la ventana de Claude para eso y descargar en Codex el trabajo genérico.
- Esto matiza la regla histórica "un solo agente, un solo loop, sin coordinación con herramientas externas" — la nueva sección de `AGENTS.md` da contexto directo a Codex (lo lee automáticamente al ejecutarse en el repo, junto con `CLAUDE.md`).

**3. Prueba real de delegación — resolvió una decisión pendiente:**
Se delegó a Codex (`codex exec`) la investigación de costo/latencia de Gemini Flash vs Pro. Resultado: recomienda **Flash/Flash-Lite** (Flash-Lite ≈ $0.25/M input + $1.50/M output vs. Pro ≈ $2/M + $12/M, ~8x más caro), con fuentes de `ai.google.dev/gemini-api/docs/pricing`. Costó ~48,353 tokens — todos de la cuota de Codex, ninguno de la ventana de Claude. Se registró como decisión confirmada en `docs/decisions.md` ("Modelo de Gemini a usar"), resolviendo el pendiente que existía ahí.

**Nota:** Codex hizo búsquedas web por su cuenta (no se le pidió explícitamente) para traer precios vigentes — comportamiento esperado/deseable para este tipo de investigación, pero consume parte de su ventana de uso.

## ⚠️ Pull de fix de diseño — reabre la contradicción #3 en sentido contrario (2026-06-06 22:32)

Se hizo `git pull` del commit `69dfd82` ("fix: design/assets/diagnostico error de prompt", de Isabel)
y se mergeó con el trabajo local de T1.4 (commit de merge `fbb07ad`).

**1. Conflicto de merge resuelto — duplicados de `nivelRiesgo`:**
El auto-merge de git dejó propiedades duplicadas (`nivelRiesgo` aparecía dos veces en el mismo
objeto literal en `lib/recommendation-engine.ts`, y dos veces en la interfaz `Recomendacion` de
`lib/types.ts`) porque ambas ramas habían agregado el campo de forma independiente — la rama
remota con strings literales (`"bajo"`, `"medio"`, `"alto"`) y la local con la tabla
`NIVEL_RIESGO_POR_TIPO`. Se eliminaron los literales duplicados y se dejó la versión con la
tabla (más DRY, ya documentada arriba en T1.4). `npx tsc --noEmit` → 0 errores tras el fix.

**2. ⚠️ Hallazgo importante — el fix de diseño invierte la resolución de la contradicción #3:**
El fix de Isabel cambia el copy de `design/assets/diagnostico/code.html` de
**"Pides por promotor, no por app"** a **"No usas el pedido sugerido todavía"**.

Esto es exactamente **lo opuesto** a lo que se había resuelto como "opción A" (ver sección
"Contradicción #3 resuelta" más abajo, 2026-06-06 21:40): ahí se cambió el motor
(`calcularDiagnostico`) para generar "Pides por promotor, no por app" — alineándolo con el
diseño *de ese momento* y con la métrica de autonomía de canal.

Con este fix, **diseño y motor vuelven a estar desalineados, pero al revés**:
- Motor genera: "Pides por promotor, no por app" (`lib/recommendation-engine.ts:50`)
- Diseño ahora muestra: "No usas el pedido sugerido todavía"

→ **No se modificó nada en código ni se revirtió el fix de diseño** — esto requiere alinear con
Isabel/Tech Lead cuál de los dos textos es el correcto antes de tocar cualquiera de los dos lados,
para no generar otra ronda de incoherencia. Posibles caminos: (a) que Isabel revierta su fix si fue
un error sin contexto del cambio anterior, o (b) volver a cambiar el motor — pero eso afectaría
también la lógica de "Rec B" en `calcularRecomendaciones` que ya usa `porcentajePedidosTuali` para
generar "Pide por la app esta semana" (T1.4, ver arriba), que sí está alineada con autonomía de canal.

## ✅ Contradicción #3 resuelta definitivamente — diseño y motor alineados (2026-06-07 00:00)

Isabel subió el commit `2497947` ("fix: revert design text to match tech lead motor logic"),
revirtiendo su cambio anterior en `design/assets/diagnostico/code.html`: el copy vuelve de
"No usas el pedido sugerido todavía" a **"Pides por promotor, no por app."**, igual que genera
el motor (`calcularDiagnostico`, `lib/recommendation-engine.ts:50`).

Se mergeó `design` → `main` sin conflictos (commit de merge incluido). Verificado con `grep`
que ambos lados usan el mismo texto. No se requiere ningún cambio adicional en código.

## ✅ Modo Voz integrado al chatbot — F13 (2026-06-06 23:01)

Se conectó `lib/voice.ts` (ya completo desde antes) a la UI del chatbot. Diferenciador clave del
MVP: Raúl no quiere leer, así que ahora puede hablar con TuAliado y escuchar la respuesta.

**Archivos:**
- **Nuevo** `components/ChatVoiceView.tsx` (77 líneas) — vista de presentación pura: anillos tipo
  ecualizador (con `animate-pulse` + `animationDelay` escalonado, mismo patrón que
  `ChatTypingBubble`, sin CSS custom nuevo), status pill por estado, caption en vivo
  ("Tú dijiste" / "TuAliado dice"), botón pill de ancho completo y link "¿Prefieres escribir?".
- **Modificado** `components/ChatSheet.tsx` — toggle "Hablar en su lugar" / "Escribir en su lugar"
  en el header (solo visible si `soportaVoz` es `true`) + render condicional `ChatVoiceView` vs.
  lista de mensajes + `ChatInputBar`.
- **Modificado** `components/ChatbotButton.tsx` — orquestación completa: máquina de estados
  `idle → escuchando → pensando → respondiendo`, conexión con `iniciarEscucha`/`detenerEscucha`/
  `hablar`/`detenerHabla`, helper compartido `obtenerRespuesta` (reutilizado por texto y voz para
  no duplicar el armado de contexto de `/api/chat`).
- **Modificado** `lib/types.ts` — nuevo tipo `EstadoVoz = "idle" | "escuchando" | "pensando" | "respondiendo"`.

**Decisiones de diseño relevantes:**
- Los intercambios de voz se guardan en el mismo array `mensajes` que el chat de texto — al
  alternar "¿Prefieres escribir?" se conserva el historial completo, sin duplicar estado.
- Sin soporte de Web Speech API (`soportaVoz()` → `false`), el toggle no aparece — fallback
  silencioso a texto, sin mensajes de error visibles para el usuario.

**Delegado a Codex (agente secundario, solo lectura) para ahorrar tokens de Claude:**
1. Investigación de quirks de Web Speech API en Android/Chrome — hallazgo clave incorporado:
   `continuous: true` **no** garantiza escucha indefinida (Chrome puede cortar por silencio sin
   disparar error, solo `onend`). Por eso el flujo NO depende solo del toque manual de "terminar":
   procesa la transcripción también cuando llega un resultado final (`esFinal`) o cuando el
   reconocimiento se corta solo (`onFin`), con una ref (`sesionVozProcesadaRef`) que evita
   procesar la misma sesión dos veces.
2. Borrador de animación CSS/Tailwind para los anillos — se evaluó pero se optó por reusar el
   patrón `animate-pulse` ya existente en el proyecto (más simple, consistente, sin agregar
   `@keyframes` nuevos a `globals.css`).
3. Segunda opinión sobre el diff final (mismo patrón que T1.4) — encontró 2 bugs reales que se
   corrigieron antes de cerrar la tarea:
   - **Respuesta async podía "revivir" el modo voz** tras cerrar el chat o volver a texto
     mientras se esperaba `/api/chat` (seguía mutando estado y disparando TTS). Fix: ref de
     generación (`generacionVozRef`) que invalida respuestas en vuelo cuando cambia el contexto.
   - **Doble toque rápido podía iniciar dos sesiones de reconocimiento** antes del re-render.
     Fix: ref síncrona `escuchaActivaRef` que bloquea el reingreso.

**Verificación (Chrome DevTools MCP, 390x844):**
- Activar modo voz → aparecen anillos + pill "Toca para hablar" + botón correcto. ✅
- Tocar el botón → transición a "escuchando" ("Te escucho…" / "Toca para terminar"). ✅
- Tocar de nuevo sin transcripción real (sandbox sin micrófono) → vuelve a "idle" limpio. ✅
- "¿Prefieres escribir?" → regresa a modo texto conservando el historial completo. ✅
- Sin soporte de voz (`SpeechRecognition`/`webkitSpeechRecognition` removidos vía `initScript`) →
  el toggle no aparece y el chat de texto funciona igual que antes. ✅
- `npx tsc --noEmit` y `npm run build` → 0 errores, ambos antes y después de los fixes de Codex.
- **Limitación de entorno (esperada, ya documentada antes para `/api/chat`):** el sandbox no
  tiene micrófono real ni acceso a la API de Gemini, así que no se pudo probar el flujo completo
  "pensando → respondiendo" con audio real — solo los estados que dependen de interacción/UI.

## ✅ Diagnóstico: chat sin respuesta + voz que se corta sola — ambos externos al código (2026-06-06 23:30)

Joaquín reportó en máquina real (localhost): "mando hola y no me contesta" + "toco 'Toca para
hablar' y luego luego se baja, y mantenerlo tampoco jala". Se reprodujo y diagnosticó ambos con
Chrome DevTools MCP — **ninguno es un bug del código de la app**:

**1. Chat de texto sin respuesta real:**
- Causa: la API key de Gemini agotó su cuota gratuita. `curl` directo a Gemini devuelve
  `429 RESOURCE_EXHAUSTED — limit: 0, model: gemini-2.0-flash`.
- `app/api/chat/route.ts` ya maneja esto correctamente: cae al fallback
  `"No pude generar una respuesta. Intenta de nuevo."` (por eso sí aparece un mensaje, solo que
  no es una respuesta de Gemini).
- Acción pendiente (fuera del código): activar facturación o esperar reinicio de cuota / nueva
  API key en `.env.local` (`GEMINI_API_KEY`).

**2. Modo voz se corta solo al tocar "Toca para hablar":**
- El botón es de un solo toque (toggle), no de mantener presionado — eso ya funciona como está
  diseñado (`onClick`, no `onMouseDown`/`onTouchStart`).
- Causa real: instrumentando `SpeechRecognition` directo en el navegador (mic `granted`,
  `isSecureContext: true`, conectividad general a internet OK), la secuencia observada es
  `start → audiostart → error: "network" → end` — el backend de reconocimiento de voz de Chrome
  responde con error de red casi al instante. Es un problema conocido de ese servicio en ciertos
  entornos (Linux/redes), no algo que el código pueda arreglar.
- El código ya manejaba el error sin tronar (vuelve a `idle`), pero lo hacía en silencio — un
  error de runtime se veía idéntico a "no pasó nada", lo cual confundía.

**Fix aplicado (acotado a la capa de voz):**
- Nuevo helper `mensajeErrorEscucha(codigo)` en `lib/voice.ts` — traduce los códigos de
  `SpeechRecognitionErrorEvent.error` (`no-speech`, `not-allowed`, `service-not-allowed`,
  `audio-capture`, `network`, default) a mensajes simples en español, nunca el código técnico crudo.
- `ChatbotButton.tsx` — nuevo estado `errorVoz: string | null`; se limpia al iniciar una nueva
  escucha, al alternar modo texto/voz y al cerrar el chat (mismo patrón que `transcript`/`estadoVoz`).
- `ChatVoiceView.tsx` — nuevo prop `error`; en estado `idle` con error presente, la pill cambia a
  estilo `error-container` (paleta ya existente en `globals.css`) y muestra el mensaje en vez de
  "Toca para hablar".
- Verificado en navegador (Chrome DevTools MCP): al fallar el reconocimiento ahora se ve
  "El servicio de voz no respondió. Intenta de nuevo o escribe." en vez de un silencio confuso.
- `npx tsc --noEmit` y `npm run build` → 0 errores.

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

## Dirección del MVP: TuAliado

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
| `app/layout.tsx` | `max-w-[430px]`, `lang="es"`, `bg-white`, title="TuAliado" |
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
micrófono/walkie-talkie/Alexa: usa la marca de TuAliado animada, anillos suaves tipo ecualizador,
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
| `hablar(texto, opciones)` / `detenerHabla()` | TTS vía `speechSynthesis`, con callbacks `onInicio`/`onFin` para mapear a los estados "Pensando…" / "TuAliado te responde" del diseño |

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

**✅ Integración completada (2026-06-06 22:05):** ver sección "ChatbotButton montado en
layout.tsx" más arriba — montado, probado en navegador y con un ajuste de posición del FAB
(`bottom-[136px]`) para no chocar con las barras de CTA fijas del flujo core.

## ⚠️ Contradicciones encontradas — requieren decisión antes de implementar pantallas (2026-06-06 20:11)

1. **Incoherencia de precio (CRÍTICO — esto es justo lo que Tuali no quiere ver):**
   El diseño "Calculador de ganancia" (`design/assets/recomendaciones/tualiado_calculador_de_ganancia_v3`) muestra
   *"Coca-Cola 600ml · $15.50 en Tuali"*, pero `lib/mock-data.ts` (p-001) tiene `precioCosto: 11.5`.
   → Hay que avisar a la diseñadora que use los precios de `mock-data.ts` como fuente única, o corregir el mock si $15.50 es el dato correcto.

2. **✅ RESUELTO (2026-06-06 23:10) — Falta el campo `nivelRiesgo` en `Recomendacion`:**
   Se agregó `nivelRiesgo: "bajo" | "medio" | "alto"` a `Recomendacion` (`lib/types.ts`) y una
   tabla `NIVEL_RIESGO_POR_TIPO` en `lib/recommendation-engine.ts` que lo asigna de forma
   determinística según `tipo`. El mapeo final **calca los ejemplos concretos del Stitch prompt**
   (`design/stitch-prompts/03-recomendaciones.md` y `tualiado_recomendaciones_v2/code.html`,
   no la primera intuición que se discutió):
   - `promo` → `bajo` (🟢 — aprovechar un descuento ya activo, acción segura e inmediata)
   - `pedido_sugerido` → `medio` (🟡 — implica cambiar un hábito, requiere algo de esfuerzo)
   - `loyalty` / `precio_venta` → `alto` (🟠 "Mayor ganancia" — más cambio, mayor potencial)
   *(Nota: la primera propuesta había invertido `promo`↔`loyalty`; se corrigió al leer el HTML
   real del diseño, que muestra "Activa la promo de Coca-Cola" como Card A/bajo riesgo y
   "Activa el reto de loyalty" como Card C/mayor ganancia.)*

3. **✅ RESUELTO (2026-06-06 21:40, opción A) — Las "oportunidades" del diagnóstico no calzaban con lo que genera el motor:**
   Diseño muestra: "No usas las promociones activas" / **"Pides por promotor, no por app"** / "Retos de loyalty sin activar".
   Motor genera (`calcularDiagnostico`): "Tienes N promociones sin usar" / **"No usas el pedido sugerido todavía"** / "Tienes N reto(s) de puntos sin activar".
   → La oportunidad #2 no coincide: el diseño apunta a **autonomía de canal** (métrica secundaria confirmada), el motor apunta a pedido sugerido.
   Si se implementa la pantalla con el texto del diseño tal cual, quedaría incoherente con lo que el motor realmente detecta.

4. **✅ RESUELTO (2026-06-06 23:10) — Recomendación B para "Vender más" no coincidía:**
   Se separó la rama única que generaba "Activa el pedido sugerido" para `vender_mas` y
   `surtir_tienda` en dos ramas independientes (`lib/recommendation-engine.ts`):
   - `vender_mas` + `porcentajePedidosTuali < 50` → **"Pide por la app esta semana"**
     (`rec-pide-por-app`, tipo `pedido_sugerido`) — mismo criterio de autonomía de canal usado
     para resolver el punto #3, alineado con el copy del diseño.
   - `surtir_tienda` + `!usaPedidoSugerido` → se queda igual, "Activa el pedido sugerido"
     (`rec-pedido-sugerido`) — este sí encaja con el concepto de resurtido de esa meta.

5. **✅ RESUELTO (2026-06-07) — Naming de marca — mayúscula/minúscula:**
   El logo (`brand identity/wordmark.svg`) usaba "TuAliado" (A mayúscula) mientras `decisions.md`
   y `CLAUDE.md` confirmaban "tuAliado" (t minúscula). El Tech Lead decidió cambiar la decisión
   confirmada a **"TuAliado"** para igualar el logo — se actualizó el copy en código y en toda
   la documentación (ver `docs/decisions.md`, sección "Nombre de trabajo del producto").

6. **Bottom nav bar en inglés con secciones que no existen en nuestro flujo:**
   Las pantallas `/registro` paso 2 y 3 incluyen una barra de navegación inferior fija con 4 tabs:
   "Progress", "Check-in", "Insights", "Profile" — **en inglés**.
   - Raúl no lee inglés (ni mucho texto en general).
   - Implica una arquitectura de navegación por tabs que no coincide con el flujo lineal confirmado
     (Diagnóstico → Meta → Recomendación → Acción → Seguimiento) ni con las rutas ya creadas.
   → Probablemente sea scaffolding genérico de Stitch sin personalizar. Confirmar con la diseñadora antes de implementar — no copiar tal cual.

## ✅ T1.4 — Recomendaciones: completa (2026-06-07 04:40)

**T1.4a–d completas.** Resueltas las contradicciones #2 y #4 (ver sección de
contradicciones arriba) como parte de este trabajo — eran bloqueantes para esta pantalla.

| Sub-tarea | Estado | Detalle |
|---|---|---|
| T1.4a — estructura base | ✅ Hecho | `app/recomendaciones/page.tsx`: mismo patrón que `/diagnostico` (Suspense, guard sin `?meta=`, header). Lee meta con `getMeta`, llama `calcularRecomendaciones(meta, MOCK_STATE)`, chip "Meta: {label}" desde `PREGUNTA_META.opciones` (sin duplicar labels/emojis del onboarding). |
| T1.4b — `RecomendacionCard` | ✅ Hecho | `components/RecomendacionCard.tsx` (nuevo, ~75 líneas). Tabla `ESTILO_POR_RIESGO` mapea `nivelRiesgo` → emoji/etiqueta del badge, color de barra de acento, estilo del recuadro de beneficio y estilo del CTA (🟢 bajo = botón primario relleno, 🟡 medio = outline, 🟠 alto = link) — calca los 3 ejemplos de `tualiado_recomendaciones_v2/code.html`. CTA usa `recomendacion.accion` (texto que ya define el motor, sin inventar copy). Recibe `descripcion: string | null` para el texto Gemini. |
| T1.4c — render 3 tarjetas + CTA primario | ✅ Hecho | El `.map` en `page.tsx` renderiza hasta 3 `RecomendacionCard`; el CTA "dominante" sale solo del estilo por `nivelRiesgo`. Verificado visualmente a 390x844 (ver abajo): sin overflow, jerarquía de colores correcta (verde/amarillo/naranja). |
| T1.4d — texto Gemini en cada tarjeta | ✅ Hecho | Conectado `explicarRecomendacion(rec, perfil)` de `lib/gemini.ts` (existía sin usar). Como esa función necesita `GEMINI_API_KEY` server-side y la página es `"use client"`, se agregó: `app/api/explicar/route.ts` (POST, llama a `explicarRecomendacion` server-side, devuelve `{ descripcion: string \| null }`, mismo shape que `app/api/chat/route.ts`) + `lib/explicaciones.ts` (`obtenerExplicacion`, helper `fetch` cliente, mismo patrón que `enviarMensaje` en `lib/chat.ts`). En `app/recomendaciones/page.tsx`: estado `descripciones: Record<string, string \| null>` llenado vía `useEffect` (dependencia `[meta]`, con flag `cancelado` para evitar `setState` post-unmount) que dispara `obtenerExplicacion` por cada recomendación en paralelo y pasa `descripciones[rec.id] ?? null` como prop (ya no `null` fijo). |

**Verificación:** `npx tsc --noEmit` y `npm run build` → 0 errores, compila limpio (nueva ruta
`ƒ /api/explicar` aparece en el build junto a `/api/chat`).

**Segunda opinión de Codex (agente secundario, solo lectura, `codex exec`)** sobre el diff de
los 3 archivos nuevos/modificados — halló que `lib/explicaciones.ts` no capturaba rechazos de
`fetch` (errores de red), a diferencia de `res.ok === false` que sí manejaba. Se corrigió
envolviendo el `fetch` en `try/catch` → devuelve `null` en cualquier fallo, igual que el resto
de casos (la UI ya degrada con gracia: `{descripcion && <p>...}` en `RecomendacionCard.tsx`).
El resto de hallazgos de Codex (la ruta API podría 500 si Gemini lanza excepción, posibles
duplicados en React Strict Mode al montar) son consistentes con el patrón ya existente en
`app/api/chat/route.ts` / `lib/chat.ts` y se degradan sin romper la UI — no se tocaron para no
introducir asimetría con el resto del proyecto.

**Prueba visual en navegador (Chrome DevTools MCP, 390x844) en `/recomendaciones?meta=vender_mas`:**
- Las 3 tarjetas se renderizan con los 3 niveles de riesgo (🟢 promo / 🟡 pedido por app / 🟠
  reto de loyalty), colores y CTAs correctos, sin overflow horizontal.
- `list_network_requests` confirma 3 `POST /api/explicar` (uno por recomendación) con `200` y
  el payload correcto (`recomendacion.titulo`, `perfil.nombre: "Raúl"`).
- La respuesta fue `{"descripcion": null}` en los 3 casos — **mismo límite de sandbox ya
  documentado para `/api/chat`** (la API de Gemini no responde en este entorno, probablemente
  acceso de red restringido; `GEMINI_API_KEY` sí está configurada). Las tarjetas se ven
  perfectamente bien sin el párrafo de descripción — `{descripcion && <p>...}` degrada con
  gracia, sin huecos ni layout roto. Falta probar con la API respondiendo de verdad (fuera de
  este sandbox) para confirmar que el texto generado es corto y coherente.

**Sigue pendiente, no bloquea T1.4:**
- **#1** (precio Coca-Cola $15.50 vs `precioCosto: 11.5`) — afecta el "Calculador de ganancia"
  de esta misma pantalla (modal F6, T1.5). Confirmar con la diseñadora cuál es la fuente correcta
  antes de construir esa sección.
- Punto #6 (bottom nav en inglés, afecta `/registro`). El punto #5 (naming TuAliado/tuAliado) ya
  quedó resuelto — ver entrada "Capitalización de marca" en esta misma sección.

## ✅ T1.5b — `/registro` (check-in diario): completa y verificada (2026-06-07 03:20)

**Implementación delegada a Codex** (agente secundario, solo lectura, vía `codex exec` con un
prompt que incluía el spec funcional completo, los contratos de tipos, las firmas de
`lib/state.ts` y el código de referencia de `app/onboarding` y `app/diagnostico`). Codex produjo
un borrador de texto (no tocó el repo); Claude lo revisó, corrigió un bug y lo aplicó:

| Archivo | Estado | Detalle |
|---|---|---|
| `app/registro/OpcionPaso.tsx` | ✅ Nuevo (~26 líneas) | Botón de opción reutilizable del stepper (icono + label + estado seleccionado), aplicado del borrador de Codex sin cambios. |
| `app/registro/PasoRegistro.tsx` | ✅ Nuevo (~13 líneas) | Wrapper de título + contenedor de opciones — separado del borrador de Codex (que lo traía inline en `page.tsx`) para seguir la convención del proyecto de sub-componentes en archivos propios (como `TicketCard`/`CanalGrid` en `/diagnostico`). |
| `app/registro/page.tsx` | ✅ Reescrito | Stepper de 4 estados (`"dia" \| "pedido" \| "meta" \| "cierre"`), 2-3 preguntas según meta (P3 condicional se omite para `como_voy`), guarda con `guardarEntradaDiaria` + `actualizarRacha`, muestra "¡Llevas X días seguidos!" y redirige a `/seguimiento` tras 1.2s. |

**Bug encontrado y corregido antes de aplicar (revisión de código, nunca llegó a producirse en runtime):**
El borrador de Codex tenía un **stale closure** — `terminarRegistro` leía `respuestas.pedido` /
`respuestas.respuestaMeta` del closure de `RegistroContent`, pero se invocaba inmediatamente
después de `setRespuestas(...)` (actualización de estado asíncrona). En el flujo de 2 pasos
(`meta === "como_voy"`), `seleccionarPedido` llamaba `terminarRegistro(null)` justo después de
`setRespuestas`, y `respuestas.pedido` en el closure seguía siendo `null` → el guard
`if (!respuestasFinales.pedido...)` retornaba temprano y **el registro no se guardaba, en
silencio**. Corregido cambiando la firma a `terminarRegistro(respuestasFinales: RespuestasRegistro)`
y construyendo el objeto actualizado (`{ ...respuestas, <campo> }`) en cada call site antes de
pasarlo explícitamente.

**Verificación:** `npx tsc --noEmit` y `npm run build` → 0 errores, compila limpio.

**Prueba en navegador (Chrome DevTools MCP, 390x844)** — verdict **PASS**:
- `/registro?meta=vender_mas` (3 pasos): indicador "1 de 3" → "2 de 3" → "3 de 3" cambia
  correctamente; pregunta condicional de meta correcta ("¿Te pidieron algo que no tenías?");
  opciones se resaltan al seleccionarse; sin overflow horizontal.
- `/registro?meta=como_voy` (2 pasos, **el path exacto del bug corregido**): indicador "1 de 2"
  → "2 de 2", sin pregunta de meta; al completar guardó correctamente en `tualiado_entradas` y
  `tualiado_racha`, y redirigió a `/seguimiento`. El fix funcionó — sin él esta ruta habría
  fallado en silencio.
- Pantalla de cierre confirmada: `"¡Llevas 1 días seguidos!"` + "Listo por hoy", con ícono de
  racha (`local_fire_department`).
- 🔍 Probe: completar el registro dos veces el mismo día **sobrescribe** la entrada (no duplica)
  y la racha no se infla (`rachaActual` se mantiene en 1) — comportamiento idempotente correcto.
- Sin overflow horizontal (`scrollWidth === clientWidth`) en ninguna pantalla del flujo.

**Hallazgo menor (no bloquea):**
- ⚠️ Concordancia singular/plural en el copy de cierre: `"¡Llevas 1 días seguidos!"` debería
  decir "1 día" cuando `rachaActual === 1`. Detalle de redacción visible solo el primer día de
  uso o tras reiniciar racha — candidato para la tarea de polish de abajo.

## 🔧 Polish de frontend — pendiente, hacer al final de FASE 1

Una vez completas las pantallas core (T1.5, T1.6 y lo que siga), dedicar una pasada de
**polish visual y de copy** a todo el flujo. No es una tarea de feature — es pulir lo que ya
funciona para que se sienta terminado y coherente. Candidatos ya identificados:

- Concordancia singular/plural en textos dinámicos (ej. "1 días seguidos" → "1 día seguido" en
  `/registro`, y revisar si `/seguimiento` u otras pantallas tienen el mismo patrón con conteos).
- Confirmar que toda la app usa "TuAliado" consistentemente (contradicción #5, naming).
- Revisar transiciones/animaciones entre pasos del stepper y hacia la pantalla de cierre — hoy
  son instantáneas, podría sentirse más "premiado" con una transición suave.
- Pasada de consistencia visual entre pantallas implementadas en momentos distintos
  (`/diagnostico`, `/recomendaciones`, `/registro`, `/onboarding`) — colores, spacing, iconos.
- Revisar copy corto/simple en todas las pantallas con la pregunta "¿lo entiende Raúl?"
  (regla de CLAUDE.md) — buscar frases que se puedan acortar o reemplazar por visuales.

No empezar esta tarea hasta que el flujo funcional esté completo — evitar pulir algo que
todavía puede cambiar de forma.
