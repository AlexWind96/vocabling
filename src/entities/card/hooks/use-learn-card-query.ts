import { AxiosError } from 'axios'
import { createQuery } from 'react-query-kit'
import { API, Card } from '@shared/api'

export const useLearnCardQuery = createQuery<Card | null, void, AxiosError>({
  primaryKey: API.card.basePath + 'learn-card',
  queryFn: () => {
    return API.card.getLearnCard().then((res) => res.data)
  },
})

export const useNextLearnCardQuery = createQuery<Card | null, void, AxiosError>({
  primaryKey: API.card.basePath + 'next-learn-card',
  queryFn: () => {
    return API.card.getNextLearnCard().then((res) => res.data)
  },
})
