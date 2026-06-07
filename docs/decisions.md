# Decisiones del proyecto

> Registro de decisiones confirmadas. Agregar fecha y razón cuando sea posible.
> Si una decisión cambia, actualizar aquí y en `docs/handoff-context.md`.

---

## Decisiones confirmadas

### Reto seleccionado

- **Decisión:** Tuali Growth Agent
- **Estado:** Confirmado

---

### Nombre de trabajo del producto

- **Decisión:** tuAliado
- **Estado:** Confirmado

---

### Tech Lead

- **Decisión:** Tech Lead del equipo
- **Estado:** Confirmado
- **Nota:** Único programador. El repo debe ser fácil de retomar entre sesiones de AI.

---

### Usuario prioritario

- **Decisión:** Cliente dueño de tienda
- **Arquetipo prioritario:** Dueño apoyado (Raúl)
- **Estado:** Confirmado por Tuali
- **Razón:** Si funciona para alguien con baja habilidad digital, funciona para todos.

---

### Métrica principal

- **Decisión:** Ticket promedio
- **Estado:** Confirmado por Tuali
- **Descripción:** Aumentar el valor promedio de los pedidos del cliente.

---

### Métrica secundaria

- **Decisión:** Autonomía del cliente dentro de Tuali
- **Estado:** Confirmado por Tuali
- **Descripción:** Que el cliente pida más por Tuali que por promotor u otros métodos.

---

### Flujo base del MVP

- **Decisión:** Diagnóstico → Meta → Recomendación → Acción → Seguimiento
- **Estado:** Confirmado en discusión de MVP
- **Nota:** El chatbot es apoyo dentro de este flujo, no el punto de entrada.

---

### Motor de recomendaciones

- **Decisión:** Determinístico primero; LLM solo como capa de explicación
- **Estado:** Confirmado en discusión de MVP
- **Razón:** Evitar incoherencia de datos. El LLM no inventa recomendaciones — las explica.

---

### Alcance del MVP

- **Decisión:** Una meta principal + hasta tres recomendaciones
- **Estado:** Confirmado en discusión de MVP
- **Razón:** Evitar overbuild y complejidad innecesaria para el cliente.

---

### Dato de precio de venta

- **Decisión:** Pedir al cliente en cuánto vende el producto para estimar ganancia
- **Estado:** Confirmado en respuesta de Tuali
- **Razón:** Tuali no tiene este dato. Sin él no se puede estimar margen real.

---

### Incoherencia de datos

- **Decisión:** No debe haber incoherencia en los datos mostrados
- **Estado:** Confirmado por Tuali como lo que definitivamente no quieren ver
- **Nota:** Separar claramente datos reales, mock y estimaciones con origen claro.

---

### LLM para capa de explicación

- **Decisión:** Gemini API (Google)
- **Estado:** Confirmado
- **Razón:** El equipo cuenta con API Key de Gemini disponible para la demo.
- **Modelo:** Por definir (Gemini Flash vs Pro según costo/latencia).
- **Uso:** Solo como capa de explicación en lenguaje natural. No toma decisiones de negocio.

---

### Chatbot

- **Decisión:** El chatbot es apoyo, no el centro del producto
- **Estado:** Confirmado en discusión de MVP
- **Razón:** Evitar que el producto parezca un chatbot genérico.

---

### Comportamiento dentro de la app

- **Decisión:** El agente debe evaluar el comportamiento del usuario dentro de la app
- **Estado:** Confirmado por Tuali
- **Nota:** No debe sentirse como una herramienta aislada.

---

### Prioridad de productos

- **Decisión:** Las recomendaciones priorizan productos que provee Tuali
- **Estado:** Confirmado por Tuali
- **Razón:** El objetivo es que el cliente crezca Y que Tuali/Arca obtenga beneficio.

---

### Arquitectura y stack

- **Decisión:** Next.js (App Router) + TypeScript + Tailwind CSS, full-stack sin backend separado
- **Estado:** Confirmado
- **Razón:** No habrá dataset real de Tuali. Los únicos datos disponibles son los de `01-contexto-reto-tuali.md`. Un backend separado no aporta nada.
- **Deploy:** Vercel

---

### Fuente de datos

- **Decisión:** Datos mock únicamente, basados en protopersonas y journeys del doc fuente
- **Estado:** Confirmado
- **Razón:** Tuali no entregará dataset real. No asumir que llegará uno.

---

### Plataforma objetivo

- **Decisión:** Mobile únicamente (375px – 430px)
- **Estado:** Confirmado
- **Razón:** Los clientes no tienen acceso a computadora. El MVP debe funcionar y verse bien solo en móvil.
- **Implicación:** Sin layouts de desktop. Sin breakpoints `lg:` o mayores. Tap targets mínimo 44x44px.

---

### Principio de UX: Visuales sobre texto

- **Decisión:** Priorizar iconos, barras, números grandes y colores sobre texto y párrafos
- **Estado:** Confirmado
- **Razón:** Cuesta mucho a los usuarios leer. Los visuales comunican más rápido.
- **Implicación:** Una pantalla = una idea. Texto solo cuando no hay otra opción, y corto.

---

### Estructura del esquema de datos mock

- **Decisión:** Tres archivos en `/lib/`: `types.ts`, `mock-data.ts`, `onboarding-questions.ts`
- **Estado:** Implementado — 2026-06-06
- **Razón:** Separar contratos, datos y preguntas en archivos distintos. Los campos están anotados por origen (TUALI / CLIENTE / ESTIMACION) para cumplir el requisito de no incoherencia de datos.

---

### Onboarding inicial: 1 sola pregunta con 4 botones

- **Decisión:** La sesión 1 del onboarding hace exactamente 1 pregunta: "¿Qué quieres para tu tienda?" con 4 botones grandes.
- **Estado:** Confirmado — 2026-06-06
- **Razón:** Raúl (baja habilidad digital) no puede con más de una decisión al arranque. El precio de venta se pide después, de forma contextual, cuando el motor detecta una promoción relevante.

### Las 4 metas del onboarding

- **Decisión:** Los 4 botones son: "Vender más" / "Aprovechar las promociones" / "Surtir mejor mi tienda" / "Saber cómo me está yendo".
- **Estado:** Confirmado — 2026-06-06
- **Razón:** De 6 candidatas se eliminaron "Organizar mejor mi negocio" (sin output concreto en el motor) y "Ahorrar para una meta importante" (requiere tracking financiero externo no disponible). "Tener siempre producto" y "Saber qué productos pedir" se fusionaron en "Surtir mejor mi tienda" porque el motor las resuelve igual (pedido sugerido). La autonomía en Tuali es un resultado implícito, no una meta que Raúl expresaría.

---

### Diseño del registro diario

- **Decisión:** 2 preguntas base (siempre) + 1 pregunta específica por meta. Máximo 3 preguntas, solo botones grandes, sin texto libre.
- **Estado:** Confirmado — 2026-06-06
- **Preguntas base:** (1) "¿Cómo estuvo el día?" → bien/regular/mal. (2) "¿Pediste a Tuali hoy?" → por app / con promotor / no pedí.
- **Pregunta por meta:** `vender_mas` → ¿Te pidieron algo que no tenías? | `aprovechar_promos` → ¿Usaste alguna promoción? | `surtir_tienda` → ¿Se te acabó algo? | `como_voy` → sin pregunta 3 (va directo al seguimiento).
- **Razón:** Raúl no puede con formularios largos. Cada pregunta tiene señal directa para el motor. `pidioporApp` alimenta la métrica secundaria de autonomía en Tuali en todas las metas.

---

### Incentivo de retención: racha de días

- **Decisión:** Mostrar racha de días consecutivos registrados ("¡Llevas X días seguidos!"). Logros visuales en 3, 7, 14, 30 días. Sin puntos Tuali simulados.
- **Estado:** Confirmado — 2026-06-06
- **Razón:** Los puntos de loyalty del programa real (Gana con Tuali) se ganan por compras, no por interacciones en la app. Simular puntos que no existen en el sistema real sería incoherencia de datos. La racha es 100% local y no requiere cambios en el backend de Tuali. En el pitch se puede proponer como evolución futura del programa de loyalty.

---

### Protopersona del mock: Raúl

- **Decisión:** El mock está construido sobre el perfil de Raúl (63 años, baja habilidad digital, 80% pedidos por promotor).
- **Estado:** Implementado — 2026-06-06
- **Razón:** Priorizar al arquetipo más difícil. Si funciona para Raúl, funciona para todos.

---

### Uso de Codex como agente secundario

- **Decisión:** Claude Code sigue siendo el agente principal del proyecto (dueño del contexto, de las MCP tools exclusivas como chrome-devtools, y de las decisiones de producto/código). Codex se permite como agente **secundario y de apoyo**, limitado a tareas de solo lectura que no dependen de las convenciones específicas de tuAliado: investigación externa (librerías, configs, debugging de herramientas), segunda opinión/revisión de un diff, lectura y resumen de documentación. Codex **no edita código del proyecto, no toca `docs/`/`.ai/`, ni toma decisiones de producto**. Su rol y alcance quedan documentados en `AGENTS.md` (sección "Codex — Agente secundario") para que los lea directamente al ser invocado en este repo.
- **Estado:** Confirmado — 2026-06-06
- **Razón:** Joaquín tiene Claude Pro y GPT Plus, ambos con ventana de uso que se renueva cada ~5 horas — el recurso escaso real es esa ventana, no "tokens" en abstracto. Las MCP tools de Claude Code (chrome-devtools, etc.) y el contexto profundo del proyecto son no-transferibles a Codex, así que conviene proteger la ventana de Claude para ese trabajo exclusivo y descargar en Codex el trabajo genérico que no requiere ese contexto — minimizando el "peaje" de explicarle las convenciones del proyecto cada vez.
- **Nota:** Esto matiza la regla histórica "un solo agente, un solo loop, sin coordinación entre herramientas externas" — actualizada en `AGENTS.md`.

---

### Modelo de Gemini a usar

- **Decisión:** Usar **Gemini Flash / Flash-Lite** (no Pro) en `lib/gemini.ts`.
- **Estado:** Confirmado — 2026-06-06
- **Razón:** La capa de explicación solo traduce recomendaciones ya calculadas a 1-3 oraciones simples — no requiere razonamiento complejo, que es donde Pro aportaría. Según pricing oficial de Gemini (ai.google.dev/gemini-api/docs/pricing): Flash-Lite ≈ $0.25/M tokens input + $1.50/M output, frente a Pro ≈ $2/M + $12/M (~8x más caro). Para un request típico de este caso de uso (~300 tokens input + 60 output), Flash-Lite cuesta ≈ $0.000165 vs. Pro ≈ $0.00132. Google describe Flash/Flash-Lite como optimizados para baja latencia y alto volumen — encaja con el patrón de llamadas frecuentes y cortas de la capa de explicación.
- **Fuente:** Investigación de costo/latencia delegada a Codex como agente secundario (ver `AGENTS.md` y entrada "Uso de Codex como agente secundario" arriba) — comparó pricing oficial vigente con fuentes (ai.google.dev). Confirmado por Joaquín.

---

### Criterio de delegación a Codex en planes de Claude

- **Decisión:** Al armar un plan, Claude Code marca qué subtareas delega a Codex (solo lectura, genéricas) vs. cuáles hace él mismo. Por defecto asume que Codex tiene presupuesto disponible y decide el nivel de esfuerzo según la tarea — no pregunta a Joaquín antes de delegar. Si Codex responde con un error de cuota agotada ("usage limit reached", "tokens restart at..."), Claude asume la tarea directamente sin reintentar ni esperar.
- **Estado:** Confirmado — 2026-06-06
- **Razón:** `codex exec` (modo no-interactivo, el que usa Claude para delegar) no expone `/status` — ese comando solo existe en el modo interactivo de Codex, así que no hay forma de consultar la cuota de antemano. Preguntar a Joaquín cada vez añadiría fricción innecesaria; las tareas delegadas hasta ahora han gastado poco presupuesto (la última, ~2% de la ventana de 5h de Codex). Reaccionar al error real es más simple y confiable que estimar de antemano.
- **Nota:** Detalle operativo en `AGENTS.md` (sección "Codex — Agente secundario" → "Cómo decide Claude Code cuándo y cómo delegar").

---

## Decisiones pendientes

- ~~Definir modelo de Gemini a usar (Flash vs Pro — por costo y latencia)~~ → Resuelto: Gemini Flash/Flash-Lite (ver "Modelo de Gemini a usar" arriba, 2026-06-06)
- Pantallas mínimas para el demo (flujo core a confirmar con el Tech Lead)
- ~~Diseño visual: paleta de colores, tipografía, componentes base~~ → Resuelto: assets de Stitch recibidos (sistema "Warm & Approachable Advisor", ver `docs/handoff-context.md` 2026-06-06 20:11)

### Nuevas — surgidas al revisar assets de diseño Stitch (2026-06-06 20:11)

Detalle completo en `docs/handoff-context.md` sección "Contradicciones encontradas". Resumen para decidir:

- **Precio Coca-Cola 600ml**: diseño muestra $15.50, mock tiene `precioCosto: 11.5` — ¿cuál es el dato correcto? (riesgo de "incoherencia de datos", el problema #1 que Tuali no quiere ver)
- **¿Agregamos `nivelRiesgo` a `Recomendacion`?**: el diseño de recomendaciones muestra 3 badges de riesgo (🟢🟡🟠) que no existen en `lib/types.ts` ni en el motor
- **¿Alineamos los textos de "oportunidades" del diagnóstico y de recomendaciones con el copy del diseño?**: el diseño está más orientado a "autonomía de canal" (pedir por app vs. promotor) que el motor actual
- **Capitalización de marca**: logo usa "TuAliado", docs confirman "tuAliado" — ¿el logo es excepción tipográfica o hay que pedir ajuste?
- **Bottom nav bar en inglés** (Progress/Check-in/Insights/Profile) en pantallas de registro — no coincide con el flujo lineal confirmado, ¿es scaffolding genérico de Stitch a descartar?
