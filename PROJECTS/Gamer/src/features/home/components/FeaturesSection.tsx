x

import { Users, Trophy, Sparkles, Star } from 'lucide-react'
import { FeatureCard } from '@/shared/components/FeatureCard'
import { useInView } from '@/shared/hooks/useInView'

const features = [
  {
    id: '1',
    icon: Users,
    title: 'Communauté Active',
    description: 'Rejoins des milliers de passionnés qui partagent ta passion et participent à des événements exclusifs.',
    badge: '🔥 10k+ joueurs'
  },
  {
    id: '2',
    icon: Trophy,
    title: 'Tournois & Compétitions',
    description: 'Défie les meilleurs joueurs et grimpe dans les classements mondiaux pour remporter des prix exclusifs.',
    badge: '🏆 Prix à gagner'
  },
  {
    id: '3',
    icon: Sparkles,
    title: 'Contenu Exclusif',
    description: 'Accède à des tutoriels, stratégies avancées et replays des meilleurs joueurs du monde entier.',
    badge: '🎮 Nouveautés'
  },
  {
    id: '4',
    icon: Star,
    title: 'Personnalisation',
    description: 'Crée ton identité unique avec des avatars, profils détaillés et des statistiques en temps réel.',
    badge: '✨ Unique'
  }
]

export function FeaturesSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  
  return (
    <section id="features" className="py-20 px-4 bg-slate-50 dark:bg-gray-900/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
            Fonctionnalités
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Tout ce dont tu as besoin pour vivre une expérience gaming inoubliable.
          </p>
        </div>
        
        <div 
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}