x

import { Rocket } from 'lucide-react'
import { NewsletterForm } from '@/shared/components/NewsletterForm'

export function CTASection() {
  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-br from-slate-800 to-slate-900 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-slate-700/50 dark:bg-gray-700/50 mb-6">
          <Rocket className="w-6 h-6 text-white" />
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
          Prêt à rejoindre l'aventure ?
        </h2>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
          Inscris-toi pour être informé des prochains événements, tournois et contenus exclusifs.
        </p>
        
        <NewsletterForm />
      </div>
    </section>
  )
}