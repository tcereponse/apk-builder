import { z } from 'zod';
import { CartItemSchema } from './product';

export const OrderStatusSchema = z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']);

export type OrderStatus = z.infer<typeof OrderStatusSchema>;

export const OrderSchema = z.object({
 id: z.string(),
 userId: z.string().optional(),
 items: z.array(CartItemSchema),
 total: z.number().positive(),
 shippingAddress: z.object({
 street: z.string(),
 city: z.string(),
 postalCode: z.string(),
 country: z.string(),
 }),
 status: OrderStatusSchema,
 createdAt: z.string().datetime(),
 updatedAt: z.string().datetime(),
});

export type Order = z.infer<typeof OrderSchema>;