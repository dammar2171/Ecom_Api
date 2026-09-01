import express from 'express';
import orderController from '../controllers/order.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import {ROLE_ADMIN, ROLE_CUSTOMER} from '../constants/roles.js';
import authRoleBased from '../middlewares/authRoleBased.js'
import { orderSchema, orderStatusSchema } from '../lib/schemas/order.schema.js';
import validate from '../middlewares/validator.js'
const router = express.Router();

router.get("/",authMiddleware,authRoleBased(ROLE_ADMIN),orderController.getAllOrders);

router.get("/user",authMiddleware,orderController.getAllOrdersByUser)

router.patch("/:id/cancel",authMiddleware,orderController.cancelOrder)

router.patch("/:id/confirm",authMiddleware,orderController.confirmOrder)

// update orderStatus by admin
router.patch("/:id/status",authMiddleware,authRoleBased(ROLE_ADMIN),validate(orderStatusSchema),orderController.updateStatus)

router.get("/:id",authMiddleware,orderController.getOrderById);

router.post("/",authMiddleware,authRoleBased(ROLE_CUSTOMER),validate(orderSchema),orderController.createOder);

router.delete("/:id",authMiddleware,authRoleBased(ROLE_ADMIN),orderController.deleteOrder);

export default router;