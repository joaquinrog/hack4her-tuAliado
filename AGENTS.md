# AGENTS.md — Flujo de trabajo con AI

Este documento define cómo se usa AI en este proyecto — aplica tanto para Claude Code como para Codex.

**Claude Code es el agente principal.** Codex actúa como **agente secundario de apoyo**, limitado a tareas acotadas de solo lectura. Decisión registrada en `docs/decisions.md` ("Uso de Codex como agente secundario").

---

## Por qué delegar a un segundo agente

El recurso escaso real al trabajar con asistentes de AI no son los "tokens" en abstracto, sino la ventana de uso de cada herramienta (se renueva cada pocas horas). Las herramientas MCP de Claude Code (p. ej. chrome-devtools) y el contexto profundo de este proyecto no son transferibles a Codex — así que conviene reservar la ventana de Claude para ese trabajo exclusivo, y descargar en Codex el trabajo genérico que no depende de ese contexto. Esto libera presupuesto de Claude para las tareas que solo Claude puede hacer.

## Claude Code — Agente principal

**Responsabilidad:** todo lo que toca el proyecto — planificación, implementación, validación, docs, decisiones de producto y código.

**Reglas:**
- No implementar sin aprobación previa cuando el cambio es mayor.
- No inventar datos ni funcionalidades no documentadas.
- Registrar decisiones relevantes en `docs/decisions.md`.

## Codex — Agente secundario (apoyo, solo lectura)

**Puede ayudar con (sin tocar el repo):**
- Investigación externa: librerías, APIs, configuración de herramientas, debugging de errores ajenos al código del proyecto.
- Segunda opinión / revisión de un diff — reporta hallazgos en texto, sin aplicar cambios.
- Lectura y resumen de documentación externa o de archivos puntuales indicados.

**Fuera de su alcance:**
- Editar código del proyecto (`app/`, `components/`, `lib/`).
- Tomar o registrar decisiones de producto, arquitectura o datos.
- Modificar `docs/` o cualquier archivo de tracking — eso lo hace Claude Code.

**Cómo decide Claude Code cuándo delegar:**
- Al planear una tarea, identificar qué subtareas son delegables (solo lectura, genéricas) y marcarlas como "Codex" vs. "Claude".
- Asumir por defecto que Codex tiene presupuesto disponible — no preguntar antes de delegar; intentar y reaccionar si regresa un error de cuota agotada, asumiendo la tarea directamente sin reintentar.

## Uso de subagents (ahorro de tokens)

- Si el path del archivo ya se conoce, leerlo directo con `Read`/`grep` — no delegar a un subagent de exploración (duplica el costo: primero procesa el archivo completo, luego lo retranscribe de regreso).
- Reservar agentes de exploración para cuando el path NO se conoce, o la tarea requiere síntesis/juicio sobre varios archivos a la vez.
- Antes de delegar una pregunta de "¿en qué estado está X / qué falta?", revisar si la respuesta ya vive en la documentación del proyecto (`docs/decisions.md`, `docs/mvp-current-direction.md`) — no vale la pena re-derivar un estado ya documentado.

### Verificación de frontend (chrome-devtools)

- Para confirmar que algo *funciona* (clic dispara acción, dato se actualiza, no hay error), usar herramientas de texto (`evaluate_script`, `list_console_messages`, `list_network_requests`) — son baratas. Evitar snapshots visuales para esto.
- Reservar capturas de pantalla para cuando de verdad hace falta validar layout — y siempre en viewport móvil (este proyecto es mobile-only).
- Comprimir capturas (`format: jpeg, quality: 60`, sin `fullPage`) — la diferencia es de ~90K a ~10K caracteres por captura.
- Manejar la sesión de chrome-devtools desde un subagente aislado: las capturas pesadas quedan ahí y solo regresa un veredicto corto al hilo principal.

## Sobre el LLM en el producto

Gemini API actúa solo como **capa de explicación**: traduce recomendaciones ya calculadas a lenguaje natural, no toma decisiones de negocio, no inventa datos. Si la API falla, el motor determinístico sigue funcionando.
