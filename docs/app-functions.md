# Funciones de la App — tuAliado

> Lista completa sin depurar. Incluye funciones del equipo + las ya definidas.
> Próximo paso: depurar cuáles entran al MVP/Demo del hackathon.
> Última actualización: 2026-06-06

---

## F1: Onboarding — Elegir una meta

**Qué hace:**
Al entrar por primera vez, la app le pregunta al cliente una sola cosa:
> "¿Qué quieres para tu tienda?"

Le presenta 4 opciones con botón grande e ícono:
- Vender más
- Aprovechar las promociones
- Surtir mejor mi tienda
- Saber cómo me está yendo

**Qué produce:**
- Una meta seleccionada (origen: CLIENTE).
- Este dato alimenta el motor para priorizar recomendaciones.

---

## F2: Perfil del cliente

**Qué hace:**
Captura información del cliente para personalizar la experiencia. Los datos básicos (nombre, correo, teléfono) vienen de Tuali. Lo que se pregunta en el onboarding de tuAliado:

**Perfil del tendero:**
- Fecha de nacimiento.
- Género (Mujer / Hombre / Prefiero no responder / Otro).
- Nivel de estudios (Primaria / Secundaria / Preparatoria / Carrera técnica / Universidad).
- ¿Requiere apoyo adicional para actividades físicas? (Sí / No).

**Perfil del negocio:**
- ¿Cuánto tiempo lleva abierto tu negocio? (< 1 año / 1-3 / 3-10 / > 10 años).
- ¿Quién atiende el negocio? (Yo solo / Mi familia y yo / Empleados / Familia y empleados).
- ¿Cuántas personas atienden? (1 / 2-3 / 4-5 / Más de 5).
- Tipo de negocio (Tienda de abarrotes / Miscelánea / Depósito / Papelería / Tienda de conveniencia / Otro).
- Ubicación: Estado, Municipio/Ciudad, Zona (Urbana / Suburbana / Rural).

**Nota:** La mayor parte de la personalización proviene de los datos transaccionales de Tuali/Arca, no de este formulario. Priorizar reducir fricción para Raúl — este formulario es stretch, no parte del MVP mínimo.

**Qué produce:**
- Perfil base para personalización de lenguaje y accesibilidad.
- Señal para activar modo asistido (pop-ups guiados, texto más grande).
- Contexto geográfico para recomendaciones de zona (F18).

---

## F3: Diagnóstico — Así está tu negocio

**Qué hace:**
Muestra al cliente un resumen visual de cómo está su negocio dentro de Tuali.

Información que muestra:
- Ticket promedio actual (número grande).
- Canal principal de pedidos (ej: "80% con promotor / 20% por app").
- Puntos de loyalty acumulados.
- Productos estrella — en qué productos concentra más ventas.
- Oportunidades detectadas (ej: "No has usado promociones activas").

**Qué produce:**
- Contexto del punto de partida del cliente.
- 2–3 oportunidades de mejora detectadas por el motor determinístico.

---

## F4: Recomendaciones — Qué hacer esta semana

**Qué hace:**
Muestra hasta 3 recomendaciones concretas como tarjetas visuales, ordenadas por nivel de riesgo/esfuerzo/retorno:

| Opción | Riesgo | Dificultad | ROI |
|---|---|---|---|
| A | Bajo | Bajo | Bajo |
| B | Medio | Medio | Medio |
| C | Alto | Alto | Alto |

Cada tarjeta incluye:
- Qué hacer (acción específica, lenguaje simple).
- Ventajas.
- Desventajas / riesgos.
- Posibles resultados a corto y largo plazo.
- Botón de acción directa (cuando aplica).

Tipos de recomendaciones:
- Activar una promoción activa que el cliente no ha usado.
- Agregar un producto al siguiente pedido (pedido sugerido).
- Activar un reto de loyalty.
- Invertir más stock en producto con más ventas.
- Pedir por app en lugar de por promotor.
- Recomendaciones de marketing (productos más vendidos en la zona).

**Qué produce:**
- 1–3 recomendaciones calculadas por el motor (no libres).
- Texto de explicación generado por Gemini Flash, en lenguaje simple.

---

## F5: Opciones de sustitución

**Qué hace:**
Si al cliente no le convence una recomendación o meta, puede cambiarla por una alternativa sin reiniciar el flujo.

**Qué produce:**
- Nueva recomendación o meta. El motor recalcula sin perder el perfil.

---

## F6: Pedir precio de venta (contextual)

**Qué hace:**
Cuando el motor detecta una recomendación de promoción, pregunta al cliente en cuánto vende ese producto.

> "¿En cuánto vendes tú la Coca-Cola 600ml?"

**Qué produce:**
- Dato de precio de venta (origen: CLIENTE).
- Habilita estimación de ganancia potencial de la promoción.
- Si el cliente no responde, la recomendación se muestra igual pero sin estimación.

---

## F7: Confirmación de pedido

**Qué hace:**
Antes de confirmar un pedido, el cliente puede revisar que todo esté correcto.

Incluye:
- Lista de productos y cantidades.
- Promociones aplicadas.
- Total estimado.
- Botón de confirmar o editar.

**Qué produce:**
- Reduce errores de pedido para Raúl (baja habilidad digital).

---

## F8: Asesoramiento financiero

**Qué hace:**
Muestra al cliente una estimación de qué productos le dan más margen y si una promoción le conviene.

- Cuánto gasta vs. cuánto podría ganar.
- Qué productos tienen mejor margen estimado.
- Si una promoción le conviene según su precio de venta.

**Qué produce:**
- Estimación de margen por producto (origen: ESTIMACION — solo si hay precio del cliente).
- Recomendación de en qué productos invertir más.

---

## F9: Plan de mejora

**Qué hace:**
Genera un plan estructurado con acciones concretas para alcanzar la meta del cliente.

Incluye:
- Acciones específicas por día y semana.
- Metas generales con fechas estimadas.
- Productos estrella — en qué invertir más.
- Próximo paso inmediato (una sola acción clara).

**Qué produce:**
- Guía de pasos personalizada por meta y perfil.

---

## F10: Seguimiento — Cómo vas hacia tu meta

**Qué hace:**
Muestra el avance del cliente hacia la meta elegida.

Información que muestra:
- Barra de progreso visual hacia la meta.
- Ticket promedio actual vs. meta.
- Evaluación de progreso: diaria, semanal y mensual.
- Qué recomendación se siguió.
- Desglose del sistema de puntuación: qué acciones dieron más puntos, qué promociones convienen más.
- Atajos directos a funciones de Tuali (pedido, loyalty, promos).

---

## F11: Feedback semanal

**Qué hace:**
Resumen automático semanal del avance del cliente.

Incluye:
- Qué funcionó y qué no.
- Siguiente recomendación sugerida.
- Cuántos puntos ganó en la semana vs. semana anterior.
- Resumen compartible por WhatsApp o con el asesor de Tuali.

---

## F12: Personalización de lenguaje

**Qué hace:**
Adapta el texto de toda la app al perfil del cliente.

- Para Raúl: texto muy corto, palabras simples, íconos grandes.
- Para Fernanda: puede mostrar más detalle.
- Gemini genera los textos de explicación adaptados al perfil detectado.

---

## F13: Chat de voz

**Qué hace:**
Permite al cliente interactuar con el chatbot por voz en lugar de escribir.
> Porque Raúl no ve bien y escribir en celular le cuesta.

Input de voz → transcripción → respuesta de Gemini → reproducción en audio.

---

## F14: Chatbot de apoyo (texto)

**Qué hace:**
Botón flotante disponible en cualquier pantalla. El cliente puede:
- Preguntar qué significa una recomendación.
- Pedir que le expliquen una promoción.
- Preguntar cómo funcionan los puntos de loyalty.

**Qué produce:**
- Respuesta de Gemini Flash contextualizada con los datos del cliente.
- No toma decisiones de negocio — solo explica.

---

## F15: Chat con agente humano

**Qué hace:**
Si el cliente necesita ayuda que el chatbot no puede dar, puede solicitar hablar con un agente de Tuali.

**Qué produce:**
- Solicitud de ayuda enviada al equipo de soporte.

---

## F16: Pop-ups guiados

**Qué hace:**
Para usuarios con poca experiencia tecnológica, guía el funcionamiento de la app la primera vez que usan cada sección.

> "Este es tu ticket promedio. Es cuánto gastas en promedio por pedido."

**Qué produce:**
- Reducción de fricción en la primera sesión de Raúl.

---

## F17: Recordatorios y notificaciones

**Qué hace:**
Notificaciones push para recordar al cliente:
- Que hay una promoción activa que no ha usado.
- Que es momento de hacer su pedido semanal.
- Su resumen de avance semanal.

---

## F18: Análisis demográfico

**Qué hace:**
Basado en zona y perfil del cliente, muestra qué productos se venden más en negocios similares.

Usos:
- Recomendaciones de qué productos agregar al portafolio.
- Base para estrategias de marketing (Above the Line, Below the Line, Through the Line).

**Nota:** Dato de origen ESTIMACION. No hay dataset real de Tuali.

---

## F19: Preguntas frecuentes

**Qué hace:**
Banco de preguntas frecuentes que el cliente puede consultar sin abrir el chatbot.

Ejemplos:
- ¿Cómo funcionan los puntos?
- ¿Cómo activo una promoción?
- ¿Qué es el pedido sugerido?

---

## F20: Evaluación mensual de la app

**Qué hace:**
Al mes de uso, le pregunta al cliente cómo le fue con la app.

- Encuesta corta (máximo 3 preguntas).
- Calificación visual (estrellas o emojis).

---

## Resumen completo (sin depurar)

| # | Función | Categoría |
|---|---|---|
| F1 | Onboarding — Elegir meta | Flujo core |
| F2 | Perfil del cliente | Flujo core |
| F3 | Diagnóstico | Flujo core |
| F4 | Recomendaciones (3 niveles de riesgo) | Flujo core |
| F5 | Opciones de sustitución | Stretch |
| F6 | Pedir precio de venta (contextual) | Flujo core |
| F7 | Confirmación de pedido | Utilidad |
| F8 | Asesoramiento financiero | Valor agregado |
| F9 | Plan de mejora | Valor agregado |
| F10 | Seguimiento + puntuación | Flujo core |
| F11 | Feedback semanal | Valor agregado |
| F12 | Personalización de lenguaje | Accesibilidad |
| F13 | Chat de voz | Accesibilidad |
| F14 | Chatbot de apoyo (texto) | Apoyo |
| F15 | Chat con agente humano | Apoyo |
| F16 | Pop-ups guiados | Accesibilidad |
| F17 | Recordatorios y notificaciones | Engagement |
| F18 | Análisis demográfico | Extra |
| F19 | Preguntas frecuentes | Apoyo |
| F20 | Evaluación mensual | Extra |
