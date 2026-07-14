# SYSTÈME DE DESIGN — BKACK

## 🎨 Palette de Couleurs (SLATE/GRAY/ZINC UNIQUEMENT)

### Couleurs Primaires
| Nom | Hex | Usage |
|-----|-----|-------|
| slate-50 | #f8fafc | Fond principal |
| slate-100 | #f1f5f9 | Fond secondaire |
| slate-200 | #e2e8f0 | Bordures légères |
| slate-300 | #cbd5e1 | Bordures, séparateurs |
| slate-400 | #94a3b8 | Texte désactivé |
| slate-500 | #64748b | Texte secondaire |
| slate-600 | #475569 | Texte principal |
| slate-700 | #334155 | Titres, en-têtes |
| slate-800 | #1e293b | Fond dark, éléments actifs |
| slate-900 | #0f172a | Fond principal dark |

### Couleurs d'Accent
| Nom | Hex | Usage |
|-----|-----|-------|
| gray-300 | #d1d5db | Brique neutre |
| gray-400 | #9ca3af | Brique faible |
| gray-500 | #6b7280 | Brique moyenne |
| gray-600 | #4b5563 | Brique forte |
| gray-700 | #374151 | Brique élite |

### Couleurs de Feedback
| Nom | Hex | Usage |
|-----|-----|-------|
| green-500 | #22c55e | Succès, score positif |
| red-500 | #ef4444 | Erreur, vie perdue |
| yellow-500 | #eab308 | Attention, bonus |
| blue-500 | #3b82f6 | Information, progression |

### Transparences
| Token | Valeur | Usage |
|-------|--------|-------|
| bg-overlay | rgba(15, 23, 42, 0.75) | Modal backdrop |
| bg-glass | rgba(241, 245, 249, 0.15) | Effet verre |
| border-light | rgba(226, 232, 240, 0.3) | Bordures subtiles |

---

## 🔤 Typographie

### Familles
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
Échelles
Token	Taille	Weight	Usage
display	2.5rem	700	Titre principal
h1	2rem	700	En-tête de section
h2	1.5rem	600	Sous-titre
h3	1.25rem	600	Titre de carte
body-lg	1.125rem	400	Texte important
body	1rem	400	Texte principal
body-sm	0.875rem	400	Texte secondaire
caption	0.75rem	400	Métadonnées, labels
Espacement (Spacing Scale)
/* Basé sur 4px */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
🖼️ Iconographie

Librairie : Lucide React (UNIQUEMENT)
Taille standard : 24px (w-6 h-6)
Taille mobile : 20px (w-5 h-5)
Stroke width : 2 (par défaut)

Icônes Essentielles

Gamepad2 — Menu principal

Trophy — Scores

Settings — Paramètres

Play — Démarrer

Pause — Pause

RotateCcw — Recommencer

Home — Retour accueil

User — Profil

Volume2 / VolumeX — Son

Moon / Sun — Thème

ChevronLeft — Retour

X — Fermer

🎯 Principes UI

Hiérarchie visuelle claire : Utiliser taille, poids, couleur et espacement

Micro-interactions : Chaque action a un retour (hover, active, focus)

Accessibilité : Contrast ≥ 4.5:1 pour le texte

Consistance : Tokens appliqués partout

Mobile-first : Les composants sont conçus pour le tactile d'abord

Composants UI (Design System)

Button : Primary, Secondary, Tertiary, Ghost

Card : Standard, Glass, Elevation

Modal : Centered, Bottom Sheet (mobile)

Input : Text, Number, Toggle, Slider

Feedback : Toast, Spinner, Skeleton

Layout : Container, Grid, Stack, Divider

text

---

## 📋 BIBLE_