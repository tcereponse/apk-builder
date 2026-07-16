import { createContext, ReactNode, useState, useEffect } from 'react';
import { CartItem, Product } from '@shared/types';

interface CartContextType {
 items: CartItem[];
 totalItems: number;
 totalPrice: number;
 addItem: (product: Product, quantity?: number) => void;
 removeItem: (productId: string) => void;
 updateQuantity: (productId: string, quantity: number) => void;
 clearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = 'cart';

export function CartProvider({ children }: { children: ReactNode }) {
 const [items, setItems] = useState<CartItem[]>(() => {
 const stored = localStorage.getItem(STORAGE_KEY);
 return stored ? JSON.parse(stored) : [];
 });

 useEffect(() => {
 localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
 }, [items]);

 const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
 const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

 const addItem = (product: Product, quantity: number = 1) => {
 setItems(prev => {
 const existing = prev.find(item => item.product.id === product.id);
 if (existing) {
 return prev.map(item =>
 item.product.id === product.id
 ? { ...item, quantity: item.quantity + quantity }
 : item
 );
 }
 return [...prev, { product, quantity }];
 });
 };

 const removeItem = (productId: string) => {
 setItems(prev => prev.filter(item => item.product.id !== productId));
 };

 const updateQuantity = (productId: string, quantity: number) => {
 if (quantity <= 0) {
 removeItem(productId);
 return;
 }
 setItems(prev =>
 prev.map(item =>
 item.product.id === productId ? { ...item, quantity } : item
 )
 );
 };

 const clearCart = () => setItems([]);

 return (
 <CartContext.Provider value={{ items, totalItems, totalPrice, addItem, removeItem, updateQuantity, clearCart }}>
 {children}
 </CartContext.Provider>
 );
}