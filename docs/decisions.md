# Decisiones del proyecto

> Registro de decisiones confirmadas. Agregar fecha y razón cuando sea posible.
> Si una decisión cambia, actualizar aquí y en `docs/handoff-context.md`.

---

## Decisiones confirmadas

### Reto seleccionado

- **Decisión:** Tuali Growth Agent
- **Estado:** Confirmado

---

### Nombre de trabajo del producto

- **Decisión:** tuAliado
- **Estado:** Confirmado

---

### Tech Lead

- **Decisión:** Tech Lead del equipo
- **Estado:** Confirmado
- **Nota:** Único programador. El repo debe ser fácil de retomar entre sesiones de AI.

---

### Usuario prioritario

- **Decisión:** Cliente dueño de tienda
- **Arquetipo prioritario:** Dueño apoyado (Raúl)
- **Estado:** Confirmado por Tuali
- **Razón:** Si funciona para alguien con baja habilidad digital, funciona para todos.

---

### Métrica principal

- **Decisión:** Ticket promedio
- **Estado:** Confirmado por Tuali
- **Descripción:** Aumentar el valor promedio de los pedidos del cliente.

---

### Métrica secundaria

- **Decisión:** Autonomía del cliente dentro de Tuali
- **Estado:** Confirmado por Tuali
- **Descripción:** Que el cliente pida más por Tuali que por promotor u otros métodos.

---

### Flujo base del MVP

- **Decisión:** Diagnóstico → Meta → Recomendación → Acción → Seguimiento
- **Estado:** Confirmado en discusión de MVP
- **Nota:** El chatbot es apoyo dentro de este flujo, no el punto de entrada.

---

### Motor de recomendaciones

- **Decisión:** Determinístico primero; LLM solo como capa de explicación
- **Estado:** Confirmado en discusión de MVP
- **Razón:** Evitar incoherencia de datos. El LLM no inventa recomendaciones — las explica.

---

### Alcance del MVP

- **Decisión:** Una meta principal + hasta tres recomendaciones
- **Estado:** Confirmado en discusión de MVP
- **Razón:** Evitar overbuild y complejidad innecesaria para el cliente.

---

### Dato de precio de venta

- **Decisión:** Pedir al cliente en cuánto vende el producto para estimar ganancia
- **Estado:** Confirmado en respuesta de Tuali
- **Razón:** Tuali no tiene este dato. Sin él no se puede estimar margen real.

---

### Incoherencia de datos

- **Decisión:** No debe haber incoherencia en los datos mostrados
- **Estado:** Confirmado por Tuali como lo que definitivamente no quieren ver
- **Nota:** Separar claramente datos reales, mock y estimaciones con origen claro.

---

### LLM para capa de explicación

- **Decisión:** Gemini API (Google)
- **Estado:** Confirmado
- **Razón:** El equipo cuenta con API Key de Gemini disponible para la demo.
- **Modelo:** Por definir (Gemini Flash vs Pro según costo/latencia).
- **Uso:** Solo como capa de explicación en lenguaje natural. No toma decisiones de negocio.

---

### Chatbot

- **Decisión:** El chatbot es apoyo, no el centro del producto
- **Estado:** Confirmado en discusión de MVP
- **Razón:** Evitar que el producto parezca un chatbot genérico.

---

### Comportamiento dentro de la app

- **Decisión:** El agente debe evaluar el comportamiento del usuario dentro de la app
- **Estado:** Confirmado por Tuali
- **Nota:** No debe sentirse como una herramienta aislada.

---

### Prioridad de productos

- **Decisión:** Las recomendaciones priorizan productos que provee Tuali
- **Estado:** Confirmado por Tuali
- **Razón:** El objetivo es que el cliente crezca Y que Tuali/Arca obtenga beneficio.

---

### Arquitectura y stack

- **Decisión:** Next.js (App Router) + TypeScript + Tailwind CSS, full-stack sin backend separado
- **Estado:** Confirmado
- **Razón:** No habrá dataset real de Tuali. Los únicos datos disponibles son los de `01-contexto-reto-tuali.md`. Un backend separado no aporta nada.
- **Deploy:** Vercel

---

### Fuente de datos

- **Decisión:** Datos mock únicamente, basados en protopersonas y journeys del doc fuente
- **Estado:** Confirmado
- **Razón:** Tuali no entregará dataset real. No asumir que llegará uno.

---

### Plataforma objetivo

- **Decisión:** Mobile únicamente (375px – 430px)
- **Estado:** Confirmado
- **Razón:** Los clientes no tienen acceso a computadora. El MVP debe funcionar y verse bien solo en móvil.
- **Implicación:** Sin layouts de desktop. Sin breakpoints `lg:` o mayores. Tap targets mínimo 44x44px.

---

### Principio de UX: Visuales sobre texto

- **Decisión:** Priorizar iconos, barras, números grandes y colores sobre texto y párrafos
- **Estado:** Confirmado
- **Razón:** Cuesta mucho a los usuarios leer. Los visuales comunican más rápido.
- **Implicación:** Una pantalla = una idea. Texto solo cuando no hay otra opción, y corto.

---

### Estructura del esquema de datos mock

- **Decisión:** Tres archivos en `/lib/`: `types.ts`, `mock-data.ts`, `onboarding-questions.ts`
- **Estado:** Implementado — 2026-06-06
- **Razón:** Separar contratos, datos y preguntas en archivos distintos. Los campos están anotados por origen (TUALI / CLIENTE / ESTIMACION) para cumplir el requisito de no incoherencia de datos.

---

### Onboarding inicial: 1 sola pregunta

- **Decisión:** La sesión 1 del onboarding hace exactamente 1 pregunta: "¿Qué quieres para tu tienda?" con 4 botones grandes.
- **Estado:** Confirmado — 2026-06-06
- **Razón:** Raúl (baja habilidad digital) no puede con más de una decisión al arranque. El precio de venta se pide después, de forma contextual, cuando el motor detecta una promoción relevante.

---

### Protopersona del mock: Raúl

- **Decisión:** El mock está construido sobre el perfil de Raúl (63 años, baja habilidad digital, 80% pedidos por promotor).
- **Estado:** Implementado — 2026-06-06
- **Razón:** Priorizar al arquetipo más difícil. Si funciona para Raúl, funciona para todos.

---

## Decisiones pendientes

- Definir modelo de Gemini a usar (Flash vs Pro — por costo y latencia)
- Pantallas mínimas para el demo (flujo core a confirmar con el Tech Lead)
- Diseño visual: paleta de colores, tipografía, componentes base
