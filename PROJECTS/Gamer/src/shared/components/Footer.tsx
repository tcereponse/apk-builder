x

import { Link } from 'react-router-dom'
import { Gamepad2, Github, Twitter, Youtube, Twitch, Discord } from 'lucide-react'

export function Footer() {
  const socialLinks = [
    { icon: Discord, label: 'Discord', href: 'https://discord.gg/gamer' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/gamer' },
    { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@gamer' },
    { icon: Twitch, label: 'Twitch', href: 'https://twitch.tv/gamer' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/gamer' }
  ]
  
  const legalLinks = [
    { label: 'Mentions légales', href: '/mentions-legales' },
    { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
    { label: 'CGU', href: '#cgu' }
  ]
  
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 className="w-6 h-6 text-slate-700 dark:text-slate-300" />
              <span className="text-xl font-display font-bold text-slate-900 dark:text-white">GAMER</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm">
              L'énergie du jeu — Rejoins la communauté qui transforme le gaming en expérience collective.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Liens</h4>
            <ul className="space-y-2 text-sm">
              {legalLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.href} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Communauté</h4>
            <div className="flex gap-3">
              {socialLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>© 2026 GAMER — Tous droits réservés</p>
        </div>
      </div>
    </footer>
  )
}