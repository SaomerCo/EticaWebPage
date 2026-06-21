-- Esquema de datos para la sección Materias.
-- Ejecutar DESPUÉS de database/init.sql, conectado ya a la base
-- "paes_mentor": psql -U postgres -d paes_mentor -f database/schema.sql

-- materias: las 5 pruebas de la PAES (Matemática M1/M2, Competencia
-- Lectora, Ciencias, Historia). "slug" es el identificador usado en las
-- URLs del frontend (/materias/matematica-m1).
CREATE TABLE materias (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(50) UNIQUE NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  color_accent VARCHAR(7) NOT NULL DEFAULT '#F2A93B',
  orden INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- unidades: los ejes temáticos de cada materia (ej. "Números",
-- "Álgebra y funciones"). ON DELETE CASCADE: si se borra una materia,
-- sus unidades (y todo lo que cuelga de ellas) se borran con ella, en
-- vez de dejar registros huérfanos en la base de datos.
CREATE TABLE unidades (
  id SERIAL PRIMARY KEY,
  materia_id INTEGER NOT NULL REFERENCES materias(id) ON DELETE CASCADE,
  nombre VARCHAR(150) NOT NULL,
  descripcion TEXT,
  orden INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- contenidos: el material teórico de cada unidad.
CREATE TABLE contenidos (
  id SERIAL PRIMARY KEY,
  unidad_id INTEGER NOT NULL REFERENCES unidades(id) ON DELETE CASCADE,
  titulo VARCHAR(200) NOT NULL,
  cuerpo TEXT NOT NULL,
  orden INTEGER NOT NULL DEFAULT 0
);

-- formulas: tarjetas de referencia rápida (fórmula + cuándo usarla).
-- Cumple el rol de "fórmulas y resúmenes" del requisito original.
CREATE TABLE formulas (
  id SERIAL PRIMARY KEY,
  unidad_id INTEGER NOT NULL REFERENCES unidades(id) ON DELETE CASCADE,
  titulo VARCHAR(200) NOT NULL,
  expresion VARCHAR(300) NOT NULL,
  explicacion TEXT,
  orden INTEGER NOT NULL DEFAULT 0
);

-- ejercicios: preguntas de selección múltiple, igual que la PAES real.
-- "alternativas" es JSONB porque el número de opciones puede variar
-- (normalmente 4, a veces más), y así evitamos columnas fijas
-- alternativa_a, alternativa_b, alternativa_c... que serían rígidas.
CREATE TABLE ejercicios (
  id SERIAL PRIMARY KEY,
  unidad_id INTEGER NOT NULL REFERENCES unidades(id) ON DELETE CASCADE,
  enunciado TEXT NOT NULL,
  alternativas JSONB NOT NULL,
  respuesta_correcta CHAR(1) NOT NULL CHECK (respuesta_correcta IN ('A', 'B', 'C', 'D', 'E')),
  explicacion TEXT NOT NULL,
  dificultad VARCHAR(10) NOT NULL DEFAULT 'media' CHECK (dificultad IN ('baja', 'media', 'alta')),
  orden INTEGER NOT NULL DEFAULT 0
);

-- Índices sobre las llaves foráneas: Postgres NO las indexa
-- automáticamente (solo indexa la primary key). Sin estos índices,
-- cada "WHERE materia_id = ..." o "WHERE unidad_id = ..." implicaría
-- recorrer la tabla completa a medida que crezca.
CREATE INDEX idx_unidades_materia_id ON unidades(materia_id);
CREATE INDEX idx_contenidos_unidad_id ON contenidos(unidad_id);
CREATE INDEX idx_formulas_unidad_id ON formulas(unidad_id);
CREATE INDEX idx_ejercicios_unidad_id ON ejercicios(unidad_id);
