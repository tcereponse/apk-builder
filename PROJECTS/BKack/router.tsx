x
const MenuPage = lazy(() => import('@features/game/pages/MenuPage'));
const GamePage = lazy(() => import('@features/game/pages/GamePage'));
const GameOverPage = lazy(() => import('@features/game/pages/GameOverPage'));
const ScoresPage = lazy(() => import('@features/scores/pages/ScoresPage'));
const SettingsPage = lazy(() => import('@features/settings/pages/SettingsPage'));

// Avec Suspense
<Routes>
  <Route path="/" element={
    <Suspense fallback={<PageLoader />}>
      <MenuPage />
    </Suspense>
  } />
  {/* ... autres routes */}
</Routes>
PageLoader Component
export const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-slate-800 dark:border-slate-700 dark:border-t-slate-200" />
    <p className="mt-4 text-slate-500 dark:text-slate-400">Chargement...</p>
  </div>
);
📭 États Vides
EmptyState Component
interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState = ({ title, description, icon, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    {icon && <div className="text-6xl mb-4 opacity-50">{icon}</div>}
    <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
      {title}
    </h3>
    {description && (
      <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
        {description}
      </p>
    )}
    {action}
  </div>
);

// Utilisation
<EmptyState
  title="Aucun score pour le moment"
  description="Jouez une partie et votre score apparaîtra ici !"
  icon="🏆"
  action={<Button onClick={startGame}>Commencer</Button>}
/>
🔄 Retry & Fallback
useRetry Hook
export const useRetry = (fn: () => Promise<any>, maxAttempts: number = 3) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    let attempts = 0;
    while (attempts < maxAttempts) {
      try {
        const result = await fn();
        setLoading(false);
        return result;
      } catch (err) {
        attempts++;
        if (attempts === maxAttempts) {
          setError(err as Error);
          setLoading(false);
          throw err;
        }
        // Backoff exponentiel
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts)));
      }
    }
  }, [fn, maxAttempts]);

  return { execute, loading, error };
};
📊 Monitoring & Logging
Logger Service