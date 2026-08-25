import express from 'express'
import authControllers from '../controllers/auth.controllers.js';
import validate from '../middlewares/validator.js'
import { loginSchema, registerSchema } from '../lib/schemas/auth.schema.js';

const router = express.Router();

router.post("/login",validate(loginSchema),authControllers.login);
router.post("/register",validate(registerSchema),authControllers.register);
router.post("/logout",authControllers.logout)

export default router;