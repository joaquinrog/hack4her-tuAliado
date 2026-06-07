# Chat de voz — modo voz dentro de `components/ChatbotButton.tsx`

## Contexto

El chat de voz es el **diferenciador clave** del MVP (decisión confirmada 2026-06-06, ver `docs/mvp-current-direction.md`). Raúl no quiere leer — la voz reduce la fricción al mínimo. Funciona sobre el mismo bottom sheet y backend `/api/chat` (Web Speech API para STT/TTS).

Esta pantalla **no debe verse como un walkie-talkie ni como un asistente genérico tipo Alexa/Siri**. Es la "cherry on top" del producto: debe sentirse cálida, simple y parte de la identidad de tuAliado — no un widget técnico pegado encima.

## Prompt para Google Stitch — Vista de voz dentro del bottom sheet

```
Design a mobile voice-conversation view (375px wide) for "tuAliado"'s AI assistant, shown when the user switches from text to voice mode inside the existing chat bottom sheet.

Product personality: warm trusted ally, not a generic voice assistant. Avoid any visual cliché of Alexa/Siri/walkie-talkie (no glowing orbs floating in dark space, no radio-style push-to-talk icon, no robotic waveform on black background).

Layout (top to bottom):

1. Header (reuse from text mode):
   - Drag handle, "tuAliado" name with sparkle icon, close button (X)
   - Small toggle/pill to switch back to text mode — "Escribir en su lugar", top-right under header, subtle and secondary

2. Center stage — the main visual focus (60% of sheet height):
   - A friendly, rounded character/icon mark based on the tuAliado brand mark (growth + partnership symbol), sitting on a soft warm-white circle/blob background
   - Around it, a gentle animated ring made of soft rounded bars (like a calm equalizer made of pill shapes, in primary orange and secondary blue) that pulse outward only while tuAliado is speaking — subtle, organic motion, not sharp or robotic
   - This replaces any literal microphone iconography as the "listening" indicator

3. Live caption area (always visible, this is the core UX decision):
   - Large, simple text (18-20px, near-black, centered, max 2 lines) showing a live transcript of what's being said — both the user's spoken words and tuAliado's spoken reply, one at a time
   - This keeps the experience accessible even with sound off, and reassures low-confidence users that they were understood
   - Small label above the caption indicating who's "talking": "Tú dijiste" / "tuAliado dice" — 12px, text-muted

4. Status states (shown as soft pill badges + caption text changes, not separate screens):
   - Idle / ready: soft blue pill "Toca para hablar"
   - Listening: warm orange pill "Te escucho…" + gentle pulsing rings
   - Thinking: pill with animated dots "Pensando…"
   - Speaking: pill "tuAliado te responde" + the equalizer rings active

5. Primary action — large rounded button (not a circular mic icon):
   - Pill-shaped button, full width minus margins, 56px tall, rounded-full
   - Label changes with state: "Toca para hablar" → "Toca para terminar"
   - Icon inside button is a simple sound-wave glyph (small rounded bars), not a microphone silhouette
   - Primary orange background, white text and icon, soft shadow

6. Quick exit / fallback:
   - Small text link below the button: "¿Prefieres escribir?" → switches back to text mode instantly, no confirmation dialog

Design constraints:
- All text in Spanish, large and simple (16px minimum), warm and encouraging tone
- No dark backgrounds, no neon colors, no glowing/floating effects — stay within the tuAliado palette (warm white background, primary orange #F97316, secondary blue #2563EB, near-black text #1C1917)
- Animations should feel organic and calm (breathing/pulsing), never urgent or robotic
- Respect mobile safe areas; button always reachable with thumb (bottom third of screen)
- Tap targets minimum 44x44px
- One primary action visible at a time — no competing CTAs
```

## Estados a documentar como variantes en Stitch

| Estado | Pill / texto | Visual central |
|---|---|---|
| Idle | "Toca para hablar" (azul) | Marca tuAliado en reposo |
| Escuchando | "Te escucho…" (naranja) | Anillos pulsando suave |
| Pensando | "Pensando…" + puntos animados | Marca con leve respiración |
| Respondiendo | "tuAliado te responde" | Anillos activos + caption con respuesta |

## Comportamiento

| Acción | Resultado |
|---|---|
| Tap toggle "Escribir en su lugar" | Vuelve a vista de texto, conserva historial |
| Tap botón principal (idle) | Empieza a escuchar, cambia a estado "Escuchando" |
| Tap botón principal (escuchando) | Termina de escuchar, pasa a "Pensando" → respuesta hablada |
| Sin soporte de voz en el navegador | No se muestra esta vista; el chat abre directo en modo texto |

## Nota de implementación (no es parte del prompt de Stitch)

Esta vista vive **dentro** del mismo bottom sheet de `05-chatbot.md`, como un modo alterno — no es una pantalla nueva ni una ruta nueva. El export debe pensarse como un estado adicional del componente `ChatbotButton`, reutilizando el header y la estructura del sheet ya diseñados.
