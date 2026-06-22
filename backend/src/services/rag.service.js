import { pool } from '../config/db.js';
import { OLLAMA_URL, OLLAMA_EMBED_MODEL } from '../config/ollama.js';

// ============================================================
// NOTA DE ARQUITECTURA: por qué la búsqueda se hace en JavaScript
// ============================================================
// El enfoque "estándar" de RAG en PostgreSQL usa la extensión pgvector,
// que permite guardar embeddings como un tipo de dato nativo y buscar
// por similitud directamente en SQL (con un índice especializado,
// muy rápido incluso con millones de filas).
//
// pgvector no viene incluido en el instalador estándar de PostgreSQL
// para Windows, y compilarlo a mano requiere Visual Studio con
// herramientas de C++. Para el tamaño de corpus de este proyecto
// (decenas o, eventualmente, unos pocos miles de fragmentos), traer
// todos los embeddings a memoria y comparar uno por uno en JavaScript
// es perfectamente viable y evita esa instalación. Si el corpus
// creciera a un tamaño donde esto deje de ser rápido, ese es el
// momento de migrar a pgvector (o a una base de datos vectorial
// dedicada) — no antes.

const UMBRAL_SIMILITUD = 0.5;
const TOP_K = 4;

// Llama al modelo de embeddings de Ollama y devuelve el vector
// numérico que representa el significado del texto. Se usa tanto al
// ingerir documentos (una vez, por adelantado) como al buscar
// contexto para una pregunta nueva (en cada mensaje del chat).
export const embedText = async (texto) => {
  const response = await fetch(`${OLLAMA_URL}/api/embeddings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: OLLAMA_EMBED_MODEL, prompt: texto }),
  });

  if (!response.ok) {
    throw new Error(`Ollama (embeddings) respondió con estado ${response.status}`);
  }

  const data = await response.json();
  return data.embedding;
};

// Similitud de coseno: mide qué tan "parecidos" son dos vectores,
// entre -1 (opuestos) y 1 (idénticos en dirección). Es la métrica
// estándar para comparar embeddings de texto.
const similitudCoseno = (a, b) => {
  let productoPunto = 0;
  let normaA = 0;
  let normaB = 0;

  for (let i = 0; i < a.length; i += 1) {
    productoPunto += a[i] * b[i];
    normaA += a[i] * a[i];
    normaB += b[i] * b[i];
  }

  return productoPunto / (Math.sqrt(normaA) * Math.sqrt(normaB));
};

// Busca, entre todos los fragmentos ingeridos, los TOP_K más
// relevantes para una pregunta del usuario. Si algo falla (Ollama
// caído, tabla vacía, etc.), devuelve un arreglo vacío en vez de
// reventar la petición: el chat debe seguir funcionando sin RAG si
// el RAG mismo no está disponible, igual que en la Fase 6a.
export const buscarContexto = async (pregunta) => {
  try {
    const preguntaEmbedding = await embedText(pregunta);

    const result = await pool.query('SELECT fuente, texto, embedding FROM documentos_rag');

    return result.rows
      .map((fila) => ({
        fuente: fila.fuente,
        texto: fila.texto,
        similitud: similitudCoseno(preguntaEmbedding, fila.embedding),
      }))
      .filter((fila) => fila.similitud >= UMBRAL_SIMILITUD)
      .sort((a, b) => b.similitud - a.similitud)
      .slice(0, TOP_K);
  } catch (error) {
    console.warn('No se pudo buscar contexto RAG, continuando sin él:', error.message);
    return [];
  }
};
