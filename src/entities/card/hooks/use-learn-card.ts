import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { API, Card, QUERY_KEY } from '@/api'
import { ExtractFnReturnType, QueryConfig } from '@/shared/lib/react-query'

const getLearnCard = async (): Promise<Card | null> => {
  const { data } = await API.endpoints.card.getLearnCard()
  return data
}

type QueryFnType = typeof getLearnCard

type UseModuleOptions = {
  config?: QueryConfig<QueryFnType>
}

export const useLearnCard = ({ config }: UseModuleOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>, AxiosError>({
    ...config,
    queryKey: [QUERY_KEY.CARDS, QUERY_KEY.LEARN_CARD],
    queryFn: getLearnCard,
  })
}
