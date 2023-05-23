import React from 'react'
import { lazyImport } from '@shared/utils'
import { PATH } from '@entities/navigation'

const { NotFoundPage } = lazyImport(() => import('./404'), 'NotFoundPage')
const { ErrorPage } = lazyImport(() => import('./error'), 'ErrorPage')

export const getUtilsRoutes = () => {
  return [
    {
      path: `/${PATH.error}`,
      element: <ErrorPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]
}
