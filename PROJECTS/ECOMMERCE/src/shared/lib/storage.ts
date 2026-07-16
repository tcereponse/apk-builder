import { CartItem } from '@shared/types/product';

const CART_KEY = 'cart';

export const cartStorage = {
 load: (): CartItem[] => {
 try {
 const data = localStorage.getItem(CART_KEY);
 return data ? JSON.parse(data) : [];
 } catch {
 return [];
 }
 },
 save: (items: CartItem[]) => {
 localStorage.setItem(CART_KEY, JSON.stringify(items));
 },
};