import { DefaultOptions, QueryClient } from '@tanstack/react-query'

const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: false,
    refetchOnWindowFocus: false,
    retry: 3,
    staleTime: 20 * 1000,
  },
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })
