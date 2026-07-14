Système de Design — TETRISPalette de Couleurs (Slate/Gray/Zinc UNIQUEMENT)Interdiction formelle: Aucune couleur purple, indigo, violet dans le design system.





TokenHexUsageslate-950#020617Fond principal (haute immersion)slate-900#0f172aFond secondaire (panneaux, zones de jeu)slate-800#1e293bBordure des cellulesslate-700#334155Arrière-plan des cellules inactivesslate-400#94a3b8Pièces ghost (transparent)zinc-600#52525bTexte secondairezinc-300#d4d4d8Texte principalwhite#ffffffTexte sur fond sombre (score, titres)emerald-500#10b981Feedback positif (lignes supprimées)rose-500#f43f5eFeedback négatif (game over)amber-400#fbbf24État d'alerte (temps restant, niveau élevé)
Couleurs des Pièces (Tetris classique):
Cyan: #06b6d4

Bleu: #3b82f6

Orange: #f97316

Jaune: #eab308

Vert: #22c55e

Violet: #a855f7 (exempté car pièce historique)

Rouge: #ef4444

TypographiePolice: 'Inter', system-ui, -apple-system, sans-serif (Google Fonts en import optimisé)

Échelle:
text-xs (0.75rem) : Score secondaire, timers

text-sm (0.875rem) : Libellés, boutons secondaires

text-base (1rem) : Texte courant

text-lg (1.125rem) : Sous-titres

text-2xl (1.5rem) : Score principal

text-4xl (2.25rem) : Titres

text-6xl (3.75rem) : Game Over


Composants UI (Base)Button - Tailwind variants: primary (slate-700→slate-600), danger (rose-500), success (emerald-500)

Card - Fond slate-900/80 + backdrop-blur, border slate-800, padding 4

IconButton - Lucide-react icons + hover scale 1.05

Loader - Spinner circulaire (slate-400 → slate-300)

Icônes (Lucide-react)ChevronLeft, ChevronRight - Contrôles latéraux

RotateCw - Rotation

ArrowDown - Drop accéléré

Pause, Play - Pause/Reprise

RotateCcw - Reset/Redémarrer

Trophy - High Score

Settings - Paramètres

Home - Retour menu

Effets Visuels (Animations)Suppression de ligne: Flash blanc + disparition progressive (300ms)

Placement de pièce: Légère pulsation (scale 1.05 → 1)

Montée de niveau: Confetti de particules (slate-400 → emerald-500) sur le score

Game Over: Fond qui s'assombrit (overlay) + texte avec drop-shadow

Swipe tactile: Dégradé de suivi du doigt (indicateur visuel)

Accessibilité (WCAG 2.1 AA)Contraste: Toutes les combinaisons texte/fond > 4.5:1

Focus: Outline visible sur tous les éléments interactifs (2px solid white + offset 2px)

ARIA Labels: Tous les boutons ont un aria-label explicite

Annulation: prefers-reduced-motion respecté (pas d'animations si activé)