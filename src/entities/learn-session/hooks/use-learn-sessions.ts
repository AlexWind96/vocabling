import { useQuery } from 'react-query'
import { API, LearnSession, QUERY_KEY } from '@/api'
import { ExtractFnReturnType, QueryConfig } from '@/shared/lib/react-query'

const getLearnSessions = async (): Promise<LearnSession[]> => {
  const { data } = await API.endpoints.learnSession.getLearnSessions()
  return data.edges.map((item) => item.node)
}

type QueryFnType = typeof getLearnSessions

type Options = {
  config?: QueryConfig<QueryFnType>
}

export const useLearnSessions = ({ config }: Options = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: [QUERY_KEY.LEARN_SESSIONS],
    queryFn: getLearnSessions,
    ...config,
  })
}
