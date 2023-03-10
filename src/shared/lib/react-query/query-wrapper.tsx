import { PropsWithChildren } from 'react'
import * as React from 'react'
import { QueryErrorBoundary } from './query-error-boundary'
import { QuerySuspense } from './query-suspense'

type QueryWrapperProps = PropsWithChildren

export const QueryWrapper = ({ children }: QueryWrapperProps) => {
  return (
    <QueryErrorBoundary>
      <QuerySuspense>{children}</QuerySuspense>
    </QueryErrorBoundary>
  )
}
