import React from 'react';
import { Layout } from '../layout/Layout';

export const App: React.FC = () => {
  return (
    <div className="app-container">
      {/* Layout contains Header, Outlet (for routes), and Footer */}
      <Layout />
    </div>
  );
};
