import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { API, Card, QUERY_KEY } from '@/api'
import { ExtractFnReturnType, QueryConfig } from '@/shared/lib/react-query'

export const getCard = async (id: string): Promise<Card> => {
  const { data } = await API.endpoints.card.getCardById(id)
  return data
}

type QueryFnType = typeof getCard

type UseModuleOptions = {
  id: string
  config?: QueryConfig<QueryFnType>
}

export const useCard = ({ id, config }: UseModuleOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>, AxiosError>({
    ...config,
    queryKey: [QUERY_KEY.CARDS, id],
    queryFn: () => getCard(id),
  })
}
