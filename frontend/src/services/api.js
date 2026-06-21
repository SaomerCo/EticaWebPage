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
// fórmulas y ejercicios) a partir de su slug, ej: "matematica-m1".
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
