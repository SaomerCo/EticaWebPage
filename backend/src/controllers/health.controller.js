import { pool } from '../config/db.js';

// Controlador: contiene la lógica de negocio del endpoint.
// La ruta (routes) solo decide "qué URL dispara esta función";
// el controlador decide "qué hace esa función". Esta separación
// es la que nos permitirá escalar a decenas de endpoints sin que
// app.js se vuelva un archivo gigante e inmantenible.
export const getHealthStatus = async (req, res) => {
  try {
    const dbResult = await pool.query('SELECT NOW() as current_time');

    res.status(200).json({
      status: 'ok',
      message: 'PAES Mentor API funcionando correctamente',
      database: 'connected',
      serverTime: new Date().toISOString(),
      dbTime: dbResult.rows[0].current_time,
    });
  } catch (error) {
    // Si el servidor está vivo pero la base de datos no responde,
    // devolvemos 500 pero con información clara del problema real,
    // en vez de un error genérico difícil de depurar.
    res.status(500).json({
      status: 'error',
      message: 'El servidor está activo pero no se pudo conectar a la base de datos',
      error: error.message,
    });
  }
};
