# Brand Identity — tuAliado

## Prompt para Google Stitch

```
Design a brand identity for "tuAliado", a mobile growth advisor app for small business owners in Mexico. The app lives inside Tuali, a B2B delivery marketplace for tiendas de abarrotes.

Product personality:
- A trusted ally, not a boss or a consultant
- Warm, simple, encouraging — not corporate
- Speaks clearly to someone with low digital literacy (think: 60+ year old tienda owner)
- Celebrates small wins, never shames mistakes

Target user: Raúl, 63, tienda de abarrotes owner, low-tech confidence, relies on his Tuali promotor

Brand name: tuAliado (Spanish for "your ally" — note lowercase "tu")

Visual identity to generate:
1. Logo mark — a simple icon suggesting growth + partnership. Ideas: two upward arrows intertwined, a handshake with an upward trend, a small sprout with a bar chart. Keep it geometric and bold, readable at 24x24px.
2. Wordmark — "tuAliado" in a rounded, approachable sans-serif. Lowercase "tu" in regular weight, uppercase "A" and rest in bold. 
3. Color palette — 4 colors:
   - Primary: a warm, energetic orange (#F97316 range) — action, growth, warmth
   - Secondary: a trustworthy blue (#2563EB range) — information, trust, progress
   - Background: off-white or warm white (#FAFAF9) — clean, not clinical
   - Text: near-black (#1C1917) — readable at 16px+
4. Typography — one rounded sans-serif (e.g., Nunito, Poppins, or Plus Jakarta Sans). Bold for numbers and key data, regular for body.
5. Icon set — 4 icons representing the main goals a user can pick:
   - "Vender más" (sell more): shopping bag with upward arrow
   - "Aprovechar las promociones" (use promotions): tag with percentage
   - "Surtir mejor mi tienda" (restock well): box or crate with a checkmark
   - "Saber cómo me está yendo" (see my progress): bar chart with upward trend

Style: flat design, no gradients, no shadows. Bold shapes. Accessible contrast (WCAG AA minimum).
Mobile context: all elements must work on a 375px wide screen.
```

## Tokens de color esperados

Una vez generada la identidad, extraer estos tokens y agregarlos a `tailwind.config.ts`:

| Token | Uso | Hex esperado |
|---|---|---|
| `primary` | CTAs, botones principales | ~`#F97316` |
| `primary-dark` | Pressed state | ~`#EA580C` |
| `secondary` | Datos informativos, progreso, trust | ~`#2563EB` |
| `secondary-light` | Fondo de badges informativos | ~`#DBEAFE` |
| `bg` | Fondo de pantalla | ~`#FAFAF9` |
| `surface` | Tarjetas, modales | `#FFFFFF` |
| `text` | Texto principal | ~`#1C1917` |
| `text-muted` | Texto secundario, labels | ~`#78716C` |
| `border` | Bordes de tarjetas | ~`#E7E5E4` |

## Assets a exportar

- `assets/logo-mark.svg` — ícono solo, 24x24 y 48x48
- `assets/wordmark.svg` — nombre completo
- `assets/logo-full.svg` — ícono + nombre
- `assets/palette.png` — swatches de color con hex
- `assets/icons/` — los 4 íconos de metas
