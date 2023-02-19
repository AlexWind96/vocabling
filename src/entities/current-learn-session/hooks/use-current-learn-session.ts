import { useQuery } from 'react-query'
import { API, CurrentLearnSession, QUERY_KEY } from '@/api'
import { ExtractFnReturnType, QueryConfig } from '@/shared/lib/react-query'

const getCurrentLearnSession = async (): Promise<CurrentLearnSession> => {
  const { data } = await API.endpoints.currentLearnSession.getCurrentLearnSession()
  return data
}

type QueryFnType = typeof getCurrentLearnSession

type UseModuleOptions = {
  config?: QueryConfig<QueryFnType>
}

export const useCurrentLearnSession = ({ config }: UseModuleOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY.CURRENT_LEARN_SESSION],
    queryFn: () => getCurrentLearnSession(),
  })
}
