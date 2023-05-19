import React from 'react'
import { Navigate } from 'react-router-dom'
import { PATH } from '@shared/config'
import { HomeLayout, LoadingData } from '@shared/ui'
import { lazyImport } from '@shared/utils'
import { ColorSchemeSwitch } from '@entities/ui-config'


//pages
const { HomePage } = lazyImport(() => import('./home'), 'HomePage')

//config
export const getPublicRoutes = () => {
  return [
    {
      element: <HomeLayout colorSchemeToggle={ColorSchemeSwitch} fallback={<LoadingData />} />,
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
