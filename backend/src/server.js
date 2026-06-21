import dotenv from 'dotenv';
import app from './app.js';
import { testConnection } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

// Separamos server.js (arranque del proceso) de app.js (definición de
// la aplicación). Esto facilita escribir tests de integración más
// adelante: se puede importar `app` sin levantar un servidor HTTP real.
const startServer = async () => {
  await testConnection();

  app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
  });
};

startServer();
