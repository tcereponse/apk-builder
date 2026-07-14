import { useState, useEffect, useRef } from 'react'

export function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState<number>(0)
  const startTime = useRef<number | null>(null)
  const animationFrame = useRef<number | undefined>(undefined)
  
  useEffect(() => {
    if (target === 0) {
      setCount(0)
      return
    }
    
    const animate = (timestamp: number) => {
      if (!startTime.current) {
        startTime.current = timestamp
      }
      
      const progress = Math.min((timestamp - startTime.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * target)
      
      setCount(current)
      
      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }
    
    animationFrame.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrame.current !== undefined) {
        cancelAnimationFrame(animationFrame.current)
      }
      startTime.current = null
    }
  }, [target, duration])
  
  return count
}