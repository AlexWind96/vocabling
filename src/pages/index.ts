import { useRoutes } from 'react-router-dom'
import { useAuth } from '@/entities/auth'
import { getAppRoutes } from './app'
import { getAuthRoutes } from './auth'
import { getPublicRoutes } from './public'
import { getUtilsRoutes } from './utils'

export const AppRoutes = () => {
  const { user } = useAuth()
  return useRoutes([
    ...getPublicRoutes(),
    ...getAuthRoutes(user),
    ...getAppRoutes(user),
    ...getUtilsRoutes(),
  ])
}
