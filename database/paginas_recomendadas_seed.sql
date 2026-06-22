-- Recursos verificados: ambos son gratuitos, sin necesidad de pago, y
-- vigentes a la fecha (confirmado en mineduc.gob.cl y khanacademy.org).
-- psql -U postgres -d paes_mentor -f database/paginas_recomendadas_seed.sql

INSERT INTO paginas_recomendadas (materia_id, titulo, descripcion, url, orden) VALUES
(NULL, 'Aprendo en Línea (Mineduc)', 'Plataforma oficial del Ministerio de Educación, con recursos gratuitos por asignatura y nivel, incluyendo una sección de preparación para la admisión a la educación superior.', 'https://aprendoenlinea.mineduc.gob.cl/', 1),

((SELECT id FROM materias WHERE slug = 'competencia-lectora'), 'Khan Academy - Lectura y escritura', 'Lecciones y ejercicios gratuitos de comprensión lectora, en español y sin publicidad.', 'https://es.khanacademy.org/', 2),
((SELECT id FROM materias WHERE slug = 'matematica-m1'), 'Khan Academy - Matemática', 'Videos y ejercicios interactivos de números, álgebra, geometría y probabilidad, organizados por nivel.', 'https://es.khanacademy.org/math', 2),
((SELECT id FROM materias WHERE slug = 'matematica-m2'), 'Khan Academy - Matemática avanzada', 'Cubre los mismos ejes que M1, además de contenidos de profundización como funciones cuadráticas y vectores.', 'https://es.khanacademy.org/math', 2),
((SELECT id FROM materias WHERE slug = 'ciencias'), 'Khan Academy - Ciencias', 'Biología, física y química explicadas paso a paso, con ejercicios de práctica gratuitos.', 'https://es.khanacademy.org/science', 2),
((SELECT id FROM materias WHERE slug = 'historia'), 'Khan Academy - Humanidades', 'Recursos de historia y ciencias sociales en español, útiles como complemento al temario oficial.', 'https://es.khanacademy.org/humanities', 2);
