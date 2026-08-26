import express from 'express'
import productControllers from '../controllers/product.controllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authRoleBased from '../middlewares/authRoleBased.js';
import validate from '../middlewares/validator.js';
import { productSchema } from '../lib/schemas/product.schema.js';
import { ROLE_MERCHANT } from '../constants/roles.js';

const router = express.Router();


router.get("/",productControllers.getAllProducts);

router.get("/brands",productControllers.getBrands);
router.get("/categories",productControllers.getCategories);

router.get("/:id",productControllers.getProductById)

router.put("/:id", authMiddleware,authMiddleware, authRoleBased(ROLE_MERCHANT),productControllers.updateProduct);

router.delete("/:id", authMiddleware,authRoleBased(ROLE_MERCHANT),productControllers.deleteProduct);

router.post("/",validate(productSchema),authMiddleware,authRoleBased(ROLE_MERCHANT),productControllers.createProduct);

export default router;