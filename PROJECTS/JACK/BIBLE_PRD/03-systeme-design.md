**

# SYSTÈME DE DESIGN — JACK

## 1. Tokens de Couleur (Palette Slate/Gray/Zinc UNIQUEMENT)
| **Nom** | **Valeur** | **Usage** |
|---------|------------|-----------|
| slate-50 | #f8fafc | Fond principal |
| slate-100 | #f1f5f9 | Fond secondaire |
| slate-200 | #e2e8f0 | Bordures légères |
| slate-300 | #cbd5e1 | Bordures principales |
| slate-400 | #94a3b8 | Texte secondaire |
| slate-500 | #64748b | Texte principal |
| slate-600 | #475569 | Texte important |
| slate-700 | #334155 | En-têtes |
| slate-800 | #1e293b | Fond de la raquette |
| slate-900 | #0f172a | Fond du jeu |
| gray-50 à gray-900 | Standards Tailwind | Compléments |
| zinc-50 à zinc-900 | Standards Tailwind | Alternatives |
| **Briques (fixes)** | | |
| red-500 | #ef4444 | Brique niveau 1 |
| orange-500 | #f97316 | Brique niveau 2 |
| yellow-500 | #eab308 | Brique niveau 3 |
| green-500 | #22c55e | Brique spéciale |
| blue-500 | #3b82f6 | Brique bonus |

## 2. Typographie
- **Famille** : Inter (Google Fonts) ou system fonts (fallback)
- **Échelle** :
  - `text-xs` (12px) : scores, timers
  - `text-sm` (14px) : labels, infos
  - `text-base` (16px) : texte courant
  - `text-lg` (18px) : sous-titres
  - `text-xl` (24px) : titres
  - `text-2xl` (30px) : titres principaux
  - `text-4xl` (48px) : score affiché

## 3. Espacements (spacing scale)
- `gap-1` (4px) : très petits écarts
- `gap-2` (8px) : écarts standards
- `gap-4` (16px) : marges internes
- `gap-6` (24px) : séparations
- `gap-8` (32px) : sections
- `p-4` à `p-8` : paddings

## 4. Ombres & Arrondis
- **Ombre** : `shadow-sm`, `shadow-md`, `shadow-lg`
- **Arrondis** : `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-full`

## 5. Icônes
- **Bibliothèque** : Lucide-react UNIQUEMENT
- **Tailles** : `size-4` (16px), `size-5` (20px), `size-6` (24px), `size-8` (32px)
- **Principales** : `Gamepad2`, `Settings`, `Trophy`, `ArrowLeft`, `Play`, `Pause`, `RefreshCw`, `Moon`, `Sun`

## 6. Composants UI (Atoms)
- **Button** : variants `primary`, `secondary`, `ghost`, `danger`
- **Card** : fond slate-50, ombre légère
- **Badge** : pour afficher les scores, niveaux
- **Input** : pour les formulaires (settings)
- **Modal** : pour les popups (pause, game over)