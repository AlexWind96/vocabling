import React from 'react'
import { ErrorBoundary as Error } from 'react-error-boundary'
import { ErrorFallback } from '@/shared/ui'

export function ErrorBoundary({ children }) {
  return <Error FallbackComponent={ErrorFallback}>{children}</Error>
}
