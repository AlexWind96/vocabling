import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { API, Module, ModulesQueryParams, QUERY_KEY } from '@/shared/api'
import { ExtractFnReturnType, QueryConfig } from '@/shared/lib/react-query'

export const getModules = async (params: ModulesQueryParams | undefined): Promise<Module[]> => {
  const { data } = await API.module.getModules(params)
  return data.edges.map((item) => item.node)
}

type QueryFnType = typeof getModules

type Options = {
  params?: ModulesQueryParams
  config?: QueryConfig<QueryFnType>
}

export const useModules = ({ config, params }: Options = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>, AxiosError>({
    queryKey: [QUERY_KEY.MODULES, params],
    queryFn: () => getModules(params),
    ...config,
  })
}
