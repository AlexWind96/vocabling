import React from 'react'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/shared/lib/react-query'

export function QueryProvider({ children }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
