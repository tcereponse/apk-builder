import { useEffect, useRef } from 'react'

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
}

export function useSwipe({ 
  onSwipeLeft, 
  onSwipeRight, 
  onSwipeUp, 
  onSwipeDown 
}: SwipeHandlers) {
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const touchEndX = useRef(0)
  const touchEndY = useRef(0)
  
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.changedTouches[0].screenX
      touchStartY.current = e.changedTouches[0].screenY
    }
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].screenX
      touchEndY.current = e.changedTouches[0].screenY
      
      const diffX = touchEndX.current - touchStartX.current
      const diffY = touchEndY.current - touchStartY.current
      const minSwipeDistance = 50
      
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > minSwipeDistance && onSwipeRight) onSwipeRight()
        if (diffX < -minSwipeDistance && onSwipeLeft) onSwipeLeft()
      } else {
        if (diffY > minSwipeDistance && onSwipeDown) onSwipeDown()
        if (diffY < -minSwipeDistance && onSwipeUp) onSwipeUp()
      }
    }
    
    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchend', handleTouchEnd)
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown])
}