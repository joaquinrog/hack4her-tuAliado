# AGENTS.md — Flujo de trabajo con agentes de AI

Este documento define cómo se usan los agentes de AI en este proyecto durante el hackathon.

El objetivo es que cada agente tenga una responsabilidad clara, no se pisen entre sí, y que el contexto se mantenga consistente entre sesiones.

---

## Agente 1: Orquestador / Agente de Contexto

**Herramienta:** Claude Code (sesión principal)

**Propósito:**
Mantener el contexto del proyecto, planear las siguientes tareas, tomar decisiones de producto y arquitectura, y coordinar a los demás agentes.

**Puede tocar:**
- Todos los archivos de `docs/`
- Todos los archivos de `.ai/`
- `CLAUDE.md`, `AGENTS.md`, `README.md`
- Decisiones de alto nivel

**Debe evitar:**
- Implementar código de producto sin que el Tech Lead lo apruebe
- Cambiar arquitectura sin registrarlo en `docs/decisions.md`
- Inventar datos o asumir funcionalidades no confirmadas

**Cómo reporta:**
- Actualiza `docs/handoff-context.md` cuando el estado cambia
- Registra decisiones en `docs/decisions.md`
- Actualiza `.ai/task-board.md` al completar tareas

---

## Agente 2: Frontend Agent

**Herramienta:** Claude Code o Codex

**Propósito:**
Implementar la interfaz de usuario: pantallas, flujos, componentes visuales, y la interacción del cliente con Tuali Crece.

**Puede tocar:**
- Directorio de frontend (por definir una vez elegido el stack)
- Componentes, páginas, estilos
- Datos mock para visualización

**Debe evitar:**
- Cambiar la lógica de negocio o motor de recomendaciones
- Modificar documentación de contexto
- Crear nuevas pantallas o flujos sin aprobación previa
- Hardcodear datos que deberían venir del motor

**Cómo reporta:**
- Anota hallazgos de UI en `.ai/visual-qa-notes.md`
- Reporta decisiones de UI relevantes a el Tech Lead para registro en `docs/decisions.md`

---

## Agente 3: Backend / Datos / Lógica Agent

**Herramienta:** Claude Code o Codex

**Propósito:**
Implementar el motor de recomendaciones, la lógica de diagnóstico, el manejo de datos (mock o reales), y cualquier API o servicio backend.

**Puede tocar:**
- Directorio de backend/lógica (por definir)
- Motor de recomendaciones
- Lógica de diagnóstico
- Datos mock estructurados
- APIs y endpoints

**Debe evitar:**
- Inventar datasets o asumir que existen datos reales sin confirmación
- Cambiar interfaces de UI sin coordinar con el Frontend Agent
- Hacer cálculos con datos incoherentes — si los números no cuadran, parar y reportar

**Cómo reporta:**
- Documenta supuestos de datos en `docs/data-assumptions.md`
- Reporta cualquier inconsistencia de datos antes de continuar

---

## Agente 4: Visual QA Agent

**Herramienta:** Claude Code con Playwright MCP (cuando esté disponible)

**Propósito:**
Verificar que la interfaz funciona como se espera: flujos, navegación, estados de error, accesibilidad básica y consistencia visual.

**Puede tocar:**
- `.ai/visual-qa-notes.md`
- Scripts de prueba de UI (cuando existan)

**Debe evitar:**
- Modificar código de producto
- Tomar decisiones de diseño

**Cómo reporta:**
- Registra hallazgos en `.ai/visual-qa-notes.md` con fecha, pantalla afectada y descripción del problema

---

## Agente 5: Test / Validation Agent

**Herramienta:** Claude Code o Codex

**Propósito:**
Correr pruebas, validar consistencia de datos, verificar que el build pasa, y asegurar que no hay números incoherentes en la interfaz.

**Puede tocar:**
- Archivos de pruebas
- `.ai/validation-log.md`
- Scripts de validación

**Debe evitar:**
- Modificar lógica de producto para hacer pasar pruebas
- Ignorar errores de consistencia de datos

**Cómo reporta:**
- Registra cada validación en `.ai/validation-log.md`
- Si encuentra incoherencia de datos, bloquea y reporta antes de continuar

---

## Agente 6: Pitch / Docs Agent

**Herramienta:** Claude Code

**Propósito:**
Preparar materiales de presentación: narrativa del pitch, slides, resúmenes ejecutivos, y asegurarse de que los docs técnicos y de producto estén al día.

**Puede tocar:**
- `docs/pitch-context.md`
- `docs/project-brief.md`
- `README.md`
- Materiales de presentación

**Debe evitar:**
- Exagerar funcionalidades no implementadas
- Crear certeza falsa sobre datos o métricas
- Contradecir lo que dicen los docs fuente

**Cómo reporta:**
- Cualquier cambio de narrativa que afecte el producto debe pasar por el Tech Lead

---

## Coordinación general

- Un agente a la vez por archivo cuando sea posible.
- Si dos agentes necesitan tocar el mismo archivo, coordinar con el Tech Lead primero.
- El Orquestador es el que tiene la visión completa — los demás agentes preguntan si tienen dudas de contexto.
- Los docs en `docs/` son la fuente de verdad; el código debe ser consistente con ellos.
