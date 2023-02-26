import { useInfiniteQuery } from 'react-query'
import { API, Card, CardQueryArgs, PageInfo, PaginationArgs, QUERY_KEY } from '@/api'
import { ExtractFnReturnType, InfiniteQueryConfig } from '@/shared/lib/react-query'

type GetCardsParams = CardQueryArgs & PaginationArgs

export const getCards = async (
  params: GetCardsParams | undefined,
  after: string | undefined
): Promise<{ cards: Card[]; pageInfo: PageInfo }> => {
  const { data } = await API.endpoints.card.getCards({ ...params, after })
  return {
    cards: data.edges.map((item) => item.node),
    pageInfo: data.pageInfo,
  }
}

type QueryFnType = typeof getCards

type Options = {
  params?: GetCardsParams
  config?: InfiniteQueryConfig<QueryFnType>
}

export const useCards = ({ config, params }: Options) => {
  return useInfiniteQuery<ExtractFnReturnType<QueryFnType>>({
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
