import { AxiosError } from 'axios'
import { createQuery } from 'react-query-kit'
import { API, CurrentLearnSession } from '@shared/api'

export const useCurrentLearnSessionQuery = createQuery<CurrentLearnSession, void, AxiosError>({
  primaryKey: API.currentLearnSession.basePath,
  queryFn: () => {
    return API.currentLearnSession.getCurrentLearnSession().then((res) => res.data)
  },
})
