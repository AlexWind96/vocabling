import React from 'react'
import { Navigate } from 'react-router-dom'
import { mapNavbarLinksByRole } from '@/entities/navigation'
import { Logout } from '@/features/auth'
import { ROLE } from '@/shared/api'
import { PATH } from '@/shared/config'
import { DashboardLayout, LoadingScreen } from '@/shared/ui'
import { lazyImport } from '@/shared/utils'

const { ModulesPage } = lazyImport(() => import('./modules'), 'ModulesPage')
const { ModulePage } = lazyImport(() => import('./modules/[id]'), 'ModulePage')
const { AllCardsPage } = lazyImport(() => import('./modules/all-cards'), 'AllCardsPage')
const { AddCardsPage } = lazyImport(() => import('./modules/[id]/add-cards'), 'AddCardsPage')
const { CardsLearningSettingsPage } = lazyImport(
  () => import('./learn'),
  'CardsLearningSettingsPage'
)
const { CardsLearningSessionPage } = lazyImport(
  () => import('./learn/[id]'),
  'CardsLearningSessionPage'
)

const { LearnSession } = lazyImport(() => import('./learn-sessions/[id]'), 'LearnSession')

export const getAppRoutes = (user: any) => {
  return [
    {
      element: user ? (
        <DashboardLayout
          logoutButton={Logout}
          navbarLinks={mapNavbarLinksByRole(user?.role)}
          fallBack={<LoadingScreen />}
        />
      ) : (
        <Navigate to={`/${PATH.login}`} replace />
      ),
      children: getPrivateRoutesByRole(user?.role).map((route, index) => {
        return {
          key: `${index}-${route.path}`,
          path: route.path,
          element: route.element,
        }
      }),
    },
    //When user is not log in, and prevent show 404 page
    ...getAllPrivateRoutes().map((route, index) => {
      return {
        key: `${index}-${route.path}`,
        path: route.path,
        element: <Navigate to={`/${PATH.login}`} replace />,
      }
    }),
  ]
}

type PrivateRouteType = {
  index?: boolean
  path: string
  element: React.ReactNode
  roles: ROLE[]
}

const privateRoutes: PrivateRouteType[] = [
  {
    path: `${PATH.modules}`,
    element: <ModulesPage />,
    roles: [ROLE.User, ROLE.Admin],
  },
  {
    path: `${PATH.modules}/:id`,
    element: <ModulePage />,
    roles: [ROLE.User, ROLE.Admin],
  },
  {
    path: `${PATH.modules}/${PATH.all_cards}`,
    element: <AllCardsPage />,
    roles: [ROLE.User, ROLE.Admin],
  },
  {
    path: `${PATH.modules}/:id/add-cards`,
    element: <AddCardsPage />,
    roles: [ROLE.User, ROLE.Admin],
  },
  {
    path: `${PATH.app}`,
    element: <Navigate to={`/${PATH.modules}`} replace />,
    roles: [ROLE.User, ROLE.Admin],
  },
  {
    path: `${PATH.learn_cards}`,
    element: <CardsLearningSettingsPage />,
    roles: [ROLE.User, ROLE.Admin],
  },
  {
    path: `${PATH.learn_cards}/:id`,
    element: <CardsLearningSessionPage />,
    roles: [ROLE.User, ROLE.Admin],
  },
  {
    path: `${PATH.learn_sessions}/:id`,
    element: <LearnSession />,
    roles: [ROLE.User, ROLE.Admin],
  },
]

export const getPrivateRoutesByRole = (role: ROLE) => {
  return privateRoutes.filter((route) => route.roles.includes(role))
}

export const getAllPrivateRoutes = () => {
  return privateRoutes
}
