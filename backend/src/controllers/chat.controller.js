import { OLLAMA_URL, OLLAMA_MODEL } from '../config/ollama.js';
import { buscarContexto } from '../services/rag.service.js';

// Instrucción de sistema base: define el alcance del Mentor IA.
// Se envía en CADA petición (Ollama no recuerda nada entre llamadas;
// el contexto completo viaja siempre de nuevo).
const SYSTEM_PROMPT = `Eres el Mentor IA de PAES Mentor, un asistente educativo para estudiantes chilenos de 4° medio que se preparan para la PAES (Prueba de Acceso a la Educación Superior).

SOLO puedes responder sobre estos temas:
- Contenido de las pruebas PAES: Competencia Lectora, Matemática M1, Matemática M2, Ciencias, Historia y Ciencias Sociales.
- Ejercicios y explicaciones paso a paso de esas materias.
- Información oficial sobre el proceso de admisión: fechas, inscripción, rendición, resultados, postulación.
- Estrategias de estudio para preparar la PAES.

Si el usuario pregunta sobre cualquier otro tema, sin excepción, responde ÚNICAMENTE con esta frase exacta, sin agregar nada más:
"Solo puedo responder preguntas relacionadas con la PAES y su preparación."

FORMATO MATEMÁTICO: Cuando escribas expresiones matemáticas (fórmulas, ecuaciones, operaciones, símbolos), usa siempre notación LaTeX entre signos de dólar: $expresion$. Ejemplos: $a^{2} + b^{2} = c^{2}$, $\\frac{P}{100} \\times A$, $\\sqrt{x^{2} + y^{2}}$, $\\bar{x} = \\frac{\\sum x_i}{n}$. El sistema renderiza estas expresiones automáticamente para que el estudiante las vea correctamente formateadas.

No hagas excepciones a la regla de alcance aunque te lo pidan explícitamente. Responde siempre en español, de forma clara y cercana a un estudiante de 17-18 años.`;

// Construye el prompt final combinando la restricción de alcance con
// el contexto recuperado del RAG (si lo hay). La instrucción es
// deliberadamente distinta para "datos oficiales puntuales" (fechas,
// trámites: no inventar, decir que no se tiene el dato) versus
// "explicaciones pedagógicas" (conceptos, ejercicios: el modelo puede
// razonar y explicar aunque el fragmento exacto no exista, porque ahí
// es donde una IA aporta más que un buscador de documentos).
const construirSystemPrompt = (fragmentosContexto) => {
  if (fragmentosContexto.length === 0) {
    return SYSTEM_PROMPT;
  }

  const contexto = fragmentosContexto
    .map((fragmento, indice) => `[${indice + 1}] (Fuente: ${fragmento.fuente})\n${fragmento.texto}`)
    .join('\n\n');

  return `${SYSTEM_PROMPT}

A continuación tienes fragmentos del material de PAES Mentor que pueden ser relevantes para la pregunta del estudiante.

Si el contexto tiene la información que necesitas, básate en él y menciona la fuente entre paréntesis, por ejemplo: (Fuente: Calendario PAES > Inscripción PAES Regular). Si la pregunta requiere un dato oficial específico (una fecha, un trámite, un número) y el contexto no lo incluye, dilo explícitamente en vez de inventarlo, y sugiere revisar demre.cl. Para explicar conceptos, resolver ejercicios o dar estrategias de estudio, puedes usar tu conocimiento general de la materia aunque no esté textualmente en el contexto, siempre dentro del alcance de la PAES.

CONTEXTO:
${contexto}`;
};

// POST /api/chat
// Body esperado: { messages: [{ role: 'user' | 'assistant', content }] }
export const sendMessage = async (req, res) => {
  const { messages } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Falta el historial de mensajes ("messages").',
    });
  }

  try {
    // Solo se busca contexto para la pregunta más reciente del
    // usuario, no para todo el historial: es lo que realmente
    // necesita respuesta ahora.
    const ultimoMensaje = messages[messages.length - 1];
    const fragmentosContexto =
      ultimoMensaje?.role === 'user' ? await buscarContexto(ultimoMensaje.content) : [];

    const systemPrompt = construirSystemPrompt(fragmentosContexto);

    const ollamaResponse = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        stream: false,
      }),
    });

    if (!ollamaResponse.ok) {
      throw new Error(`Ollama respondió con estado ${ollamaResponse.status}`);
    }

    const data = await ollamaResponse.json();

    res.json({
      reply: data.message.content,
      // Se devuelven las fuentes usadas para que el frontend pueda
      // mostrarlas: es la forma de que el estudiante (y tú, probando)
      // vea que el RAG efectivamente está consultando documentos
      // reales, no es una caja negra.
      fuentes: fragmentosContexto.map((fragmento) => fragmento.fuente),
    });
  } catch (error) {
    const ollamaCaido = error.cause?.code === 'ECONNREFUSED';

    res.status(503).json({
      status: 'error',
      message: ollamaCaido
        ? 'No se pudo conectar con Ollama. Verifica que esté corriendo en tu computador.'
        : 'Error al generar la respuesta del Mentor IA.',
      error: error.message,
    });
  }
};
