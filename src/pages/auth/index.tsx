import React from 'react'
import { Navigate } from 'react-router-dom'
import { PATH } from '@/shared/config'
import { AuthLayout, LoadingData } from '@/shared/ui'
import { lazyImport } from '@/shared/utils'

//pages
const { LoginPage } = lazyImport(() => import('./login'), 'LoginPage')
const { RegisterPage } = lazyImport(() => import('./register'), 'RegisterPage')

//config
export const getAuthRoutes = (user: any) => {
  return [
    {
      element: !user ? (
        <AuthLayout fallback={<LoadingData />} />
      ) : (
        <Navigate to={`/${PATH.app}`} replace />
      ),
      children: [
        {
          path: `/${PATH.login}`,
          element: <LoginPage />,
        },
        {
          path: `/${PATH.register}`,
          element: <RegisterPage />,
        },
      ],
    },
  ]
}
