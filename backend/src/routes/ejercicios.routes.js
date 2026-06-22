import { Router } from 'express';
import { getQuizEjercicios, getDisponibles } from '../controllers/ejercicios.controller.js';

const router = Router();

router.get('/quiz', getQuizEjercicios);
router.get('/disponibles', getDisponibles);

export default router;
