# Splash Screen — `app/page.tsx`

## Contexto

Primera pantalla que ve el usuario. El objetivo es comunicar en 2 segundos qué es tuAliado y invitarlo a empezar.

## Prompt para Google Stitch

```
Design a mobile splash screen (375x812px) for "tuAliado", a business growth advisor inside the Tuali app.

Screen purpose: first impression — communicate the product value and invite action.

Layout (top to bottom):
1. Top 60% — centered hero area:
   - tuAliado logo (icon + wordmark), large, centered
   - Tagline below the logo: "Tu asesor de crecimiento" in 18px, text-muted color, centered
   - Optional: a very simple illustration of a tienda with an upward arrow, warm and friendly style
2. Bottom 40% — action area:
   - One large primary CTA button: "Empezar" — full width, 56px height, primary orange, rounded-2xl
   - Small text below the button: "Para clientes Tuali" in 12px, text-muted, centered

Design constraints:
- Background: warm white (#FAFAF9)
- No navigation bar, no header
- No dense text, no feature lists
- The logo should be the dominant visual element
- Button must be at least 56px tall (accessible tap target)
- All text in Spanish
- Warm, welcoming, not intimidating for a 63-year-old first-time user
```

## Componentes clave

- Logo mark (grande, centrado) — ~80px
- Tagline — 1 línea, texto simple
- Botón "Empezar" — CTA primario único
