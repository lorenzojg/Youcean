import express from 'express';

import { checkAccessMiddleware } from '../middlewares/accessMiddleware';
import { handleAccessUpdate } from '../controllers/accessController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

// Vérifie l'accès avant de permettre d'autres actions
router.post('/update', authMiddleware, checkAccessMiddleware, handleAccessUpdate);

export default router;
