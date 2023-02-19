import { useQuery } from 'react-query'
import { API, Module, QUERY_KEY } from '@/api'
import { ExtractFnReturnType, QueryConfig } from '@/shared/lib/react-query'

export const getModule = async (id: string): Promise<Module> => {
  const { data } = await API.endpoints.module.getModuleById(id)
  return data
}
type QueryFnType = typeof getModule

type UseModuleOptions = {
  id: string
  config?: QueryConfig<QueryFnType>
}

export const useModule = ({ id, config }: UseModuleOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY.MODULES, id],
    queryFn: () => getModule(id),
  })
}
