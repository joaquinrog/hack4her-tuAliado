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
| `07-chat-de-voz.md` | Chat de voz (modo voz dentro del chatbot) |

## Correcciones

Al revisar los assets exportados de Stitch (`assets/`) contra el código y los docs confirmados
(`lib/types.ts`, `lib/mock-data.ts`, `docs/decisions.md`), se encontraron 6 contradicciones.
Detalle completo en `docs/handoff-context.md` (sección "Contradicciones encontradas", 2026-06-06 20:11).
Antes de implementar las pantallas de FASE 1 hay que resolver estas correcciones:

1. **Precio incoherente — Coca-Cola 600ml**
   - Archivo a corregir: `assets/recomendaciones/tualiado_calculador_de_ganancia_v3/code.html`
   - Cambio: el diseño muestra "$15.50 en Tuali"; debe decir **"$11.50"** para coincidir con `lib/mock-data.ts` (`p-001 → precioCosto: 11.5`), única fuente de verdad para precios.

2. **Falta el badge/campo de nivel de riesgo**
   - Archivos involucrados (no son de diseño, son de código — agregar el campo antes de alinear el diseño):
     - `lib/types.ts` → agregar `nivelRiesgo: "bajo" | "medio" | "alto"` a la interfaz `Recomendacion`
     - `lib/recommendation-engine.ts` → `calcularRecomendaciones` debe asignar ese nivel
   - El diseño (`assets/recomendaciones/tualiado_recomendaciones_v2/code.html`) ya muestra los 3 badges 🟢/🟡/🟠 — una vez agregado el campo, no requiere cambio en el HTML.

3. **Textos de "oportunidades" del diagnóstico no coinciden con el motor**
   - Archivo a corregir (elegir una opción):
     - Opción A — alinear el diseño al motor: `assets/diagnostico/code.html`, cambiar
       *"Pides por promotor, no por app"* → **"No usas el pedido sugerido todavía"**
     - Opción B — alinear el motor al diseño: `lib/recommendation-engine.ts` → `calcularDiagnostico`, cambiar el texto de la 2ª oportunidad a **"Pides por promotor, no por app"** (requiere lógica nueva basada en `porcentajePedidosTuali`)
   - Pendiente decidir cuál opción con el Tech Lead — ver `docs/decisions.md`.

4. **Recomendación B para "Vender más" no coincide**
   - Mismo origen que el punto 3 (autonomía de canal vs. pedido sugerido). Archivos:
     - `assets/recomendaciones/tualiado_recomendaciones_v2/code.html` (texto "Pide por la app esta semana")
     - `lib/recommendation-engine.ts` (genera "Activa el pedido sugerido")
   - Resolver junto con el punto 3 — son la misma decisión de producto.

5. **Capitalización de marca — "TuAliado" vs "tuAliado"**
   - Archivo a corregir: `assets/brand identity/wordmark.svg`
   - Cambio: el `<tspan>` con texto "TuAli" + "ado" renderiza "TuAliado" (A mayúscula). Debe decir **"tuAliado"** (t minúscula) para coincidir con `docs/decisions.md` y `CLAUDE.md`.

6. **Bottom nav bar en inglés (Progress / Check-in / Insights / Profile)**
   - Archivos a corregir: `assets/registro/tualiado_check_in_paso_2/code.html` y `.../tualiado_check_in_paso_3/code.html`
   - Cambio: quitar la barra de navegación inferior por tabs (no existe en el flujo lineal confirmado
     Diagnóstico → Meta → Recomendación → Acción → Seguimiento, ni en las rutas creadas:
     `/onboarding`, `/diagnostico`, `/recomendaciones`, `/registro`, `/seguimiento`).
     Si se necesita navegación, debe ser en español y coincidir con rutas reales.
