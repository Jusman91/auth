import express from 'express';
import { deleteUser, userLoggedIn } from '../controllers';
import { verifyToken, verifyUser } from '../middleware';

const router = express.Router();

router.get('/me', verifyToken, userLoggedIn);
router.delete('/:id', verifyUser, deleteUser);

export default router;
