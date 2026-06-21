import { Router } from 'express';
import { getMaterias, getMateriaBySlug } from '../controllers/materias.controller.js';

const router = Router();

// GET /api/materias            → listado de las 5 materias
// GET /api/materias/:slug      → detalle con unidades, contenidos, fórmulas y ejercicios
router.get('/', getMaterias);
router.get('/:slug', getMateriaBySlug);

export default router;
