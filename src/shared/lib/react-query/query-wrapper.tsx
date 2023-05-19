import * as React from 'react'
import { PropsWithChildren } from 'react'
import { QueryErrorBoundary } from './query-error-boundary'
import { QuerySuspense } from './query-suspense'


type QueryWrapperProps = {
  loadingFallback?: React.ReactNode
} & PropsWithChildren

export const QueryWrapper = ({ children, loadingFallback }: QueryWrapperProps) => {
  return (
    <QueryErrorBoundary>
      <QuerySuspense fallback={loadingFallback}>{children}</QuerySuspense>
    </QueryErrorBoundary>
  )
}
