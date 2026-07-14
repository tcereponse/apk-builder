import { HashRouter } from 'react-router-dom';
import { AppProvider } from './contexts/AppProvider';
import AppRoutes from './router';
function App() {
return (
<AppProvider>
<HashRouter>
<AppRoutes />
</HashRouter>
</AppProvider>
);
}
export default App;