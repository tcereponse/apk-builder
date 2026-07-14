# ROUTING & PAGES — BKACK

## ⚠️ CONTRAINTE CRITIQUE

**HashRouter OBLIGATOIRE**
- **RAISON :** Compatibilité APK Android (BrowserRouter génère des erreurs de path)
- **INTERDICTION FORMELLE :** BrowserRouter

---

## 🗺️ Structure des Routes

### Route Configuration (router.tsx)
import { HashRouter, Routes, Route } from 'react-router-dom';
import { GameLayout, AuthLayout } from '@app/layouts';
import { MenuPage, GamePage, ScoresPage, SettingsPage, GameOverPage, ProfilePage } from '@features/*/pages';

export const AppRouter = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<GameLayout />}>
        <Route index element={<MenuPage />} />
        <Route path="game" element={<GamePage />} />
        <Route path="gameover" element={<GameOverPage />} />
        <Route path="scores" element={<ScoresPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  </HashRouter>
);
Layouts
// GameLayout : Layout principal avec header, footer, conteneur
export const GameLayout = ({ children }) => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
    <header className="p-4 border-b border-slate-200 dark:border-slate-700">
      <GameHeader />
    </header>
    <main className="flex-1 container mx-auto p-4">
      {children}
    </main>
    <footer className="p-2 text-center text-sm text-slate-500">
      BKACK v1.0
    </footer>
  </div>
);
📄 Pages & Routes Détaillées
Route	Page	Composant	Description
/	Menu	MenuPage	Accueil, lancement partie, accès scores/settings
/game	Jeu	GamePage	Écran de jeu actif avec canvas et HUD
/gameover	Game Over	GameOverPage	Score final, options replay/menu
/scores	Scores	ScoresPage	Classement local top 10
/settings	Paramètres	SettingsPage	Configuration utilisateur
/profile	Profil	ProfilePage	Statistiques joueur (optionnel)
🧭 Navigation
Éléments de Navigation
// Composant Navigation (shared)
<nav className="flex items-center justify-between p-2">
  <Button variant="ghost" onClick={() => navigate('/')}>
    <Home className="w-5 h-5" />
  </Button>
  <span className="font-bold text-lg">BKACK</span>
  <Button variant="ghost" onClick={() => navigate('/settings')}>
    <Settings className="w-5 h-5" />
  </Button>
</nav>
Règles de Navigation

Retour arrière : Toujours possible via bouton flèche ou geste

État conservé : Le jeu reste en mémoire si navigation

Confirmation : Si partie en cours, pause automatique

🔗 Liens & Actions
Source	Cible	Action
Menu → Jouer	/game	Démarre nouvelle partie
Menu → Scores	/scores	Affiche classement
Menu → Settings	/settings	Ouvre paramètres
Game → Game Over	/gameover	Auto-navigation
Game Over → Rejouer	/game	Nouvelle partie
Game Over → Menu	/	Retour accueil
Scores → Menu	/	Retour via bouton back
Settings → Menu	/	Retour via bouton back
🔒 Sécurité & Accessibilité

Routes protégées par ErrorBoundary

Fallback 404 → redirection vers /

Titres de page dynamiques (document.title)

text

---

## 📋 BIBLE_