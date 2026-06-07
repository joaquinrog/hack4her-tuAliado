# Claude Next Dev — tareas listas para atacar

> Preparado para que Claude Code pueda retomar rápido.
> Fecha: 2026-06-07 06:06
> Estado base: FASE 1 cerrada; demo path principal definido con meta `vender_mas`.

---

## Contexto corto

El flujo core ya funciona:

```text
/ → /onboarding → /diagnostico?meta=vender_mas → /recomendaciones?meta=vender_mas → tocar acción → /registro?meta=vender_mas → /seguimiento?meta=vender_mas
```

El diagnóstico es igual para las 4 metas por diseño: es la foto base de Raúl. La personalización ocurre en recomendaciones, registro y seguimiento.

Últimos commits relevantes:

- `e8eea74 fix: conecta recomendaciones con registro`
- `50ee121 docs: actualiza end del flujo de demo`

Verificación ya pasada después de esos commits:

- `npx tsc --noEmit`
- `npm run build`

---

## ✅ Prioridad 1 — Recomendaciones menos genéricas por meta (cerrada 2026-06-07)

> Implementada en `2a262a4 feat(recomendaciones): agrega selector de estrategia más fácil/más ganancia`
> y revisada/ajustada por Claude el 2026-06-07 08:32 (ver `docs/handoff-context.md`).
> Las 4 metas ya producen sets de 3 títulos distintos con selector Más fácil / Más ganancia.
> Se deja el contenido original abajo solo como referencia histórica del enfoque.

**Problema (ya resuelto):** `/recomendaciones` todavía se sentía repetitiva entre metas. Antes dos tarjetas se repetían por datos reales globales de Raúl:

- promo sin usar;
- reto loyalty sin activar.

Eso es defensible, pero para demo puede sentirse pobre si se comparan metas.

**Objetivo:** hacer que cada meta tenga una recomendación claramente distintiva sin inventar datos.

**Archivos principales:**

- `lib/recommendation-engine.ts`
- `lib/types.ts` solo si hace falta ampliar tipo, evitar si no es necesario
- `app/recomendaciones/page.tsx` solo si se necesita copy visual adicional
- `docs/demo-flow.md` si cambia la historia de demo
- `docs/handoff-context.md` al cerrar

**Enfoque recomendado:** mantener 3 tarjetas, pero ordenar/seleccionar según meta:

| Meta | Card 1 sugerida | Card 2 sugerida | Card 3 sugerida |
|---|---|---|---|
| `vender_mas` | promo Coca-Cola | pedir por app esta semana | loyalty |
| `aprovechar_promos` | promo Coca-Cola | promo Ciel | promo Victoria o loyalty |
| `surtir_tienda` | pedido sugerido/resurtido | producto de alta rotación que Raúl ya compra | promo compatible |
| `como_voy` | pedir por app para medir historial | revisar avance/registrar día | loyalty |

**Datos reales disponibles para no inventar:**

- `PROMOCIONES_ACTIVAS`: Coca-Cola 600ml, Ciel 1L, Victoria x12.
- `HISTORIAL_PEDIDOS`: Raúl compra recurrentemente Coca-Cola 600ml, Ciel 1L, botanas, leche, etc.
- `COMPORTAMIENTO_RAUL`: no usa promociones, no usa pedido sugerido, no interactúa con loyalty, 20% app.
- `LOYALTY_RAUL`: reto activo de 50 puntos por 3 pedidos por app.

**Implementación concreta sugerida:**

1. En `calcularRecomendaciones`, separar mejor la lógica por meta en lugar de empujar siempre promo global + loyalty global.
2. Crear helpers pequeños si hace falta:
   - `buildPromoRec(promo, id)`
   - `buildLoyaltyRec(reto)`
   - `buildPedidoAppRec()`
   - `buildPedidoSugeridoRec()`
3. Para `aprovechar_promos`, priorizar 2-3 promociones antes que pedido app.
4. Para `surtir_tienda`, evitar que parezca otra pantalla de promos: primera tarjeta debe ser pedido sugerido/resurtido.
5. Para `como_voy`, reforzar medición/seguimiento: pedir por app o registrar día tiene más sentido que “usar promo”.

**Criterios de done:**

- Las 4 metas no producen el mismo set de 3 títulos.
- Ninguna recomendación usa datos inexistentes.
- `npx tsc --noEmit` pasa.
- `npm run build` pasa.
- Si hay tiempo: verificar visualmente `/recomendaciones?meta=...` para las 4 metas en 390x844.

**No hacer:**

- No agregar datos mock nuevos si no son necesarios.
- No inventar ventas, márgenes ni puntos.
- No meter un chatbot como centro de la pantalla.

---

## Prioridad 2 — Polish rápido del flujo demo

**Problema:** hay detalles pequeños visibles que bajan percepción de terminado.

**Archivos probables:**

- `app/registro/page.tsx`
- `app/recomendaciones/page.tsx`
- `app/page.tsx`
- `app/onboarding/page.tsx`
- `docs/handoff-context.md`

**Tareas candidatas, en orden:**

1. Corregir plural en registro:
   - Actual: `¡Llevas 1 días seguidos!`
   - Esperado: `¡Llevas 1 día seguido!` y `¡Llevas X días seguidos!`.
2. Confirmar warning de Next Image en splash:
   - Logs muestran warning de aspect ratio para `logo-full.svg`.
   - Revisar `app/page.tsx` y agregar `w-auto`/`h-auto` según corresponda, sin distorsionar logo.
3. Revisar que CTAs principales tengan una sola acción dominante por pantalla.
4. Confirmar que `RecomendacionCard` con `onAction` opcional no deje CTAs muertos si se reutiliza.
   - O hacer `onAction` requerido.

**Criterios de done:**

- `npx tsc --noEmit` y `npm run build` pasan.
- Flujo principal no tiene copy raro visible.
- Sin warning nuevo importante en logs.

---

## Prioridad 3 — Narrativa final del pitch

**Problema:** el task board mantiene pendiente `Definir narrativa principal del pitch`.

**Archivos principales:**

- `docs/pitch-context.md`
- `docs/demo-flow.md`
- opcional: nuevo `docs/pitch-script.md`
- `.ai/task-board.md` al cerrar
- `docs/handoff-context.md` al cerrar

**Recomendación:** crear guion de 90-120 segundos, no deck completo.

**Estructura sugerida:**

1. Problema: Tuali ya tiene datos, pero el cliente no sabe qué hacer con ellos.
2. Usuario: Raúl, dueño apoyado, baja habilidad digital.
3. Producto: tuAliado, agente de crecimiento dentro de Tuali.
4. Demo: meta `Vender más`, diagnóstico, recomendaciones, registro, seguimiento.
5. Diferenciador: motor determinístico + voz/chat solo como explicación.
6. Impacto: ticket promedio + autonomía en Tuali.

**Frase central:**

> tuAliado no le pregunta a Raúl “¿en qué te ayudo?”; le muestra qué hacer hoy para crecer.

**Criterios de done:**

- Guion no promete funcionalidades no implementadas.
- Menciona explícitamente mock vs. datos reales Tuali.
- Menciona que Gemini no decide, solo explica.
- Queda claro beneficio para cliente y Tuali/Arca.

---

## Prioridad 4 — QA final mobile del demo path

**Objetivo:** confirmar que el path completo se puede presentar sin escribir URLs manualmente.

**Path:**

```text
/ → Empezar → Vender más → Continuar → Ver mis recomendaciones → tocar CTA → completar registro → seguimiento
```

**Checks baratos:**

- Usar Chrome DevTools con viewport 390x844.
- Preferir `evaluate_script`, `list_console_messages`, `list_network_requests`.
- Captura solo si hay duda visual real.

**Qué validar:**

- No overflow horizontal.
- El CTA de recomendación navega a `/registro?meta=vender_mas`.
- Registro redirige a `/seguimiento?meta=vender_mas`.
- Seguimiento muestra avance si hay baseline.
- Chat flotante no tapa CTAs críticos.
- Sin errores rojos nuevos en consola.

**Criterios de done:**

- Registrar resultado en `.ai/validation-log.md` si Claude lo considera útil.
- Actualizar `docs/handoff-context.md` con timestamp.

---

## Qué evitar para no perder tiempo

- No reconstruir arquitectura.
- No convertir el flujo en tabs.
- No hacer `/diagnostico` distinto por meta con datos inventados.
- No implementar calculador de ganancia si no hay tiempo; requiere precio de venta del cliente y puede abrir riesgo de incoherencia.
- No depender de Gemini para que la demo se vea bien.
- No intentar resolver modo voz en Android por IP LAN; ya está documentado que requiere secure context.

---

## Estado de pendientes después de esta preparación

> Actualizado 2026-06-07 08:32 por Claude tras revisar los commits de Codex de la mañana.

Pendientes reales:

- Polish visible del flujo demo.
- Narrativa final del pitch.
- QA final mobile del demo path.

Pendientes cerrados:

- Demo path principal.
- End correcto de demo.
- Explicación de diagnóstico común.
- Navegación desde recomendaciones a registro.
- Hacer recomendaciones más distintas por meta (commit `2a262a4`).
- Coherencia CTA → destino en `/recomendaciones`: las tarjetas tenían textos de botón muy
  específicos (`"Activar reto"`, `"Ver pedido sugerido"`, `"Agregar Coca-Cola"`...) que prometían
  funciones que no existen — todas navegan a `/registro`. Se unificó a `"Voy a intentarlo"` en
  `lib/recommendation-engine.ts`.
- Compactar `/recomendaciones`: se quitó el bloque "Empieza por aquí" (redundante con el orden ya
  priorizado de las tarjetas) en `app/recomendaciones/page.tsx`.
