# Registro diario — `app/registro/page.tsx`

## Contexto

El usuario registra cómo le fue en el día. Máximo 3 preguntas según la meta activa. Debe completarse en menos de 30 segundos. Al terminar, muestra la racha actualizada y va al seguimiento.

## Prompt para Google Stitch

```
Design a mobile daily check-in screen (375x812px) for "tuAliado". The user answers 2–3 quick questions about their day. Each question fills the screen — one at a time, no scrolling needed.

Screen purpose: collect daily signals in under 30 seconds. Big buttons, no typing.

---

STEP 1 — Shown to all users

Layout:
1. Top bar:
   - Step indicator: "1 de 3" — small dots or numbers, centered
   - No back button on step 1

2. Question:
   - "¿Cómo estuvo el día en tu tienda?" — 20px bold, centered, near-black
   - Subtext: "Toca una opción" — 13px, text-muted

3. Three large option buttons (stacked vertically, full width, 72px height each):
   - 😊  "Muy bien" — white card, rounded-2xl, subtle border
   - 😐  "Regular"
   - 😞  "Mal"
   - Emoji: 32px, left-aligned inside card
   - Label: 17px bold, right of emoji
   - On tap: card gets primary orange border + light orange tint, auto-advances to step 2

No "Continuar" button — selection auto-advances.

---

STEP 2 — Shown to all users

Layout:
1. Top bar:
   - Step indicator: "2 de 3"
   - Back arrow (small, top-left)

2. Question:
   - "¿Pediste productos a Tuali hoy?" — 20px bold, centered

3. Three large option buttons:
   - 📱  "Sí, por la app"
   - 🤝  "Sí, con el promotor"
   - —   "No pedí hoy"
   - Same styling as step 1
   - On tap: auto-advances to step 3 (or to completion screen if meta = "como_voy")

---

STEP 3 — Shown only if meta ≠ "como_voy"

Show ONE of these versions based on the user's active goal:

Version A (meta: vender_mas):
   Question: "¿Te pidieron algo que no tenías?"
   Options: ✅ "Sí" / ❌ "No"

Version B (meta: aprovechar_promos):
   Question: "¿Usaste alguna de las promociones hoy?"
   Options: ✅ "Sí" / ❌ "No"

Version C (meta: surtir_tienda):
   Question: "¿Se te acabó algún producto hoy?"
   Options: ✅ "Sí" / ❌ "No"

Layout for step 3:
1. Top bar: "3 de 3", back arrow
2. Question: 20px bold, centered
3. Two large buttons side by side (each ~160px wide, 80px tall):
   - "Sí" — left, with checkmark icon, primary orange fill on selection
   - "No" — right, with X icon, light gray fill on selection
   - On tap: advance to completion screen

---

COMPLETION SCREEN — After last answer

Full screen celebration moment before navigating to /seguimiento.

Layout:
1. Centered vertically:
   - Large flame icon 🔥 — 64px
   - "¡Llevas 4 días seguidos!" — 26px bold, near-black
   - Subtext: "Sigue así, así llegas a tu meta" — 15px, text-muted

2. Streak badges row (horizontal, centered):
   - 3 days: 🥉 icon, gray if not reached, filled if reached
   - 7 days: 🥈 icon
   - 14 days: 🥇 icon
   - 30 days: 🏆 icon
   - Each badge: 48x48px circle, label below ("3 días", "7 días", etc.)

3. Bottom CTA:
   - "Ver mi avance" button — primary orange, full width, 56px, rounded-2xl
   - Navigates to /seguimiento

Design constraints:
- One question per screen — no scrolling, no cramming
- Options must be obvious at a glance — icon + label, no explanation text
- Completion screen must feel rewarding, not clinical
- Streak number is the largest text on the completion screen
- All text in Spanish
- Touch targets minimum 44x44px (72px preferred)
- Warm orange (#F97316) for selected state, secondary green (#059669) for positive indicators
```

## Flujo de preguntas por meta

| Meta | P1 | P2 | P3 |
|---|---|---|---|
| `vender_mas` | ¿Cómo estuvo el día? | ¿Pediste a Tuali? | ¿Te pidieron algo que no tenías? |
| `aprovechar_promos` | ¿Cómo estuvo el día? | ¿Pediste a Tuali? | ¿Usaste alguna promo? |
| `surtir_tienda` | ¿Cómo estuvo el día? | ¿Pediste a Tuali? | ¿Se te acabó algo? |
| `como_voy` | ¿Cómo estuvo el día? | ¿Pediste a Tuali? | *(va directo a racha)* |

## Datos que produce

`EntradaDiaria` guardada en localStorage vía `lib/state.ts`:

| Campo | De qué pregunta | Meta |
|---|---|---|
| `comoEstuvoElDia` | P1 | Todas |
| `hizoPedido` | P2 | Todas |
| `pidioporApp` | P2 | Todas |
| `sePidioAlgoQueNoTenia` | P3 | `vender_mas` |
| `aplicoPromo` | P3 | `aprovechar_promos` |
| `seAcaboAlgoHoy` | P3 | `surtir_tienda` |

`RachaDiaria` actualizada en localStorage después de guardar la entrada.

## Componentes reutilizables

- `OpcionCard` — recibe `icon`, `label`, `selected`, `onSelect` — usado en P1 y P2
- `BinaryChoice` — dos botones Sí/No lado a lado — usado en P3
- `StreakBadge` — recibe `dias`, `alcanzado` — usado en completion screen
