import React from 'react'
import { Navigate } from 'react-router-dom'
import { PATH } from '@/shared/config'
import { ColorSchemeToggle, HomeLayout, LoadingData } from '@/shared/ui'
import { lazyImport } from '@/shared/utils'

//pages
const { HomePage } = lazyImport(() => import('./home'), 'HomePage')

//config
export const getPublicRoutes = () => {
  return [
    {
      element: <HomeLayout colorSchemeToggle={ColorSchemeToggle} fallback={<LoadingData />} />,
      children: [
        {
          index: true,
          element: <Navigate to={`/${PATH.home}`} replace />,
        },
        {
          path: `/${PATH.home}`,
          element: <HomePage />,
        },
      ],
    },
  ]
}
