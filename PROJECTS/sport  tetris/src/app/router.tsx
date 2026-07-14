import React from 'react'
import { Routes, Route } from 'react-router-dom'
import GamePage from '@features/game/pages/GamePage'
function AppRouter() {
return (
<Routes>
<Route path="/" element={<GamePage />} />
</Routes>
)
}
export default AppRouter