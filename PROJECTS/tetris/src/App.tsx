import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Tetris from './components/Tetris'
function App() {
return (
<Routes>
<Route path="/" element={<Tetris />} />
</Routes>
)
}
export default App