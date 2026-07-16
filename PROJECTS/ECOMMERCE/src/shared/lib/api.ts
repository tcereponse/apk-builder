import { Product, Order, User } from '@shared/types';

// Mock data
const mockProducts: Product[] = [
 { id: '1', name: 'Laptop', description: 'Ordinateur portable haute performance', price: 1200, stock: 10, image: 'https://picsum.photos/seed/1/200/200', category: 'Ãlectronique' },
 { id: '2', name: 'Smartphone', description: 'Dernier modÃ¨le avec 5G', price: 800, stock: 20, image: 'https://picsum.photos/seed/2/200/200', category: 'Ãlectronique' },
 { id: '3', name: 'Casque audio', description: 'RÃ©duction de bruit active', price: 150, stock: 30, image: 'https://picsum.photos/seed/3/200/200', category: 'Audio' },
 { id: '4', name: 'Montre connectÃ©e', description: 'Suivi sport et santÃ©', price: 250, stock: 15, image: 'https://picsum.photos/seed/4/200/200', category: 'Accessoires' },
];

let mockOrders: Order[] = [
 {
 id: 'o1',
 userId: 'u1',
 items: [{ productId: '1', name: 'Laptop', price: 1200, quantity: 1 }],
 totalPrice: 1200,
 status: 'en attente',
 createdAt: new Date().toISOString(),
 shippingAddress: '123 Rue de Paris',
 },
];

let mockUsers: User[] = [
 { id: 'u1', email: 'admin@example.com', name: 'Admin', isAdmin: true },
];

let authToken: string | null = localStorage.getItem('authToken');
let currentUser: User | null = null;

// API client
export const api = {
 get: async (url: string) => {
 if (url.startsWith('/products')) {
 const params = new URLSearchParams(url.split('?')[1] || '');
 const search = params.get('search') || '';
 let filtered = mockProducts;
 if (search) {
 filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
 }
 return { data: filtered };
 }
 if (url.startsWith('/products/')) {
 const id = url.split('/')[2];
 const product = mockProducts.find(p => p.id === id);
 return { data: product };
 }
 if (url === '/orders') {
 return { data: mockOrders };
 }
 if (url.startsWith('/orders/')) {
 const id = url.split('/')[2];
 const order = mockOrders.find(o => o.id === id);
 return { data: order };
 }
 if (url === '/auth/me') {
 return { data: currentUser };
 }
 throw new Error('Not found');
 },
 post: async (url: string, data?: any) => {
 if (url === '/auth/login') {
 const user = mockUsers.find(u => u.email === data.email);
 if (!user) throw new Error('Invalid credentials');
 const token = 'mock-token-' + Date.now();
 authToken = token;
 currentUser = user;
 localStorage.setItem('authToken', token);
 return { data: { token, user } };
 }
 if (url === '/auth/register') {
 const newUser = { id: 'u' + Date.now(), email: data.email, name: data.name, isAdmin: false };
 mockUsers.push(newUser);
 const token = 'mock-token-' + Date.now();
 authToken = token;
 currentUser = newUser;
 localStorage.setItem('authToken', token);
 return { data: { token, user: newUser } };
 }
 if (url === '/products') {
 const newProduct = { id: String(Date.now()), ...data };
 mockProducts.push(newProduct);
 return { data: newProduct };
 }
 if (url === '/orders') {
 const newOrder = { id: 'o' + Date.now(), ...data, status: 'en attente', createdAt: new Date().toISOString() };
 mockOrders.push(newOrder);
 return { data: newOrder };
 }
 throw new Error('Not implemented');
 },
 put: async (url: string, data?: any) => {
 if (url.startsWith('/products/')) {
 const id = url.split('/')[2];
 const index = mockProducts.findIndex(p => p.id === id);
 if (index === -1) throw new Error('Product not found');
 mockProducts[index] = { ...mockProducts[index], ...data };
 return { data: mockProducts[index] };
 }
 throw new Error('Not implemented');
 },
 patch: async (url: string, data?: any) => {
 if (url.startsWith('/orders/')) {
 const id = url.split('/')[2];
 const order = mockOrders.find(o => o.id === id);
 if (!order) throw new Error('Order not found');
 if (data.status) order.status = data.status;
 return { data: order };
 }
 throw new Error('Not implemented');
 },
 delete: async (url: string) => {
 if (url.startsWith('/products/')) {
 const id = url.split('/')[2];
 const index = mockProducts.findIndex(p => p.id === id);
 if (index === -1) throw new Error('Product not found');
 mockProducts.splice(index, 1);
 return { data: {} };
 }
 throw new Error('Not implemented');
 },
};

// Interceptor to add token
const originalPost = api.post;
api.post = async (url: string, data?: any) => {
 if (url.startsWith('/auth/')) {
 return originalPost(url, data);
 }
 const token = localStorage.getItem('authToken');
 if (token) {
 // In a real app, add Authorization header
 }
 return originalPost(url, data);
};