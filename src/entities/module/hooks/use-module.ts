import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { API, Module, QUERY_KEY } from '@/shared/api'
import { ExtractFnReturnType, QueryConfig } from '@/shared/lib/react-query'

export const getModule = async (id: string): Promise<Module> => {
  const { data } = await API.module.getModuleById(id)
  return data
}
type QueryFnType = typeof getModule

type UseModuleOptions = {
  id: string
  config?: QueryConfig<QueryFnType>
}

export const useModule = ({ id, config }: UseModuleOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>, AxiosError>({
    ...config,
    queryKey: [QUERY_KEY.MODULES, id],
    queryFn: () => getModule(id),
  })
}
