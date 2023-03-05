import { AxiosError } from 'axios'
import { createQuery } from 'react-query-kit'
import { API, LearnSession, Page } from '@/shared/api'

export const useLearnSessions = createQuery<Page<LearnSession>, void, AxiosError>({
  primaryKey: API.learnSession.basePath,
  queryFn: () => {
    return API.learnSession.getLearnSessions().then((res) => res.data)
  },
})
