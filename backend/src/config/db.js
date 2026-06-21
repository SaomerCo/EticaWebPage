import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Pool de conexiones reutilizable hacia PostgreSQL.
// No abrimos una conexión por request: el Pool administra un conjunto
// de conexiones activas y las reutiliza, lo cual es la práctica estándar
// para una API que espera múltiples peticiones concurrentes.
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Verifica que la base de datos esté disponible al iniciar el servidor.
// Esto permite detectar errores de configuración (credenciales, host, etc.)
// de inmediato en consola, en lugar de que fallen silenciosamente en el
// primer request que llegue.
export const testConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Conexión a PostgreSQL exitosa:', result.rows[0].now);
    return true;
  } catch (error) {
    console.error('❌ Error al conectar con PostgreSQL:', error.message);
    return false;
  }
};
