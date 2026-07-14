x

import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { MainLayout } from './layouts/MainLayout'
import { GameLayout } from './layouts/GameLayout'
import { LoadingSpinner } from '@shared/components/LoadingSpinner'

const HomePage = lazy(() => import('@features/home/pages/HomePage'))
const GamePage = lazy(() => import('@features/game/pages/GamePage'))
const ScoresPage = lazy(() => import('@features/scores/pages/ScoresPage'))
const SettingsPage = lazy(() => import('@features/settings/pages/SettingsPage'))

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        } />
        <Route path="scores" element={
          <Suspense fallback={<LoadingSpinner />}>
            <ScoresPage />
          </Suspense>
        } />
        <Route path="settings" element={
          <Suspense fallback={<LoadingSpinner />}>
            <SettingsPage />
          </Suspense>
        } />
      </Route>
      <Route path="/game" element={
        <Suspense fallback={<LoadingSpinner />}>
          <GameLayout />
        </Suspense>
      }>
        <Route index element={<GamePage />} />
      </Route>
    </Routes>
  )
}