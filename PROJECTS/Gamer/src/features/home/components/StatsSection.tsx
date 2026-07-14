x

import { Users, Trophy, Clock, Star } from 'lucide-react'
import { StatCard } from '@/shared/components/StatCard'
import { useInView } from '@/shared/hooks/useInView'

const stats = [
  { id: '1', icon: Users, value: '10000+', label: 'Joueurs actifs' },
  { id: '2', icon: Trophy, value: '1500+', label: 'Tournois organisés' },
  { id: '3', icon: Clock, value: '500+', label: 'Heures de contenu' },
  { id: '4', icon: Star, value: '4.8', label: 'Note moyenne' }
]

export function StatsSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 })
  
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-5xl">
        <div 
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`transition-all duration-700 ${
                isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <StatCard {...stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}