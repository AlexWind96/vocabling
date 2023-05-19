import * as React from 'react'
import { Button, ButtonProps } from '@mantine/core'


type LoadMoreProps = {
  hasNextPage: boolean | undefined
  fetchCb: () => Promise<any>
  isFetchingNextPage: boolean
} & ButtonProps

export const LoadMoreButton = ({
  isFetchingNextPage,
  hasNextPage,
  fetchCb,
  ...props
}: LoadMoreProps) => {
  if (!hasNextPage) return null
  return (
    <Button onClick={fetchCb} disabled={isFetchingNextPage} {...props}>
      {isFetchingNextPage ? 'Loading more...' : 'Load More'}
    </Button>
  )
}
