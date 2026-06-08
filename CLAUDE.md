# CLAUDE.md — Contexto operativo para Claude Code

## Proyecto

**tuAliado** — sistema de acompañamiento que convierte metas de negocio en acciones concretas y medibles para dueños de tienda. Ver `README.md` para el contexto de producto completo.

## Prioridad del contexto

Antes de implementar algo no trivial, leer:

1. `docs/mvp-current-direction.md` — dirección del MVP y flujo del producto.
2. `docs/decisions.md` — decisiones de producto y arquitectura confirmadas.

Si el código y estos docs entran en conflicto, preguntar antes de resolver por cuenta propia.

## Modo de trabajo

- Separar claramente lo que está confirmado de lo que es una suposición.
- No construir más de lo que la tarea pide.
- No inventar datasets ni funcionalidades que no estén documentadas.

## Reglas de producto

- Usuario prioritario: dueño de tienda con baja habilidad digital — diseñar para el caso más difícil primero.
- Métrica principal: ticket promedio. Métrica secundaria: autonomía del cliente dentro de la app.
- El chatbot es apoyo, no el centro del producto: explica recomendaciones, no las decide.
- Regla no negociable: cero incoherencia entre los datos mostrados (separar siempre datos reales, mock y estimaciones, con origen anotado).

## Reglas de frontend

### Plataforma: mobile-first (375px – 430px)

- Sin layouts de desktop ni breakpoints `lg:`/`xl:`/`2xl:` en Tailwind.
- Tap targets mínimo 44x44px, sin interacciones hover-only, fuentes mínimo 16px.

### Visuales sobre texto

- Preferir iconos, barras de progreso, colores y números grandes sobre párrafos.
- Una pantalla = una idea principal + una acción.
- Texto corto y en lenguaje simple.

### Simplicidad de componentes

- Un componente = una responsabilidad. Si hace dos cosas, dividirlo.
- Máximo ~80 líneas por componente; máximo 3–4 niveles de JSX anidado.
- Tailwind exclusivamente para estilos — sin CSS modules ni estilos inline.
- Props: más de 4 o props complejas (objetos anidados) → revisar la abstracción.
- Sin lógica de negocio en componentes de UI — la lógica vive en `/lib`.

## Reglas técnicas

- Pedir aprobación antes de cambios mayores de arquitectura.
- Preferir tareas acotadas con límites de archivo claros.
- La lógica de negocio vive en `/lib`, no en componentes.
- Los datos mock deben documentar su fuente (origen anotado en `lib/types.ts`: `TUALI` / `CLIENTE` / `ESTIMACION`).

## Stack confirmado

- **Framework:** Next.js (App Router) + TypeScript
- **Estilos:** Tailwind CSS
- **Datos:** Módulos TypeScript mock en `/lib/mock-data.ts`
- **Motor:** Funciones puras TypeScript en `/lib/recommendation-engine.ts`
- **LLM:** Gemini API — solo capa de explicación en `/lib/gemini.ts`
- **Deploy:** Vercel

## Comunicación

- Responder en español.
- Respuestas cortas a menos que se pida explicación detallada.
- No resumir lo que se acaba de hacer — el diff es suficiente.

## Flujo de trabajo con AI (ver `AGENTS.md`)

Este proyecto usa Claude Code como agente principal y Codex como agente secundario de apoyo, delegándole tareas de solo lectura (investigación externa, segunda opinión sobre un diff) para conservar el presupuesto/ventana de uso de Claude para el trabajo que requiere contexto profundo del proyecto y herramientas exclusivas (MCP). El detalle de cómo y cuándo delegar está en `AGENTS.md`.
