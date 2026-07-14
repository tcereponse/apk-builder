Routing & Pages — TETRISHashRouter (OBLIGATOIRE)Raison impérative: Le HashRouter est le seul routeur compatible avec la génération APK Android via Capacitor/WebView. Le BrowserRouter provoque des erreurs 404 sur les routes deep-links.
Structure exacte dans App.tsx:





<HashRouter>
  <AppProvider>
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="game" element={<GamePage />} />
        <Route path="game-over" element={<GameOverPage />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </AppProvider>
</HashRouter>
Définition des Routes




PathComposantDescriptionLayout/HomePageMenu principalRootLayout/gameGamePagePartie activeGameLayout (plein écran)/game-overGameOverPageÉcran de finGameLayout (overlay)/statsStatsPageStatistiquesRootLayout/settingsSettingsPageParamètresRootLayout*NotFoundPageRedirection vers /RootLayout
LayoutsRootLayout:
Header (titre + high score + settings icon)

Main (contenu dynamique avec padding)

Footer (copyright, liens)

GameLayout:
Écran entier (100vh, 100vw)

Pas de header/footer (immersion totale)

Zone de jeu centrée avec fond dégradé (slate-950 à slate-900)

Navigations internesMenu → Partie: useNavigate('/game')

Partie → Game Over: Automatique via état de jeu

Game Over → Rejouer: Reset + useNavigate('/game')

Game Over → Menu: useNavigate('/')

Partie → Menu: Bouton "↩" ou "Home"

Paramètres → Menu: useNavigate('/')

Stats → Menu: useNavigate('/')

Lazy Loading (Code Splitting)tsx





const GamePage = lazy(() => import('@features/tetris/pages/GamePage'));
const StatsPage = lazy(() => import('@features/stats/pages/StatsPage'));
const SettingsPage = lazy(() => import('@features/settings/pages/SettingsPage'));
Suspense: Wrapper autour des routes avec fallback <Loader />