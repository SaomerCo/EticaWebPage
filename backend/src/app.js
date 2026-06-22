import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.routes.js';
import materiasRoutes from './routes/materias.routes.js';
import descargablesRoutes from './routes/descargables.routes.js';
import calendarioRoutes from './routes/calendario.routes.js';
import chatRoutes from './routes/chat.routes.js';
import ejerciciosRoutes from './routes/ejercicios.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/materias', materiasRoutes);
app.use('/api/descargables', descargablesRoutes);
app.use('/api/calendario', calendarioRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/ejercicios', ejerciciosRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de PAES Mentor' });
});

export default app;
