import express from 'express';
import { login, register } from '../controllers';

const router = express.Router();

router.post('/register', register);
router.post('/login');
router.post('/forgot_password');

export default router;
