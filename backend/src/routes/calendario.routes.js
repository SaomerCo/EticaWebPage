import { Router } from 'express';
import { getCalendario } from '../controllers/calendario.controller.js';

const router = Router();

// GET /api/calendario (admite ?tipo= y ?proximos= como filtros)
router.get('/', getCalendario);

export default router;
