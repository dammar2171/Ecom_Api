import express from 'express'
import authControllers from '../controllers/auth.controllers.js';
import validate from '../middlewares/validator.js'
import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from '../lib/schemas/auth.schema.js';

const router = express.Router();

router.post("/login",validate(loginSchema),authControllers.login);
router.post("/register",validate(registerSchema),authControllers.register);
router.post("/logout",authControllers.logout);
router.post("/forgot-password",validate(forgotPasswordSchema),authControllers.forgotPassword);
router.post("/reset-password",validate(resetPasswordSchema),authControllers.resetPassword);

export default router;