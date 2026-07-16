import { Routes, Route } from 'react-router-dom';
import { ProductList, ProductDetails } from '../features/catalog';
import { AdminProducts, AdminOrders } from '../features/admin';
import { CartPage } from '../features/cart';
import { Login, Register } from '../features/auth';
import { OrdersList, OrderDetails } from '../features/orders';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/orders" element={<OrdersList />} />
      <Route path="/orders/:id" element={<OrderDetails />} />
      <Route path="/admin" element={<AdminProducts />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
    </Routes>
  );
}
