# Flujo de trabajo con AI — Claude Code

## Principios

- Un agente, un loop. Claude Code hace contexto, planificación e implementación.
- Las tareas se mantienen acotadas: un objetivo, un módulo o archivo a la vez.
- Los docs en `docs/` son fuente de verdad — el código debe ser consistente con ellos.
- Si hay duda de contexto, leer `docs/handoff-context.md` antes de continuar.
- Cuando una decisión cambia, actualizar el doc correspondiente antes de seguir.

---

## Loop de trabajo

```
1. Leer handoff-context.md
2. Identificar la siguiente tarea (task board o instrucción directa)
3. Implementar con scope acotado
4. Verificar coherencia de datos
5. Actualizar task-board.md + handoff-context.md
6. Confirmar con Joaquín
```

---

## Slash commands disponibles

| Comando | Cuándo usarlo |
|---|---|
| `/dev` | Implementar una tarea del task board. Pasar número de tarea. |
| `/verify` | Verificar que un cambio funciona en el browser. |
| `/run` | Levantar el servidor de desarrollo. |
| `/code-review` | Revisar el diff antes de commit. |

**Ejemplo de uso:**
```
Revisa la task #3 en .ai/task-board.md y haz /dev
```

---

## Sobre el LLM en el producto

El LLM (Gemini API) dentro del producto solo actúa como **capa de explicación**:
- Traduce recomendaciones ya calculadas a lenguaje natural
- Adapta el tono al perfil del cliente
- No toma decisiones de negocio, no inventa datos

Si el LLM no está disponible, el motor determinístico debe seguir funcionando.

---

## Reglas de datos

- Separar datos reales, datos mock y estimaciones — siempre con origen claro.
- Si los números no cuadran, parar y reportar antes de continuar.
- Documentar supuestos de datos en `docs/data-assumptions.md`.
