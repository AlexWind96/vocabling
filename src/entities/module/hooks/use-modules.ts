import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { API, Module, QUERY_KEY } from '@/api'
import { ExtractFnReturnType, QueryConfig } from '@/shared/lib/react-query'

export const getModules = async (): Promise<Module[]> => {
  const { data } = await API.endpoints.module.getModules()
  return data.edges.map((item) => item.node)
}

type QueryFnType = typeof getModules

type Options = {
  config?: QueryConfig<QueryFnType>
}

export const useModules = ({ config }: Options = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>, AxiosError>({
    queryKey: [QUERY_KEY.MODULES],
    queryFn: getModules,
    ...config,
  })
}
