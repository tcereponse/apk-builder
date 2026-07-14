x

import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { LoadingSpinner } from '@/shared/components/LoadingSpinner'

const HomePage = lazy(() => import('@/features/home/pages/HomePage'))
const LegalPage = lazy(() => import('@/features/legal/pages/LegalPage'))
const PrivacyPage = lazy(() => import('@/features/legal/pages/PrivacyPage'))
const NotFoundPage = lazy(() => import('@/features/error/pages/NotFoundPage'))

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mentions-legales" element={<LegalPage />} />
          <Route path="/politique-confidentialite" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}