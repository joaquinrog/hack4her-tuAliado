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

3. **⚠️ ABIERTO DE NUEVO (2026-06-06 22:32) — Textos de "oportunidades" del diagnóstico, vueltos a desalinear en sentido contrario**

   El Tech Lead ya había resuelto esto el 2026-06-06 21:40 implementando lo que en
   `docs/handoff-context.md` se etiquetó como **"opción A confirmada"**: cambiar el motor
   (`calcularRecomendaciones` → `calcularDiagnostico`) para que genere
   **"Pides por promotor, no por app"** usando `porcentajePedidosTuali` — alineándolo con el
   texto que el diseño mostraba *en ese momento* y con la métrica de autonomía de canal.

   ⚠️ **Ojo:** lo implementado corresponde, según la definición *literal* de este mismo README,
   a la **"Opción B"** (alinear el motor al diseño) — no a la "Opción A" como quedó etiquetado en
   el handoff. Esa confusión de nombres probablemente llevó al fix de diseño de Isabel
   (commit `69dfd82`, "fix: design/assets/diagnostico error de prompt") a aplicar justo lo que
   este README describía como "Opción A": cambió `assets/diagnostico/code.html` de
   *"Pides por promotor, no por app"* → **"No usas el pedido sugerido todavía"**.

   Resultado: **diseño y motor vuelven a estar desalineados, ahora en sentido inverso**:
   - Motor genera (`lib/recommendation-engine.ts:50`): "Pides por promotor, no por app"
   - Diseño muestra (post-fix de Isabel): "No usas el pedido sugerido todavía"

   - **Pendiente real:** confirmar con el Tech Lead/Isabel cuál de los dos textos se queda —
     y corregir solo ese lado. Importante: el motor ya tiene una "Recomendación B" para
     "Vender más" (`rec-pide-por-app`, "Pide por la app esta semana") construida sobre el mismo
     criterio de `porcentajePedidosTuali` / autonomía de canal (ver punto 4) — revertir el motor
     a "No usas el pedido sugerido todavía" dejaría esa recomendación sin el diagnóstico que la
     respalda. Lo más coherente sería que el fix de diseño se revierta a "Pides por promotor,
     no por app", pero **es una decisión de producto, no técnica — no resolver por cuenta propia**.
   - Detalle completo y diffs exactos en `docs/handoff-context.md`
     (sección "⚠️ Pull de fix de diseño — reabre la contradicción #3 en sentido contrario").

4. **✅ Resuelto en T1.4 (2026-06-06 23:10) — Recomendación B para "Vender más"**
   - Se implementó "Pide por la app esta semana" (`rec-pide-por-app`, tipo `pedido_sugerido`)
     para `meta === "vender_mas"` cuando `porcentajePedidosTuali < 50` — alineado con autonomía
     de canal y con el copy del diseño `tualiado_recomendaciones_v2/code.html`.
   - **Nota:** esta recomendación depende del mismo criterio (`porcentajePedidosTuali`) que el
     punto 3 de arriba — si se decide revertir el motor del diagnóstico, esta recomendación
     seguiría siendo válida y coherente (no hay que tocarla).

5. **EN PROGRESO - Capitalización de marca — "TuAliado" vs "tuAliado"**
   - Archivo a corregir: `assets/brand identity/wordmark.svg`
   - Cambio: el `<tspan>` con texto "TuAli" + "ado" renderiza "TuAliado" (A mayúscula). Debe decir **"tuAliado"** (t minúscula) para coincidir con `docs/decisions.md` y `CLAUDE.md`.
   - Estado: ya lo están trabajando; no duplicar el cambio desde ingeniería.

6. **EN PROGRESO - Bottom nav bar en inglés (Progress / Check-in / Insights / Profile)**
   - Archivos a corregir: `assets/registro/tualiado_check_in_paso_2/code.html` y `.../tualiado_check_in_paso_3/code.html`
   - Cambio: quitar la barra de navegación inferior por tabs (no existe en el flujo lineal confirmado
     Diagnóstico → Meta → Recomendación → Acción → Seguimiento, ni en las rutas creadas:
     `/onboarding`, `/diagnostico`, `/recomendaciones`, `/registro`, `/seguimiento`).
     Si se necesita navegación, debe ser en español y coincidir con rutas reales.
   - Estado: ya lo están trabajando; no copiar ese bottom nav al frontend mientras se corrige.
