import { useInfiniteQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { API, Card, CardQueryArgs, PageInfo, PaginationArgs, QUERY_KEY } from '@/shared/api'
import { ExtractFnReturnType, InfiniteQueryConfig } from '@/shared/lib/react-query'

type GetCardsParams = CardQueryArgs & PaginationArgs

export const getCards = async (
  params: GetCardsParams | undefined,
  after: string | undefined
): Promise<{ cards: Card[]; pageInfo: PageInfo; totalCount: number }> => {
  const { data } = await API.card.getCards({ ...params, after })
  return {
    cards: data.edges.map((item) => item.node),
    pageInfo: data.pageInfo,
    totalCount: data.totalCount,
  }
}

type QueryFnType = typeof getCards

type Options = {
  params?: GetCardsParams
  config?: InfiniteQueryConfig<QueryFnType>
}

export const useCards = ({ config, params }: Options) => {
  return useInfiniteQuery<ExtractFnReturnType<QueryFnType>, AxiosError>({
    queryKey: [QUERY_KEY.CARDS, params],
    queryFn: ({ pageParam = undefined }) => getCards(params, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageInfo.hasNextPage) {
        return lastPage.pageInfo.endCursor
      } else {
        return undefined
      }
    },
    ...config,
  })
}
