# Arquitectura — Decisión confirmada

> Arquitectura definida. Actualizar `docs/decisions.md` si algo cambia.

---

## Decisión: Opción A — Next.js full-stack con datos mock

**Confirmado.** No habrá dataset real de Tuali. Los únicos datos disponibles son los que ya están en `01-contexto-reto-tuali.md`: protopersonas, journeys, contexto de promociones, loyalty y pedido sugerido.

### Stack seleccionado

| Capa | Tecnología | Razón |
|---|---|---|
| Framework | Next.js (App Router) + TypeScript | Un solo repo, un solo proceso, deploy simple |
| Estilos | Tailwind CSS | Predecible, utility-first, fácil de corregir por AI |
| Datos | Módulos TypeScript mock | Coherentes, trazables, sin base de datos |
| Motor de recomendaciones | Funciones puras TypeScript | Determinístico, sin dependencia de LLM |
| Capa de explicación | Gemini API (API Key disponible) | Solo traduce recomendaciones a lenguaje natural |
| Deploy | Vercel | Más rápido durante hackathon |

### Por qué no Opción B (FastAPI + backend)

No llega dataset real. Un backend separado solo agrega complejidad sin beneficio. Todo lo que necesitamos vive en el frontend + funciones puras.

---

## Constraint de plataforma: Mobile únicamente

El MVP es **mobile-only**. Los usuarios no tienen acceso a computadora.

- Viewport objetivo: 375px – 430px (iPhone SE a iPhone 14 Pro)
- Sin layout de desktop. No hay breakpoints `lg:` o `xl:` en Tailwind.
- Touch-friendly: botones grandes, tap targets mínimo 44x44px.
- Sin hover-only interactions.
- Navegación simple: máximo una barra inferior o un menú sencillo.

---

## Principio de UX: Visuales sobre texto

Confirmado en contexto del hackathon: **cuesta mucho a las personas leer**. Los visuales ayudan más que el texto.

Implicaciones de diseño:
- Preferir iconos, barras de progreso, colores y números grandes sobre párrafos.
- Una pantalla = una idea principal.
- Si una recomendación se puede mostrar como tarjeta visual en lugar de texto, hacerlo así.
- El texto que sí aparece debe ser corto, directo y en lenguaje simple (pensar en Raúl).
- Números relevantes deben ser el elemento más visible de la pantalla, no estar enterrados en texto.

---

## Capa de explicación LLM (Gemini)

El LLM no toma decisiones. Solo recibe una recomendación ya calculada y la convierte en 1–2 oraciones en lenguaje natural adaptado al perfil del cliente.

Si Gemini no responde (timeout, error), el motor determinístico sigue funcionando — se muestra la recomendación con texto de fallback predefinido.

---

## Estructura de archivos esperada (por confirmar al inicializar)

```
/app
  /page.tsx              ← splash / entrada principal
  /onboarding/           ← elegir meta (absorbe el paso "meta")
  /diagnostico/
  /recomendaciones/
  /registro/             ← entrada diaria
  /seguimiento/
/lib
  /types.ts              ← contratos TypeScript
  /mock-data.ts          ← datos simulados con origen documentado
  /recommendation-engine.ts  ← lógica determinística
  /gemini.ts             ← capa de explicación LLM
  /state.ts              ← URL params + localStorage helpers
/components
  /ui/                   ← componentes simples reutilizables
```

---

## Próximos pasos de engineering

1. Aprobar estructura de carpetas con el Tech Lead.
2. Definir esquema de datos mock basado en protopersonas.
3. Definir reglas base del motor de recomendaciones.
4. Inicializar proyecto.
