# GESTION DES ERREURS & CHARGEMENT — BKACK

## 🛡️ ErrorBoundary

### Composant Global
// shared/components/ErrorBoundary.tsx
import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    // Envoyer à un service de monitoring (ex: Sentry)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-md text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              Oups ! Une erreur est survenue
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {this.state.error?.message || 'Erreur inattendue'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
            >
              Recharger l'application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
⏳ États de Chargement (Suspense)
Lazy Loading des Pages
// router.tsx
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
// shared/services/Logger.ts
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

export class Logger {
  private static instance: Logger;
  private level: LogLevel = LogLevel.INFO;

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  setLevel(level: LogLevel) {
    this.level = level;
  }

  debug(message: string, ...args: any[]) {
    if (this.level <= LogLevel.DEBUG) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }

  info(message: string, ...args: any[]) {
    if (this.level <= LogLevel.INFO) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: any[]) {
    if (this.level <= LogLevel.WARN) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  error(message: string, ...args: any[]) {
    if (this.level <= LogLevel.ERROR) {
      console.error(`[ERROR] ${message}`, ...args);
      // Envoyer au service de monitoring
    }
  }
}
🎯 Stratégie d'Erreurs
Erreur	Gestion	UX
Échec chargement IndexedDB	Fallback localStorage	Notification discrète
Échec audio	Désactivation silencieuse	Indicateur mute
Erreur de rendu React	ErrorBoundary capture	Page d'erreur avec reload
Timeout requête	3 retry avec backoff	Spinner + message
Erreur physique (collision)	Reset état de jeu	Redémarrage auto
Échec PWA (SW)	Cache fallback	Continue hors ligne
🔒 Bonnes Pratiques

Toujours afficher un feedback (même en cas d'erreur)

Ne jamais bloquer l'utilisateur (offrir une action)

Logs structurés pour le debugging

Fallback intelligents (localStorage → IndexedDB)

Tests de résilience (simuler des pannes)

Messages utilisateur clairs (pas de jargon technique)

text

---

## 📋 BIBLE_