# Demo Flow — tuAliado

> Guía para mostrar la demo sin generar confusión sobre el diagnóstico común.
> Estado: FASE 1 implementada y verificada.

---

## Idea central de la demo

La demo debe contar una historia simple:

> Raúl ya compra en Tuali, pero depende mucho del promotor. tuAliado detecta oportunidades en sus datos, le ayuda a elegir una meta, le da acciones concretas y luego muestra si está avanzando.

No conviene mostrar todas las variantes posibles. Para el pitch, el objetivo es que el jurado entienda el producto en menos tiempo, no que vea todos los branches.

---

## Punto que puede causar confusión

`/diagnostico` es igual para las 4 metas porque el diagnóstico responde a esta pregunta:

> ¿Cómo está Raúl hoy, antes de decidir qué hacer?

El diagnóstico es una foto base del cliente: ticket promedio, canal de pedido, puntos y oportunidades detectadas. Esa foto no debería cambiar solo porque Raúl elige otra meta en el onboarding.

Lo que sí cambia por meta es:

- `/recomendaciones`: el motor prioriza acciones distintas según la meta.
- `/registro`: la tercera pregunta cambia según la meta.
- `/seguimiento`: interpreta las señales registradas contra la meta activa.

Entonces, si el jurado pregunta por qué el diagnóstico se repite, la respuesta es:

> Porque primero mostramos el estado real del cliente. La personalización empieza después: tuAliado usa la meta para decidir qué recomendar y qué medir.

---

## Camino principal recomendado

Mostrar solo una meta como camino principal: **Vender más**.

Razón:

- Es la meta más fácil de entender para jueces y para Raúl.
- Conecta directo con la métrica principal de Tuali: ticket promedio.
- También permite explicar la métrica secundaria: autonomía en Tuali, porque Raúl pide 80% con promotor y solo 20% por app.
- Genera recomendaciones claras: promoción, pedir por app y reto loyalty.

URL path esperado:

```text
/ → /onboarding → /diagnostico?meta=vender_mas → /recomendaciones?meta=vender_mas → tocar una acción → /registro?meta=vender_mas → redirección automática → /seguimiento?meta=vender_mas
```

---

## Pantallas a mostrar

| Orden | Pantalla | Qué enseñar | Mensaje para decir |
|---|---|---|---|
| 1 | Splash `/` | Logo + entrada simple | "tuAliado vive dentro de Tuali como asesor de crecimiento, no como app externa." |
| 2 | Onboarding `/onboarding` | 4 metas visuales | "Raúl no llena formularios largos; elige una meta con botones grandes." |
| 3 | Diagnóstico `/diagnostico?meta=vender_mas` | Ticket, canal, loyalty y oportunidades | "Antes de recomendar, tuAliado entiende cómo está el negocio de Raúl." |
| 4 | Recomendaciones `/recomendaciones?meta=vender_mas` | Plan específico por meta + 3 tarjetas con riesgo/beneficio | "El motor no inventa: usa promociones, canal de pedido y loyalty para dar acciones concretas." |
| 5 | Acción desde recomendación | Tocar cualquier CTA de tarjeta | "Raúl no navega por menús; toma una acción recomendada y pasa al registro." |
| 6 | Registro `/registro?meta=vender_mas` | Check-in diario de 2-3 preguntas | "Raúl reporta señales simples; no captura ventas complejas." |
| 7 | Seguimiento `/seguimiento?meta=vender_mas` | Pantalla final después de la redirección automática | "El agente cierra el loop: no solo recomienda, también da seguimiento." |
| 8 | Chat flotante | Abrir bottom sheet, opcional modo voz | "El chat explica la recomendación, pero no decide la recomendación." |

---

## Momento "antes → después" (avance multi-día)

Mostrar solo el día 1 en `/seguimiento` se siente pobre frente a la promesa central del
producto: que tuAliado acompaña a Raúl día a día y que sus números avanzan con el tiempo.
Para resolverlo sin construir una pantalla nueva ni narrar en seco, `/seguimiento` tiene un
**gesto oculto**: mantener presionado el título "Tu avance" (~0.8s).

Qué hace:

- La primera vez, siembra 4 días de historial simulado **terminando ayer** (mismo patrón
  narrativo que `ENTRADAS_DEMO` en `lib/mock-data.ts`, con fechas relativas a "hoy" para que
  el check-in en vivo del presentador continúe la racha de forma natural).
- Si se vuelve a presionar, limpia ese historial sembrado — así se puede ensayar el momento
  varias veces sin recargar la página ni dejar residuos.

Cómo usarlo en la demo:

1. Completar el check-in en vivo (paso 6) y llegar a `/seguimiento?meta=vender_mas` — el
   jurado ve el estado de "día 1": una racha de 1 día, % de pedidos por app y promos basados
   en un solo registro.
2. Decir algo como: *"Así se ve hoy, con un solo registro."*
3. Mantener presionado el título "Tu avance" (~1 segundo). Los números cambian frente al
   jurado: la racha sube, el porcentaje de pedidos por app y las promos aplicadas reflejan
   varios días de constancia.
4. Cerrar con: *"Y así se ve después de unos días siguiendo el plan — sin que Raúl tenga que
   hacer nada distinto."*

Nota importante para preguntas del jurado: **`/recomendaciones` no cambia** con este gesto ni
con los días que pasan — sigue reflejando el estado real de Tuali (historial de pedidos,
promociones activas, loyalty) más la meta elegida. Lo que evoluciona día a día es
`/seguimiento`, porque es ahí donde se mide el avance de Raúl. Si preguntan "¿y las
recomendaciones también cambian con el tiempo?", la respuesta es: el motor decide *qué*
recomendar con base en los datos reales de Tuali; el seguimiento muestra *si* Raúl está
avanzando — son responsabilidades distintas a propósito, para no mezclar datos reales con
señales simuladas del día a día.

---

## End correcto de la demo

El final correcto del flujo es:

1. En `/recomendaciones?meta=vender_mas`, tocar una acción de cualquier tarjeta.
2. La app navega a `/registro?meta=vender_mas`.
3. Completar el check-in diario.
4. La app muestra el cierre de racha y redirige sola a `/seguimiento?meta=vender_mas`.

No entrar a `/registro` o `/seguimiento` escribiendo la URL durante la demo. Eso rompe la historia del producto: Raúl llega ahí porque tomó una acción recomendada.

---

## Qué no mostrar en la demo principal

No mostrar las 4 metas completas una por una.

Motivo: el diagnóstico se verá igual y puede parecer bug, aunque sea correcto conceptualmente. Si se quiere enseñar que las metas cambian algo, hacerlo como comparación corta después del camino principal.

No mostrar la app en desktop.

Motivo: el MVP está diseñado mobile-only para clientes que usan celular.

No depender de una respuesta real de Gemini para que la demo funcione.

Motivo: Gemini es solo capa de explicación. Si la API falla, el motor determinístico y las pantallas siguen funcionando.

---

## Comparación opcional de metas

Si sobra tiempo o alguien pregunta "¿qué cambia si elijo otra meta?", mostrar solo esta comparación rápida:

1. Volver a `/onboarding`.
2. Elegir **Aprovechar las promociones**.
3. Pasar rápido por `/diagnostico?meta=aprovechar_promos` aclarando: "El diagnóstico es la misma foto base de Raúl".
4. Ir a `/recomendaciones?meta=aprovechar_promos` y señalar que ahora la priorización se inclina más a promociones.

Frase útil:

> La meta no cambia los datos históricos de Raúl; cambia qué hace tuAliado con esos datos.

---

## Guion corto de demo

1. "Este es Raúl, dueño apoyado: baja habilidad digital y depende del promotor."
2. "Primero no le pedimos un formulario; solo una meta. Vamos a elegir Vender más."
3. "tuAliado diagnostica con datos que Tuali ya tiene: ticket promedio, canal, puntos y oportunidades."
4. "Con esa foto y la meta, el motor calcula tres recomendaciones concretas. Gemini solo las explica en lenguaje simple."
5. "Al tocar una acción, Raúl pasa al registro del día. No necesita buscar otra pantalla."
6. "Después de actuar, registra su día con preguntas simples."
7. "Finalmente la app lo lleva al seguimiento visual: avance, canal app vs promotor y promociones aplicadas."
8. "Si tiene dudas, puede pedir ayuda por chat o voz, pero el chatbot no es el producto; es apoyo."

---

## Respuesta preparada sobre el diagnóstico igual

Si Joaquín siente raro que `/diagnostico` sea igual para las 4 metas, esa sensación es válida desde la demo, pero no desde la lógica del producto.

Para producto, lo correcto es:

- Diagnóstico = estado del cliente.
- Meta = intención del cliente.
- Recomendaciones = estado + intención.
- Registro = señales específicas para medir si avanzó.
- Seguimiento = lectura visual del progreso.

Si se quisiera que el diagnóstico se sintiera más personalizado sin cambiar datos, se puede agregar después una línea de contexto como:

> "Con esta meta, tuAliado va a enfocarse en subir tu ticket promedio."

Pero eso sería polish de UX, no un cambio de motor.
