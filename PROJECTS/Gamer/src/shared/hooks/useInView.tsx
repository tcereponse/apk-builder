x

import { useEffect, useState, useRef, RefObject } from 'react'

interface UseInViewOptions {
  threshold?: number
  triggerOnce?: boolean
}

export function useInView<T extends HTMLElement = HTMLElement>({
  threshold = 0.1,
  triggerOnce = true
}: UseInViewOptions = {}): { ref: RefObject<T | null>; isInView: boolean } {
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)
  
  useEffect(() => {
    const currentElement = ref.current
    if (!currentElement) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting
        setIsInView(isVisible)
        if (isVisible && triggerOnce) {
          observer.disconnect()
        }
      },
      { threshold }
    )
    
    observer.observe(currentElement)
    
    return () => {
      observer.disconnect()
    }
  }, [threshold, triggerOnce])
  
  return { ref, isInView }
}