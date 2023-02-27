import * as React from 'react'
import { Loader } from '@mantine/core'

type LoadingDataProps = {}

export const LoadingData = ({}: LoadingDataProps) => {
  return (
    <div className="flex items-center justify-center mt-4">
      <Loader size="lg" variant="dots" />
    </div>
  )
}
