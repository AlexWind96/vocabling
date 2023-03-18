import { useRoutes } from 'react-router-dom'
import { useUser } from '@/entities/user'
import { LoadingScreen } from '@/shared/ui'
import { getAppRoutes } from './app'
import { getAuthRoutes } from './auth'
import { getPublicRoutes } from './public'
import { getUtilsRoutes } from './utils'

export const AppRoutes = () => {
  const { data, isLoading } = useUser()
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
