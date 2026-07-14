Gestion Erreurs & Chargement — TETRISErrorBoundary (React)Composant ErrorBoundary (@shared/components/ErrorBoundary.tsx):
Capture les erreurs dans le rendu React

Affiche un overlay avec message générique "Une erreur est survenue"

Bouton "Recharger" pour window.location.reload()

Log l'erreur dans console.error (et potentiellement un service de monitoring)

Placement:





<ErrorBoundary>
  <HashRouter>
    {/* Routes */}
  </HashRouter>
</ErrorBoundary>
Fallback UI:
Fond blanc/transparent, texte centre, icône d'erreur (Lucide AlertCircle)

Message: "Oups ! Le jeu a rencontré un problème. Rafraîchis la page pour continuer."

Suspense (Lazy Loading)Routes Lazy:





const GamePage = lazy(() => import('@features/tetris/pages/GamePage'));
const StatsPage = lazy(() => import('@features/stats/pages/StatsPage'));
Suspense Wrapper:





<Suspense fallback={<Loader />}>
  <Routes>
    <Route path="/game" element={<GamePage />} />
    {/* ... */}
  </Routes>
</Suspense>
Loader UI:
Spinner centré (tailwind animate-spin + couleur slate-400)

Taille: 48x48px, avec texte "Chargement..." en dessous

États de Chargement (Data Fetching)Pas d'API externe en V1: Pas de chargement réseau

Chargement initial: Application chargée en < 1s (Vite + code splitting)

Lazy loading: Premier chunk de game page chargé après navigation

États Vides (Empty States)High Scores:
Si aucune partie jouée: "Aucune partie jouée pour l'instant. Lance-toi !"

Icône de trophée grisé

Statistiques:
Si totalGames = 0: "Aucune donnée disponible. Joue une partie pour commencer."

Bouton "Commencer une partie" en CTA

Paramètres:
Toujours des valeurs par défaut (jamais vide)

Gestion des Erreurs de Parsing (localStorage)Try-Catch systématique sur toute lecture localStorage:





try {
  const data = localStorage.getItem(key);
  if (data) {
    const parsed = JSON.parse(data);
    const validated = schema.parse(parsed);
    return validated;
  }
} catch (error) {
  console.warn(`Erreur de parsing pour ${key}:`, error);
  // Efface les données corrompues
  localStorage.removeItem(key);
}
return defaultValue;
Retry Logic (Échec d'initialisation)Si le moteur de jeu échoue à s'initialiser: Message d'erreur + bouton "Réessayer"

Après 3 échecs: Proposition de rechargement de la page

Gestion des Erreurs Non-ReactGlobal Error Listener:





// Dans main.tsx
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Afficher un toast d'erreur silencieux
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled rejection:', event.reason);
});
Logs & Monitoring (V1 Simplifié)Console logs: Uniquement en développement (process.env.NODE_ENV === 'development')

Pas de service tiers: Pas de Sentry, LogRocket, etc. en V1

Erreurs critiques: Affichage dans l'UI (ErrorBoundary) pour l'utilisateur final