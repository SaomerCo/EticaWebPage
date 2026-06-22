-- Tabla de eventos del calendario PAES. No depende de ninguna otra
-- tabla, así que se puede ejecutar en cualquier momento después de
-- database/init.sql:
-- psql -U postgres -d paes_mentor -f database/calendario_schema.sql

CREATE TABLE eventos_calendario (
  id SERIAL PRIMARY KEY,
  tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('inscripcion', 'rendicion', 'resultados', 'postulacion')),
  titulo VARCHAR(200) NOT NULL,
  descripcion TEXT,
  -- Cada evento es un RANGO (fecha_inicio → fecha_fin), no un punto
  -- único: la inscripción y la rendición duran varios días. Para
  -- eventos de un solo día (como la publicación de resultados),
  -- fecha_fin simplemente queda en NULL.
  fecha_inicio TIMESTAMPTZ NOT NULL,
  fecha_fin TIMESTAMPTZ,
  fuente VARCHAR(100) NOT NULL DEFAULT 'DEMRE',
  orden INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_eventos_calendario_fecha_inicio ON eventos_calendario(fecha_inicio);
CREATE INDEX idx_eventos_calendario_tipo ON eventos_calendario(tipo);
