import { pool } from '../config/db.js';

// GET /api/materias
// Devuelve las 5 materias con la cantidad de unidades de cada una
// (útil para mostrarlo en la tarjeta, sin tener que pedir el detalle
// completo solo para contar unidades).
export const getMaterias = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        m.id,
        m.slug,
        m.nombre,
        m.descripcion,
        m.color_accent,
        COUNT(u.id)::int AS unidades_count
      FROM materias m
      LEFT JOIN unidades u ON u.materia_id = m.id
      GROUP BY m.id
      ORDER BY m.orden
    `);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener las materias',
      error: error.message,
    });
  }
};

// GET /api/materias/:slug
// Devuelve una materia con sus unidades anidadas, y dentro de cada
// unidad sus contenidos, fórmulas y ejercicios.
//
// Estrategia de consultas: en vez de hacer una query por cada unidad
// (el clásico "problema N+1"), se hacen 4 consultas en total sin
// importar cuántas unidades tenga la materia: 1 para la materia, 1
// para sus unidades, y 3 en paralelo (Promise.all) para traer TODOS
// los contenidos/fórmulas/ejercicios de esas unidades de una vez,
// usando "unidad_id = ANY(...)". Después se agrupan en JavaScript.
export const getMateriaBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const materiaResult = await pool.query(
      'SELECT id, slug, nombre, descripcion, color_accent FROM materias WHERE slug = $1',
      [slug]
    );
    const materia = materiaResult.rows[0];

    if (!materia) {
      return res.status(404).json({ status: 'error', message: 'Materia no encontrada' });
    }

    const unidadesResult = await pool.query(
      'SELECT id, nombre, descripcion, orden FROM unidades WHERE materia_id = $1 ORDER BY orden',
      [materia.id]
    );
    const unidades = unidadesResult.rows;
    const unidadIds = unidades.map((unidad) => unidad.id);

    const [contenidosResult, formulasResult, ejerciciosResult, descargablesResult, paginasResult] =
      await Promise.all([
        pool.query(
          'SELECT id, unidad_id, titulo, cuerpo FROM contenidos WHERE unidad_id = ANY($1::int[]) ORDER BY orden',
          [unidadIds]
        ),
        pool.query(
          'SELECT id, unidad_id, titulo, expresion, explicacion FROM formulas WHERE unidad_id = ANY($1::int[]) ORDER BY orden',
          [unidadIds]
        ),
        pool.query(
          'SELECT id, unidad_id, enunciado, alternativas, respuesta_correcta, explicacion, dificultad FROM ejercicios WHERE unidad_id = ANY($1::int[]) ORDER BY orden',
          [unidadIds]
        ),
        pool.query(
          'SELECT id, tipo, titulo, descripcion, url, fuente FROM descargables WHERE materia_id = $1 ORDER BY orden',
          [materia.id]
        ),
        // "materia_id = $1 OR materia_id IS NULL": trae tanto las
        // páginas específicas de esta materia como las generales
        // (válidas para cualquier materia, como Aprendo en Línea).
        pool.query(
          'SELECT id, titulo, descripcion, url FROM paginas_recomendadas WHERE materia_id = $1 OR materia_id IS NULL ORDER BY orden',
          [materia.id]
        ),
      ]);

    // Agrupa un arreglo de filas por su unidad_id, ej:
    // [{unidad_id: 3, ...}, {unidad_id: 3, ...}, {unidad_id: 4, ...}]
    // se transforma en { 3: [...], 4: [...] }
    const agruparPorUnidad = (filas) =>
      filas.reduce((acumulado, fila) => {
        (acumulado[fila.unidad_id] ??= []).push(fila);
        return acumulado;
      }, {});

    const contenidosPorUnidad = agruparPorUnidad(contenidosResult.rows);
    const formulasPorUnidad = agruparPorUnidad(formulasResult.rows);
    const ejerciciosPorUnidad = agruparPorUnidad(ejerciciosResult.rows);

    const unidadesConDetalle = unidades.map((unidad) => ({
      id: unidad.id,
      nombre: unidad.nombre,
      descripcion: unidad.descripcion,
      contenidos: contenidosPorUnidad[unidad.id] || [],
      formulas: formulasPorUnidad[unidad.id] || [],
      ejercicios: ejerciciosPorUnidad[unidad.id] || [],
    }));

    res.json({
      ...materia,
      unidades: unidadesConDetalle,
      descargables: descargablesResult.rows,
      paginasRecomendadas: paginasResult.rows,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener la materia',
      error: error.message,
    });
  }
};
