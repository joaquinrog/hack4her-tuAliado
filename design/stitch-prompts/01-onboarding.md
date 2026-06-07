# Onboarding — `app/onboarding/page.tsx`

## Contexto

El usuario elige su meta de crecimiento. Una sola pregunta, 4 opciones con ícono grande. La meta elegida se guarda en URL params y determina todo lo que sigue.

## Prompt para Google Stitch

```
Design a mobile onboarding screen (375x812px) for "TuAliado". The user must pick ONE growth goal.

Screen purpose: let the user choose their main goal. One question, four big visual options.

Layout (top to bottom):
1. Header (no back button on first screen):
   - Progress indicator: "1 de 1" or a single dot/step indicator at top
   - Title: "¿Qué quieres lograr?" — 22px bold, near-black, centered
   - Subtitle: "Elige tu meta principal" — 14px, text-muted, centered
2. Goal grid — 2x2 grid of large tap targets, each card:
   - Size: ~160x160px per card (full bleed with gap)
   - Icon: large (48px), centered at top of card
   - Label: 2 lines max, bold, 16px, centered below icon
   - Subtle border, white background, rounded-2xl
   - On selection: primary orange border + light orange background tint

The 4 goals (icon + label):
   A. Shopping bag + upward arrow → "Vender más"
   B. Price tag with % → "Aprovechar las promociones"
   C. Box with checkmark → "Surtir mejor mi tienda"
   D. Bar chart → "Saber cómo me está yendo"

3. Bottom CTA:
   - "Continuar" button — disabled (gray) until one goal is selected, then primary orange
   - 56px height, full width, rounded-2xl

Design constraints:
- No text paragraphs — icon + label only on each card
- Cards must be large enough for a finger tap (min 44x44, ideally 160x160)
- Selected state must be clearly visible without hover states (mobile only)
- Language: Spanish
- Warm, not intimidating
```

## Estado de la pantalla

| Estado | Descripción |
|---|---|
| Sin selección | 4 cards iguales, botón "Continuar" gris/deshabilitado |
| Meta seleccionada | Card seleccionada con borde naranja, botón activo |

## Datos que produce

`?meta=vender_mas` | `aprovechar_promos` | `surtir_tienda` | `como_voy`
