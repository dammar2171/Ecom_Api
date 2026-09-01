import z from 'zod';
import { addressSchema } from './auth.schema.js';
import { ORDER_STATUS_CANCELLED,ORDER_STATUS_CONFIRMED,ORDER_STATUS_PENDING,ORDER_STATUS_SHIPPED,ORDER_STATUS_DELIVERED } from '../../constants/order.js';

const orderStatusSchema = z.object({
  status: z.enum([
    ORDER_STATUS_CANCELLED,
    ORDER_STATUS_CONFIRMED,
    ORDER_STATUS_DELIVERED,
    ORDER_STATUS_PENDING,
    ORDER_STATUS_SHIPPED,
  ]),
});

const orderItemSchema = z.object({
  product:z.string(),
  quantity:z.number().min(1)
})
const orderSchema = z.object({
  orderItems:z.array(orderItemSchema),
  totalPrice:z.number("Total price require."),
  shippingAddress:addressSchema.optional()
})

export {orderSchema,orderStatusSchema};