import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.routes.js';
import materiasRoutes from './routes/materias.routes.js';

const app = express();

// CORS abierto en desarrollo: el frontend (puerto 5173) y el backend
// (puerto 4000) corren en orígenes distintos. En producción esto se
// restringirá al dominio real del frontend (lo ajustaremos en una
// fase posterior, cuando definamos despliegue).
app.use(cors());

// Permite que Express interprete cuerpos de petición en formato JSON.
app.use(express.json());

// A partir de aquí, cada "módulo" de la plataforma (health, materias,
// chat, calendario...) se monta como un router independiente bajo su
// propio prefijo. Esto evita que app.js crezca sin control.
app.use('/api/health', healthRoutes);
app.use('/api/materias', materiasRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de PAES Mentor' });
});

export default app;
