Système de Design — GAMER
Tokens de Design
Palette de Couleurs (Slate/Gray/Zinc UNIQUEMENT)
// Couleurs primaires - Slate
const slate = {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
  950: '#020617'
}

// Couleurs secondaires - Gray
const gray = {
  50: '#f9fafb',
  100: '#f3f4f6',
  200: '#e5e7eb',
  300: '#d1d5db',
  400: '#9ca3af',
  500: '#6b7280',
  600: '#4b5563',
  700: '#374151',
  800: '#1f2937',
  900: '#111827',
  950: '#030712'
}

// Accents - Zinc
const zinc = {
  50: '#fafafa',
  100: '#f4f4f5',
  200: '#e4e4e7',
  300: '#d4d4d8',
  400: '#a1a1aa',
  500: '#71717a',
  600: '#52525b',
  700: '#3f3f46',
  800: '#27272a',
  900: '#18181b',
  950: '#09090b'
}
Utilisation des Couleurs
Rôle	Couleur	Classes Tailwind
Fond principal	slate-50 / gray-900	bg-slate-50 dark:bg-gray-900
Fond carte	white / slate-800	bg-white dark:bg-slate-800
Texte principal	slate-900 / white	text-slate-900 dark:text-white
Texte secondaire	slate-600 / slate-300	text-slate-600 dark:text-slate-300
Accent	zinc-600 / zinc-400	text-zinc-600 dark:text-zinc-400
Bordure	slate-200 / slate-700	border-slate-200 dark:border-slate-700
Primary CTA	slate-800	bg-slate-800 hover:bg-slate-700
CTA secondaire	zinc-600	bg-zinc-600 hover:bg-zinc-500
Typographie
const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    display: ['Orbitron', 'monospace'],
    mono: ['JetBrains Mono', 'monospace']
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  }
}
Espacement (Scale)
const spacing = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
  24: '6rem',    // 96px
  32: '8rem',    // 128px
  40: '10rem',   // 160px
  48: '12rem',   // 192px
  56: '14rem',   // 224px
  64: '16rem',   // 256px
}
Border Radius
const borderRadius = {
  none: '0',
  sm: '0.125rem',  // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem',  // 6px
  lg: '0.5rem',    // 8px
  xl: '0.75rem',   // 12px
  '2xl': '1rem',   // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',
}
Ombres (Shadows)
const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
}
Composants UI Système
Boutons
// Variants
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'

// Classes associées
const buttonVariants = {
  primary: 'bg-slate-800 text-white hover:bg-slate-700 focus:ring-slate-500',
  secondary: 'bg-zinc-600 text-white hover:bg-zinc-500 focus:ring-zinc-500',
  outline: 'border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-slate-500',
  ghost: 'text-slate-600 hover:bg-slate-100 focus:ring-slate-500'
}
Cartes
// Classes de carte
const cardClasses = 'bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden'
Badges
// Classes de badge
const badgeClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
Icônes (Lucide React)
// Référentiel d'icônes
import { 
  Gamepad2,       // Jeux vidéo
  Trophy,         // Compétition
  Users,          // Communauté
  Star,           // Favoris
  Rocket,         // Démarrage
  Sparkles,       // Nouveauté
  ArrowRight,     // CTA
  Menu,           // Navigation mobile
  X,              // Fermeture
  Moon,           // Thème sombre
  Sun,            // Thème clair
  Github,         // Social
  Twitter,        // Social
  Youtube,        // Social
  Twitch,         // Social
  Discord,        // Social
  ChevronDown,    // Déroulement
  ChevronUp,      // Remontée
  Play,           // Lecture
  Pause,          // Pause
  RefreshCw,      // Rechargement
  Loader2,        // Chargement
  Check,          // Validation
  AlertCircle,    // Alerte
  Info,           // Information
  Eye,            // Vue
  Heart,          // Like
  Share2,         // Partage
  Download,       // Téléchargement
  Send            // Envoi
} from 'lucide-react'
Breakpoints Responsive
const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}

// Classes Tailwind correspondantes
// sm: → mobile portrait
// md: → tablette
// lg: → desktop
// xl: → large desktop