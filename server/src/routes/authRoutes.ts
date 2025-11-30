import { Router } from 'express';
import { register, login, changePassword } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import validate from '../middleware/validateResource.js';
import { registerSchema, loginSchema, changePasswordSchema } from '../schemas/authSchema.js';

const router = Router();

// Public Routes
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

// Protected Route
router.post('/change-password', verifyToken, validate(changePasswordSchema), changePassword);

export default router;