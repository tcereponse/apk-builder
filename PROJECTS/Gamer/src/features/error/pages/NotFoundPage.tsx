x

import { Link } from 'react-router-dom'
import { Gamepad2, Home } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center p-6 rounded-full bg-slate-100 dark:bg-slate-800 mb-6">
          <Gamepad2 className="w-12 h-12 text-slate-600 dark:text-slate-300" />
        </div>
        <h1 className="text-6xl font-display font-bold text-slate-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-4">Page non trouvée</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Oups ! On dirait que tu as pris un mauvais chemin. Reviens à la base pour continuer l'aventure.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-semibold transition-all hover:-translate-y-0.5 shadow-lg"
        >
          <Home className="w-5 h-5" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}