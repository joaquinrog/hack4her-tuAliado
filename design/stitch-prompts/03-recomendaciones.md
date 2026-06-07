# Recomendaciones — `app/recomendaciones/page.tsx`

## Contexto

3 tarjetas de recomendación, ordenadas por nivel de riesgo (A=bajo, B=medio, C=alto). Cada tarjeta muestra: ícono de riesgo, título, descripción corta (texto Gemini), beneficio estimado y un CTA. La tarjeta A tiene el CTA principal. Incluye modal de precio de venta para calcular ganancia.

## Prompt para Google Stitch — Vista de tarjetas

```
Design a mobile recommendations screen (375x812px) for "TuAliado". Shows 3 recommendation cards ordered by risk level.

Screen purpose: present 3 concrete actions the user can take, each with risk level and estimated benefit.

Layout (top to bottom):

1. Header:
   - Back arrow
   - Title: "Tus recomendaciones" — 20px bold
   - Meta context chip: small pill showing selected goal, e.g., "Meta: Vender más" with the goal icon (one of: Vender más / Aprovechar las promociones / Surtir mejor mi tienda / Saber cómo me está yendo)

2. Three recommendation cards (stacked vertically, each card):

   Card A — Low risk (recommended):
   - Top accent bar: green (4px height, full width, rounded top)
   - Risk badge: "🟢 Bajo riesgo" — small pill, secondary-light background
   - Title: "Activa la promo de Coca-Cola 600ml" — 16px bold
   - Description: 2-line Gemini text — 14px, text-muted, e.g., "Esta promo tiene 10% de descuento y tus clientes ya la piden seguido. Es la más segura para empezar."
   - Benefit row: "💰 Ganarías ~$X más por pedido" — 14px, secondary green, bold value
   - CTA button: "Activar esta promo" — primary orange, full width, 48px

   Card B — Medium risk:
   - Top accent bar: yellow/amber
   - Risk badge: "🟡 Riesgo medio"
   - Title: "Pide por la app esta semana"
   - Description: 2-line Gemini text
   - Benefit row: estimated benefit or loyalty points gain
   - CTA: secondary style (outlined), "Ver cómo hacerlo"

   Card C — High risk / high reward:
   - Top accent bar: orange
   - Risk badge: "🟠 Mayor ganancia"
   - Title: "Activa el reto de loyalty"
   - Description: 2-line Gemini text
   - Benefit row: points or percentage gain
   - CTA: text link style, "Ver detalles"

3. Bottom spacing for chatbot FAB

Design constraints:
- Card A is visually dominant — larger CTA, green accent
- Each card is self-contained — icon, text, benefit, action
- Benefit numbers are bold and in secondary green
- No more than 2 lines of text per card description
- No horizontal scrolling — all cards visible by vertical scroll
- All text in Spanish
```

## Prompt para el Modal — Precio de venta (F6)

```
Design a mobile bottom sheet modal (375px wide) for "TuAliado". The user is asked for their sale price to calculate estimated earnings.

Trigger: user taps "Activar esta promo" on a recommendation card

Layout:
1. Drag handle at top (standard bottom sheet indicator)
2. Title: "¿En cuánto vendes este producto?" — 18px bold
3. Product context chip: product name + current Tuali price, e.g., "Coca-Cola 600ml · $15.50 en Tuali"
4. Input field:
   - Label: "Tu precio de venta"
   - Large number input with "$" prefix, 24px font
   - Placeholder: "ej. 20"
   - Numeric keyboard on mobile
5. Estimated earnings (appears after input, real-time):
   - "Con ese precio ganarías:" label
   - Large number: "$4.50 por unidad" in secondary green, 28px bold
6. Privacy note: "Solo se usa para calcular tu ganancia. No se guarda." — 12px, text-muted
7. CTA: "Ver mi ganancia estimada" — primary orange, full width, 56px
8. Skip link: "Calcular después" — text link, centered, text-muted

Design constraints:
- Modal covers ~60% of screen height
- Background dimmed behind modal
- Input must be large enough to type numbers comfortably
- Estimated result updates as user types (show loading state briefly)
```

## Niveles de riesgo

| Nivel | Color | Ícono | Descripción |
|---|---|---|---|
| Bajo | Verde `#059669` | 🟢 | Acción segura, ganancia moderada |
| Medio | Ámbar `#D97706` | 🟡 | Requiere algo de esfuerzo, más ganancia |
| Alto / Mayor ganancia | Naranja `#EA580C` | 🟠 | Más cambio necesario, mayor potencial |
