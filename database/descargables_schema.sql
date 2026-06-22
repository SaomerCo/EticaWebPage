-- Tabla de descargables: guías, ensayos, formularios y material oficial.
-- Depende de la tabla "materias", así que se ejecuta DESPUÉS de
-- schema.sql y seed.sql (Fase 3):
-- psql -U postgres -d paes_mentor -f database/descargables_schema.sql

CREATE TABLE descargables (
  id SERIAL PRIMARY KEY,
  -- materia_id es NULL para descargables generales, no asociados a una
  -- materia específica (ej. "temarios oficiales" o "pruebas rendidas").
  materia_id INTEGER REFERENCES materias(id) ON DELETE CASCADE,
  tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('guia', 'ensayo', 'formulario', 'oficial')),
  titulo VARCHAR(200) NOT NULL,
  descripcion TEXT,
  url VARCHAR(500) NOT NULL,
  fuente VARCHAR(100) NOT NULL DEFAULT 'DEMRE',
  orden INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_descargables_materia_id ON descargables(materia_id);
CREATE INDEX idx_descargables_tipo ON descargables(tipo);
