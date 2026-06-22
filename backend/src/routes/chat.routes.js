import { Router } from 'express';
import { sendMessage } from '../controllers/chat.controller.js';

const router = Router();

// POST /api/chat
router.post('/', sendMessage);

export default router;
