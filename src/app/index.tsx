import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import '@entities/i18n'
import { AppRoutes } from '@pages/index'
import {
  ApiInterceptorsProvider,
  ErrorBoundary,
  MantineProvider,
  QueryProvider,
  StoreProvider,
} from './providers'
import './styles/index.scss'

function App() {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <ApiInterceptorsProvider>
          <QueryProvider>
            <MantineProvider>
              <Router>
                <AppRoutes />
              </Router>
            </MantineProvider>
          </QueryProvider>
        </ApiInterceptorsProvider>
      </StoreProvider>
    </ErrorBoundary>
  )
}

export default App
