import { z } from 'zod'

export const FeatureSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  badge: z.string().optional()
})

export type Feature = z.infer<typeof FeatureSchema>

export const TestimonialSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  avatar: z.string().url().optional(),
  text: z.string(),
  rating: z.number().min(1).max(5)
})

export type Testimonial = z.infer<typeof TestimonialSchema>

export const StatSchema = z.object({
  id: z.string(),
  value: z.string(),
  label: z.string(),
  icon: z.string()
})

export type Stat = z.infer<typeof StatSchema>

export const NewsletterSubscriptionSchema = z.object({
  email: z.string().email('Email invalide'),
  consent: z.boolean().refine(v => v === true, 'Vous devez accepter la politique de confidentialité')
})

export type NewsletterSubscription = z.infer<typeof NewsletterSubscriptionSchema>