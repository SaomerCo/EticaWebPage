const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Esta función es la única responsable de saber CÓMO se llama al backend
// para pedir el estado de salud. Si mañana cambia la URL, el header de
// auth, o el manejo de errores, se modifica en un solo lugar: los
// componentes que la usan no necesitan saber nada de "fetch" ni de URLs.
export const checkBackendHealth = async () => {
  const response = await fetch(`${API_URL}/health`);

  if (!response.ok) {
    throw new Error('No se pudo conectar con el servidor');
  }

  return response.json();
};

// Trae el listado de las 5 materias (con su cantidad de unidades).
export const fetchMaterias = async () => {
  const response = await fetch(`${API_URL}/materias`);

  if (!response.ok) {
    throw new Error('No se pudieron cargar las materias');
  }

  return response.json();
};

// Trae el detalle completo de una materia (unidades, contenidos,
// fórmulas, ejercicios y descargables) a partir de su slug, ej:
// "matematica-m1".
export const fetchMateriaDetail = async (slug) => {
  const response = await fetch(`${API_URL}/materias/${slug}`);

  if (response.status === 404) {
    throw new Error('not-found');
  }

  if (!response.ok) {
    throw new Error('No se pudo cargar la materia');
  }

  return response.json();
};

// Trae eventos del calendario PAES.
// "filters" admite { tipo, proximos } y ambos son opcionales.
export const fetchCalendario = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.tipo) params.set('tipo', filters.tipo);
  if (filters.proximos) params.set('proximos', filters.proximos);

  const query = params.toString();
  const response = await fetch(`${API_URL}/calendario${query ? `?${query}` : ''}`);

  if (!response.ok) {
    throw new Error('No se pudo cargar el calendario');
  }

  return response.json();
};

// Envía el historial completo de la conversación al Mentor IA y
// devuelve su respuesta junto con las fuentes que el sistema RAG usó
// para contestar (puede ser un arreglo vacío si la pregunta no
// coincidió con ningún fragmento del material oficial).
// "messages" es un arreglo de { role: 'user' | 'assistant', content }.
export const sendChatMessage = async (messages) => {
  const response = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Se mandan solo role/content: si algún mensaje del historial
    // trae campos extra (como "fuentes", agregado en la respuesta del
    // asistente), no queremos reenviarlos como si fueran parte de la
    // conversación.
    body: JSON.stringify({
      messages: messages.map(({ role, content }) => ({ role, content })),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'No se pudo conectar con el Mentor IA');
  }

  return { reply: data.reply, fuentes: data.fuentes || [] };
};

// Trae los descargables (guías, ensayos, formularios, material oficial).
// "filters" admite { tipo, materia } y ambos son opcionales.
export const fetchDescargables = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.tipo) params.set('tipo', filters.tipo);
  if (filters.materia) params.set('materia', filters.materia);

  const query = params.toString();
  const response = await fetch(`${API_URL}/descargables${query ? `?${query}` : ''}`);

  if (!response.ok) {
    throw new Error('No se pudieron cargar los descargables');
  }

  return response.json();
};
