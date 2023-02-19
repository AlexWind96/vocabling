import { useQuery } from 'react-query'
import { API, Card, PaginationArgs, QUERY_KEY } from '@/api'
import { ExtractFnReturnType, QueryConfig } from '@/shared/lib/react-query'

type GetCardsParams = {
  moduleId?: string
  paginationArgs?: PaginationArgs
}
export const getCards = async (params: GetCardsParams): Promise<Card[]> => {
  const { data } = await API.endpoints.card.getCards(params.moduleId, params.paginationArgs)
  return data.edges.map((item) => item.node)
}

type QueryFnType = typeof getCards

type Options = {
  moduleId?: string
  paginationArgs?: PaginationArgs
  config?: QueryConfig<QueryFnType>
}

export const useCards = ({ config, moduleId, paginationArgs }: Options) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: [QUERY_KEY.CARDS, moduleId, paginationArgs],
    queryFn: () => getCards({ moduleId, paginationArgs }),
    ...config,
  })
}
