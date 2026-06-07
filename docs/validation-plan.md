# Plan de validación

> Placeholder — los comandos específicos se definirán cuando se elija el stack.

---

## Comandos de validación (pendientes de definir)

Una vez elegido el stack, agregar aquí:

```bash
# Lint
# npm run lint  o  ruff check .

# Typecheck
# npx tsc --noEmit  o  mypy .

# Build
# npm run build

# Tests
# npm test  o  pytest

# Dev
# npm run dev
```

---

## Checklist de validación antes de demo

### Consistencia de datos

- [ ] Todos los números en la UI tienen origen claro (mock, estimación o dato real).
- [ ] No hay cálculos contradictorios entre pantallas.
- [ ] Si se muestra ganancia estimada, está marcada como estimación.
- [ ] Los puntos de loyalty mostrados siguen la regla: 1 punto por cada $20 MXN.
- [ ] Ningún número aparece "inventado" sin respaldo.

### Flujo del MVP

- [ ] Flujo completo funciona: Diagnóstico → Meta → Recomendación → Acción → Seguimiento.
- [ ] El cliente puede elegir una meta.
- [ ] Se muestran al menos una recomendación concreta.
- [ ] El seguimiento de progreso es visible.
- [ ] El lenguaje es simple y entendible para Raúl (dueño apoyado).

### Comportamiento del agente

- [ ] Las recomendaciones vienen del motor determinístico, no del LLM en crudo.
- [ ] Si el LLM no responde, la experiencia sigue funcionando (degradación elegante).
- [ ] El chatbot (si existe) es apoyo, no el flujo principal.

### Build y deploy

- [ ] El proyecto levanta sin errores.
- [ ] No hay warnings críticos en consola.
- [ ] La demo path funciona de punta a punta.

---

## Demo path esperada (por confirmar)

La ruta feliz para la presentación debería cubrir:

1. Entrar a TuAliado.
2. Ver diagnóstico o resumen del cliente.
3. Elegir o ver meta activa.
4. Ver recomendaciones concretas.
5. Ver progreso hacia la meta.
6. (Opcional) Interactuar con chatbot de apoyo.

---

## Validación de regresión

Antes de cada commit importante durante el hackathon:
- [ ] El flujo principal sigue funcionando.
- [ ] No se rompieron pantallas anteriores.
- [ ] Los datos mock son coherentes entre sí.

---

## Log de validaciones

Ver `.ai/validation-log.md` para el registro histórico de validaciones.
