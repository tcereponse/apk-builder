import { NewsletterSubscription } from '@/shared/types'

export const newsletterService = {
  async subscribe(data: NewsletterSubscription): Promise<{ success: boolean }> {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    if (!data.email.includes('@')) {
      throw new Error('Email invalide')
    }
    
    const subscriptions = JSON.parse(localStorage.getItem('gamer-newsletter') || '[]')
    subscriptions.push({
      email: data.email,
      consent: data.consent,
      subscribedAt: new Date().toISOString()
    })
    localStorage.setItem('gamer-newsletter', JSON.stringify(subscriptions))
    
    return { success: true }
  }
}