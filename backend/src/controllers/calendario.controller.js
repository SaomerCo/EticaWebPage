import { pool } from '../config/db.js';

// GET /api/calendario                      → todos los eventos, ordenados por fecha
// GET /api/calendario?tipo=rendicion        → solo eventos de ese tipo
// GET /api/calendario?proximos=3            → eventos vigentes o futuros, los 3 más próximos
//
// "Vigente o futuro" se calcula con COALESCE(fecha_fin, fecha_inicio):
// si el evento tiene fecha_fin, se considera relevante mientras esa
// fecha no haya pasado (ej. la inscripción sigue "vigente" durante
// todo julio, no solo el día que empezó). Si no tiene fecha_fin
// (como "Resultados", que es un solo día), se usa fecha_inicio.
export const getCalendario = async (req, res) => {
  const { tipo, proximos } = req.query;

  const condiciones = [];
  const valores = [];

  if (tipo) {
    valores.push(tipo);
    condiciones.push(`tipo = $${valores.length}`);
  }

  if (proximos) {
    condiciones.push('COALESCE(fecha_fin, fecha_inicio) >= NOW()');
  }

  const where = condiciones.length > 0 ? `WHERE ${condiciones.join(' AND ')}` : '';

  let query = `
    SELECT id, tipo, titulo, descripcion, fecha_inicio, fecha_fin, fuente
    FROM eventos_calendario
    ${where}
    ORDER BY fecha_inicio
  `;

  const limite = Number.parseInt(proximos, 10);
  if (Number.isInteger(limite) && limite > 0) {
    valores.push(limite);
    query += ` LIMIT $${valores.length}`;
  }

  try {
    const result = await pool.query(query, valores);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener el calendario',
      error: error.message,
    });
  }
};
