-- Tabla de fragmentos para el sistema RAG. Cada fila es un "fragmento"
-- de texto (un contenido, una fórmula, un evento de calendario...)
-- junto con su embedding: un vector numérico que representa su
-- significado, generado por el modelo de embeddings de Ollama.
--
-- A diferencia de las demás tablas de este proyecto, esta no se llena
-- con un seed.sql de SQL plano: los embeddings se calculan llamando a
-- Ollama, así que el "seed" es un script de Node
-- (backend/src/scripts/ingestarRag.js), no SQL.
--
-- psql -U postgres -d paes_mentor -f database/rag_schema.sql

CREATE TABLE documentos_rag (
  id SERIAL PRIMARY KEY,
  -- NULL para fragmentos generales (calendario, descargables sin
  -- materia asociada).
  materia_id INTEGER REFERENCES materias(id) ON DELETE CASCADE,
  -- De dónde salió el fragmento, ej. "Matemática M1 > Números > Porcentajes".
  -- Se le muestra al estudiante como cita, y a la IA como referencia.
  fuente VARCHAR(300) NOT NULL,
  tipo VARCHAR(30) NOT NULL,
  texto TEXT NOT NULL,
  -- FLOAT8[] en vez de la extensión pgvector: ver la nota de
  -- arquitectura en rag.service.js sobre por qué, en este proyecto,
  -- la búsqueda por similitud se hace en JavaScript y no en SQL.
  embedding FLOAT8[] NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_documentos_rag_materia_id ON documentos_rag(materia_id);
