import { HashRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { queryClient } from '@shared/lib/queryClient';
import AppRoutes from './router';
function App() {
return (
<QueryClientProvider client={queryClient}>
<FavoritesProvider>
<HashRouter>
<AppRoutes />
</HashRouter>
</FavoritesProvider>
<ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
);
}
export default App;