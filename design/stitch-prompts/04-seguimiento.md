# Seguimiento — `app/seguimiento/page.tsx`

## Contexto

Muestra al usuario su avance hacia la meta. Componentes clave: barra de progreso animada del ticket actual vs objetivo, % canal app vs promotor, puntos esta semana vs anterior, y la próxima acción recomendada.

## Prompt para Google Stitch

```
Design a mobile progress tracking screen (375x812px) for "tuAliado". Shows the user's progress toward their chosen goal.

Screen purpose: visual progress at a glance — one dominant metric, supporting stats, next action.

Layout (top to bottom):

1. Header:
   - Back arrow
   - Title: "Tu avance" — 20px bold
   - Subtitle showing active goal: "Meta: Vender más" with goal icon (adapts to selected goal — one of the 4 confirmed goals)

2. Hero progress card:
   - Section label: "Ticket promedio" — 14px, text-muted
   - Current value: "$450" — 48px, extra-bold, primary orange
   - Target value context: "Meta: $540" — 14px, text-muted
   - Animated progress bar:
     - Height: 16px, rounded-full
     - Fill: primary orange (83% filled for this example — $450/$540)
     - Background: light gray
     - Percentage label below: "83% del objetivo"
   - White card container, rounded-2xl, subtle shadow

3. Channel split card:
   - Title: "Cómo pediste esta semana" — 14px bold
   - Two horizontal bars side by side or stacked:
     - "App Tuali: 20%" — secondary green fill
     - "Promotor: 80%" — light gray fill
   - Small improvement indicator if there was change vs last week: "+2% por app ↑"

4. Loyalty points card:
   - Icon: star
   - "Esta semana" label
   - Points value: "45 pts" — 28px bold, secondary green
   - Comparison: "vs 30 pts la semana pasada ↑" — 13px, positive green

5. Next action card:
   - Label: "Tu próxima acción" — 14px bold, primary orange
   - Action text: "Activa la promo de Coca-Cola en tu próximo pedido" — 15px, near-black
   - CTA button: "Ver recomendaciones" — outlined primary, 48px

Design constraints:
- Progress bar is the dominant visual — make it large and satisfying
- Numbers are the heroes — big, bold, colored
- Positive changes shown in secondary green with upward arrow
- No tables, no lists with more than 3 items
- One primary CTA at the bottom
- All text in Spanish
- Scroll allowed but hero content visible without scrolling on 375px
```

## Componentes reutilizables

- `ProgressBar` — recibe `current`, `target`, `label`, color
- Stat pill — recibe `icon`, `label`, `value`, `delta` (cambio vs semana anterior)

## Datos del mock (Raúl, semana actual simulada)

| Dato | Valor | Origen |
|---|---|---|
| Ticket actual | $450 MXN | TUALI |
| Meta de ticket | $540 MXN | ESTIMACION (20% arriba del actual) |
| Progreso | 83% | Cálculo |
| Canal app | 20% | TUALI |
| Canal promotor | 80% | TUALI |
| Puntos esta semana | 45 pts | TUALI |
| Puntos semana anterior | 30 pts | TUALI |
