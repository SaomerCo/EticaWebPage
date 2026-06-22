import { pool } from '../config/db.js';

// GET /api/ejercicios/quiz
// Parámetros:
//   materia  (slug, requerido) — ej: "matematica-m1"
//   dificultad (opcional)     — "baja" | "media" | "alta" | "mixto"
//   cantidad  (opcional)      — número entero entre 5 y 20, defecto 10
//
// Devuelve preguntas en orden aleatorio (ORDER BY RANDOM()), sin
// revelar la respuesta correcta por defecto — el frontend la pide
// solo cuando el usuario ya respondió (la incluye en la respuesta
// porque la validación es del lado del cliente, suficiente para esta
// etapa educativa donde no hay nada que "ganar" hackeando).
export const getQuizEjercicios = async (req, res) => {
  const { materia, dificultad, cantidad } = req.query;

  if (!materia) {
    return res.status(400).json({
      status: 'error',
      message: 'El parámetro "materia" es requerido.',
    });
  }

  // Límites razonables: mínimo 5, máximo 20.
  const cantidadNum = Math.min(20, Math.max(5, Number.parseInt(cantidad, 10) || 10));

  const condiciones = ['m.slug = $1'];
  const valores = [materia];

  if (dificultad && dificultad !== 'mixto') {
    valores.push(dificultad);
    condiciones.push(`e.dificultad = $${valores.length}`);
  }

  try {
    const result = await pool.query(
      `
      SELECT
        e.id,
        e.enunciado,
        e.alternativas,
        e.respuesta_correcta,
        e.explicacion,
        e.dificultad,
        u.nombre AS unidad
      FROM ejercicios e
      JOIN unidades u ON u.id = e.unidad_id
      JOIN materias m ON m.id = u.materia_id
      WHERE ${condiciones.join(' AND ')}
      ORDER BY RANDOM()
      LIMIT $${valores.length + 1}
      `,
      [...valores, cantidadNum]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener las preguntas del cuestionario.',
      error: error.message,
    });
  }
};

// GET /api/ejercicios/disponibles?materia=xxx&dificultad=yyy
// Devuelve solo la cantidad de preguntas disponibles para una
// combinación de materia + dificultad, para que el frontend pueda
// mostrar el límite real en la pantalla de configuración del quiz.
export const getDisponibles = async (req, res) => {
  const { materia, dificultad } = req.query;

  if (!materia) {
    return res.status(400).json({ status: 'error', message: 'Falta el parámetro "materia".' });
  }

  const condiciones = ['m.slug = $1'];
  const valores = [materia];

  if (dificultad && dificultad !== 'mixto') {
    valores.push(dificultad);
    condiciones.push(`e.dificultad = $${valores.length}`);
  }

  try {
    const result = await pool.query(
      `SELECT COUNT(e.id)::int AS total
       FROM ejercicios e
       JOIN unidades u ON u.id = e.unidad_id
       JOIN materias m ON m.id = u.materia_id
       WHERE ${condiciones.join(' AND ')}`,
      valores
    );

    res.json({ disponibles: result.rows[0].total });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al contar preguntas.', error: error.message });
  }
};
