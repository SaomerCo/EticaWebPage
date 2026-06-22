-- Fechas oficiales del Proceso de Admisión 2027, verificadas en
-- demre.cl y acceso.mineduc.cl. Estas son las mismas 4 fechas que
-- vivían hardcodeadas en frontend/src/data/paesDates.js desde la
-- Fase 2; a partir de esta fase, esa es la única fuente de verdad.
--
-- psql -U postgres -d paes_mentor -f database/calendario_seed.sql

INSERT INTO eventos_calendario (tipo, titulo, descripcion, fecha_inicio, fecha_fin, fuente, orden) VALUES
('inscripcion', 'Inscripción PAES Regular', 'Período para inscribirse en el proceso de admisión a través de la plataforma oficial. Se recomienda no dejarlo para el último día.', '2026-06-01T09:00:00-04:00', '2026-07-22T13:00:00-04:00', 'DEMRE', 1),

('rendicion', 'Rendición PAES Regular', 'Tres días de aplicación de las pruebas: Competencia Lectora, Matemática M1, Matemática M2, Ciencias e Historia y Ciencias Sociales.', '2026-11-30T08:00:00-03:00', '2026-12-02T18:00:00-03:00', 'DEMRE', 2),

('resultados', 'Resultados PAES Regular', 'Publicación de los puntajes obtenidos en demre.cl y acceso.mineduc.cl.', '2027-01-04T08:00:00-03:00', NULL, 'DEMRE', 3),

('postulacion', 'Postulación a las universidades', 'Período para postular a las carreras e instituciones de educación superior adscritas al sistema único de admisión.', '2027-01-04T09:00:00-03:00', '2027-01-07T13:00:00-03:00', 'DEMRE', 4);
