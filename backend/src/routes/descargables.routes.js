import { Router } from 'express';
import { getDescargables } from '../controllers/descargables.controller.js';

const router = Router();

// GET /api/descargables (admite ?tipo= y ?materia= como filtros)
router.get('/', getDescargables);

export default router;
