// Placeholder de Fase 2. En la Fase 3 esto se reemplaza por datos reales
// que vendrán desde PostgreSQL a través de la API (GET /api/materias),
// junto con sus unidades, contenidos, fórmulas y ejercicios. Por ahora
// solo necesitamos algo con qué pintar la grilla y probar el enrutamiento.

export const subjects = [
  {
    id: 'competencia-lectora',
    name: 'Competencia Lectora',
    short: 'Comprensión, análisis e interpretación de textos.',
    accent: '#C084FC',
  },
  {
    id: 'matematica-m1',
    name: 'Matemática M1',
    short: 'Números, álgebra, geometría, probabilidad y estadística.',
    accent: '#5EEAD4',
  },
  {
    id: 'matematica-m2',
    name: 'Matemática M2',
    short: 'Profundización matemática, exigida por carreras específicas.',
    accent: '#60A5FA',
  },
  {
    id: 'ciencias',
    name: 'Ciencias',
    short: 'Biología, física y química, con módulos electivos.',
    accent: '#4ADE80',
  },
  {
    id: 'historia',
    name: 'Historia y Cs. Sociales',
    short: 'Procesos históricos, formación ciudadana y economía.',
    accent: '#FB7185',
  },
];
