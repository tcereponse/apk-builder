# RESPONSIVE MOBILE-FIRST — BKACK

## 📱 Philosophie

**Mobile-first** → Conçu pour les écrans tactiles d'abord, puis adapté aux grands écrans.

---

## 🎯 Breakpoints

### Configuration Tailwind
// tailwind.config.ts
export default {
  theme: {
    screens: {
      'xs': '320px',   // Petits mobiles
      'sm': '480px',   // Mobiles standard
      'md': '768px',   // Tablettes
      'lg': '1024px',  // Desktop
      'xl': '1280px',  // Grand desktop
      '2xl': '1536px'  // Écrans larges
    },
    extend: {
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)'
      }
    }
  }
};
📐 Mise en Page Adaptative
Conteneur Principal
<div className="
  min-h-screen 
  w-full 
  max-w-2xl mx-auto
  px-4 sm:px-6 md:px-8
  py-safe-top pb-safe-bottom
  bg-slate-50 dark:bg-slate-900
">
  {/* Contenu */}
</div>
Grille de Jeu (Canvas)
<canvas
  className="
    w-full 
    aspect-[4/3] 
    max-w-[800px]
    bg-slate-800 
    rounded-lg 
    shadow-xl
    touch-none
    select-none
  "
  ref={canvasRef}
  width={800}
  height={600}
/>
🖐️ Interactions Tactiles
Gestion du Touch
// hooks/useTouchInput.ts
export const useTouchInput = (onMove: (x: number) => void, onTap: () => void) => {
  const touchStartX = useRef<number | null>(null);
  
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartX.current = touch.clientX;
      e.preventDefault();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartX.current) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartX.current;
      onMove(deltaX);
      touchStartX.current = touch.clientX;
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current !== null && e.changedTouches.length > 0) {
        const touch = e.changedTouches[0];
        const deltaX = Math.abs(touch.clientX - touchStartX.current);
        if (deltaX < 10) onTap(); // Tap si peu de mouvement
      }
      touchStartX.current = null;
    };

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onMove, onTap]);
};
🎨 Composants Adaptatifs
Button Responsive
<button
  className="
    px-4 sm:px-6 md:px-8
    py-2 sm:py-3 md:py-4
    text-sm sm:text-base md:text-lg
    font-semibold
    rounded-lg
    transition-all
    active:scale-95
    touch:min-h-[44px]
  "
>
  {children}
</button>
Card Responsive
<div className="
  p-4 sm:p-6 md:p-8
  rounded-xl
  bg-white dark:bg-slate-800
  shadow-lg
  w-full
  max-w-sm sm:max-w-md md:max-w-lg
">
  {children}
</div>
🔄 Ajustements Dynamiques
Hook useMediaQuery
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);
  
  return matches;
};
Adaptation de la Difficulté
const isMobile = useMediaQuery('(max-width: 768px)');

// Ajuster la vitesse de la balle
const ballSpeed = isMobile ? 3 : 5;

// Ajuster la taille de la raquette
const paddleWidth = isMobile ? 80 : 120;
📱 PWA Configuration
Manifest (manifest.json)
{
  "name": "BKACK - Breakout Game",
  "short_name": "BKACK",
  "description": "Casse-briques moderne et addictif",
  "start_url": "./index.html",
  "display": "standalone",
  "background_color": "#f8fafc",
  "theme_color": "#0f172a",
  "orientation": "portrait",
  "icons": [
    {
      "src": "icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
Service Worker (sw.js)
const CACHE_NAME = 'bkack-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/src/app/main.tsx',
  '/src/index.css',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
✅ Checklist Mobile

Viewport configuré correctement

Safe-area insets

Points de contact ≥ 44px

Pas de hover-only interactions

Inputs auto-correction désactivée

Touch events avec preventDefault

Scrolling désactivé dans le canvas

Orientation portrait recommandée

PWA configurée

Service Worker installé

text

---

## 📋 BIBLE_