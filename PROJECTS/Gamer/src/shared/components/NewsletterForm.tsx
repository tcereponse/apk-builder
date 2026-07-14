x

import { useState } from 'react'
import { z } from 'zod'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { newsletterService } from '@/shared/services/newsletterService'
import { NewsletterSubscriptionSchema } from '@/shared/types'
import { cn } from '@/shared/lib/utils'

export function NewsletterForm() {
  const [email, setEmail] = useState<string>('')
  const [consent, setConsent] = useState<boolean>(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')
    
    try {
      const data = { email, consent }
      NewsletterSubscriptionSchema.parse(data)
      await newsletterService.subscribe(data)
      setStatus('success')
      setEmail('')
      setConsent(false)
      setTimeout(() => setStatus('idle'), 4000)
    } catch (error) {
      setStatus('error')
      if (error instanceof z.ZodError) {
        setErrorMessage(error.errors[0]?.message || 'Données invalides')
      } else if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Une erreur est survenue. Veuillez réessayer.')
      }
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          placeholder="Ton adresse email"
          className="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors"
          disabled={status === 'loading' || status === 'success'}
          required
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className={cn(
            'px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 min-w-[120px]',
            status === 'success' 
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          {status === 'loading' && (
            <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {status === 'success' && <CheckCircle className="w-5 h-5" />}
          {status === 'idle' && <Send className="w-5 h-5" />}
          {status === 'loading' ? 'Envoi...' : status === 'success' ? 'Inscrit !' : "S'abonner"}
        </button>
      </div>
      
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="consent"
          checked={consent}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConsent(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-slate-700 focus:ring-slate-500"
          disabled={status === 'loading' || status === 'success'}
          required
        />
        <label htmlFor="consent" className="text-xs text-slate-600 dark:text-slate-400">
          J'accepte la politique de confidentialité et de recevoir des communications de GAMER.
        </label>
      </div>
      
      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage || 'Une erreur est survenue.'}</span>
        </div>
      )}
    </form>
  )
}