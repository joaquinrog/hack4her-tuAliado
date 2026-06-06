# Handoff Context — Estado actual del proyecto

> Leer este archivo al inicio de cualquier sesión nueva.
> Actualizar cuando el estado del proyecto cambie.

---

## Identificación del proyecto

| Campo | Valor |
|---|---|
| Hackathon | Hack4Her |
| Reto | Tuali Growth Agent |
| Producto de trabajo | tuAliado |
| Tech Lead | Tech Lead del equipo |

### Qué está hecho y qué falta

| Módulo | Estado |
|---|---|
| Proyecto Next.js 15 inicializado | ✅ Hecho |
| `lib/types.ts` — contratos TypeScript | ✅ Hecho |
| `lib/mock-data.ts` — perfil Raúl, pedidos, productos, promos, loyalty | ✅ Hecho |
| `lib/onboarding-questions.ts` — estructura de preguntas | ✅ Hecho |
| `lib/recommendation-engine.ts` — motor determinístico | ⬜ Pendiente |
| `lib/gemini.ts` — capa de explicación | ⬜ Pendiente |
| `lib/state.ts` — URL params + localStorage | ⬜ Pendiente |
| Pantallas core (onboarding, diagnóstico, recomendaciones, seguimiento) | ⬜ Pendiente |
| Chatbot flotante + `/api/chat` | ⬜ Pendiente |
| **Chat de voz** (diferenciador clave — F13) | ⬜ Pendiente |

## Contexto del equipo

El Tech Lead es el único programador. El proyecto depende de continuidad de contexto entre sesiones de AI, por eso existe esta documentación.

## Qué pidió Tuali

Diseñar un prototipo de un **Agente de Crecimiento** dentro de Tuali que responda de forma inteligente y personalizada a:

> ¿Cómo ayudamos a los clientes de Tuali a crecer su negocio?

El agente debe ayudar al cliente a:
- definir una meta,
- aumentar ventas,
- incrementar ticket promedio,
- recibir recomendaciones personalizadas,
- dar seguimiento a su avance,
- aprender y ajustar con base en qué funcionó y qué no.

## Problema que resolvemos

Los clientes de Tuali tienen datos útiles disponibles (pedidos, promociones, loyalty, pedido sugerido) pero no hay nada dentro de la app que use esa información para acompañarlos a crecer su negocio con una meta clara y recomendaciones entendibles.

## Respuestas confirmadas de Tuali

| Pregunta | Respuesta de Tuali | Implicación |
|---|---|---|
| ¿Para quién es el agente? | Priorizar el cliente; luego Tuali/Arca. Van conectados. | El cliente es el usuario prioritario. |
| ¿Qué significa crecimiento? | Ticket promedio y autonomía del cliente dentro de Tuali. | Dos métricas principales. |
| ¿Qué datos tendrá el agente? | Tuali no tiene el precio de venta final — se puede pedir al cliente. Yomp! sí lo colecta. | Dato crítico que hay que solicitar. |
| ¿El agente sugiere o actúa? | Lo que haga que crezca más. | No limitarse a recomendaciones pasivas. |
| ¿Qué arquetipo priorizar? | Dueño apoyado, con menos tecnología. | MVP dirigido a Raúl. |
| ¿Qué no quieren ver? | Incoherencia en los datos. | Crítico: cualquier número debe tener origen claro. |
| ¿Cómo debe comportarse? | Evaluar comportamiento del usuario dentro de la app. | El agente debe usar señales de la app. |

## Dirección del MVP: tuAliado

Flujo base:
```
Diagnóstico → Meta → Recomendación → Acción → Seguimiento
```

Puntos clave:
- Usuario prioritario: **dueño apoyado** (Raúl) — baja habilidad tecnológica.
- Métrica principal: **ticket promedio**.
- Métrica secundaria: **autonomía del cliente dentro de Tuali**.
- Motor determinístico primero; LLM solo para explicar en lenguaje natural.
- **Chat de voz es diferenciador principal** — Web Speech API + speechSynthesis, mismo backend `/api/chat`. Se desarrolla en paralelo con diseño en Stitch. Raúl no quiere leer.
- El chatbot es apoyo, no el centro.
- Una meta + tres recomendaciones concretas.
- Integrar: promociones, pedido sugerido, loyalty.
- Pedir al cliente su precio de venta para estimar ganancia.
- Interfaz simple, lenguaje claro.

## Recursos disponibles (confirmados)

- Protopersonas (Fernanda, Raúl, Rosario).
- Journeys de usuario para los tres arquetipos.
- Contexto de promociones.
- Contexto de pedido sugerido / resurtido.
- Contexto de loyalty (Gana con Tuali: 1 punto por cada $20 MXN comprados).
- Funciones actuales de Tuali descritas en los docs.

## Datos que faltan o no están confirmados

- No hay dataset estructurado de clientes cifrados sin PEI disponible para uso en el prototipo.
- Tuali no tiene el precio de venta final del cliente.
- El volumen y detalle del historial de comportamiento no está definido como dataset utilizable.

## Riesgos principales

Ver `docs/risk-register.md` para la lista completa.

Los más críticos para este hackathon:
1. Incoherencia de datos — lo que Tuali explícitamente no quiere ver.
2. Convertirse en chatbot genérico.
3. Overbuild — querer implementar todo.
4. No tener dataset real utilizable.

## Stack técnico

**Confirmado:**
- Next.js (App Router) + TypeScript
- Tailwind CSS (estilos)
- Módulos TypeScript mock en `/lib/mock-data.ts`
- Motor determinístico en `/lib/recommendation-engine.ts`
- Gemini API en `/lib/gemini.ts` (solo capa de explicación)
- Deploy: Vercel

No habrá dataset real de Tuali. Solo los datos de `01-contexto-reto-tuali.md`.

## Constraints de UX confirmados

- **Mobile únicamente** (375px–430px). Sin layouts de desktop.
- **Visuales sobre texto**: iconos, barras, números grandes. Texto mínimo y corto.

## Lo que está hecho

### Proyecto Next.js inicializado (2026-06-06)
- Next.js 15 + TypeScript + Tailwind CSS — App Router.
- Deploy target: Vercel.

### Esquema de datos mock implementado (2026-06-06)

Tres archivos en `/lib/`:

| Archivo | Contenido |
|---|---|
| `lib/types.ts` | Todos los contratos TypeScript. Campos anotados por origen: TUALI, CLIENTE o ESTIMACION. |
| `lib/mock-data.ts` | Perfil Raúl, 10 pedidos (90 días), 15 productos Arca/Tuali, 3 promociones activas, estado loyalty. |
| `lib/onboarding-questions.ts` | Estructura de preguntas del onboarding. 1 pregunta en sesión 1 (botones grandes). Precio de venta: progresivo. |

**Números clave del mock:**
- Ticket promedio Raúl: ~$450 MXN.
- Canal: 80% promotor / 20% app.
- Loyalty: 180 puntos acumulados, retos no activados.
- Promociones activas: Coca-Cola 600ml (10%), Ciel 1L (15%), Victoria x12 (8%).
- Comportamiento: no usa promos, no usa pedido sugerido, no ha activado retos → 3 oportunidades inmediatas para el motor.

**Separación de orígenes implementada:**
- `TUALI`: historial, comportamiento, loyalty, catálogo, promociones.
- `CLIENTE`: meta elegida en onboarding, precios de venta (progresivos).
- `ESTIMACION`: cualquier cálculo de margen/ganancia — devuelve `null` si no hay precio del cliente.

## Próximo paso

Implementar `lib/recommendation-engine.ts` — motor determinístico que lee `EstadoMock` y produce `Diagnostico` + hasta 3 `Recomendacion[]`.
