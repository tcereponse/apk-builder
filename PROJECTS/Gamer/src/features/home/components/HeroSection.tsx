x

import { ArrowRight, Sparkles } from 'lucide-react'

export function HeroSection() {
  const scrollToFeatures = () => {
    const element = document.getElementById('features')
    element?.scrollIntoView({ behavior: 'smooth' })
  }
  
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-slate-300/20 via-transparent to-transparent dark:from-slate-500/10" />
      
      <div className="container mx-auto relative z-10 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700 mb-6">
          <Sparkles className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Nouvelle version 1.0</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
          <span className="block">GAMER</span>
          <span className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 dark:from-slate-300 dark:via-white dark:to-slate-300 bg-clip-text text-transparent animate-glow">
            L'énergie du jeu
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10">
          Rejoins la communauté qui transforme le gaming en expérience collective. Défie, partage, et deviens légende.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToFeatures}
            className="group px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-semibold transition-all flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Commencer l'aventure
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#community"
            className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 text-slate-700 dark:text-white rounded-full font-semibold transition-all border border-slate-200 dark:border-slate-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Voir la communauté
          </a>
        </div>
        
        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-slate-500 dark:text-slate-400">
          <span>🎮 10k+ joueurs</span>
          <span className="w-px h-4 bg-slate-300 dark:bg-slate-600" />
          <span>🏆 1.5k+ tournois</span>
          <span className="w-px h-4 bg-slate-300 dark:bg-slate-600" />
          <span>⭐ 4.8/5 notes</span>
        </div>
      </div>
    </section>
  )
}