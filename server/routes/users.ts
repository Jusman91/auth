import express from 'express';
import { userLoggedIn } from '../controllers';
import { verifyToken } from '../middleware';

const router = express.Router();

router.get('/me', verifyToken, userLoggedIn);

export default router;
