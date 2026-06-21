-- Datos de prueba (seed) para la sección Materias.
-- Ejecutar DESPUÉS de database/schema.sql:
-- psql -U postgres -d paes_mentor -f database/seed.sql
--
-- Los nombres de las unidades NO están inventados: corresponden a los
-- ejes temáticos reales publicados por el DEMRE para el Proceso de
-- Admisión 2027 (verificado en demre.cl). Los contenidos, fórmulas y
-- ejercicios de ejemplo sí son redactados para esta plataforma; en el
-- futuro se ampliarán con material curado a partir de los documentos
-- oficiales (guías, ensayos) vía el sistema RAG de la Fase 6.

-- ============================================================
-- MATERIAS
-- ============================================================
INSERT INTO materias (slug, nombre, descripcion, color_accent, orden) VALUES
('competencia-lectora', 'Competencia Lectora', 'Comprensión, análisis e interpretación de textos.', '#C084FC', 1),
('matematica-m1', 'Matemática M1', 'Números, álgebra, geometría, probabilidad y estadística.', '#5EEAD4', 2),
('matematica-m2', 'Matemática M2', 'Profundización matemática, exigida por carreras específicas.', '#60A5FA', 3),
('ciencias', 'Ciencias', 'Biología, física y química, con módulos electivos.', '#4ADE80', 4),
('historia', 'Historia y Cs. Sociales', 'Procesos históricos, formación ciudadana y economía.', '#FB7185', 5);

-- ============================================================
-- UNIDADES (ejes temáticos oficiales por materia)
-- ============================================================
INSERT INTO unidades (materia_id, nombre, descripcion, orden)
SELECT m.id, v.nombre, v.descripcion, v.orden
FROM (VALUES
  ('competencia-lectora', 'Localizar información explícita', 'Ubicar datos puntuales escritos directamente en el texto.', 1),
  ('competencia-lectora', 'Interpretar y relacionar contenidos', 'Construir significados a partir de relaciones entre ideas del texto.', 2),
  ('competencia-lectora', 'Reflexionar y evaluar el texto', 'Evaluar la forma y el contenido de lo leído.', 3),

  ('matematica-m1', 'Números', 'Operatoria y problemas con números racionales.', 1),
  ('matematica-m1', 'Álgebra y funciones', 'Ecuaciones, funciones lineales y cuadráticas.', 2),
  ('matematica-m1', 'Geometría', 'Figuras, perímetros, áreas y volúmenes.', 3),
  ('matematica-m1', 'Probabilidad y estadística', 'Medidas de tendencia central y probabilidad básica.', 4),

  ('matematica-m2', 'Números y matemática financiera', 'Interés, créditos y logaritmos.', 1),
  ('matematica-m2', 'Álgebra y funciones avanzadas', 'Funciones cuadráticas y sus propiedades.', 2),
  ('matematica-m2', 'Geometría vectorial y analítica', 'Vectores y geometría en el plano.', 3),
  ('matematica-m2', 'Probabilidad y estadística avanzada', 'Probabilidad condicional y distribuciones.', 4),

  ('ciencias', 'Biología', 'Procesos celulares, genética y sistemas del cuerpo humano.', 1),
  ('ciencias', 'Física', 'Movimiento, fuerzas y energía.', 2),
  ('ciencias', 'Química', 'Soluciones, reacciones y estructura de la materia.', 3),

  ('historia', 'Historia: Mundo, América y Chile', 'Procesos históricos comparados en distintas escalas.', 1),
  ('historia', 'Formación ciudadana', 'Participación, derechos y deberes ciudadanos.', 2),
  ('historia', 'Sistema económico', 'Funcionamiento del mercado y rol del Estado.', 3)
) AS v(materia_slug, nombre, descripcion, orden)
JOIN materias m ON m.slug = v.materia_slug;

-- ============================================================
-- CONTENIDOS (uno por unidad, a modo de ejemplo)
-- ============================================================
INSERT INTO contenidos (unidad_id, titulo, cuerpo, orden) VALUES
((SELECT id FROM unidades WHERE nombre = 'Localizar información explícita'), 'Información explícita vs. implícita', 'La información explícita aparece directamente escrita en el texto, sin que el lector deba inferir nada. Preguntas de este tipo piden ubicar un dato puntual: una fecha, un nombre o una cifra. La estrategia más efectiva es escanear el texto buscando palabras clave de la pregunta antes de leerlo completo en detalle.', 1),
((SELECT id FROM unidades WHERE nombre = 'Interpretar y relacionar contenidos'), 'Inferencias y relaciones entre ideas', 'Estas preguntas piden construir un significado que no está escrito literalmente, sino que se deduce a partir de pistas del texto: relaciones de causa-efecto, comparaciones, o el propósito de un párrafo. La clave es apoyarse siempre en evidencia textual, nunca en conocimiento previo del tema.', 1),
((SELECT id FROM unidades WHERE nombre = 'Reflexionar y evaluar el texto'), 'Evaluar forma y contenido', 'Estas preguntas piden un paso más allá de comprender: opinar fundadamente sobre la calidad, intención o efectividad del texto. Siempre se responde con base en lo que el texto permite sostener, no con opiniones personales del estudiante.', 1),

((SELECT id FROM unidades WHERE nombre = 'Números'), 'Porcentajes', 'Un porcentaje representa una parte de un total dividido en 100 partes iguales. Para calcular el P% de una cantidad A, se multiplica A por P y se divide por 100. Aparece constantemente en problemas de descuentos, aumentos e intereses.', 1),
((SELECT id FROM unidades WHERE nombre = 'Álgebra y funciones'), 'Función lineal', 'Una función lineal tiene la forma f(x) = mx + n, donde m es la pendiente y n es el coeficiente de posición. Su gráfico siempre es una línea recta.', 1),
((SELECT id FROM unidades WHERE nombre = 'Geometría'), 'Teorema de Pitágoras', 'En todo triángulo rectángulo, el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos. Se usa para encontrar un lado desconocido cuando se conocen los otros dos.', 1),
((SELECT id FROM unidades WHERE nombre = 'Probabilidad y estadística'), 'Medidas de tendencia central', 'El promedio resume un conjunto de datos en un solo valor representativo. Se calcula sumando todos los datos y dividiendo por la cantidad de datos. Es distinto de la mediana y la moda.', 1),

((SELECT id FROM unidades WHERE nombre = 'Números y matemática financiera'), 'Interés simple', 'El interés simple es una ganancia o costo calculado solo sobre el capital inicial, sin acumular intereses sobre intereses previos. Aparece en problemas de créditos, ahorros e inversiones básicas.', 1),
((SELECT id FROM unidades WHERE nombre = 'Álgebra y funciones avanzadas'), 'Función cuadrática', 'La función cuadrática f(x) = ax^2 + bx + c tiene como gráfico una parábola. El signo de "a" determina si se abre hacia arriba o hacia abajo, y su vértice corresponde al punto máximo o mínimo.', 1),
((SELECT id FROM unidades WHERE nombre = 'Geometría vectorial y analítica'), 'Vectores en el plano', 'Un vector representa una magnitud con dirección y sentido, definida por sus componentes en los ejes x e y. Se usa para describir desplazamientos, fuerzas y posiciones relativas entre puntos.', 1),
((SELECT id FROM unidades WHERE nombre = 'Probabilidad y estadística avanzada'), 'Probabilidad condicional', 'Mide la probabilidad de que ocurra un evento A, sabiendo que ya ocurrió otro evento B. Es distinta de la probabilidad simple porque restringe el espacio muestral a los casos donde B ya sucedió.', 1),

((SELECT id FROM unidades WHERE nombre = 'Biología'), 'Mitosis y meiosis', 'La mitosis es la división celular que produce dos células hijas idénticas, fundamental para el crecimiento y la reparación de tejidos. La meiosis produce células sexuales con la mitad de la información genética, esencial para la reproducción sexual.', 1),
((SELECT id FROM unidades WHERE nombre = 'Física'), 'Movimiento rectilíneo uniforme', 'Un cuerpo tiene movimiento rectilíneo uniforme (MRU) cuando recorre distancias iguales en intervalos de tiempo iguales: su velocidad es constante y no cambia de dirección.', 1),
((SELECT id FROM unidades WHERE nombre = 'Química'), 'Concentración de soluciones', 'Una solución está formada por un soluto disuelto en un solvente. La concentración indica qué cantidad de soluto hay disuelta en una cantidad determinada de solución.', 1),

((SELECT id FROM unidades WHERE nombre = 'Historia: Mundo, América y Chile'), 'Procesos históricos comparados', 'Este eje aborda procesos históricos relevantes a escala mundial, americana y chilena, poniendo énfasis en establecer relaciones entre ellos: cómo un proceso global influyó en eventos locales.', 1),
((SELECT id FROM unidades WHERE nombre = 'Formación ciudadana'), 'Participación ciudadana y democracia', 'Este eje evalúa la comprensión de los mecanismos mediante los cuales las personas participan en la vida pública: el voto, los plebiscitos, las organizaciones sociales y los espacios de deliberación.', 1),
((SELECT id FROM unidades WHERE nombre = 'Sistema económico'), 'Funcionamiento del mercado', 'Este eje analiza cómo se organiza la actividad económica: el rol de la oferta y la demanda, el funcionamiento de los mercados, y el papel del Estado y los consumidores.', 1);

-- ============================================================
-- FÓRMULAS Y RESÚMENES (donde aplica: matemática y ciencias)
-- ============================================================
INSERT INTO formulas (unidad_id, titulo, expresion, explicacion, orden) VALUES
((SELECT id FROM unidades WHERE nombre = 'Números'), 'Porcentaje de una cantidad', 'P% de A = (P / 100) x A', 'Útil para calcular descuentos, aumentos y cualquier problema que pida "el X% de algo".', 1),
((SELECT id FROM unidades WHERE nombre = 'Álgebra y funciones'), 'Pendiente de una recta', 'm = (y2 - y1) / (x2 - x1)', 'Permite calcular qué tan inclinada está una recta a partir de dos puntos conocidos.', 1),
((SELECT id FROM unidades WHERE nombre = 'Geometría'), 'Teorema de Pitágoras', 'a^2 + b^2 = c^2', 'c es la hipotenusa; a y b son los catetos.', 1),
((SELECT id FROM unidades WHERE nombre = 'Probabilidad y estadística'), 'Promedio', 'Promedio = (suma de los datos) / (cantidad de datos)', 'La medida de tendencia central más usada, pero sensible a valores extremos.', 1),

((SELECT id FROM unidades WHERE nombre = 'Números y matemática financiera'), 'Interés simple', 'I = C x i x t', 'C es el capital, i la tasa de interés (en decimal) y t el tiempo. El monto final es C + I.', 1),
((SELECT id FROM unidades WHERE nombre = 'Álgebra y funciones avanzadas'), 'Vértice de una parábola', 'x_v = -b / (2a)', 'Reemplazando x_v en f(x) se obtiene la coordenada y del vértice.', 1),
((SELECT id FROM unidades WHERE nombre = 'Geometría vectorial y analítica'), 'Magnitud de un vector', '|v| = raiz(x^2 + y^2)', 'Calcula el largo de un vector a partir de sus componentes.', 1),
((SELECT id FROM unidades WHERE nombre = 'Probabilidad y estadística avanzada'), 'Probabilidad condicional', 'P(A|B) = P(A y B) / P(B)', 'Se lee "probabilidad de A dado B".', 1),

((SELECT id FROM unidades WHERE nombre = 'Física'), 'Velocidad', 'v = d / t', 'v es la velocidad, d la distancia recorrida y t el tiempo empleado.', 1),
((SELECT id FROM unidades WHERE nombre = 'Química'), 'Concentración %m/v', '%m/v = (masa de soluto / volumen de solución) x 100', 'Expresa la concentración como gramos de soluto por cada 100 mL de solución.', 1);

-- ============================================================
-- EJERCICIOS (uno por unidad, formato selección múltiple PAES)
-- ============================================================
INSERT INTO ejercicios (unidad_id, enunciado, alternativas, respuesta_correcta, explicacion, dificultad, orden) VALUES
((SELECT id FROM unidades WHERE nombre = 'Localizar información explícita'),
 'Texto: "La Reserva Nacional Las Vicuñas, ubicada en la Región de Arica y Parinacota, protege una población de vicuñas que en los años 70 estuvo al borde de la extinción." Según el texto, ¿dónde se ubica la reserva?',
 '[{"letra":"A","texto":"Región de Tarapacá"},{"letra":"B","texto":"Región de Arica y Parinacota"},{"letra":"C","texto":"Región de Antofagasta"},{"letra":"D","texto":"Región de Atacama"}]'::jsonb,
 'B', 'El texto lo indica de forma explícita en la primera línea: "ubicada en la Región de Arica y Parinacota". No es necesario inferir nada, solo localizar el dato.', 'baja', 1),

((SELECT id FROM unidades WHERE nombre = 'Interpretar y relacionar contenidos'),
 'Texto: "El cóndor andino puede llegar a pesar 15 kilos. Sin embargo, su gran envergadura le permite planear durante horas sin apenas batir las alas." ¿Qué función cumple la palabra "sin embargo" en el texto?',
 '[{"letra":"A","texto":"Introduce un ejemplo"},{"letra":"B","texto":"Establece un contraste entre el peso del ave y su capacidad de vuelo"},{"letra":"C","texto":"Resume la idea anterior"},{"letra":"D","texto":"Plantea una pregunta retórica"}]'::jsonb,
 'B', '"Sin embargo" es un conector que marca contraste: el peso parece una desventaja para volar, pero la envergadura compensa eso.', 'media', 1),

((SELECT id FROM unidades WHERE nombre = 'Reflexionar y evaluar el texto'),
 'Texto: "Deberíamos prohibir el uso de bolsas plásticas porque dañan el medioambiente." ¿Qué le falta a este argumento para estar mejor fundamentado?',
 '[{"letra":"A","texto":"Una opinión personal"},{"letra":"B","texto":"Evidencia o datos que respalden la afirmación"},{"letra":"C","texto":"Una pregunta retórica"},{"letra":"D","texto":"Un adjetivo calificativo"}]'::jsonb,
 'B', 'El argumento presenta una afirmación pero no la respalda con evidencia. Evaluar un texto implica identificar este tipo de vacíos argumentativos.', 'media', 1),

((SELECT id FROM unidades WHERE nombre = 'Números'),
 'Una mochila cuesta $24.000 y tiene un descuento del 25%. ¿Cuál es su precio final?',
 '[{"letra":"A","texto":"$6.000"},{"letra":"B","texto":"$18.000"},{"letra":"C","texto":"$20.000"},{"letra":"D","texto":"$24.250"}]'::jsonb,
 'B', 'El descuento es 25% de 24.000 = 6.000. El precio final es 24.000 - 6.000 = $18.000.', 'baja', 1),

((SELECT id FROM unidades WHERE nombre = 'Álgebra y funciones'),
 'Una recta pasa por los puntos (1, 3) y (3, 7). ¿Cuál es su pendiente?',
 '[{"letra":"A","texto":"1"},{"letra":"B","texto":"2"},{"letra":"C","texto":"3"},{"letra":"D","texto":"4"}]'::jsonb,
 'B', 'm = (7-3)/(3-1) = 4/2 = 2.', 'media', 1),

((SELECT id FROM unidades WHERE nombre = 'Geometría'),
 'Un triángulo rectángulo tiene catetos de 6 cm y 8 cm. ¿Cuánto mide su hipotenusa?',
 '[{"letra":"A","texto":"9 cm"},{"letra":"B","texto":"10 cm"},{"letra":"C","texto":"12 cm"},{"letra":"D","texto":"14 cm"}]'::jsonb,
 'B', 'c^2 = 6^2 + 8^2 = 36 + 64 = 100, por lo tanto c = raiz(100) = 10 cm.', 'media', 1),

((SELECT id FROM unidades WHERE nombre = 'Probabilidad y estadística'),
 'Las notas de un estudiante fueron 5,5 - 6,0 - 4,5 - 6,0. ¿Cuál es su promedio?',
 '[{"letra":"A","texto":"5,0"},{"letra":"B","texto":"5,5"},{"letra":"C","texto":"5,75"},{"letra":"D","texto":"6,0"}]'::jsonb,
 'B', '(5,5+6,0+4,5+6,0)/4 = 22/4 = 5,5.', 'baja', 1),

((SELECT id FROM unidades WHERE nombre = 'Números y matemática financiera'),
 'Se invierten $100.000 a una tasa de interés simple del 2% mensual durante 3 meses. ¿Cuánto interés se gana?',
 '[{"letra":"A","texto":"$2.000"},{"letra":"B","texto":"$4.000"},{"letra":"C","texto":"$6.000"},{"letra":"D","texto":"$8.000"}]'::jsonb,
 'C', 'I = 100.000 x 0,02 x 3 = $6.000.', 'media', 1),

((SELECT id FROM unidades WHERE nombre = 'Álgebra y funciones avanzadas'),
 '¿Cuál es la coordenada x del vértice de f(x) = x^2 - 4x + 3?',
 '[{"letra":"A","texto":"1"},{"letra":"B","texto":"2"},{"letra":"C","texto":"3"},{"letra":"D","texto":"4"}]'::jsonb,
 'B', 'x_v = -(-4)/(2x1) = 4/2 = 2.', 'media', 1),

((SELECT id FROM unidades WHERE nombre = 'Geometría vectorial y analítica'),
 '¿Cuál es la magnitud del vector v = (3, 4)?',
 '[{"letra":"A","texto":"5"},{"letra":"B","texto":"6"},{"letra":"C","texto":"7"},{"letra":"D","texto":"12"}]'::jsonb,
 'A', '|v| = raiz(3^2 + 4^2) = raiz(9+16) = raiz(25) = 5.', 'media', 1),

((SELECT id FROM unidades WHERE nombre = 'Probabilidad y estadística avanzada'),
 'En una bolsa hay 5 bolitas rojas y 3 azules. Si se saca una bolita al azar y es roja (sin devolverla), ¿cuál es la probabilidad de que la segunda también sea roja?',
 '[{"letra":"A","texto":"4/7"},{"letra":"B","texto":"5/8"},{"letra":"C","texto":"4/8"},{"letra":"D","texto":"5/7"}]'::jsonb,
 'A', 'Tras sacar una roja quedan 4 rojas y 3 azules, total 7. P = 4/7.', 'alta', 1),

((SELECT id FROM unidades WHERE nombre = 'Biología'),
 '¿Cuál de los siguientes procesos produce células con la mitad de los cromosomas de la célula original?',
 '[{"letra":"A","texto":"Mitosis"},{"letra":"B","texto":"Meiosis"},{"letra":"C","texto":"Fotosíntesis"},{"letra":"D","texto":"Fermentación"}]'::jsonb,
 'B', 'La meiosis reduce a la mitad el número de cromosomas, generando gametos (óvulos y espermatozoides).', 'media', 1),

((SELECT id FROM unidades WHERE nombre = 'Física'),
 'Un auto recorre 180 km en 3 horas a velocidad constante. ¿Cuál es su velocidad?',
 '[{"letra":"A","texto":"45 km/h"},{"letra":"B","texto":"60 km/h"},{"letra":"C","texto":"90 km/h"},{"letra":"D","texto":"540 km/h"}]'::jsonb,
 'B', 'v = 180/3 = 60 km/h.', 'baja', 1),

((SELECT id FROM unidades WHERE nombre = 'Química'),
 'Se disuelven 20 g de sal en agua hasta completar 200 mL de solución. ¿Cuál es su concentración %m/v?',
 '[{"letra":"A","texto":"5%"},{"letra":"B","texto":"10%"},{"letra":"C","texto":"20%"},{"letra":"D","texto":"40%"}]'::jsonb,
 'B', '%m/v = (20/200) x 100 = 10%.', 'media', 1),

((SELECT id FROM unidades WHERE nombre = 'Historia: Mundo, América y Chile'),
 '¿Cuál de los siguientes procesos corresponde a un fenómeno de alcance mundial que influyó directamente en la historia política de América Latina durante el siglo XX?',
 '[{"letra":"A","texto":"La Revolución Industrial"},{"letra":"B","texto":"La Guerra Fría"},{"letra":"C","texto":"El Renacimiento"},{"letra":"D","texto":"La Primera Guerra Médica"}]'::jsonb,
 'B', 'La Guerra Fría (1947-1991) generó una fuerte influencia ideológica y política en América Latina, incluyendo a Chile, a través de la polarización entre bloques.', 'media', 1),

((SELECT id FROM unidades WHERE nombre = 'Formación ciudadana'),
 '¿Cuál de las siguientes opciones corresponde a un mecanismo de participación ciudadana directa?',
 '[{"letra":"A","texto":"La elección de representantes en el Congreso"},{"letra":"B","texto":"Un plebiscito"},{"letra":"C","texto":"El nombramiento de ministros"},{"letra":"D","texto":"La promulgación de una ley"}]'::jsonb,
 'B', 'Un plebiscito consulta directamente a la ciudadanía sobre una decisión, a diferencia de los mecanismos representativos como elegir parlamentarios.', 'baja', 1),

((SELECT id FROM unidades WHERE nombre = 'Sistema económico'),
 'Si la demanda de un producto aumenta y su oferta se mantiene constante, ¿qué es más probable que ocurra con su precio?',
 '[{"letra":"A","texto":"Disminuya"},{"letra":"B","texto":"Se mantenga igual"},{"letra":"C","texto":"Aumente"},{"letra":"D","texto":"Desaparezca del mercado"}]'::jsonb,
 'C', 'Cuando la demanda sube y la oferta no cambia, la escasez relativa tiende a presionar el precio al alza.', 'baja', 1);