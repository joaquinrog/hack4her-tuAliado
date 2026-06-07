# Preguntas guia para README y pitch — tuAliado

> Objetivo: reunir respuestas del equipo de pitch/producto para construir un
> README claro para jueces y para cualquiera que abra el repo desde DevTools.
>
> Contestarlas directamente debajo de cada pregunta. No hace falta responder
> todo en orden; priorizar las preguntas marcadas como clave.

---

## Prioridad alta

Estas respuestas alcanzan para armar una primera version solida del README.

1. **[Clave]** ¿Cual es la frase de 1 linea que queremos que recuerden los jueces sobre tuAliado?

TuAliado es un sistema de acompañamiento que convierte metas de negocio en acciones concretas y medibles para cada tendero. 

2. **[Clave]** ¿Por que elegimos a Raul / dueño apoyado como usuario principal?

Elegimos a Raúl porque representa el perfil con mayor dificultad digital dentro de nuestras protopersonas usando Tuali. Es un usuario que depende constantemente de otras personas para utilizar herramientas tecnológicas y que suele evitar procesos complejos dentro de apps.
Diseñar para Raúl significa diseñar para el caso más complicado: un usuario con baja adopción tecnológica, resistencia al cambio y poca autonomía digital, que además depende frecuentemente del promotor para tomar decisiones.
Si el producto funciona para Raúl, automáticamente mejora la experiencia para perfiles más digitales. Además, este perfil representa directamente la oportunidad social del reto: transformar tecnología compleja en acompañamiento accesible y accionable.

3. **[Clave]** ¿Cual sera el camino exacto que se mostrara en vivo en la demo?

La demo seguirá un flujo corto y enfocado en acompañamiento práctico.
Primero se presentará a Raúl y su contexto como tendero tradicional con baja habilidad digital. Después, tuAliado realizará un diagnóstico utilizando historial de compras, comportamiento y contexto del negocio para detectar oportunidades de crecimiento.
A partir de ahí, Raúl seleccionará una meta concreta:
“Quiero vender más esta semana.”
El sistema responderá con recomendaciones accionables conectadas directamente a esa meta: productos sugeridos, promociones relevantes, oportunidades de loyalty 
y explicación clara del beneficio esperado.
Posteriormente se mostrará la interacción por voz, simulando una conversación natural similar a la que tendría con un promotor:
“¿Qué me conviene pedir hoy?”
Finalmente, se mostrará el seguimiento de avance, progreso de meta y visualización de impacto para demostrar que tuAliado no solo recomienda acciones, sino que acompaña continuamente el crecimiento del negocio.

4. **[Clave]** ¿Como vamos a decir claramente que el dataset es mock, pero basado en protopersonas y journeys del reto?

Para la demo utilizamos información simulada basada en las protopersonas, journeys y contexto del reto proporcionado por Tuali.
No trabajamos con datos reales de clientes; el objetivo del prototipo fue demostrar cómo funcionaría el flujo de acompañamiento, personalización y seguimiento dentro de escenarios realistas inspirados en los perfiles del reto.

5. **[Clave]** ¿Cual es la promesa principal para Tuali / Arca: subir ticket promedio, autonomia digital, engagement o todo junto?

La principal propuesta de valor para Tuali y Arca Continental es convertir automatización en inteligencia comercial, ya que tuAliado no solo mejora la experiencia del tendero, también transforma interacciones diarias en información útil para entender mejor a los clientes, personalizar recomendaciones y aumentar el engagement dentro de la plataforma.
Como resultado, se impulsa el uso de promociones y loyalty, se fortalece la autonomía digital del cliente y se genera crecimiento medible para Arca Continental.

6. **[Clave]** ¿Que diferenciador queremos vender mas fuerte: flujo estructurado, motor deterministico, voz, UX para baja habilidad digital o seguimiento?

El diferenciador principal de tuAliado es su enfoque de acompañamiento accesible para usuarios con baja habilidad digital.
Más que un chatbot, el producto funciona como una guía estructurada que convierte metas en acciones concretas y fáciles de entender. La experiencia prioriza practicidad sobre tecnicidad:
lenguaje claro, decisiones simplificadas, recomendaciones justificadas y seguimiento continuo.
La interacción por voz complementa esta experiencia al permitir una comunicación mucho más natural para usuarios que no están acostumbrados a escribir o navegar interfaces complejas.

7. **[Clave]** ¿Que esta implementado hoy y que es vision futura?

Nuestro prototipo ya cuenta con:
flujo principal de acompañamiento, onboarding y diagnóstico, definición de metas, recomendaciones personalizadas, seguimiento de progreso, sistema de streak, UX enfocada en accesibilidad y prototipo funcional de interacción por voz.
También existe una integración conceptual con funcionalidades ya presentes dentro de Tuali, permitiendo demostrar cómo el agente aprovecha herramientas existentes en lugar de crear un sistema externo.
A futuro, buscamos incorporar aprendizaje adaptativo en tiempo real, modelos predictivos de comportamiento, predicciones estacionales, evaluación dinámica de riesgo y conexión completa con datos productivos reales de Tuali y Arca Continental.

8. **[Clave]** ¿Cual es el link final de Vercel que ira arriba del README?

---

## Historia del producto

9. ¿Como explicamos tuAliado sin que suene a "otro chatbot con IA"?

tuAliado no es un chatbot que responde preguntas. Es un sistema de acompañamiento que convierte metas de negocio en acciones concretas y medibles para cada tendero.
La IA no es el producto principal, sino el motor que permite personalizar recomendaciones, interpretar comportamiento, adaptar el acompañamiento y llevar un seguimiento más cercano según el contexto de cada usuario.
Más que conversar, tuAliado analiza, prioriza y da seguimiento.

10. ¿Qué dolor especifico de Raúl resolvemos primero: vender mas, entender promos, pedir mejor o depender menos del promotor?

El primer dolor que resolvemos es depender menos del promotor para tomar decisiones.
A partir de ahí, tuAliado ayuda a entender promociones, saber qué pedir
y eventualmente crecer el negocio.
La autonomía digital es el punto de partida, porque actualmente Raúl no tiene claridad ni confianza para usar la plataforma por sí solo.

11. ¿Que parte del problema viene directamente del reto de Tuali y que parte es interpretacion nuestra?

Del reto de Tuali tomamos la necesidad de crear un agente que ayude a los clientes a crecer su negocio mediante recomendaciones personalizadas, seguimiento y uso inteligente de herramientas ya existentes dentro de la plataforma.
Nuestra interpretación fue entender que el verdadero problema no era la falta de funcionalidades, sino la falta de acompañamiento claro, accesible y accionable para usuarios con baja habilidad digital. A partir de eso, diseñamos una experiencia enfocada en autonomía, simplicidad y crecimiento guiado.

12. ¿Cual es el "antes y despues" de Raul en una frase?

Antes, Raúl dependía solo del promotor y otras personas para tomar decisiones; ahora, tuAliado le dice qué hacer, por qué le conviene y cómo crecer su negocio.

13. ¿Que nombre/copy queremos usar para describir el producto: agente de crecimiento, asesor, copiloto, aliado u otro?

---

## Cliente y contexto

14. ¿Que detalle humano de Raul queremos que aparezca en el README?

15. ¿Como explicamos que si funciona para Raul, funciona para usuarios mas digitales?

Diseñamos tuAliado pensando primero en el usuario con más barreras tecnológicas. Si la experiencia logra ser clara, práctica y útil para Raúl, también puede simplificar y acelerar la toma de decisiones para usuarios más digitales. La simplicidad no limita; mejora la experiencia para todos.

16. ¿Que tan fuerte queremos mencionar al promotor: problema, aliado, canal actual o transicion?

El promotor debe presentarse como un aliado y un canal de confianza ya existente. tuAliado no busca reemplazarlo, sino extender y escalar su acompañamiento mediante recomendaciones personalizadas, automatización y seguimiento continuo.

17. ¿Que ejemplos reales del journey de Raul conviene incluir?

Conviene incluir momentos cotidianos y accionables: Raúl escoge una meta simple como vender más, recibe recomendaciones basadas en promociones activas y productos populares, usa el chat de voz para resolver dudas rápidamente, recibe recordatorios para surtir su tienda y da seguimiento diario a sus avances mientras acumula puntos y mantiene su racha.

18. ¿Que frase simple usaria Raul para describir lo que tuAliado le ayuda a hacer?
Me ayuda a saber qué hacer para vender más y llevar mejor mi tiendo
---

## Demo

19. ¿Que pantallas si o si deben entender los jueces aunque no vean el pitch completo?

20. ¿Que texto corto ponemos en README para explicar el flujo demo?

21. ¿Que debe hacer el juez si abre la app solo?

22. ¿Queremos incluir el path exacto recomendado?

```text
/ → /onboarding → /diagnostico?meta=vender_mas → /recomendaciones?meta=vender_mas → /registro?meta=vender_mas → /seguimiento?meta=vender_mas
```

23. Si el juez pregunta por que el diagnostico es igual para todas las metas, ¿cual es la respuesta oficial?

24. ¿La demo debe enseñar el chat flotante y modo voz como parte central o como bonus?

25. ¿Que partes de la app NO conviene mostrar en la demo principal?

---

## Datos y credibilidad

26. ¿Que numeros queremos destacar en README/pitch?

Ejemplos actuales de la demo:
- Ticket promedio: `$440`
- Meta sugerida: `$506`
- Canal: `20% app / 80% promotor`
- Loyalty: `180 puntos`

27. ¿Cuales numeros NO debemos presentar como datos reales de Tuali?

28. ¿Queremos una seccion "Datos usados en la demo" con origen: Tuali/contexto, cliente, estimacion?

29. ¿Como explicamos que Gemini no decide recomendaciones, solo las explica?

30. ¿Como queremos decir que el motor es deterministico sin sonar demasiado tecnico?

31. ¿Que frase usamos para dejar claro que evitar incoherencia de datos fue una decision de producto?

---

## Valor para Tuali / Arca

32. ¿Que metrica ponemos primero y con que wording?

33. ¿Como conectamos recomendaciones con ventas del portafolio Arca sin sonar forzado?

34. ¿Que beneficio tiene para Tuali que el cliente registre su dia?

35. ¿Como explicamos que tuAliado aumenta autonomia sin reemplazar al promotor de golpe?

36. ¿Que impacto esperamos en promociones, loyalty y pedido sugerido?

---

## Diferenciadores

37. ¿Que hace tuAliado que la app actual de Tuali no hace?

tuAliado conecta las herramientas que ya existen en Tuali y las combina y recomienda de manera concreta con una meta específica de acuerdo a lo que prefiere el negocio. En vez de mostrar promociones, pedidos sugeridos o programas de lealtad aislados, los convierte en acciones personalizadas y medibles para ayudar al cliente a crecer.

38. ¿Que hace tuAliado que un chatbot generico no puede hacer?

El chatbot solo contesta preguntas, mientras que tuAliado genera una conversación con base en el análisis del comportamiento del cliente y sus datos de los últimos meses, creando una experiencia personalizada y adaptada a lo que el cliente necesita.

39. ¿Como explicamos "agente de crecimiento" sin prometer automatizacion que no 
existe?

tuAliado es un agente de crecimiento debido a que acompaña al usuario durante todo el proceso: entiende su contexto del negocio, le ayuda a definir metas específicas, define metas, recomienda acciones y da seguimiento al avance. Al final del día, es el cliente quien toma las decisiones, no el agente, pues él solo guía.


40. ¿Que rol tiene la voz para Raul: accesibilidad, confianza, rapidez o diferenciador tecnico?

Para Raúl, la accesibilidad es limitada debido a que él no está acostumbrado a utilizar herramientas digitales y no puede leer la letra pequeña. Sin embargo, al poder describir perfectamente su negocio a través de la experiencia, el chat de voz le permite utilizar sus habilidades para obtener los mismos beneficios de recomendaciones y acompañamiento guiado que otros usuarios tenían, destruyendo así las barreras de la brecha de conocimiento digital.

41. ¿Que parte del diseño mobile-first vale la pena mencionar?

La interfaz fue diseñada pensando en el usuario con menor habilidad digital, priorizando una sola acción principal por pantalla, botones grandes, lenguaje simple, visuales sobre texto y métricas fáciles de interpretar.


---

## Alcance y honestidad

42. ¿Que features NO debemos prometer como listas para demo?

Ejemplos posibles:
- precio de venta contextual,
- feedback semanal,
- notificaciones,
- agente humano,
- integracion real con backend Tuali.

43. ¿Queremos una seccion "Limitaciones actuales" o mejor "Proximos pasos"?

44. ¿Como decimos que no usamos dataset real sin que suene debil?

45. ¿Que parte del README debe convencer tecnicamente y que parte debe convencer de negocio?

46. ¿Que sigue despues del hackathon si Tuali quisiera pilotear esto?

---

## README practico

47. ¿El README debe estar en español solamente o bilingue?
    Español

48. ¿Hay video, GIF o capturas que quieran enlazar?
    Podemos enlazar capturas, video de youtube de la demo y más. Tú agrega los placeholder y sí

49. ¿Que nombres y roles definitivos del equipo van en README?
    Sí, pero hasta abajo abajo, cómo firma

50. ¿Se debe escribir como entrega de hackathon, como repo tecnico o hibrido?
    Híbrido, busca en internet ejemplos de Devpost/MLH

51. ¿Hay creditos de diseño, assets o logos que deban mencionarse?
    Usamos stich para assets

52. ¿Hay alguna frase o claim que NO debamos usar?
