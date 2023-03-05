import { AxiosError } from 'axios'
import { createInfiniteQuery } from 'react-query-kit'
import { API, Card, CardsQueryParams, Page } from '@/shared/api'

export const useCards = createInfiniteQuery<Page<Card>, CardsQueryParams | undefined, AxiosError>({
  primaryKey: API.card.basePath,
  queryFn: ({ queryKey: [, variables], pageParam = undefined }) => {
    return API.card.getCards({ ...variables, after: pageParam }).then((res) => res.data)
  },
  getNextPageParam: (lastPage) => {
    if (lastPage.pageInfo.hasNextPage) {
      return lastPage.pageInfo.endCursor
    } else {
      return undefined
    }
  },
})
