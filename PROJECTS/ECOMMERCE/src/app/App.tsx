import { HashRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@shared/lib/query-client';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import AppRouter from './router';

function App() {
 return (
 <QueryClientProvider client={queryClient}>
 <AuthProvider>
 <CartProvider>
 <HashRouter>
 <AppRouter />
 </HashRouter>
 </CartProvider>
 </AuthProvider>
 </QueryClientProvider>
 );
}

export default App;