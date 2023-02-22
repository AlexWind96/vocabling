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
        <QueryProvider>
          <MantineProvider>
            <Router>
              <AppRoutes />
            </Router>
          </MantineProvider>
        </QueryProvider>
      </StoreProvider>
    </ErrorBoundary>
  )
}

export default App
