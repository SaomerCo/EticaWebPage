// Fechas oficiales del Proceso de Admisión 2027 (DEMRE / Mineduc),
// verificadas en demre.cl y acceso.mineduc.cl.
//
// IMPORTANTE: esto es un placeholder de Fase 2. En la Fase 5 estas fechas
// dejarán de estar "hardcodeadas" en el frontend y pasarán a vivir en
// PostgreSQL, gestionadas desde el backend, para poder actualizarlas sin
// tocar código cada vez que el DEMRE publique un nuevo calendario.

export const paesDates = {
  inscripcionInicio: new Date('2026-06-01T09:00:00-04:00'),
  inscripcionCierre: new Date('2026-07-22T13:00:00-04:00'),
  rendicionDia1: new Date('2026-11-30T08:00:00-03:00'),
  rendicionDia2: new Date('2026-12-01T08:00:00-03:00'),
  rendicionDia3: new Date('2026-12-02T08:00:00-03:00'),
  resultados: new Date('2027-01-04T08:00:00-03:00'),
  postulacionInicio: new Date('2027-01-04T09:00:00-03:00'),
  postulacionCierre: new Date('2027-01-07T13:00:00-03:00'),
};

export const proximasFechas = [
  {
    id: 'inscripcion',
    titulo: 'Cierre de inscripción PAES Regular',
    fecha: paesDates.inscripcionCierre,
    descripcion: 'Último día para inscribirte en demre.cl o acceso.mineduc.cl.',
  },
  {
    id: 'rendicion',
    titulo: 'Rendición PAES Regular',
    fecha: paesDates.rendicionDia1,
    descripcion: 'Tres días de aplicación: 30 de noviembre, 1 y 2 de diciembre de 2026.',
  },
  {
    id: 'resultados',
    titulo: 'Resultados PAES Regular',
    fecha: paesDates.resultados,
    descripcion: 'Publicación de puntajes en demre.cl y acceso.mineduc.cl.',
  },
];
