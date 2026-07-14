x

import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { UIProvider } from './contexts/UIContext'
import { AppRoutes } from './router'
import { ScrollToTop } from './components/ScrollToTop'

function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <UIProvider>
          <ScrollToTop />
          <AppRoutes />
        </UIProvider>
      </ThemeProvider>
    </HashRouter>
  )
}

export default App