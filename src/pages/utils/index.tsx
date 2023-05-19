import React from 'react'
import { PATH } from '@shared/config'
import { lazyImport } from '@shared/utils'


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
