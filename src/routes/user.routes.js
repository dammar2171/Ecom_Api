import express from 'express'
import userControllers from '../controllers/user.controllers.js';
import validate from '../middlewares/validator.js'
import { userSchema } from '../lib/schemas/user.schema.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authRoleBased from '../middlewares/authRoleBased.js';
import { ROLE_ADMIN } from '../constants/roles.js';

const router = express.Router();

router.get("/",authMiddleware,authRoleBased(ROLE_ADMIN),userControllers.getUsers);
router.get("/:userId",userControllers.getUserById);
router.post("/",validate(userSchema),userControllers.createUser);
router.put("/user-profile/:id",authMiddleware,userControllers.updateProfile)
router.put("/:userId",authMiddleware,userControllers.updateUser)
router.delete("/:userId",authMiddleware,userControllers.deleteUser)

export default router;