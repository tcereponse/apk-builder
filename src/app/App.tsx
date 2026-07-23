import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/contexts/AuthContext';
import Navbar from '../shared/components/Navbar';
import Footer from '../shared/components/Footer';
import SitesPage from '../features/sites/pages/SitesPage';
import SiteDetailPage from '../features/sites/pages/SiteDetailPage';
import CategoriesPage from '../features/categories/pages/CategoriesPage';
import CategoryDetailPage from '../features/categories/pages/CategoryDetailPage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import AdminDashboard from '../features/admin/pages/AdminDashboard';
import AdminCategories from '../features/admin/pages/AdminCategories';
import AdminModeration from '../features/admin/pages/AdminModeration';
import AdminLayout from '../features/admin/components/AdminLayout';

const App: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<SitesPage />} />
          <Route path="/sites" element={<SitesPage />} />
          <Route path="/sites/:id" element={<SiteDetailPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:slug" element={<CategoryDetailPage />} />
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
          } />
          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />
          } />
          <Route path="/admin" element={
            isAuthenticated && isAdmin ? <AdminLayout /> : <Navigate to="/" replace />
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="moderation" element={<AdminModeration />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;