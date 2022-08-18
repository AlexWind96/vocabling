import React from 'react'
import { Navigate } from 'react-router-dom'
import { ROLE } from '@/features/auth'
import { PATH } from '@/routes/path'
import { lazyImport } from '@/utils'
import { MiddlewareType } from '../../routes-middlewares'

const { Words } = lazyImport(() => import('@/pages'), 'Words')
const { CreateWord } = lazyImport(() => import('@/pages'), 'CreateWord')

type PrivateRouteType = {
  index?: boolean
  path: string
  element: React.ReactNode
  roles: ROLE[]
  middlewares: MiddlewareType[]
}

const privateRoutes: PrivateRouteType[] = [
  {
    path: `${PATH.words}/create`,
    element: <CreateWord />,
    roles: [ROLE.User, ROLE.Admin],
    middlewares: [],
  },
  {
    path: `${PATH.words}`,
    element: <Words />,
    roles: [ROLE.User, ROLE.Admin],
    middlewares: [],
  },
  {
    path: `${PATH.app}`,
    element: <Navigate to={`/${PATH.words}`} replace />,
    roles: [ROLE.User, ROLE.Admin],
    middlewares: [],
  },
]

export const getPrivateRoutesByRole = (role: ROLE) => {
  return privateRoutes.filter((route) => route.roles.includes(role))
}

export const getAllPrivateRoutes = () => {
  return privateRoutes
}
