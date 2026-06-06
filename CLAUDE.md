# CLAUDE.md — Contexto operativo para Claude Code

## Proyecto

Este repositorio es el proyecto de hackathon **Hack4Her** para el reto **Tuali Growth Agent**.

El nombre de trabajo del producto es **Tuali Crece**.

El Tech Lead y único programador es el responsable de ingeniería del equipo.

## Prioridad del contexto

Antes de hacer trabajo mayor (nueva feature, cambio de arquitectura, implementar algo no trivial), leer:

1. `docs/handoff-context.md` — resumen rápido del estado actual.
2. `docs/mvp-current-direction.md` — dirección del MVP.
3. `docs/decisions.md` — decisiones confirmadas.

Si hay conflicto entre lo que dice el código y lo que dicen estos docs, preguntar antes de resolver por cuenta propia.

## Modo de trabajo

Este proyecto es **docs-first**. La continuidad de contexto entre sesiones de AI importa más que moverse rápido y perder contexto.

- Actualizar los docs cuando una decisión cambie.
- Separar claramente lo que está confirmado de lo que es una suposición.
- No construir más de lo que la tarea pide.
- No inventar datasets ni funcionalidades que no estén en los docs fuente.
- No añadir AI attribution ni Co-authored-by a los commits a menos que Joaquín lo pida explícitamente.

## Reglas de producto

- El usuario prioritario es el **cliente dueño**, específicamente el arquetipo **dueño apoyado** (baja habilidad tecnológica).
- La métrica principal es **ticket promedio**.
- La métrica secundaria es **autonomía del cliente dentro de Tuali**.
- El agente evalúa el comportamiento del usuario dentro de la app.
- El chatbot es apoyo, no el centro del producto.
- La solución no debe parecer un chatbot genérico.
- Lo que definitivamente Tuali no quiere ver: **incoherencia en los datos**.

## Reglas de frontend

### Plataforma: Mobile únicamente

- Viewport objetivo: 375px – 430px. Sin layouts de desktop.
- No usar breakpoints `lg:`, `xl:`, `2xl:` en Tailwind.
- Botones y tap targets mínimo 44x44px.
- Sin interacciones hover-only.
- Fuentes mínimo 16px para texto de lectura.

### Visuales sobre texto

Confirmado por contexto del hackathon: cuesta mucho a los usuarios leer. Los visuales comunican más rápido.

- Preferir iconos, barras de progreso, colores y números grandes sobre párrafos.
- Una pantalla = una idea principal + una acción.
- Si algo se puede mostrar visualmente, hacerlo así.
- El texto que aparece debe ser corto y en lenguaje simple (pensar: ¿lo entiende Raúl?).

### Simplicidad de componentes (auto-corrección)

Estas reglas permiten que Claude/Codex detecte y corrija complejidad excesiva:

- Un componente = una responsabilidad. Si hace dos cosas, dividirlo.
- Máximo ~80 líneas por componente. Si supera eso, revisar si se puede partir.
- Máximo 3–4 niveles de JSX anidado. Más niveles = señal de complejidad.
- Usar Tailwind exclusivamente para estilos. Sin CSS modules, sin estilos inline.
- Props: si un componente recibe más de 4 props o props complejas (objetos anidados), revisar si la abstracción es correcta.
- Sin lógica de negocio en componentes de UI. La lógica va en `/lib`.

### Señales de pantalla demasiado compleja

Detener y reportar si una pantalla tiene:
- Más de 5 elementos visuales distintos.
- Más de un CTA primario (botón principal).
- Texto en párrafos donde debería haber un número o ícono.
- Scroll dentro de scroll.
- Más de 2 acciones disponibles simultáneamente para el usuario.

## Reglas técnicas

- Pedir aprobación antes de cambios mayores de arquitectura.
- Preferir tareas acotadas con límites de archivo claros.
- Separar datos reales, datos simulados y estimaciones — siempre con origen claro.
- Si algo no está en los docs fuente, preguntar antes de asumirlo.
- La lógica de negocio vive en `/lib`, no en componentes.
- Los datos mock deben documentar su fuente (qué protopersona, qué supuesto).

## Stack confirmado

- **Framework:** Next.js (App Router) + TypeScript
- **Estilos:** Tailwind CSS
- **Datos:** Módulos TypeScript mock en `/lib/mock-data.ts`
- **Motor:** Funciones puras TypeScript en `/lib/recommendation-engine.ts`
- **LLM:** Gemini API — solo capa de explicación en `/lib/gemini.ts`
- **Deploy:** Vercel

## Archivos fuente de contexto (no modificar sin revisión)

- `01-contexto-reto-tuali.md` — contexto oficial del reto y respuestas de Tuali.
- `02-posible-mvp-tuali-crece.md` — dirección del MVP discutida hasta ahora.

## Estado actual

Arquitectura definida. Stack confirmado. Implementación pendiente de inicio.

## Instrucciones de /compact

Al compactar, preservar:
- Pantallas ya implementadas y su estado (completo/parcial)
- Decisiones de arquitectura confirmadas
- Tipos TypeScript definidos
- La tarea actual y el próximo archivo a tocar

Descartar:
- Exploraciones y alternativas descartadas
- Output de comandos ya ejecutados
- Contexto de sub-tareas ya completadas

## Comunicación

- Responder en español siempre.
- Respuestas cortas a menos que se pida explicación detallada.
- No resumir lo que se acaba de hacer — el diff es suficiente.
