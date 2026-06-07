# AGENTS.md — Flujo de trabajo con AI

Este documento define cómo se usa AI en este proyecto — aplica tanto para Claude Code como para Codex.

**Claude Code es el agente principal.** Codex puede actuar como **agente secundario de apoyo**, en tareas acotadas de solo lectura (ver su sección abajo). Decisión registrada en `docs/decisions.md` ("Uso de Codex como agente secundario").

---

## Claude Code — Agente principal

**Responsabilidad:** Todo lo que toca el proyecto. Contexto, planificación, implementación, validación, docs, decisiones de producto y código.

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

## Codex — Agente secundario (apoyo, solo lectura)

**Por qué existe este rol:** Joaquín tiene Claude Pro y GPT Plus, ambos con ventana de uso que se renueva cada ~5 horas — el recurso escaso real es esa ventana, no "tokens" en abstracto. Las MCP tools de Claude Code (p. ej. chrome-devtools) y el contexto profundo de este proyecto son exclusivos/no-transferibles a Codex; conviene proteger la ventana de Claude para ese trabajo. Codex puede absorber trabajo genérico que no depende de ese contexto, liberando la ventana de Claude para lo que solo Claude puede hacer.

**Si te invocaron como Codex en este repo, puedes ayudar con (solo lectura, sin tocar el repo):**
- Investigación externa: librerías, APIs, configuración de herramientas, debugging de errores que no son del código del proyecto (p. ej. por qué un binario o un MCP server no arranca)
- Segunda opinión / revisión de un diff — reportar hallazgos en texto claro, sin aplicar cambios
- Lectura y resumen de documentación externa o de archivos puntuales que te indiquen

**No hagas (fuera de tu alcance como agente secundario):**
- Editar código del proyecto (`app/`, `components/`, `lib/`)
- Tomar o registrar decisiones de producto, arquitectura o datos
- Modificar `docs/`, `.ai/`, o cualquier archivo de tracking — eso lo hace Claude Code

**Cómo reportar:** texto claro y conciso, en español si la tarea lo amerita. Quien decide qué hacer con tus hallazgos es Claude Code / Joaquín — no asumas el siguiente paso.

**Cómo decide Claude Code cuándo y cómo delegar (al planear una tarea):**
- Al armar un plan, identificar qué subtareas son delegables (solo lectura, genéricas — ver lista de arriba) y marcarlas como "Codex" vs. "Claude" en el plan.
- Asumir por defecto que Codex tiene presupuesto disponible — su ventana de ~5h se renueva seguido y tareas típicas gastan poco (la última investigación delegada usó ~2% de su ventana). No preguntar a Joaquín antes de delegar.
- `codex exec` no expone `/status` (es un comando del modo interactivo, no de `exec`), así que no hay forma de consultar la cuota de antemano — decidir el nivel de esfuerzo según la tarea y simplemente intentar.
- Si Codex regresa un error de cuota agotada (p. ej. "usage limit reached", "tokens restart at..."), Claude Code asume la tarea directamente sin reintentar ni esperar.

Para entender el producto (qué es tuAliado, reglas de mobile/visuales, métricas), lee `CLAUDE.md` y `docs/handoff-context.md` antes de investigar — así tu reporte llega ya alineado con el contexto real.

---

## Flujo de trabajo

```
1. Leer docs/handoff-context.md (contexto del estado actual)
2. Identificar la tarea (referencia al task board o instrucción directa)
3. Implementar con tareas acotadas — un módulo o archivo a la vez
4. Verificar que no hay incoherencia en los datos
5. Actualizar task-board.md y handoff-context.md
6. Preguntar a Joaquín si se hace commit de los cambios antes de seguir
7. Confirmar con Joaquín antes de la siguiente tarea mayor
```

**Sobre el commit:** al terminar una tarea (o un cambio de estado claro), preguntar explícitamente si se commitea — no dejarlo sin preguntar. Ya ha pasado varias veces que los cambios quedan sin commitear y se acumulan.

**Atajo para implementación:** usa `/dev` con el número de tarea.

Ejemplo: "Revisa la task #3 y haz /dev"

---

## Uso de subagents (ahorro de tokens)

- Si el path del archivo ya se conoce, leerlo directo con `Read`/`grep` — no delegar a un subagent `Explore`. Spawnear un subagent duplica el costo: primero procesa el archivo completo, luego lo vuelve a transcribir de regreso.
- Reservar `Explore` para cuando el path NO se conoce (búsquedas, "¿dónde está X?", exploración de estructura desconocida) o cuando la tarea requiere síntesis/juicio sobre varios archivos a la vez.

### Verificación de frontend (chrome-devtools)

- Para confirmar que algo *funciona* (clic dispara acción, dato se actualiza, no hay error), usar herramientas de texto: `evaluate_script`, `list_console_messages`, `list_network_requests` — son baratas. Evitar `take_snapshot` para esto.
- Reservar `take_screenshot` para cuando de verdad hace falta ver el layout (validar que algo "se ve bien", acorde a la regla de "visuales sobre texto" del proyecto).
- Antes de capturar, hacer `resize_page` al viewport móvil (375-430px) — este proyecto es mobile-only, una captura grande no aporta nada extra.
- Por defecto, delegar la sesión de verificación al skill `verify` (o un subagent) en vez de manejar chrome-devtools desde el hilo principal: así las capturas/snapshots pesados quedan aislados y solo regresa un veredicto corto en texto.

---

## Sobre el LLM en el producto

Gemini API actúa solo como **capa de explicación**:
- Traduce recomendaciones ya calculadas a lenguaje natural
- No toma decisiones de negocio
- No inventa datos
- Si la API falla, el motor determinístico sigue funcionando
