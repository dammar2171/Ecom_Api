import express from 'express'
import userControllers from '../controllers/user.controllers.js';
import validate from '../middlewares/validator.js'
import { userSchema } from '../lib/schemas/user.schema.js';

const router = express.Router();

router.get("/",userControllers.getUsers);
router.get("/:userId",userControllers.getUserById);
router.post("/",validate(userSchema),userControllers.createUser);

export default router;