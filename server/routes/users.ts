import express from 'express';
import { userDelete, userLoggedIn } from '../controllers';
import { verifyToken, verifyUser } from '../middleware';

const router = express.Router();

router.get('/me', verifyToken, userLoggedIn);
router.delete('/:id', verifyUser, userDelete);

export default router;
