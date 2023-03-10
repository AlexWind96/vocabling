import { PropsWithChildren } from 'react'
import * as React from 'react'
import { Loader } from '@mantine/core'

type QuerySuspenseProps = PropsWithChildren

export const QuerySuspense = ({ children }: QuerySuspenseProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center mt-4">
          <Loader size="lg" variant="dots" />
        </div>
      }
    >
      {children}
    </React.Suspense>
  )
}
