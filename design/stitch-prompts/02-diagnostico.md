# Diagnóstico — `app/diagnostico/page.tsx`

## Contexto

Muestra al usuario el estado actual de su negocio basado en datos de Tuali. El número más importante es el ticket promedio. Luego, las 3 oportunidades detectadas que llevan al CTA.

Datos del mock de Raúl: ticket promedio ~$450 MXN, canal 80% promotor / 20% app, loyalty 180 puntos sin activar retos, 3 oportunidades detectadas.

## Prompt para Google Stitch

```
Design a mobile diagnostic screen (375x812px) for "TuAliado". This screen shows the user's current business performance inside Tuali.

Screen purpose: show 3-4 key metrics visually, then present 3 detected opportunities and a CTA.

Layout (top to bottom):

1. Header:
   - Back arrow (top left)
   - Title: "Tu diagnóstico" — 20px bold
   - Subtitle: "Basado en tus últimos 90 días" — 13px, text-muted

2. Hero metric — the most important number:
   - Label: "Ticket promedio" — 14px, text-muted, centered
   - Value: "$450" — 56px, extra-bold, primary orange, centered
   - Unit: "por pedido" — 13px, text-muted
   - Subtle card container, rounded-2xl, white background

3. Two stat pills side by side:
   Left pill:
   - Icon: phone
   - Label: "Por app"
   - Value: "20%"
   Right pill:
   - Icon: person (promotor)
   - Label: "Por promotor"
   - Value: "80%"
   Style: small cards, secondary color for the metric value, muted background

4. Loyalty badge:
   - Icon: star or trophy
   - "180 puntos" in bold secondary green
   - "Gana con Tuali" label
   - Horizontal pill layout, secondary-light background

5. Opportunities section:
   - Section label: "3 oportunidades detectadas" — 14px bold
   - 3 opportunity rows, each with:
     - Color dot (green for low risk, yellow for medium, orange for high)
     - Short text: "No usas las promociones activas" / "Pides por promotor, no por app" / "Retos de loyalty sin activar"
     - Chevron right arrow

6. Primary CTA at bottom (sticky):
   - Button: "Ver mis recomendaciones" — primary orange, full width, 56px, rounded-2xl

Design constraints:
- Numbers are the heroes — make them huge and bold
- No paragraphs of text
- Max 5 distinct visual elements on screen (hero metric, 2 pills, loyalty, opportunities list)
- Color coding: green = good/opportunity, orange = primary action
- All text in Spanish
```

## Datos del mock (Raúl)

| Dato | Valor | Origen |
|---|---|---|
| Ticket promedio | $450 MXN | TUALI |
| Canal app | 20% | TUALI |
| Canal promotor | 80% | TUALI |
| Puntos loyalty | 180 | TUALI |
| Oportunidades | 3 | Motor determinístico |
