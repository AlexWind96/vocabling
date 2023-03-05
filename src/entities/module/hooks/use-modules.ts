import { AxiosError } from 'axios'
import { createQuery } from 'react-query-kit'
import { API, Module, ModulesQueryParams } from '@/shared/api'

export const useModules = createQuery<Module[], ModulesQueryParams | void, AxiosError>({
  primaryKey: API.module.basePath,
  queryFn: ({ queryKey: [_, vars] }) => {
    return API.module.getModules(vars).then((res) => res.data.edges.map((edge) => edge.node))
  },
})
