import { AxiosError } from 'axios'
import { createQuery } from 'react-query-kit'
import { API, CurrentLearnSession } from '@/shared/api'

export const useCurrentLearnSession = createQuery<CurrentLearnSession, void, AxiosError>({
  primaryKey: API.currentLearnSession.basePath,
  queryFn: () => {
    return API.currentLearnSession.getCurrentLearnSession().then((res) => res.data)
  },
})
