import { useQuery } from 'react-query'
import { API, LearnSession, QUERY_KEY } from '@/api'
import { ExtractFnReturnType, QueryConfig } from '@/shared/lib/react-query'

const getLearnSession = async (id: string): Promise<LearnSession> => {
  const { data } = await API.endpoints.learnSession.getLearnSessionById(id)
  return data
}
type QueryFnType = typeof getLearnSession

type Options = {
  id: string
  config?: QueryConfig<QueryFnType>
}

export const useLearnSession = ({ id, config }: Options) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY.LEARN_SESSIONS, id],
    queryFn: () => getLearnSession(id),
  })
}
