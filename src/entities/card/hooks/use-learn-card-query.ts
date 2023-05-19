import { AxiosError } from 'axios'
import { createQuery } from 'react-query-kit'
import { API, Card } from '@shared/api'

export const useLearnCardQuery = createQuery<Card | null, void, AxiosError>({
  primaryKey: API.card.basePath + 'learn-card',
  queryFn: () => {
    return API.card.getLearnCard().then((res) => res.data)
  },
})
