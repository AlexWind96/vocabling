import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { queryClient } from '@/shared/lib/react-query'

export function QueryProvider({ children }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
