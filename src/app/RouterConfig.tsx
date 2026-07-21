import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { Layout } from '../layout/Layout';

export const RouterConfig: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* Add more routes here if needed, e.g., for individual project pages */}
        </Route>
      </Routes>
    </HashRouter>
  );
};
