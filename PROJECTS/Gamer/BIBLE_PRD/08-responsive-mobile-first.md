Responsive & Mobile-First — GAMER
Stratégie Mobile-First
Breakpoints Tailwind
/* Mobile First → Classes par défaut pour mobile */
/* sm: → tablette (640px+) */
/* md: → desktop (768px+) */
/* lg: → grand desktop (1024px+) */
Viewport Configuration
<!-- index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
<meta name="theme-color" content="#f8fafc" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
Safe Area Support
/* src/index.css */
@layer utilities {
  .safe-top {
    padding-top: env(safe-area-inset-top);
  }
  .safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
  .safe-left {
    padding-left: env(safe-area-inset-left);
  }
  .safe-right {
    padding-right: env(safe-area-inset-right);
  }
}
Layouts Responsifs
Hero Section
// Mobile (par défaut)
<div className="flex flex-col items-center text-center px-4 py-12 gap-6">
  <h1 className="text-3xl font-bold">GAMER</h1>
  <p className="text-base text-slate-600">...</p>
  <button className="w-full">Action</button>
</div>

// Tablette (sm:)
<div className="sm:px-8 sm:py-16 sm:gap-8">
  <h1 className="sm:text-4xl">GAMER</h1>
  <p className="sm:text-lg">...</p>
  <button className="sm:w-auto">Action</button>
</div>

// Desktop (md:)
<div className="md:px-12 md:py-20 md:flex-row md:text-left md:gap-12">
  <h1 className="md:text-5xl">GAMER</h1>
  <p className="md:text-xl">...</p>
  <button className="md:w-auto">Action</button>
</div>
Features Grid
// Mobile
<div className="grid grid-cols-1 gap-4 px-4 py-8">
  <FeatureCard />
  <FeatureCard />
  <FeatureCard />
</div>

// Tablette
<div className="sm:grid-cols-2 sm:gap-6 sm:px-8">

// Desktop
<div className="md:grid-cols-4 md:gap-8 md:px-12">
Navigation
// Mobile
<nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
  <div className="flex justify-around py-2">
    <NavItem icon={Home} label="Accueil" />
    <NavItem icon={Search} label="Recherche" />
    <NavItem icon={User} label="Profil" />
  </div>
</nav>

// Desktop
<nav className="hidden md:flex items-center gap-8">
  <NavLink href="/">Accueil</NavLink>
  <NavLink href="/features">Fonctionnalités</NavLink>
  <NavLink href="/community">Communauté</NavLink>
</nav>
PWA Configuration
Manifest
// public/manifest.json
{
  "name": "GAMER — L'énergie du jeu",
  "short_name": "GAMER",
  "description": "Plateforme gaming immersive",
  "start_url": "/?utm_source=pwa",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#f8fafc",
  "theme_color": "#0f172a",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["games", "entertainment"],
  "screenshots": [
    {
      "src": "/screenshots/mobile.png",
      "sizes": "1080x1920",
      "type": "image/png"
    }
  ]
}
Service Worker
// src/shared/services/sw.ts
export function registerServiceWorker() {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('SW registered:', registration)
        })
        .catch(error => {
          console.log('SW registration failed:', error)
        })
    })
  }
}
Vite PWA Plugin
// vite.config.ts (extension)
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: false, // On utilise notre manifest.json
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}']
      }
    })
  ]
})
Touch Interactions
Gesture Support
// src/shared/hooks/useSwipe.ts
import { useRef, useEffect } from 'react'

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
}

export function useSwipe({ 
  onSwipeLeft, 
  onSwipeRight, 
  onSwipeUp, 
  onSwipeDown 
}: SwipeHandlers) {
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchEndX = useRef(0)
  const touchEndY = useRef(0)
  
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX
    touchStartY.current = e.changedTouches[0].screenY
  }
  
  const handleTouchEnd = (e: TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX
    touchEndY.current = e.changedTouches[0].screenY
    
    const diffX = touchEndX.current - touchStartX.current
    const diffY = touchEndY.current - touchStartY.current
    
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 50 && onSwipeRight) onSwipeRight()
      if (diffX < -50 && onSwipeLeft) onSwipeLeft()
    } else {
      if (diffY > 50 && onSwipeDown) onSwipeDown()
      if (diffY < -50 && onSwipeUp) onSwipeUp()
    }
  }
  
  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchend', handleTouchEnd)
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])
}
Responsive Images
// src/shared/components/ResponsiveImage.tsx
import { useState, useEffect } from 'react'

interface ResponsiveImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}

export function ResponsiveImage({ 
  src, 
  alt, 
  className = '', 
  width = 800, 
  height = 600 
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  
  // WebP avec fallback
  const imageSrc = src.endsWith('.webp') ? src : src.replace(/\.[^.]+$/, '.webp')
  
  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      width={width}
      height={height}
      loading="lazy"
      onLoad={() => setIsLoaded(true)}
    />
  )
}