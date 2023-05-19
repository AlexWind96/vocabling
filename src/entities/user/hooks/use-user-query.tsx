import { AxiosError } from 'axios'
import { createQuery } from 'react-query-kit'
import { API, User } from '@shared/api'

export const useUserQuery = createQuery<User, undefined, AxiosError>({
  primaryKey: API.auth.basePath,
  queryFn: () => {
    return API.auth.getCurrentUser().then((res) => res.data)
  },
  staleTime: Infinity,
  retry: false,
})
