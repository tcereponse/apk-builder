import React from 'react'
import { useTheme } from '@app/contexts/ThemeContext'
import { Sun, Moon, Sparkles } from 'lucide-react'
import { cn } from '@shared/utils/cn'
const THEMES = [
{ id: 'light', icon: Sun, label: 'Clair' },
{ id: 'dark', icon: Moon, label: 'Sombre' },
{ id: 'diamond', icon: Sparkles, label: 'Diamond' },
] as const
export function ThemeSelector() {
const { theme, setTheme } = useTheme()
return (
    <div className="flex gap-1 glass-panel p-1">
      {THEMES.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setTheme(id)}
          className={cn(
            'p-1.5 rounded-md transition-all duration-200',
            'hover:bg-diamond-surface/50',
            theme === id && 'bg-diamond-primary/20 text-diamond-primary',
            theme !== id && 'text-diamond-muted'
          )}
          title={label}
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  )
}