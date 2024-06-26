import express from 'express';
import {
	forgotPassword,
	login,
	register,
	resetPassword,
} from '../controllers';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot_password', forgotPassword);
router.put('/reset_password/:id/:token', resetPassword);

export default router;
