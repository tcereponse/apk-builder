import { z } from 'zod';

export const ProductSchema = z.object({
 id: z.string(),
 name: z.string(),
 description: z.string(),
 price: z.number().positive(),
 category: z.string(),
 images: z.array(z.string()),
 stock: z.number().int().nonnegative(),
 createdAt: z.string().datetime(),
});

export type Product = z.infer<typeof ProductSchema>;

export const CartItemSchema = z.object({
 productId: z.string(),
 product: ProductSchema,
 quantity: z.number().int().positive(),
});

export type CartItem = z.infer<typeof CartItemSchema>;