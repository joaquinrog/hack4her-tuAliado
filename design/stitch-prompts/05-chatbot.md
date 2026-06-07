# Chatbot — `components/ChatbotButton.tsx` + bottom sheet

## Contexto

El chatbot es apoyo, no el centro del producto. Aparece como botón flotante en todas las pantallas. Al tocarlo, abre un bottom sheet con historial de conversación, input de texto y botón de envío. Conectado a Gemini Flash via `/api/chat`.

## Prompt para Google Stitch — Botón flotante (FAB)

```
Design a mobile floating action button (FAB) for a chat assistant in "TuAliado".

Position: fixed, bottom-right corner, 24px from bottom, 24px from right edge.
Size: 56x56px circle.
Icon: chat bubble with a small sparkle or "AI" indicator — friendly, not robotic.
Color: primary orange background, white icon.
Shadow: soft shadow to float above content.
Accessibility: visible on white and on card backgrounds.

State variants:
- Default: orange circle with chat icon
- Unread indicator: small red dot badge at top-right of the circle (for simulated proactive messages)
```

## Prompt para Google Stitch — Bottom sheet de chat

```
Design a mobile chat bottom sheet (375px wide) for "TuAliado"'s AI assistant named "TuAliado".

Trigger: user taps the FAB button

Height: 75% of screen height, slides up from bottom.

Layout (top to bottom):

1. Handle + header:
   - Drag handle at very top (centered pill, 40x4px, gray)
   - Assistant name: "TuAliado" — 16px bold, with small sparkle icon left
   - Close button (X) — top right, 44x44px tap target

2. Message history area (scrollable):
   - Assistant bubble (left-aligned):
     - White bubble, rounded-2xl (less rounded on top-left)
     - Subtle border or light gray background
     - Text: 15px, near-black
     - Timestamp: 11px, text-muted, below bubble
   - User bubble (right-aligned):
     - Primary orange bubble, white text
     - Rounded-2xl (less rounded on top-right)

   First message from assistant (always shown):
   "Hola, soy TuAliado 👋 ¿Tienes dudas sobre alguna de tus recomendaciones?"

3. Quick reply chips (contextual, above input):
   - 3 horizontal chips: "¿Qué es esta promo?", "¿Cómo activo los retos?", "Explícame más simple"
   - Small pill buttons, outlined primary, scrollable horizontally

4. Input bar (sticky at bottom):
   - Text input: placeholder "Escríbeme algo…", 16px, rounded-full
   - Send button: primary orange circle, arrow-up icon, 44x44px
   - Keyboard safe area respected

Design constraints:
- Chat bubbles max width: 80% of screen
- Input bar never obscured by keyboard (use padding/safe area)
- Quick replies disappear after user types
- Loading state: animated typing dots in assistant bubble while waiting for Gemini
- All text in Spanish
- Tone of assistant: warm, simple, like explaining to a friend — not technical
```

## Comportamiento

| Acción | Resultado |
|---|---|
| Tap FAB | Bottom sheet se abre con scroll al mensaje más reciente |
| Enviar mensaje | Muestra typing indicator, luego respuesta de Gemini |
| Tap quick reply | Se envía el chip como mensaje del usuario |
| Swipe down / tap X | Bottom sheet se cierra |

## Contexto que se pasa a Gemini

El chat recibe contexto del cliente (meta actual, pantalla activa, recomendación activa) para que las respuestas sean relevantes.
