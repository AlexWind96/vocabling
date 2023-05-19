import { useRoutes } from 'react-router-dom'
import { LoadingScreen } from '@shared/ui'
import { useUserQuery } from '@entities/user'
import { getAppRoutes } from './app'
import { getAuthRoutes } from './auth'
import { getPublicRoutes } from './public'
import { getUtilsRoutes } from './utils'

export const AppRoutes = () => {
  const { data, isLoading } = useUserQuery()
  const routes = useRoutes([
    ...getPublicRoutes(),
    ...getAuthRoutes(data),
    ...getAppRoutes(data),
    ...getUtilsRoutes(),
  ])

  if (isLoading) {
    return <LoadingScreen />
  }

  return routes
}
