# AGENTS.md — Flujo de trabajo con AI

Este documento define cómo se usa Claude Code en este proyecto.

Un solo agente. Un solo loop. Sin coordinación entre herramientas externas.

---

## Claude Code — Único agente

**Responsabilidad:** Todo. Contexto, planificación, implementación, validación, docs.

**Puede tocar:**
- Cualquier archivo del proyecto
- Docs en `docs/`
- Tracking en `.ai/`
- Código de producto

**Reglas que siempre aplican:**
- Leer `docs/handoff-context.md` antes de cualquier tarea mayor
- No implementar sin aprobación de Joaquín
- No inventar datos ni funcionalidades no documentadas
- Registrar decisiones en `docs/decisions.md`
- Actualizar `docs/handoff-context.md` cuando el estado del proyecto cambie
- Actualizar `.ai/task-board.md` al completar tareas

---

## Flujo de trabajo

```
1. Leer docs/handoff-context.md (contexto del estado actual)
2. Identificar la tarea (referencia al task board o instrucción directa)
3. Implementar con tareas acotadas — un módulo o archivo a la vez
4. Verificar que no hay incoherencia en los datos
5. Actualizar task-board.md y handoff-context.md
6. Confirmar con Joaquín antes de la siguiente tarea mayor
```

**Atajo para implementación:** usa `/dev` con el número de tarea.

Ejemplo: "Revisa la task #3 y haz /dev"

---

## Uso de subagents (ahorro de tokens)

- Si el path del archivo ya se conoce, leerlo directo con `Read`/`grep` — no delegar a un subagent `Explore`. Spawnear un subagent duplica el costo: primero procesa el archivo completo, luego lo vuelve a transcribir de regreso.
- Reservar `Explore` para cuando el path NO se conoce (búsquedas, "¿dónde está X?", exploración de estructura desconocida) o cuando la tarea requiere síntesis/juicio sobre varios archivos a la vez.

---

## Sobre el LLM en el producto

Gemini API actúa solo como **capa de explicación**:
- Traduce recomendaciones ya calculadas a lenguaje natural
- No toma decisiones de negocio
- No inventa datos
- Si la API falla, el motor determinístico sigue funcionando
