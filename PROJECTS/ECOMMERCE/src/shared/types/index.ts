import { z } from 'zod';

export const productSchema = z.object({
 id: z.string(),
 name: z.string(),
 description: z.string().optional(),
 price: z.number().positive(),
 stock: z.number().int().nonnegative(),
 image: z.string().url().optional(),
 category: z.string().optional(),
});

export type Product = z.infer<typeof productSchema>;

export const userSchema = z.object({
 id: z.string(),
 email: z.string().email(),
 name: z.string(),
 isAdmin: z.boolean().default(false),
});

export type User = z.infer<typeof userSchema>;

export const orderItemSchema = z.object({
 productId: z.string(),
 name: z.string(),
 price: z.number().positive(),
 quantity: z.number().int().positive(),
});

export type OrderItem = z.infer<typeof orderItemSchema>;

export const orderSchema = z.object({
 id: z.string(),
 userId: z.string(),
 items: z.array(orderItemSchema),
 totalPrice: z.number().positive(),
 status: z.enum(['en attente', 'en prÃ©paration', 'expÃ©diÃ©e', 'livrÃ©e']),
 createdAt: z.string(),
 shippingAddress: z.string().optional(),
});

export type Order = z.infer<typeof orderSchema>;

export interface ProductFilters {
 search?: string;
 category?: string;
}

export const loginSchema = z.object({
 email: z.string().email(),
 password: z.string().min(6),
});

export const registerSchema = z.object({
 email: z.string().email(),
 password: z.string().min(6),
 name: z.string().min(2),
});

export const shippingSchema = z.object({
 address: z.string().min(5),
 city: z.string().min(2),
 postalCode: z.string().min(5),
 country: z.string().min(2),
});