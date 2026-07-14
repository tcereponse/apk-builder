import { useNavigate } from 'react-router-dom';
function NotFoundPage() {
const navigate = useNavigate();
return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-xl text-slate-400 mb-2">Page non trouvée</p>
      <p className="text-slate-500 mb-8">La page que vous cherchez n'existe pas.</p>
      <button
        onClick={() => navigate('/')}
        className="py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-all duration-200"
      >
        Retour à l'accueil
      </button>
    </div>
  );
};
export default NotFoundPage;