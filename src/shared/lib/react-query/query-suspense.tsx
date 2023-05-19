import * as React from 'react'
import { PropsWithChildren } from 'react'
import { Loader } from '@mantine/core'


type QuerySuspenseProps = { fallback?: React.ReactNode } & PropsWithChildren

export const QuerySuspense = ({ children, fallback }: QuerySuspenseProps) => {
  return (
    <React.Suspense
      fallback={
        fallback || (
          <div className="flex items-center justify-center mt-4">
            <Loader size="lg" variant="dots" />
          </div>
        )
      }
    >
      {children}
    </React.Suspense>
  )
}
