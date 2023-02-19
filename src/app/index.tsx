import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes } from '@/pages'
import '@/shared/lib/i18n'
import { ErrorBoundary, MantineProvider, QueryProvider, StoreProvider } from './providers'
import './styles/index.scss'

function App() {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <MantineProvider>
          <QueryProvider>
            <Router>
              <AppRoutes />
            </Router>
          </QueryProvider>
        </MantineProvider>
      </StoreProvider>
    </ErrorBoundary>
  )
}

export default App
