import { ReactNode } from 'react'
import { cn } from '@shared/utils/cn'
interface LayoutProps {
children: ReactNode
}
export function Layout({ children }: LayoutProps) {
return (
    <div className={cn(
      'min-h-screen w-full flex items-center justify-center',
      'bg-[#151718] text-[#e8edf2] font-sans'
    )}>
      {children}
    </div>
  )
}