x

import { TestimonialCard } from '@/shared/components/TestimonialCard'
import { useInView } from '@/shared/hooks/useInView'

const testimonials = [
  {
    id: '1',
    name: 'Alexis Dubois',
    username: 'alex_gaming',
    text: 'GAMER a complètement changé ma façon de jouer. La communauté est incroyablement active et les tournois sont hyper compétitifs !',
    rating: 5
  },
  {
    id: '2',
    name: 'Sarah Martinez',
    username: 'sarah_plays',
    text: 'Le contenu exclusif est juste phénoménal. Les tutos m\'ont fait passer de débutant à compétiteur en quelques semaines.',
    rating: 5
  },
  {
    id: '3',
    name: 'Thomas Richard',
    username: 'tom_esport',
    text: 'J\'ai participé à plus de 50 tournois sur GAMER. L\'organisation est parfaite et le niveau est toujours au rendez-vous.',
    rating: 4
  }
]

export function TestimonialsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  
  return (
    <section id="community" className="py-20 px-4 bg-slate-50 dark:bg-gray-900/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
            Ils parlent de nous
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Découvre ce que les membres de notre communauté pensent de GAMER.
          </p>
        </div>
        
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}