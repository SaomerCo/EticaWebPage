-- Datos de descargables. Los enlaces son reales y fueron verificados
-- directamente en demre.cl. A propósito NO incluí enlaces directos a
-- archivos PDF con nombre de fecha específica (ej. ".../2026-25-...pdf"),
-- porque el DEMRE les cambia el nombre cada proceso de admisión y un
-- enlace así queda roto o apunta al temario del año anterior sin que se
-- note. En su lugar, se enlaza a las páginas oficiales "vivas" que el
-- DEMRE mantiene actualizadas con el material vigente.
--
-- psql -U postgres -d paes_mentor -f database/descargables_seed.sql

INSERT INTO descargables (materia_id, tipo, titulo, descripcion, url, fuente, orden) VALUES
(NULL, 'oficial', 'Temarios oficiales PAES Regular - Admisión 2027', 'Listado oficial del DEMRE con el temario completo de las 5 pruebas: qué contenidos entran, organizados por eje temático.', 'https://demre.cl/la-prueba/pruebas-y-temarios/presentacion-pruebas-temarios-paes-regular', 'DEMRE', 1),

((SELECT id FROM materias WHERE slug = 'competencia-lectora'), 'oficial', 'Temario oficial - Competencia Lectora', 'Documento oficial del DEMRE con los Objetivos de Aprendizaje evaluados en la prueba.', 'https://demre.cl/la-prueba/pruebas-y-temarios/presentacion-pruebas-temarios-paes-regular', 'DEMRE', 2),

((SELECT id FROM materias WHERE slug = 'matematica-m1'), 'oficial', 'Temario oficial - Matemática M1', 'Documento oficial del DEMRE con los contenidos evaluados en la prueba de Competencia Matemática 1.', 'https://demre.cl/la-prueba/pruebas-y-temarios/presentacion-pruebas-temarios-paes-regular', 'DEMRE', 3),

((SELECT id FROM materias WHERE slug = 'matematica-m2'), 'oficial', 'Temario oficial - Matemática M2', 'Documento oficial del DEMRE con los contenidos evaluados en la prueba de Competencia Matemática 2.', 'https://demre.cl/la-prueba/pruebas-y-temarios/presentacion-pruebas-temarios-paes-regular', 'DEMRE', 4),

((SELECT id FROM materias WHERE slug = 'ciencias'), 'oficial', 'Temario oficial - Ciencias', 'Documento oficial del DEMRE con los contenidos evaluados en el módulo común y los módulos electivos de Ciencias.', 'https://demre.cl/la-prueba/pruebas-y-temarios/presentacion-pruebas-temarios-paes-regular', 'DEMRE', 5),

((SELECT id FROM materias WHERE slug = 'historia'), 'oficial', 'Temario oficial - Historia y Cs. Sociales', 'Documento oficial del DEMRE con los contenidos evaluados en la prueba electiva de Historia y Ciencias Sociales.', 'https://demre.cl/la-prueba/pruebas-y-temarios/presentacion-pruebas-temarios-paes-regular', 'DEMRE', 6),

(NULL, 'ensayo', 'Pruebas PAES rendidas y clavijeros oficiales', 'Exámenes PAES Regular ya aplicados en procesos anteriores, junto a sus claves de respuesta oficiales (clavijeros). La forma más realista de practicar con el formato exacto del examen.', 'https://demre.cl/publicaciones/2026/pruebas-oficiales-paes-regular-p2026', 'DEMRE', 7);
