x
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/app/contexts/AuthContext'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }
  
  return <>{children}</>
}
Scroll Management
ScrollToTop