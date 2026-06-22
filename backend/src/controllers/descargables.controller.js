import { pool } from '../config/db.js';

// GET /api/descargables
// GET /api/descargables?tipo=oficial
// GET /api/descargables?materia=matematica-m1
// GET /api/descargables?tipo=ensayo&materia=ciencias
//
// Construye la condición WHERE dinámicamente según qué filtros vengan
// en la query string, usando siempre parámetros ($1, $2...) en vez de
// concatenar el valor directo en el SQL — esto es lo que previene
// inyección SQL: el valor del filtro nunca se mezcla con el texto de
// la consulta, viaja aparte y Postgres lo trata siempre como dato,
// nunca como código.
export const getDescargables = async (req, res) => {
  const { tipo, materia } = req.query;

  const condiciones = [];
  const valores = [];

  if (tipo) {
    valores.push(tipo);
    condiciones.push(`d.tipo = $${valores.length}`);
  }

  if (materia) {
    valores.push(materia);
    condiciones.push(`m.slug = $${valores.length}`);
  }

  const where = condiciones.length > 0 ? `WHERE ${condiciones.join(' AND ')}` : '';

  try {
    const result = await pool.query(
      `
      SELECT
        d.id,
        d.tipo,
        d.titulo,
        d.descripcion,
        d.url,
        d.fuente,
        m.slug AS materia_slug,
        m.nombre AS materia_nombre
      FROM descargables d
      LEFT JOIN materias m ON m.id = d.materia_id
      ${where}
      ORDER BY d.orden
      `,
      valores
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener los descargables',
      error: error.message,
    });
  }
};
