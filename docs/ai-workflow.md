# Flujo de trabajo con AI — Claude Code y Codex

## Principios generales

- Las tareas se mantienen acotadas. Un agente, un archivo o módulo, un objetivo claro.
- Cuando una decisión cambia, se actualiza el doc correspondiente antes de continuar.
- Dos agentes no deben editar el mismo archivo al mismo tiempo sin coordinación.
- Los docs en `docs/` son la fuente de verdad — el código debe ser consistente con ellos.
- Si hay duda sobre contexto, leer `docs/handoff-context.md` antes de continuar.

---

## Claude Code — Rol principal

**Usa para:**
- Orquestación y contexto entre tareas.
- Planeación de la siguiente tarea.
- Escribir y actualizar documentación.
- Decisiones de producto y arquitectura (en conversación con el Tech Lead).
- Tareas de coordinación entre módulos.
- Revisar coherencia general del proyecto.

**No usar para:**
- Implementar funcionalidades completas de producto sin aprobación.
- Cambiar arquitectura sin registrarlo en `docs/decisions.md`.
- Asumir contexto no documentado.

---

## Codex — Rol de implementación

**Usa para:**
- Implementación de componentes de UI específicos.
- Lógica de motor de recomendaciones.
- Tests y validaciones.
- Debugging de errores concretos.
- Tareas de implementación con contexto bien definido (archivos, inputs, outputs claros).

**Cómo pasarle contexto a Codex:**
1. Darle siempre el fragmento relevante de `docs/handoff-context.md`.
2. Especificar claramente qué archivo toca, qué no toca, y cuál es el output esperado.
3. Si genera código que contradice los docs, detectarlo y corregirlo antes de integrar.

---

## Playwright MCP — Visual QA (futuro)

Disponible para verificar que la UI funciona como se espera.

**Usa para:**
- Verificar flujos de navegación.
- Comprobar estados de pantallas.
- Detectar inconsistencias visuales.
- Registrar hallazgos en `.ai/visual-qa-notes.md`.

**No está activo aún.** Se habilitará cuando haya algo que mostrar en el browser.

---

## Ciclo de trabajo recomendado

```
1. Leer handoff-context.md
2. Identificar la siguiente tarea con el Tech Lead
3. Ejecutar la tarea (Claude Code o Codex según el tipo)
4. Registrar resultado en validation-log.md o decisions.md según corresponda
5. Actualizar handoff-context.md si el estado del proyecto cambió
6. Confirmar con el Tech Lead antes de la siguiente tarea
```

---

## Reglas de coordinación entre agentes

- El Orquestador (Claude Code, sesión principal) mantiene la visión del proyecto.
- Codex recibe tareas acotadas con contexto explícito.
- Si Codex necesita información de contexto, Claude Code se la provee — no que Codex asuma.
- Los archivos `.ai/` son territorio de tracking; los archivos `docs/` son territorio de contexto.
- `CLAUDE.md` es solo para instrucciones a Claude Code.

---

## Sobre el uso del LLM en el producto

El LLM (Gemini API) dentro del producto solo actúa como **capa de explicación**:
- Traduce recomendaciones ya calculadas a lenguaje natural.
- Adapta el tono al perfil del cliente.
- No toma decisiones de negocio.
- No inventa datos.

Si el LLM no está disponible (API caída, timeout), el motor determinístico debe seguir funcionando. Las recomendaciones no pueden depender del LLM para existir — solo para explicarse.
