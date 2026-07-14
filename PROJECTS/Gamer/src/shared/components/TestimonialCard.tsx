x

import { Star } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

interface TestimonialCardProps {
  name: string
  username: string
  avatar?: string
  text: string
  rating: number
  className?: string
}

export function TestimonialCard({ name, username, avatar, text, rating, className }: TestimonialCardProps) {
  return (
    <div className={cn(
      'bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700',
      className
    )}>
      <div className="flex items-center gap-4 mb-4">
        {avatar ? (
          <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white font-bold text-lg">
            {name.charAt(0)}
          </div>
        )}
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white">{name}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">@{username}</p>
        </div>
      </div>
      <div className="flex mb-3">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={cn(
            'w-4 h-4',
            i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300 dark:text-slate-600'
          )} />
        ))}
      </div>
      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">"{text}"</p>
    </div>
  )
}