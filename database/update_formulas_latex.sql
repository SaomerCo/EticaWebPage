-- Forzar UTF-8 antes de leer cualquier carácter especial.
-- Necesario en Windows donde psql usa WIN1252 por defecto.
\encoding UTF8

-- Convierte las expresiones de las fórmulas existentes a notación LaTeX.
-- Se ejecuta UNA SOLA VEZ sobre la base de datos, después de haber
-- corrido el seed original. No borra ni agrega filas; solo actualiza
-- el campo "expresion" de cada fórmula existente.
--
-- Convención usada en todo el proyecto: los fragmentos LaTeX van entre
-- signos de dólar: $a^{2} + b^{2} = c^{2}$. El componente MathText.jsx
-- del frontend detecta esos delimitadores y los renderiza con KaTeX.
--
-- psql -U postgres -d paes_mentor -f database/update_formulas_latex.sql

UPDATE formulas SET
  expresion   = '$\frac{P}{100} \times A$',
  explicacion = 'Útil para calcular descuentos, aumentos y cualquier problema que pida "el X% de algo".'
WHERE titulo = 'Porcentaje de una cantidad';

UPDATE formulas SET
  expresion   = '$m = \frac{y_2 - y_1}{x_2 - x_1}$',
  explicacion = 'Permite calcular qué tan inclinada está una recta a partir de dos puntos conocidos $(x_1, y_1)$ y $(x_2, y_2)$.'
WHERE titulo = 'Pendiente de una recta';

UPDATE formulas SET
  expresion   = '$a^{2} + b^{2} = c^{2}$',
  explicacion = '$c$ es la hipotenusa (el lado más largo); $a$ y $b$ son los catetos.'
WHERE titulo = 'Teorema de Pitágoras';

UPDATE formulas SET
  expresion   = '$\bar{x} = \frac{\sum x_i}{n}$',
  explicacion = 'La medida de tendencia central más usada: suma todos los datos y divide por la cantidad $n$. Es sensible a valores extremos.'
WHERE titulo = 'Promedio';

UPDATE formulas SET
  expresion   = '$I = C \times i \times t$',
  explicacion = '$C$ es el capital, $i$ la tasa de interés (en decimal) y $t$ el tiempo. El monto final es $C + I$.'
WHERE titulo = 'Interés simple';

UPDATE formulas SET
  expresion   = '$x_v = \frac{-b}{2a}$',
  explicacion = 'Para la parábola $f(x) = ax^{2} + bx + c$. Reemplazando $x_v$ en $f(x)$ se obtiene la coordenada $y$ del vértice.'
WHERE titulo = 'Vértice de una parábola';

UPDATE formulas SET
  expresion   = '$|\vec{v}| = \sqrt{x^{2} + y^{2}}$',
  explicacion = 'Calcula el largo (módulo) de un vector $\vec{v} = (x, y)$ a partir de sus componentes.'
WHERE titulo = 'Magnitud de un vector';

UPDATE formulas SET
  expresion   = '$P(A|B) = \frac{P(A \cap B)}{P(B)}$',
  explicacion = 'Se lee "probabilidad de $A$ dado $B$". Solo aplica cuando $P(B) > 0$.'
WHERE titulo = 'Probabilidad condicional';

UPDATE formulas SET
  expresion   = '$v = \frac{d}{t}$',
  explicacion = '$v$ es la velocidad, $d$ la distancia recorrida y $t$ el tiempo empleado. En MRU la velocidad es constante.'
WHERE titulo = 'Velocidad';

UPDATE formulas SET
  expresion   = '$\%m/v = \frac{m_{soluto}}{V_{solucion}} \times 100$',
  explicacion = 'Expresa la concentración como gramos de soluto por cada 100 mL de solución.'
WHERE titulo = 'Concentración %m/v';
