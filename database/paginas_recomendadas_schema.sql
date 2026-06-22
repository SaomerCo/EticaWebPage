-- Páginas externas recomendadas para estudiar. Igual que en
-- descargables_schema.sql, materia_id es NULL para recomendaciones
-- generales (válidas para cualquier materia).
-- psql -U postgres -d paes_mentor -f database/paginas_recomendadas_schema.sql

CREATE TABLE paginas_recomendadas (
  id SERIAL PRIMARY KEY,
  materia_id INTEGER REFERENCES materias(id) ON DELETE CASCADE,
  titulo VARCHAR(200) NOT NULL,
  descripcion TEXT,
  url VARCHAR(500) NOT NULL,
  orden INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_paginas_recomendadas_materia_id ON paginas_recomendadas(materia_id);
