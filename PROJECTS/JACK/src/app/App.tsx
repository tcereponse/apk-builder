x

import { HashRouter } from 'react-router-dom'
import { AppRoutes } from './router'
import { SettingsProvider } from '@features/settings/contexts/SettingsContext'
import { ScoresProvider } from '@features/scores/contexts/ScoresContext'
import { GameProvider } from '@features/game/contexts/GameContext'

function App() {
  return (
    <SettingsProvider>
      <ScoresProvider>
        <GameProvider>
          <HashRouter>
            <AppRoutes />
          </HashRouter>
        </GameProvider>
      </ScoresProvider>
    </SettingsProvider>
  )
}

export default App