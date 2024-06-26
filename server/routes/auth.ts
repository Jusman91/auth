import express from 'express';
import { register } from '../controllers/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login');
router.post('/forgot_password');

export default router;
