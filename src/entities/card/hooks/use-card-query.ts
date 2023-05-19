import { AxiosError } from 'axios'
import { createQuery } from 'react-query-kit'
import { API, Card } from '@shared/api'

export const useCardQuery = createQuery<Card, { id: string }, AxiosError>({
  primaryKey: API.card.basePath,
  queryFn: ({ queryKey: [, vars] }) => {
    return API.card.getCardById(vars.id).then((res) => res.data)
  },
})
