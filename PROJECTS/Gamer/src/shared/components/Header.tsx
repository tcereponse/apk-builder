x

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Sun, Moon, Gamepad2 } from 'lucide-react'
import { useTheme } from '@app/contexts/ThemeContext'
import { useUI } from '@app/contexts/UIContext'
import { cn } from '@/shared/lib/utils'

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const { isMenuOpen, toggleMenu, closeMenu } = useUI()
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'Fonctionnalités', href: '#features' },
    { label: 'Communauté', href: '#community' },
    { label: 'Contact', href: '#contact' }
  ]
  
  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    )}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-display font-bold text-slate-900 dark:text-white">
          <Gamepad2 className="w-6 h-6 text-slate-700 dark:text-slate-300" />
          <span className="bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-300 dark:to-white bg-clip-text text-transparent">
            GAMER
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Changer le thème"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      <div className={cn(
        'md:hidden fixed inset-x-0 top-16 bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-slate-700 transition-all duration-300 overflow-hidden',
        isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
      )}>
        <nav className="flex flex-col p-4 gap-2">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className="px-4 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}