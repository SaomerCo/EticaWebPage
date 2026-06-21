-- Ejecutar conectado a PostgreSQL (como usuario postgres o uno con permisos
-- de creación de bases de datos). Este script solo crea la base de datos
-- vacía; las tablas de materias, unidades, ejercicios, etc. se crearán en
-- la Fase 3, cuando definamos el modelo de datos completo.

CREATE DATABASE paes_mentor
  WITH ENCODING 'UTF8'
  LC_COLLATE = 'es_CL.UTF-8'
  LC_CTYPE = 'es_CL.UTF-8'
  TEMPLATE = template0;
