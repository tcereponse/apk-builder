import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

📁 Structure plate (Flat Architecture) respectée.
🎮 Application jouable avec physique, scores, paramètres.
🔜 En attente des instructions pour la PHASE 3 (Tests, Optimisations, APK).