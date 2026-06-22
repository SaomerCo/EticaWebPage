-- Forzar UTF-8 antes de leer cualquier carácter especial.
-- Necesario en Windows donde psql usa WIN1252 por defecto.
\encoding UTF8

-- Banco de preguntas ampliado: 4 preguntas adicionales por unidad.
-- Las preguntas de matemáticas y ciencias usan delimitadores $...$
-- para expresiones LaTeX, que MathText.jsx renderiza con KaTeX.
-- Las alternativas llevan la letra del enunciado ("A", "B", "C", "D")
-- pero NO el texto de la opción correcta — eso vive en respuesta_correcta.
--
-- psql -U postgres -d paes_mentor -f database/ejercicios_extra_seed.sql

-- ============================================================
-- COMPETENCIA LECTORA — Localizar información explícita
-- ============================================================
INSERT INTO ejercicios (unidad_id, enunciado, alternativas, respuesta_correcta, explicacion, dificultad, orden) VALUES

((SELECT id FROM unidades WHERE nombre = 'Localizar información explícita'),
 'Texto: "El Acuerdo de París fue firmado en 2015 por 196 países y entró en vigor en noviembre de 2016." Según el texto, ¿en qué año entró en vigor el Acuerdo de París?',
 '[{"letra":"A","texto":"2014"},{"letra":"B","texto":"2015"},{"letra":"C","texto":"2016"},{"letra":"D","texto":"2017"}]'::jsonb,
 'C', 'El texto indica explícitamente "entró en vigor en noviembre de 2016". Es un dato directo, sin necesidad de inferencia.', 'baja', 2),

((SELECT id FROM unidades WHERE nombre = 'Localizar información explícita'),
 'Texto: "La ballena azul puede pesar hasta 180 toneladas y mide entre 24 y 33 metros." ¿Cuál es el peso máximo que puede alcanzar la ballena azul según el texto?',
 '[{"letra":"A","texto":"24 toneladas"},{"letra":"B","texto":"33 toneladas"},{"letra":"C","texto":"150 toneladas"},{"letra":"D","texto":"180 toneladas"}]'::jsonb,
 'D', 'El texto dice "puede pesar hasta 180 toneladas". El dato es explícito y exacto.', 'baja', 3),

((SELECT id FROM unidades WHERE nombre = 'Localizar información explícita'),
 'Texto: "El español es hablado por aproximadamente 580 millones de personas como lengua materna o segunda lengua, siendo el segundo idioma más hablado del mundo." ¿Qué lugar ocupa el español entre los idiomas más hablados?',
 '[{"letra":"A","texto":"Primero"},{"letra":"B","texto":"Segundo"},{"letra":"C","texto":"Tercero"},{"letra":"D","texto":"Cuarto"}]'::jsonb,
 'B', 'El texto lo indica directamente al final: "siendo el segundo idioma más hablado del mundo".', 'baja', 4),

((SELECT id FROM unidades WHERE nombre = 'Localizar información explícita'),
 'Texto: "El volcán Ojos del Salado, en la frontera entre Chile y Argentina, es el volcán activo más alto del mundo con 6.893 metros de altitud." ¿En qué frontera se ubica el volcán Ojos del Salado?',
 '[{"letra":"A","texto":"Chile y Bolivia"},{"letra":"B","texto":"Chile y Perú"},{"letra":"C","texto":"Chile y Argentina"},{"letra":"D","texto":"Argentina y Bolivia"}]'::jsonb,
 'C', 'El texto dice explícitamente "en la frontera entre Chile y Argentina".', 'baja', 5),

-- ============================================================
-- COMPETENCIA LECTORA — Interpretar y relacionar contenidos
-- ============================================================

((SELECT id FROM unidades WHERE nombre = 'Interpretar y relacionar contenidos'),
 'Texto: "La ciudad creció sin planificación durante décadas. Como consecuencia, hoy enfrenta graves problemas de transporte y falta de áreas verdes." ¿Qué relación existe entre las dos oraciones?',
 '[{"letra":"A","texto":"La segunda oración contradice a la primera"},{"letra":"B","texto":"La segunda oración presenta el efecto de lo descrito en la primera"},{"letra":"C","texto":"La segunda oración ejemplifica la primera"},{"letra":"D","texto":"La segunda oración define un concepto de la primera"}]'::jsonb,
 'B', 'La palabra "consecuencia" al comienzo de la segunda oración marca explícitamente una relación de causa-efecto.', 'media', 2),

((SELECT id FROM unidades WHERE nombre = 'Interpretar y relacionar contenidos'),
 'Texto: "Aunque el libro tiene casi mil páginas, su lectura es ágil y entretenida." ¿Qué función cumple la palabra "aunque" en la oración?',
 '[{"letra":"A","texto":"Introduce una causa"},{"letra":"B","texto":"Establece una consecuencia"},{"letra":"C","texto":"Presenta una concesión"},{"letra":"D","texto":"Enumera ideas"}]'::jsonb,
 'C', '"Aunque" introduce una concesión: admite algo que podría ser un obstáculo (la extensión) antes de presentar lo contrario (la agilidad).', 'media', 3),

((SELECT id FROM unidades WHERE nombre = 'Interpretar y relacionar contenidos'),
 'Texto: "Era un hombre de pocas palabras. Sin embargo, cuando hablaba, todos guardaban silencio." ¿Qué se puede inferir del personaje?',
 '[{"letra":"A","texto":"Era tímido y antisocial"},{"letra":"B","texto":"Sus palabras tenían peso e importancia para quienes lo rodeaban"},{"letra":"C","texto":"Hablaba muy lentamente"},{"letra":"D","texto":"Nadie quería escucharlo"}]'::jsonb,
 'B', 'Si todos guardaban silencio cuando hablaba, se infiere que sus palabras eran valoradas. La alternativa A no se puede sostener con el texto.', 'media', 4),

((SELECT id FROM unidades WHERE nombre = 'Interpretar y relacionar contenidos'),
 'Texto: "La tecnología puede ser una herramienta poderosa para la educación, pero solo si se usa con propósito y acompañamiento." ¿Cuál es la idea central del texto?',
 '[{"letra":"A","texto":"La tecnología siempre mejora la educación"},{"letra":"B","texto":"La tecnología es perjudicial en la educación"},{"letra":"C","texto":"La tecnología tiene valor educativo solo en condiciones específicas"},{"letra":"D","texto":"La educación no necesita tecnología"}]'::jsonb,
 'C', 'El texto condiciona el valor de la tecnología ("solo si se usa con propósito y acompañamiento"), lo que implica que no es positiva en forma incondicional.', 'alta', 5),

-- ============================================================
-- COMPETENCIA LECTORA — Reflexionar y evaluar el texto
-- ============================================================

((SELECT id FROM unidades WHERE nombre = 'Reflexionar y evaluar el texto'),
 '¿Cuál de los siguientes títulos sería más apropiado para un texto que argumenta que el trabajo remoto mejora la productividad?',
 '[{"letra":"A","texto":"El teletrabajo: una moda pasajera"},{"letra":"B","texto":"El trabajo desde casa y sus ventajas para el rendimiento laboral"},{"letra":"C","texto":"Por qué las oficinas son insustituibles"},{"letra":"D","texto":"Historia del trabajo a distancia"}]'::jsonb,
 'B', 'Un título debe anticipar la postura del texto. La alternativa B anuncia exactamente el tema y la tesis del texto.', 'media', 2),

((SELECT id FROM unidades WHERE nombre = 'Reflexionar y evaluar el texto'),
 'Un texto afirma: "Según un estudio de nuestra empresa, el 90% de los clientes prefiere nuestro producto." ¿Cuál es el principal problema con esta evidencia?',
 '[{"letra":"A","texto":"El porcentaje es demasiado alto"},{"letra":"B","texto":"La fuente tiene interés directo en el resultado, lo que puede generar sesgo"},{"letra":"C","texto":"No se menciona el nombre del producto"},{"letra":"D","texto":"El estudio es muy reciente"}]'::jsonb,
 'B', 'Una empresa que evalúa su propio producto no es una fuente neutral. Eso no invalida el dato automáticamente, pero obliga a tratarlo con precaución.', 'alta', 3),

((SELECT id FROM unidades WHERE nombre = 'Reflexionar y evaluar el texto'),
 'Texto: "Todo joven debería leer al menos un libro al mes. La lectura forma ciudadanos más críticos y empáticos." ¿Qué tipo de texto es este?',
 '[{"letra":"A","texto":"Narrativo, porque cuenta una historia"},{"letra":"B","texto":"Descriptivo, porque detalla características"},{"letra":"C","texto":"Argumentativo, porque defiende una postura con razones"},{"letra":"D","texto":"Informativo, porque entrega datos objetivos"}]'::jsonb,
 'C', 'El texto presenta una postura ("todo joven debería leer") y la justifica con razones ("forma ciudadanos más críticos y empáticos"), estructura propia de un texto argumentativo.', 'media', 4),

((SELECT id FROM unidades WHERE nombre = 'Reflexionar y evaluar el texto'),
 'Un texto periodístico sobre un incendio describe los hechos en el primer párrafo, luego cita a testigos, y cierra con declaraciones de las autoridades. ¿Qué característica de los textos periodísticos evidencia esta estructura?',
 '[{"letra":"A","texto":"El uso de lenguaje literario y metafórico"},{"letra":"B","texto":"La pirámide invertida: lo más relevante al inicio"},{"letra":"C","texto":"La narración cronológica de los hechos"},{"letra":"D","texto":"El uso de un narrador omnisciente"}]'::jsonb,
 'B', 'La "pirámide invertida" es la estructura clásica del periodismo: los datos más importantes van al inicio, y los detalles y contexto van después.', 'alta', 5),

-- ============================================================
-- MATEMÁTICA M1 — Números
-- ============================================================

((SELECT id FROM unidades WHERE nombre = 'Números'),
 '¿Cuánto es $\frac{3}{4} + \frac{1}{3}$?',
 '[{"letra":"A","texto":"4/7"},{"letra":"B","texto":"4/12"},{"letra":"C","texto":"13/12"},{"letra":"D","texto":"5/7"}]'::jsonb,
 'C', '$\frac{3}{4} + \frac{1}{3} = \frac{9}{12} + \frac{4}{12} = \frac{13}{12}$. Hay que buscar el mínimo común denominador (12) antes de sumar.', 'baja', 2),

((SELECT id FROM unidades WHERE nombre = 'Números'),
 'Un producto aumenta 20% y luego baja 20%. ¿Cuál es el precio final respecto al original?',
 '[{"letra":"A","texto":"Igual al original"},{"letra":"B","texto":"4% menos que el original"},{"letra":"C","texto":"4% más que el original"},{"letra":"D","texto":"10% menos que el original"}]'::jsonb,
 'B', 'Si el precio original es 100: sube a 120, luego baja 20% de 120 = 24, quedando en 96. Es 4% menos que el original.', 'media', 3),

((SELECT id FROM unidades WHERE nombre = 'Números'),
 'Si $\frac{3}{x} = \frac{1}{4}$, ¿cuánto vale $x$?',
 '[{"letra":"A","texto":"3"},{"letra":"B","texto":"6"},{"letra":"C","texto":"9"},{"letra":"D","texto":"12"}]'::jsonb,
 'D', 'Multiplicando en cruz: $3 \times 4 = 1 \times x$, entonces $x = 12$.', 'media', 4),

((SELECT id FROM unidades WHERE nombre = 'Números'),
 'En una sala hay 24 alumnos. Si $\frac{3}{8}$ aprobó el examen, ¿cuántos alumnos aprobaron?',
 '[{"letra":"A","texto":"6"},{"letra":"B","texto":"8"},{"letra":"C","texto":"9"},{"letra":"D","texto":"10"}]'::jsonb,
 'C', '$\frac{3}{8} \times 24 = \frac{72}{8} = 9$ alumnos.', 'baja', 5),

-- ============================================================
-- MATEMÁTICA M1 — Álgebra y funciones
-- ============================================================

((SELECT id FROM unidades WHERE nombre = 'Álgebra y funciones'),
 '¿Cuál es el valor de $x$ en la ecuación $3x - 7 = 14$?',
 '[{"letra":"A","texto":"5"},{"letra":"B","texto":"6"},{"letra":"C","texto":"7"},{"letra":"D","texto":"9"}]'::jsonb,
 'C', '$3x = 14 + 7 = 21$, entonces $x = \frac{21}{3} = 7$.', 'baja', 2),

((SELECT id FROM unidades WHERE nombre = 'Álgebra y funciones'),
 'Si $f(x) = 2x + 5$, ¿cuánto vale $f(3)$?',
 '[{"letra":"A","texto":"8"},{"letra":"B","texto":"9"},{"letra":"C","texto":"11"},{"letra":"D","texto":"13"}]'::jsonb,
 'C', '$f(3) = 2(3) + 5 = 6 + 5 = 11$.', 'baja', 3),

((SELECT id FROM unidades WHERE nombre = 'Álgebra y funciones'),
 'Se venden $x$ naranjas a $800 cada una y $y$ paltas a $600 cada una. Si se vendieron 10 frutas en total y se recaudaron $7.200, ¿cuántas naranjas se vendieron?',
 '[{"letra":"A","texto":"3"},{"letra":"B","texto":"4"},{"letra":"C","texto":"5"},{"letra":"D","texto":"6"}]'::jsonb,
 'D', 'Sistema: $x + y = 10$ y $800x + 600y = 7200$. De la primera, $y = 10 - x$. Sustituyendo: $800x + 600(10-x) = 7200 \Rightarrow 200x = 1200 \Rightarrow x = 6$.', 'alta', 4),

((SELECT id FROM unidades WHERE nombre = 'Álgebra y funciones'),
 '¿Cuál es la ecuación de la recta que pasa por $(0, 3)$ y tiene pendiente $-2$?',
 '[{"letra":"A","texto":"$y = 2x + 3$"},{"letra":"B","texto":"$y = -2x - 3$"},{"letra":"C","texto":"$y = -2x + 3$"},{"letra":"D","texto":"$y = 3x - 2$"}]'::jsonb,
 'C', 'Usando la forma $y = mx + n$ con $m = -2$ y $n = 3$ (porque pasa por $(0,3)$): $y = -2x + 3$.', 'media', 5),

-- ============================================================
-- MATEMÁTICA M1 — Geometría
-- ============================================================

((SELECT id FROM unidades WHERE nombre = 'Geometría'),
 '¿Cuál es el área de un rectángulo de 8 cm de largo y 5 cm de ancho?',
 '[{"letra":"A","texto":"13 cm²"},{"letra":"B","texto":"26 cm²"},{"letra":"C","texto":"40 cm²"},{"letra":"D","texto":"80 cm²"}]'::jsonb,
 'C', '$A = largo \times ancho = 8 \times 5 = 40 \text{ cm}^2$.', 'baja', 2),

((SELECT id FROM unidades WHERE nombre = 'Geometría'),
 'Un triángulo tiene base de 10 cm y altura de 6 cm. ¿Cuánto mide su área?',
 '[{"letra":"A","texto":"16 cm²"},{"letra":"B","texto":"30 cm²"},{"letra":"C","texto":"60 cm²"},{"letra":"D","texto":"120 cm²"}]'::jsonb,
 'B', '$A = \frac{b \times h}{2} = \frac{10 \times 6}{2} = 30 \text{ cm}^2$.', 'baja', 3),

((SELECT id FROM unidades WHERE nombre = 'Geometría'),
 'Un círculo tiene radio $r = 7$ cm. ¿Cuál es su circunferencia (aproximando $\pi \approx 3{,}14$)?',
 '[{"letra":"A","texto":"21,98 cm"},{"letra":"B","texto":"43,96 cm"},{"letra":"C","texto":"49 cm"},{"letra":"D","texto":"153,86 cm"}]'::jsonb,
 'B', '$C = 2\pi r = 2 \times 3{,}14 \times 7 = 43{,}96 \text{ cm}$.', 'media', 4),

((SELECT id FROM unidades WHERE nombre = 'Geometría'),
 'Dos triángulos son semejantes. El primero tiene un lado de 4 cm; el lado correspondiente del segundo mide 6 cm. Si otro lado del primero mide 5 cm, ¿cuánto mide el lado correspondiente del segundo?',
 '[{"letra":"A","texto":"6,5 cm"},{"letra":"B","texto":"7 cm"},{"letra":"C","texto":"7,5 cm"},{"letra":"D","texto":"8 cm"}]'::jsonb,
 'C', 'Razón de semejanza: $\frac{6}{4} = 1{,}5$. El lado correspondiente es $5 \times 1{,}5 = 7{,}5$ cm.', 'alta', 5),

-- ============================================================
-- MATEMÁTICA M1 — Probabilidad y estadística
-- ============================================================

((SELECT id FROM unidades WHERE nombre = 'Probabilidad y estadística'),
 'Los datos de un grupo son: 2, 4, 4, 6, 9. ¿Cuál es la mediana?',
 '[{"letra":"A","texto":"2"},{"letra":"B","texto":"4"},{"letra":"C","texto":"5"},{"letra":"D","texto":"6"}]'::jsonb,
 'B', 'Ordenados: 2, 4, 4, 6, 9. La mediana es el valor del medio (posición 3): 4.', 'baja', 2),

((SELECT id FROM unidades WHERE nombre = 'Probabilidad y estadística'),
 'Se lanza un dado de 6 caras. ¿Cuál es la probabilidad de obtener un número mayor que 4?',
 '[{"letra":"A","texto":"$\frac{1}{6}$"},{"letra":"B","texto":"$\frac{1}{3}$"},{"letra":"C","texto":"$\frac{1}{2}$"},{"letra":"D","texto":"$\frac{2}{3}$"}]'::jsonb,
 'B', 'Los números mayores que 4 son 5 y 6: 2 casos favorables de 6 posibles. $P = \frac{2}{6} = \frac{1}{3}$.', 'baja', 3),

((SELECT id FROM unidades WHERE nombre = 'Probabilidad y estadística'),
 'Un estudiante tiene notas: 4,0 - 5,0 - 6,0 - 7,0. Para promediar 5,5, ¿cuánto debe obtener en la quinta prueba?',
 '[{"letra":"A","texto":"4,5"},{"letra":"B","texto":"5,0"},{"letra":"C","texto":"5,5"},{"letra":"D","texto":"6,0"}]'::jsonb,
 'C', 'Promedio deseado 5,5 con 5 notas implica suma total = $5{,}5 \times 5 = 27{,}5$. Suma actual = $4+5+6+7 = 22$. Quinta nota = $27{,}5 - 22 = 5{,}5$.', 'media', 4),

((SELECT id FROM unidades WHERE nombre = 'Probabilidad y estadística'),
 'En una urna hay 3 bolitas rojas, 2 azules y 1 verde. Si se saca una al azar, ¿cuál es la probabilidad de sacar azul o verde?',
 '[{"letra":"A","texto":"$\frac{1}{6}$"},{"letra":"B","texto":"$\frac{1}{3}$"},{"letra":"C","texto":"$\frac{1}{2}$"},{"letra":"D","texto":"$\frac{2}{3}$"}]'::jsonb,
 'C', 'Casos favorables (azul o verde) = 2 + 1 = 3. Total = 6. $P = \frac{3}{6} = \frac{1}{2}$.', 'media', 5),

-- ============================================================
-- MATEMÁTICA M2 — Números y matemática financiera
-- ============================================================

((SELECT id FROM unidades WHERE nombre = 'Números y matemática financiera'),
 '¿Cuánto es $\log_{10}(1000)$?',
 '[{"letra":"A","texto":"2"},{"letra":"B","texto":"3"},{"letra":"C","texto":"4"},{"letra":"D","texto":"10"}]'::jsonb,
 'B', '$\log_{10}(1000) = \log_{10}(10^3) = 3$.', 'media', 2),

((SELECT id FROM unidades WHERE nombre = 'Números y matemática financiera'),
 'Se invierte $200.000 a interés compuesto anual del 10% durante 2 años. ¿Cuál es el monto final?',
 '[{"letra":"A","texto":"240.000"},{"letra":"B","texto":"242.000"},{"letra":"C","texto":"244.000"},{"letra":"D","texto":"260.000"}]'::jsonb,
 'B', '$M = C(1+i)^t = 200.000 \times (1{,}1)^2 = 200.000 \times 1{,}21 = $242.000$.', 'alta', 3),

((SELECT id FROM unidades WHERE nombre = 'Números y matemática financiera'),
 'Si $\log_2(x) = 5$, ¿cuánto vale $x$?',
 '[{"letra":"A","texto":"10"},{"letra":"B","texto":"16"},{"letra":"C","texto":"25"},{"letra":"D","texto":"32"}]'::jsonb,
 'D', '$\log_2(x) = 5$ significa $x = 2^5 = 32$.', 'media', 4),

((SELECT id FROM unidades WHERE nombre = 'Números y matemática financiera'),
 'Un capital de $50.000 se invierte a interés simple del 5% mensual. ¿Cuánto tiempo tardar en duplicarse?',
 '[{"letra":"A","texto":"10 meses"},{"letra":"B","texto":"15 meses"},{"letra":"C","texto":"20 meses"},{"letra":"D","texto":"25 meses"}]'::jsonb,
 'C', 'Duplicarse significa ganar $50.000 de interés. $50.000 = 50.000 \times 0{,}05 \times t \Rightarrow t = \frac{1}{0{,}05} = 20$ meses.', 'media', 5),

-- ============================================================
-- MATEMÁTICA M2 — Álgebra y funciones avanzadas
-- ============================================================

((SELECT id FROM unidades WHERE nombre = 'Álgebra y funciones avanzadas'),
 'Para $f(x) = x^{2} - 6x + 8$, ¿cuáles son sus raíces?',
 '[{"letra":"A","texto":"$x = 2$ y $x = 4$"},{"letra":"B","texto":"$x = -2$ y $x = -4$"},{"letra":"C","texto":"$x = 1$ y $x = 8$"},{"letra":"D","texto":"$x = 3$ y $x = 5$"}]'::jsonb,
 'A', '$x^2 - 6x + 8 = (x-2)(x-4) = 0 \Rightarrow x = 2$ o $x = 4$.', 'media', 2),

((SELECT id FROM unidades WHERE nombre = 'Álgebra y funciones avanzadas'),
 '¿Cuántas raíces reales tiene $f(x) = x^{2} - 4x + 5$?',
 '[{"letra":"A","texto":"Ninguna"},{"letra":"B","texto":"Una (doble)"},{"letra":"C","texto":"Dos"},{"letra":"D","texto":"Infinitas"}]'::jsonb,
 'A', 'Discriminante $\Delta = b^2 - 4ac = 16 - 20 = -4 < 0$. Con $\Delta < 0$ no hay raíces reales.', 'alta', 3),

((SELECT id FROM unidades WHERE nombre = 'Álgebra y funciones avanzadas'),
 'La parábola $f(x) = -x^{2} + 2x + 3$. ¿En qué dirección se abre y cuál es el valor de su máximo?',
 '[{"letra":"A","texto":"Hacia arriba; máximo en $y = 3$"},{"letra":"B","texto":"Hacia abajo; máximo en $y = 4$"},{"letra":"C","texto":"Hacia arriba; máximo en $y = 4$"},{"letra":"D","texto":"Hacia abajo; máximo en $y = 3$"}]'::jsonb,
 'B', 'Como $a = -1 < 0$, la parábola se abre hacia abajo y tiene un máximo. $x_v = \frac{-2}{2(-1)} = 1$. $f(1) = -1+2+3 = 4$.', 'alta', 4),

((SELECT id FROM unidades WHERE nombre = 'Álgebra y funciones avanzadas'),
 '¿Cuál es el vértice de la parábola $f(x) = 2x^{2} - 8x + 6$?',
 '[{"letra":"A","texto":"$(2, -2)$"},{"letra":"B","texto":"$(-2, 2)$"},{"letra":"C","texto":"$(4, -2)$"},{"letra":"D","texto":"$(2, 0)$"}]'::jsonb,
 'A', '$x_v = \frac{-(-8)}{2 \cdot 2} = \frac{8}{4} = 2$. $f(2) = 2(4) - 8(2) + 6 = 8 - 16 + 6 = -2$. Vértice: $(2, -2)$.', 'media', 5),

-- ============================================================
-- MATEMÁTICA M2 — Geometría vectorial y analítica
-- ============================================================

((SELECT id FROM unidades WHERE nombre = 'Geometría vectorial y analítica'),
 '¿Cuál es la distancia entre los puntos $A(1, 2)$ y $B(4, 6)$?',
 '[{"letra":"A","texto":"3"},{"letra":"B","texto":"4"},{"letra":"C","texto":"5"},{"letra":"D","texto":"7"}]'::jsonb,
 'C', '$d = \sqrt{(4-1)^2 + (6-2)^2} = \sqrt{9 + 16} = \sqrt{25} = 5$.', 'media', 2),

((SELECT id FROM unidades WHERE nombre = 'Geometría vectorial y analítica'),
 '¿Cuál es el punto medio del segmento entre $P(2, 4)$ y $Q(8, 10)$?',
 '[{"letra":"A","texto":"$(4, 6)$"},{"letra":"B","texto":"$(5, 7)$"},{"letra":"C","texto":"$(6, 8)$"},{"letra":"D","texto":"$(3, 5)$"}]'::jsonb,
 'B', '$M = \left(\frac{2+8}{2}, \frac{4+10}{2}\right) = (5, 7)$.', 'media', 3),

((SELECT id FROM unidades WHERE nombre = 'Geometría vectorial y analítica'),
 'Si $\vec{u} = (3, -1)$ y $\vec{v} = (1, 4)$, ¿cuánto es $\vec{u} + \vec{v}$?',
 '[{"letra":"A","texto":"$(2, 5)$"},{"letra":"B","texto":"$(4, 3)$"},{"letra":"C","texto":"$(3, 3)$"},{"letra":"D","texto":"$(4, -5)$"}]'::jsonb,
 'B', '$\vec{u} + \vec{v} = (3+1, -1+4) = (4, 3)$.', 'media', 4),

((SELECT id FROM unidades WHERE nombre = 'Geometría vectorial y analítica'),
 '¿Cuál es la ecuación de la recta que pasa por $A(1, 3)$ y $B(3, 7)$?',
 '[{"letra":"A","texto":"$y = x + 2$"},{"letra":"B","texto":"$y = 2x + 1$"},{"letra":"C","texto":"$y = 2x - 1$"},{"letra":"D","texto":"$y = x + 4$"}]'::jsonb,
 'B', '$m = \frac{7-3}{3-1} = 2$. Con punto $(1,3)$: $3 = 2(1) + n \Rightarrow n = 1$. Ecuación: $y = 2x + 1$.', 'alta', 5),

-- ============================================================
-- MATEMÁTICA M2 — Probabilidad y estadística avanzada
-- ============================================================

((SELECT id FROM unidades WHERE nombre = 'Probabilidad y estadística avanzada'),
 'En un grupo, el 60% son mujeres. De las mujeres, el 50% usa lentes. ¿Qué porcentaje del grupo total son mujeres con lentes?',
 '[{"letra":"A","texto":"10%"},{"letra":"B","texto":"20%"},{"letra":"C","texto":"30%"},{"letra":"D","texto":"50%"}]'::jsonb,
 'C', '$P(\text{mujer y lentes}) = P(\text{mujer}) \times P(\text{lentes} | \text{mujer}) = 0{,}6 \times 0{,}5 = 0{,}30 = 30\%$.', 'media', 2),

((SELECT id FROM unidades WHERE nombre = 'Probabilidad y estadística avanzada'),
 '¿De cuántas formas se pueden elegir 2 personas de un grupo de 5 para formar una comisión?',
 '[{"letra":"A","texto":"5"},{"letra":"B","texto":"10"},{"letra":"C","texto":"15"},{"letra":"D","texto":"20"}]'::jsonb,
 'B', '$\binom{5}{2} = \frac{5!}{2! \cdot 3!} = \frac{5 \times 4}{2} = 10$.', 'alta', 3),

((SELECT id FROM unidades WHERE nombre = 'Probabilidad y estadística avanzada'),
 '¿De cuántas formas se pueden ordenar las letras de la palabra "SOL"?',
 '[{"letra":"A","texto":"3"},{"letra":"B","texto":"6"},{"letra":"C","texto":"9"},{"letra":"D","texto":"27"}]'::jsonb,
 'B', 'Son 3 letras distintas: $3! = 3 \times 2 \times 1 = 6$ ordenaciones posibles.', 'media', 4),

((SELECT id FROM unidades WHERE nombre = 'Probabilidad y estadística avanzada'),
 'Se sabe que el 1% de una población tiene una enfermedad. Una prueba detecta la enfermedad en un 95% de los enfermos y da falso positivo en el 5% de los sanos. ¿Cuál de las siguientes conclusiones es correcta?',
 '[{"letra":"A","texto":"Si la prueba es positiva, casi seguro estás enfermo"},{"letra":"B","texto":"La prueba es inútil"},{"letra":"C","texto":"Un resultado positivo no garantiza tener la enfermedad: la mayoría de los positivos son falsos"},{"letra":"D","texto":"La tasa de falsos positivos no afecta la interpretación"}]'::jsonb,
 'C', 'Con solo 1% de enfermos, muchos más sanos que enfermos darán positivo erróneamente. Este es el problema clásico de la probabilidad base baja.', 'alta', 5),

-- ============================================================
-- CIENCIAS — Biología
-- ============================================================

((SELECT id FROM unidades WHERE nombre = 'Biología'),
 '¿Cuál de los siguientes organelos es el encargado de producir energía (ATP) en la célula?',
 '[{"letra":"A","texto":"Núcleo"},{"letra":"B","texto":"Ribosoma"},{"letra":"C","texto":"Mitocondria"},{"letra":"D","texto":"Vacuola"}]'::jsonb,
 'C', 'La mitocondria es la "central energética" de la célula: aquí se realiza la respiración celular aeróbica que produce ATP.', 'baja', 2),

((SELECT id FROM unidades WHERE nombre = 'Biología'),
 'En los seres humanos, si un gen A es dominante sobre a, ¿cuál es el fenotipo de un individuo con genotipo Aa?',
 '[{"letra":"A","texto":"Recesivo, porque tiene un alelo a"},{"letra":"B","texto":"Dominante, porque A domina sobre a"},{"letra":"C","texto":"Intermedio entre ambos"},{"letra":"D","texto":"No se puede determinar"}]'::jsonb,
 'B', 'En la herencia dominante clásica, tener aunque sea un alelo dominante (A) hace que el fenotipo sea dominante.', 'media', 3),

((SELECT id FROM unidades WHERE nombre = 'Biología'),
 '¿Cuál es el producto directo de la fotosíntesis que luego usa la planta como fuente de energía?',
 '[{"letra":"A","texto":"Dióxido de carbono"},{"letra":"B","texto":"Oxígeno"},{"letra":"C","texto":"Glucosa"},{"letra":"D","texto":"Agua"}]'::jsonb,
 'C', 'La fotosíntesis convierte energía luminosa en energía química almacenada en glucosa ($C_6H_{12}O_6$). El oxígeno es un subproducto.', 'media', 4),

((SELECT id FROM unidades WHERE nombre = 'Biología'),
 'En el flujo de información genética, ¿cuál es el orden correcto?',
 '[{"letra":"A","texto":"ARN → ADN → Proteína"},{"letra":"B","texto":"ADN → ARN → Proteína"},{"letra":"C","texto":"Proteína → ARN → ADN"},{"letra":"D","texto":"ADN → Proteína → ARN"}]'::jsonb,
 'B', 'El dogma central de la biología molecular establece: ADN (replicación) → ARN (transcripción) → Proteína (traducción).', 'media', 5),

-- ============================================================
-- CIENCIAS — Física
-- ============================================================

((SELECT id FROM unidades WHERE nombre = 'Física'),
 'Un cuerpo parte del reposo y acelera uniformemente a $2 \text{ m/s}^2$ durante 5 segundos. ¿Qué velocidad alcanza?',
 '[{"letra":"A","texto":"5 m/s"},{"letra":"B","texto":"7 m/s"},{"letra":"C","texto":"10 m/s"},{"letra":"D","texto":"20 m/s"}]'::jsonb,
 'C', '$v = v_0 + a \cdot t = 0 + 2 \times 5 = 10 \text{ m/s}$.', 'media', 2),

((SELECT id FROM unidades WHERE nombre = 'Física'),
 'Una fuerza neta de 20 N actúa sobre un cuerpo de 4 kg. ¿Cuál es su aceleración?',
 '[{"letra":"A","texto":"0,2 m/s2"},{"letra":"B","texto":"5 m/s2"},{"letra":"C","texto":"16 m/s2"},{"letra":"D","texto":"80 m/s2"}]'::jsonb,
 'B', 'Segunda ley de Newton: $F = ma \Rightarrow a = \frac{F}{m} = \frac{20}{4} = 5 \text{ m/s}^2$.', 'media', 3),

((SELECT id FROM unidades WHERE nombre = 'Física'),
 'Un objeto de 10 kg está a 5 metros de altura. ¿Cuánta energía potencial gravitatoria tiene? (usar $g = 10 \text{ m/s}^2$)',
 '[{"letra":"A","texto":"50 J"},{"letra":"B","texto":"150 J"},{"letra":"C","texto":"500 J"},{"letra":"D","texto":"5000 J"}]'::jsonb,
 'C', '$E_p = m \cdot g \cdot h = 10 \times 10 \times 5 = 500 \text{ J}$.', 'media', 4),

((SELECT id FROM unidades WHERE nombre = 'Física'),
 'Una onda tiene frecuencia de 200 Hz y velocidad de 340 m/s. ¿Cuál es su longitud de onda?',
 '[{"letra":"A","texto":"0,59 m"},{"letra":"B","texto":"1,70 m"},{"letra":"C","texto":"68.000 m"},{"letra":"D","texto":"540 m"}]'::jsonb,
 'B', '$\lambda = \frac{v}{f} = \frac{340}{200} = 1{,}70 \text{ m}$.', 'alta', 5),

-- ============================================================
-- CIENCIAS — Química
-- ============================================================

((SELECT id FROM unidades WHERE nombre = 'Química'),
 '¿Cuál de los siguientes es un ejemplo de ácido?',
 '[{"letra":"A","texto":"NaOH"},{"letra":"B","texto":"Ca(OH)₂"},{"letra":"C","texto":"HCl"},{"letra":"D","texto":"NH₃"}]'::jsonb,
 'C', 'El HCl (ácido clorhídrico) libera iones $H^+$ en solución acuosa, lo que lo define como ácido según Arrhenius.', 'baja', 2),

((SELECT id FROM unidades WHERE nombre = 'Química'),
 '¿Cuántos gramos hay en 2 moles de agua ($H_2O$, masa molar = 18 g/mol)?',
 '[{"letra":"A","texto":"9 g"},{"letra":"B","texto":"18 g"},{"letra":"C","texto":"36 g"},{"letra":"D","texto":"54 g"}]'::jsonb,
 'C', '$m = n \times M = 2 \text{ mol} \times 18 \text{ g/mol} = 36 \text{ g}$.', 'media', 3),

((SELECT id FROM unidades WHERE nombre = 'Química'),
 'Al mezclar un ácido fuerte con una base fuerte en proporciones estequiométricas, el pH de la solución resultante es:',
 '[{"letra":"A","texto":"Menor que 7"},{"letra":"B","texto":"Igual a 7"},{"letra":"C","texto":"Mayor que 7"},{"letra":"D","texto":"No se puede determinar"}]'::jsonb,
 'B', 'La reacción de neutralización entre un ácido fuerte y una base fuerte produce agua y sal, con pH = 7 (neutro).', 'media', 4),

((SELECT id FROM unidades WHERE nombre = 'Química'),
 'Un gas ocupa 4 L a 300 K. Si se sube la temperatura a 600 K manteniendo la presión constante, ¿qué volumen ocupa?',
 '[{"letra":"A","texto":"2 L"},{"letra":"B","texto":"4 L"},{"letra":"C","texto":"6 L"},{"letra":"D","texto":"8 L"}]'::jsonb,
 'D', 'Ley de Charles: $\frac{V_1}{T_1} = \frac{V_2}{T_2} \Rightarrow V_2 = \frac{4 \times 600}{300} = 8 \text{ L}$.', 'alta', 5),

-- ============================================================
-- HISTORIA — Historia: Mundo, América y Chile
-- ============================================================

((SELECT id FROM unidades WHERE nombre = 'Historia: Mundo, América y Chile'),
 '¿En qué año se independizó Chile de España?',
 '[{"letra":"A","texto":"1810"},{"letra":"B","texto":"1818"},{"letra":"C","texto":"1823"},{"letra":"D","texto":"1833"}]'::jsonb,
 'B', 'La Independencia de Chile se declaró formalmente el 12 de febrero de 1818, tras la Batalla de Chacabuco (1817) y el proceso iniciado en 1810.', 'baja', 2),

((SELECT id FROM unidades WHERE nombre = 'Historia: Mundo, América y Chile'),
 '¿Cuál fue una de las causas directas del estallido de la Primera Guerra Mundial en 1914?',
 '[{"letra":"A","texto":"La Revolución Rusa"},{"letra":"B","texto":"El asesinato del archiduque Francisco Fernando de Austria"},{"letra":"C","texto":"La invasión alemana a Polonia"},{"letra":"D","texto":"La caída de la bolsa de Nueva York"}]'::jsonb,
 'B', 'El asesinato del archiduque en Sarajevo (junio de 1914) detonó una cadena de declaraciones de guerra entre las potencias europeas.', 'media', 3),

((SELECT id FROM unidades WHERE nombre = 'Historia: Mundo, América y Chile'),
 'La Revolución Industrial del siglo XVIII comenzó principalmente en:',
 '[{"letra":"A","texto":"Francia"},{"letra":"B","texto":"Alemania"},{"letra":"C","texto":"Gran Bretaña"},{"letra":"D","texto":"Estados Unidos"}]'::jsonb,
 'C', 'Gran Bretaña fue la cuna de la Revolución Industrial, impulsada por el carbón, el vapor y la industria textil desde mediados del siglo XVIII.', 'baja', 4),

((SELECT id FROM unidades WHERE nombre = 'Historia: Mundo, América y Chile'),
 'En el contexto del siglo XX, ¿qué relación existe entre el proceso de industrialización en Chile y las migraciones internas?',
 '[{"letra":"A","texto":"La industrialización generó migración desde las ciudades al campo"},{"letra":"B","texto":"La industrialización atrajo población rural hacia los centros urbanos donde se creaban empleos"},{"letra":"C","texto":"La industrialización no tuvo efecto sobre la distribución de la población"},{"letra":"D","texto":"La industrialización eliminó la clase trabajadora urbana"}]'::jsonb,
 'B', 'El surgimiento de fábricas e industrias en ciudades como Santiago y Valparaíso atrajo masas de trabajadores rurales, acelerando la urbanización de Chile.', 'alta', 5),

-- ============================================================
-- HISTORIA — Formación ciudadana
-- ============================================================

((SELECT id FROM unidades WHERE nombre = 'Formación ciudadana'),
 '¿Cuál de los siguientes es un derecho fundamental consagrado en la Constitución chilena?',
 '[{"letra":"A","texto":"Pagar impuestos"},{"letra":"B","texto":"Respetar las leyes"},{"letra":"C","texto":"La libertad de expresión"},{"letra":"D","texto":"El servicio militar"}]'::jsonb,
 'C', 'La libertad de expresión es un derecho fundamental. Pagar impuestos y respetar las leyes son deberes; el servicio militar es una obligación en ciertos contextos.', 'baja', 2),

((SELECT id FROM unidades WHERE nombre = 'Formación ciudadana'),
 'En un Estado democrático, la separación de poderes divide el gobierno en:',
 '[{"letra":"A","texto":"Central, regional y local"},{"letra":"B","texto":"Ejecutivo, legislativo y judicial"},{"letra":"C","texto":"Político, económico y social"},{"letra":"D","texto":"Nacional, provincial y comunal"}]'::jsonb,
 'B', 'La teoría clásica de Montesquieu establece tres poderes del Estado: Ejecutivo (aplica la ley), Legislativo (crea la ley) y Judicial (interpreta la ley).', 'baja', 3),

((SELECT id FROM unidades WHERE nombre = 'Formación ciudadana'),
 'La Declaración Universal de los Derechos Humanos fue adoptada por la ONU en:',
 '[{"letra":"A","texto":"1945"},{"letra":"B","texto":"1948"},{"letra":"C","texto":"1953"},{"letra":"D","texto":"1966"}]'::jsonb,
 'B', 'La Declaración Universal de los Derechos Humanos fue adoptada el 10 de diciembre de 1948, tres años después de la fundación de la ONU.', 'baja', 4),

((SELECT id FROM unidades WHERE nombre = 'Formación ciudadana'),
 'Un Estado promulga una ley que restringe la libertad de prensa durante períodos de emergencia. Desde la perspectiva de los derechos humanos, ¿qué problema plantea esta medida?',
 '[{"letra":"A","texto":"Ninguno, porque el Estado siempre tiene la razón"},{"letra":"B","texto":"La libertad de prensa es un derecho inalienable que no puede suspenderse por decreto"},{"letra":"C","texto":"La restricción puede ser justificada si el Estado la declara necesaria, pero debe respetar el núcleo esencial del derecho y ser proporcional"},{"letra":"D","texto":"El Estado no puede legislar sobre libertades civiles"}]'::jsonb,
 'C', 'Los estándares internacionales permiten restricciones temporales de ciertos derechos en emergencias, pero solo si son proporcionales, necesarias y no afectan el núcleo esencial del derecho.', 'alta', 5),

-- ============================================================
-- HISTORIA — Sistema económico
-- ============================================================

((SELECT id FROM unidades WHERE nombre = 'Sistema económico'),
 '¿Qué ocurre cuando la oferta de un producto disminuye y la demanda se mantiene constante?',
 '[{"letra":"A","texto":"El precio tiende a bajar"},{"letra":"B","texto":"El precio tiende a subir"},{"letra":"C","texto":"El precio no cambia"},{"letra":"D","texto":"La demanda también baja"}]'::jsonb,
 'B', 'Con menos oferta y la misma demanda, hay más compradores que bienes disponibles. La escasez relativa presiona el precio hacia arriba.', 'baja', 2),

((SELECT id FROM unidades WHERE nombre = 'Sistema económico'),
 '¿Cuál de los siguientes es un ejemplo de bien público?',
 '[{"letra":"A","texto":"Un automóvil"},{"letra":"B","texto":"Un parque nacional de acceso gratuito"},{"letra":"C","texto":"Una empresa de telecomunicaciones"},{"letra":"D","texto":"Un supermercado"}]'::jsonb,
 'B', 'Los bienes públicos son no rivales (usarlo no impide que otros lo usen) y no excluyentes (no se puede cobrar por acceder). Un parque nacional gratuito cumple ambas condiciones.', 'media', 3),

((SELECT id FROM unidades WHERE nombre = 'Sistema económico'),
 'Si el Producto Interno Bruto (PIB) de un país cae dos trimestres seguidos, se habla de:',
 '[{"letra":"A","texto":"Inflación"},{"letra":"B","texto":"Recesión"},{"letra":"C","texto":"Deflación"},{"letra":"D","texto":"Superávit"}]'::jsonb,
 'B', 'La definición técnica de recesión es la caída del PIB real durante dos trimestres consecutivos.', 'media', 4),

((SELECT id FROM unidades WHERE nombre = 'Sistema económico'),
 'Cuando un productor de petróleo contamina el aire de una ciudad y los ciudadanos asumen los costos de salud sin ser compensados, esto es un ejemplo de:',
 '[{"letra":"A","texto":"Economía de escala"},{"letra":"B","texto":"Externalidad negativa"},{"letra":"C","texto":"Competencia perfecta"},{"letra":"D","texto":"Bien público"}]'::jsonb,
 'B', 'Una externalidad negativa ocurre cuando una actividad económica genera costos que los terceros afectados asumen sin compensación. Es una de las principales fallas del mercado.', 'alta', 5);
