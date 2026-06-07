# MVP Plan — TuAliado (Hack4Her)

> Documento vivo. Última actualización: 2026-06-06 15:02
> Deadline: 2026-06-07 10:00 AM (buffer de 1h antes de deadline real 11 AM)
> Tiempo disponible: ~20 horas

---

## Funciones MVP Core (IN — primeras 6 horas)

| # | Función | Pantalla |
|---|---|---|
| F1 | Onboarding — Elegir meta | `/onboarding` |
| F3 | Diagnóstico | `/diagnostico` |
| F4 | Recomendaciones (3 niveles de riesgo) | `/recomendaciones` |
| F6 | Pedir precio de venta (contextual) | Modal dentro de F4 |
| F10 | Seguimiento + puntuación | `/seguimiento` |
| F14 | Chatbot de apoyo (texto + Gemini) | Botón flotante global |

---

## Chat de Voz (IN — diferenciador clave, desarrollar en paralelo con Stitch)

**Decisión confirmada (2026-06-06):** El chat de voz es diferenciador principal para el hackathon.
Raúl no quiere leer. Voz reduce la fricción al mínimo. Se prioriza en paralelo mientras el diseño avanza en Stitch.

**Stack técnico:**
- Web Speech API (`SpeechRecognition`) — STT, gratis, funciona en Chrome Android.
- `window.speechSynthesis` — TTS, gratis, sin latencia.
- Mismo `/api/chat` que el chatbot de texto, sin cambios en backend.
- Fallback a texto si el navegador no soporta voz.

**Interfaz:** Botón grande de micrófono (estilo walkie-talkie, no Alexa). El usuario toca → habla → suelta → el agente responde en voz.

**Archivos a crear/modificar:**

| Archivo | Acción |
|---|---|
| `lib/voice.ts` | CREAR — hooks para SpeechRecognition y speechSynthesis |
| `components/VoiceButton.tsx` | CREAR — botón grande de micrófono con estados (idle/recording/thinking/speaking) |
| `components/ChatbotButton.tsx` | MODIFICAR — integrar modo voz junto al modo texto |

**Mini-tareas:**

| ID | Mini-tarea | Est. |
|---|---|---|
| TV.1 | `lib/voice.ts`: wrapper `startListening()` y `speak(text)` con detección de soporte | 20 min |
| TV.2 | `VoiceButton`: estados visuales (ícono mic, animación grabando, spinner, speaker) | 25 min |
| TV.3 | Integrar en `ChatbotButton`: toggle voz/texto, conectar a `/api/chat` | 20 min |
| TV.4 | Test en Chrome Android (o DevTools mobile) | 15 min |

**Total estimado: ~80 minutos.** Incluir en FASE 2.

---

## Funciones Stretch (IN — si el core termina rápido)

En orden de impacto para el demo:

| # | Función | Justificación |
|---|---|---|
| F16 | Pop-ups guiados | Wow factor: "esto es para Raúl" |
| F5 | Sustitución de recomendaciones | Hace el producto sentirse vivo |
| F8 | Asesoramiento financiero | Más profundidad en F4, expande tarjetas |
| F2 | Perfil del cliente | Hace el demo más creíble |
| F11 | Feedback semanal | Cierra el loop narrativo del pitch |
| F9 | Plan de mejora | Extiende F10 con plan semana a semana |
| F19 | Preguntas frecuentes | FAQ accordion, 15 minutos de trabajo |
| F12 | Toggle de lenguaje simple/detallado | Demuestra accesibilidad |
| F18 | Análisis demográfico | Chart de productos en zona, visual bonito |
| F17 | Notificaciones simuladas | Banner que simula push notification |
| F20 | Evaluación mensual | Formulario corto 3 preguntas + estrellas |

---

## Funciones OUT (definitivamente no)

| # | Función | Razón |
|---|---|---|
| F7 | Confirmación de pedido | Feature de Tuali core, no de TuAliado |
| F13 | Chat de voz | ~~Movido a IN — ver abajo~~ |
| F15 | Chat con agente humano | Requiere backend real |

---

## Archivos a crear / modificar

| Archivo | Acción |
|---|---|
| `.env.local` | CREAR — `GEMINI_API_KEY` |
| `lib/types.ts` | MODIFICAR — añadir `BaselineSnapshot` y `EntradaDiaria` |
| `lib/mock-data.ts` | MODIFICAR — añadir `ENTRADAS_DEMO` (4 entradas pre-cargadas para demo) |
| `lib/recommendation-engine.ts` | CREAR — motor determinístico, produce `Recomendacion[]` + `BaselineSnapshot` |
| `lib/gemini.ts` | CREAR — llamada a Gemini Flash |
| `lib/state.ts` | CREAR — URL params (meta, preciosVenta) + baseline y entradas diarias en localStorage |
| `app/api/chat/route.ts` | CREAR — API route server-side Gemini |
| `app/layout.tsx` | MODIFICAR — layout base móvil |
| `app/page.tsx` | MODIFICAR — Splash screen |
| `app/onboarding/page.tsx` | CREAR |
| `app/diagnostico/page.tsx` | CREAR |
| `app/recomendaciones/page.tsx` | CREAR — al montar llama `guardarBaseline()` |
| `app/registro/page.tsx` | CREAR — stepper 3 preguntas, guarda `EntradaDiaria` |
| `app/seguimiento/page.tsx` | CREAR — muestra deltas baseline vs. entradas diarias |
| `components/ChatbotButton.tsx` | CREAR |
| `components/ProgressBar.tsx` | CREAR — reutilizable |
| `components/RecomendacionCard.tsx` | CREAR — reutilizable |

---

## Mini-tareas con bloques de tiempo

### FASE 0 — Setup & Engine (15:02–16:30) | 1.5 h

| ID | Mini-tarea | Est. |
|---|---|---|
| T0.1 | `.env.local` + verificar `next dev` corre | 10 min |
| T0.2 | `app/layout.tsx`: max-width 430px, fuente 16px, fondo blanco | 10 min |
| T0.3 | Crear carpetas de rutas con `page.tsx` placeholder | 10 min |
| T0.4 | `lib/state.ts`: helpers URL params (meta, preciosVenta) + `guardarBaseline`, `cargarBaseline`, `guardarEntradaDiaria`, `cargarEntradasDiarias` | 15 min |
| T0.4b | `lib/types.ts`: ✅ ya tiene `BaselineSnapshot`, `EntradaDiaria`, `RachaDiaria` y `MetaCliente` actualizado. `lib/state.ts`: agregar `guardarRacha`, `cargarRacha`. `lib/mock-data.ts`: añadir `ENTRADAS_DEMO` (4 entradas con campos por meta coherentes con historial de Raúl) | 20 min |
| T0.5 | `lib/recommendation-engine.ts`: `calcularRecomendaciones(meta, estado)` → `Recomendacion[]` + `BaselineSnapshot` | 30 min |
| T0.6 | `lib/gemini.ts`: `explicarRecomendacion(rec, perfil)` → string simple | 15 min |
| T0.7 | `app/api/chat/route.ts`: POST → Gemini → `{ reply }` | 15 min |

### FASE 1 — Pantallas Core (16:30–21:00) | 4.5 h

| ID | Mini-tarea | Est. |
|---|---|---|
| T1.1 | Splash `app/page.tsx`: logo, tagline, botón "Empezar" | 15 min |
| T1.2 | Onboarding: 4 botones grandes con ícono, guarda meta en URL | 20 min |
| T1.3a | Diagnóstico — estructura base y header | 15 min |
| T1.3b | Número grande: ticket promedio actual | 10 min |
| T1.3c | Barra canal de pedidos (promotor vs app) | 15 min |
| T1.3d | Badge loyalty con puntos + nivel | 10 min |
| T1.3e | Lista oportunidades (máx 3) + CTA | 15 min |
| T1.4a | Recomendaciones — estructura base, leer meta, llamar motor | 15 min |
| T1.4b | `RecomendacionCard`: ícono riesgo, título, descripción, beneficio, CTA | 25 min |
| T1.4c | Renderizar 3 tarjetas, CTA primario en tarjeta A | 15 min |
| T1.4d | Integrar texto Gemini en cada tarjeta | 20 min |
| T1.5 | Modal F6: "¿En cuánto vendes X?" → recalcular beneficio | 25 min |
| T1.5b | `app/registro/page.tsx`: stepper 2-3 preguntas según meta. P1: ¿Cómo estuvo el día? (bien/regular/mal). P2: ¿Pediste a Tuali? (app/promotor/no). P3 por meta: `vender_mas`→¿te pidieron algo que no tenías?, `aprovechar_promos`→¿usaste promo?, `surtir_tienda`→¿se te acabó algo?, `como_voy`→sin P3. Al terminar: actualizar racha + mostrar "¡Llevas X días!" + ir a /seguimiento. | 40 min |
| T1.6a | Seguimiento — estructura base, leer baseline de localStorage (si no hay → CTA a /onboarding) | 10 min |
| T1.6b | `ProgressBar` animado: ticket promedio baseline vs. promedio entradas diarias vs. objetivo | 15 min |
| T1.6c | Delta % pedidos app: baseline.porcentajePedidosTuali vs. % `pidioporApp` en entradas | 10 min |
| T1.6d | Promos aplicadas: conteo de `aplicoPromo: true` en entradas diarias | 10 min |
| T1.6e | CTA "Registrar mi día" → `/registro` | 10 min |

### FASE 2 — Chatbot & Wiring (21:00–23:00) | 2 h

| ID | Mini-tarea | Est. |
|---|---|---|
| T2.1 | `ChatbotButton`: botón flotante inferior derecha | 15 min |
| T2.2 | Bottom sheet: historial, input, botón enviar | 25 min |
| T2.3 | Conectar a `/api/chat` con contexto del cliente | 20 min |
| T2.4 | Test flujo completo end-to-end | 20 min |
| T2.5 | Fix de bugs del flujo | 40 min |

### FASE 3 — Stretch Features (23:00–05:00) | 6 h

| ID | Mini-tarea | Feature | Est. |
|---|---|---|---|
| T3.1 | Pop-ups guiados en primer visit | F16 | 45 min |
| T3.2 | Botón "No me convence, ver otra" | F5 | 30 min |
| T3.3 | Sección colapsable con margen estimado | F8 | 35 min |
| T3.4 | Pantalla `/perfil` editable | F2 | 30 min |
| T3.5 | Card "Tu semana" en seguimiento | F11 | 30 min |
| T3.6 | "Plan de la semana": 3 pasos con checkbox | F9 | 35 min |
| T3.7 | FAQ `/faq`: accordion 6-8 preguntas | F19 | 20 min |
| T3.8 | Toggle Simple/Detallado en recomendaciones | F12 | 20 min |
| T3.9 | Sección "En tu zona se vende más" | F18 | 35 min |
| T3.10 | Banner promo activa no usada | F17 | 20 min |
| T3.11 | Modal evaluación mensual + estrellas | F20 | 25 min |

### FASE 4 — Polish, Deploy & Buffer (05:00–10:00) | 5 h

| ID | Mini-tarea | Est. |
|---|---|---|
| T4.1 | Revisar cada pantalla a 375px | 45 min |
| T4.2 | Iconografía consistente (Heroicons) | 30 min |
| T4.3 | Animaciones y transiciones | 20 min |
| T4.4 | Verificar coherencia de datos de Raúl: `ENTRADAS_DEMO` aritméticamente consistentes con `HISTORIAL_PEDIDOS`; deltas en seguimiento derivables de los datos | 20 min |
| T4.5 | Configurar Vercel + env var | 15 min |
| T4.6 | Deploy inicial | 15 min |
| T4.7 | QA en móvil real | 30 min |
| T4.8 | Fix post-deploy | 60 min |
| T4.9 | Buffer libre | 105 min |

---

## Resumen de tiempo

| Fase | Horario | Horas | Qué sale |
|---|---|---|---|
| F0: Setup & Engine | 15:02–16:30 | 1.5 h | Motor + Gemini + rutas |
| F1: Pantallas Core | 16:30–21:00 | 4.5 h | 6 pantallas core (incluye /registro) |
| F2: Chatbot & Wiring | 21:00–23:00 | 2.0 h | Flujo completo funcionando |
| F3: Stretch Features | 23:00–05:00 | 6.0 h | Hasta 11 features extra |
| F4: Polish & Deploy | 05:00–10:00 | 5.0 h | App en Vercel, QA, buffer |
| **Total** | | **19 h** | |

---

## Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Gemini API sin key | Fallback: texto hardcodeado por recomendación |
| Estado entre páginas complejo | URL params simples, sin Context |
| Pantalla de recomendaciones pesada | 3 tarjetas estáticas primero, datos dinámicos después |
| Deploy de Vercel falla | `next dev` local como fallback para la demo |
| Gemini genera texto incoherente | Prompt muy específico con límite de 2 oraciones |
