# Design — tuAliado

Recursos de diseño del producto.

## Estructura

```
design/
  stitch-prompts/   ← prompts para generar pantallas en Google Stitch
  assets/           ← outputs generados (logo, paleta, pantallas)
```

## Flujo de trabajo

1. Usar los prompts de `stitch-prompts/` en Google Stitch para generar los diseños.
2. Exportar los outputs a `assets/` (SVG para logo, PNG para pantallas).
3. Usar los tokens de color de `assets/palette.png` en `tailwind.config.ts`.

## Pantallas documentadas

| Archivo | Pantalla |
|---|---|
| `brand-identity.md` | Identidad de marca global |
| `00-splash.md` | Splash screen |
| `01-onboarding.md` | Elegir meta |
| `02-diagnostico.md` | Diagnóstico del negocio |
| `03-recomendaciones.md` | Recomendaciones (3 tarjetas) |
| `04-seguimiento.md` | Seguimiento y progreso |
| `05-chatbot.md` | Botón flotante + chat |
| `06-registro.md` | Registro diario (stepper 2-3 preguntas + racha) |
