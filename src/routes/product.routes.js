import express from 'express'
import productControllers from '../controllers/product.controllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authRoleBased from '../middlewares/authRoleBased.js';
const router = express.Router();


router.get("/",productControllers.getAllProducts);

router.get("/:id",productControllers.getProductById)

router.put("/:id", authMiddleware, authRoleBased,productControllers.updateProduct);

router.delete("/:id", authMiddleware,authRoleBased,productControllers.deleteProduct);

router.post("/",authMiddleware,authRoleBased,productControllers.createProduct);

export default router;