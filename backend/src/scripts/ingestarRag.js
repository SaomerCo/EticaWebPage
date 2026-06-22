// Script de ingesta del sistema RAG.
//
// A diferencia de los archivos seed.sql del resto del proyecto, esto
// es un script de Node (no SQL plano) porque necesita llamar a Ollama
// para calcular cada embedding — eso no se puede hacer dentro de una
// consulta SQL.
//
// Se ejecuta a mano, no es parte del arranque normal del servidor:
//   cd backend
//   npm run ingest:rag
//
// Hay que volver a correrlo cada vez que cambie el contenido de las
// materias, el calendario o los descargables, o si cambias
// OLLAMA_EMBED_MODEL (modelos distintos producen vectores no
// comparables entre sí, así que mezclar embeddings de dos modelos
// distintos en la misma tabla rompería la búsqueda).
import { pool } from '../config/db.js';
import { embedText } from '../services/rag.service.js';

// Recolecta texto desde todo lo que ya existe en la base de datos:
// contenidos, fórmulas, ejercicios, calendario y descargables. Esto
// es el corpus "de partida"; el equipo puede agregar más fragmentos
// a mano (por ejemplo, texto extraído de los PDFs oficiales reales)
// insertando filas adicionales en este mismo arreglo antes de correr
// el script, o directamente con un INSERT a documentos_rag seguido
// de un cálculo de embedding aparte.
const recolectarFragmentos = async () => {
  const fragmentos = [];

  const contenidos = await pool.query(`
    SELECT c.titulo, c.cuerpo, u.nombre AS unidad, m.nombre AS materia, m.id AS materia_id
    FROM contenidos c
    JOIN unidades u ON u.id = c.unidad_id
    JOIN materias m ON m.id = u.materia_id
  `);
  contenidos.rows.forEach((fila) => {
    fragmentos.push({
      materia_id: fila.materia_id,
      tipo: 'contenido',
      fuente: `${fila.materia} > ${fila.unidad} > ${fila.titulo}`,
      texto: `${fila.titulo}. ${fila.cuerpo}`,
    });
  });

  const formulas = await pool.query(`
    SELECT f.titulo, f.expresion, f.explicacion, u.nombre AS unidad, m.nombre AS materia, m.id AS materia_id
    FROM formulas f
    JOIN unidades u ON u.id = f.unidad_id
    JOIN materias m ON m.id = u.materia_id
  `);
  formulas.rows.forEach((fila) => {
    fragmentos.push({
      materia_id: fila.materia_id,
      tipo: 'formula',
      fuente: `${fila.materia} > ${fila.unidad} > ${fila.titulo}`,
      texto: `Fórmula: ${fila.titulo}. ${fila.expresion}. ${fila.explicacion || ''}`,
    });
  });

  const ejercicios = await pool.query(`
    SELECT e.explicacion, u.nombre AS unidad, m.nombre AS materia, m.id AS materia_id
    FROM ejercicios e
    JOIN unidades u ON u.id = e.unidad_id
    JOIN materias m ON m.id = u.materia_id
  `);
  ejercicios.rows.forEach((fila) => {
    fragmentos.push({
      materia_id: fila.materia_id,
      tipo: 'ejercicio',
      fuente: `${fila.materia} > ${fila.unidad} > Ejercicio resuelto`,
      texto: fila.explicacion,
    });
  });

  const eventos = await pool.query(
    'SELECT titulo, descripcion, fecha_inicio, fecha_fin FROM eventos_calendario'
  );
  eventos.rows.forEach((fila) => {
    const fechaTexto = fila.fecha_fin
      ? `entre el ${new Date(fila.fecha_inicio).toLocaleDateString('es-CL')} y el ${new Date(fila.fecha_fin).toLocaleDateString('es-CL')}`
      : `el ${new Date(fila.fecha_inicio).toLocaleDateString('es-CL')}`;
    fragmentos.push({
      materia_id: null,
      tipo: 'calendario',
      fuente: `Calendario PAES > ${fila.titulo}`,
      texto: `${fila.titulo} es ${fechaTexto}. ${fila.descripcion || ''}`,
    });
  });

  const descargables = await pool.query(`
    SELECT d.titulo, d.descripcion, d.url, m.nombre AS materia, m.id AS materia_id
    FROM descargables d
    LEFT JOIN materias m ON m.id = d.materia_id
  `);
  descargables.rows.forEach((fila) => {
    fragmentos.push({
      materia_id: fila.materia_id,
      tipo: 'descargable',
      fuente: `Descargables > ${fila.titulo}`,
      texto: `${fila.titulo}. ${fila.descripcion || ''} Disponible en: ${fila.url}`,
    });
  });

  return fragmentos;
};

const ingestar = async () => {
  console.log('Recolectando fragmentos desde la base de datos...');
  const fragmentos = await recolectarFragmentos();
  console.log(`${fragmentos.length} fragmentos encontrados.\n`);

  console.log('Limpiando documentos_rag...');
  await pool.query('TRUNCATE documentos_rag RESTART IDENTITY');

  for (let i = 0; i < fragmentos.length; i += 1) {
    const fragmento = fragmentos[i];
    process.stdout.write(`Generando embedding ${i + 1}/${fragmentos.length}...\r`);

    const embedding = await embedText(fragmento.texto);

    await pool.query(
      'INSERT INTO documentos_rag (materia_id, fuente, tipo, texto, embedding) VALUES ($1, $2, $3, $4, $5)',
      [fragmento.materia_id, fragmento.fuente, fragmento.tipo, fragmento.texto, embedding]
    );
  }

  console.log(`\n${fragmentos.length} fragmentos ingeridos correctamente.`);
  await pool.end();
};

ingestar().catch((error) => {
  console.error('\nError durante la ingesta:', error.message);
  process.exit(1);
});
