import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import * as React from 'react'
import { PropsWithChildren } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Alert, Anchor } from '@mantine/core'


type QueryErrorBoundaryProps = PropsWithChildren

export const QueryErrorBoundary = (props: QueryErrorBoundaryProps) => {
  const { reset } = useQueryErrorResetBoundary()
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <Alert bg={'red.1'} color={'red.5'} title={'Error'}>
          {error.message + '😔' || 'Sorry! Something went wrong😔'}
          <Anchor
            color={'pink'}
            component="button"
            type="button"
            onClick={() => resetErrorBoundary()}
          >
            Try again!
          </Anchor>
        </Alert>
      )}
      onReset={reset}
    >
      {props.children}
    </ErrorBoundary>
  )
}
