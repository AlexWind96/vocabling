import { AxiosError } from 'axios'
import { createQuery } from 'react-query-kit'
import { API, LearnSession } from '@/shared/api'

export const useLearnSession = createQuery<LearnSession, { id: string }, AxiosError>({
  primaryKey: API.learnSession.basePath,
  queryFn: ({ queryKey: [, vars] }) => {
    return API.learnSession.getLearnSessionById(vars.id).then((res) => res.data)
  },
})
