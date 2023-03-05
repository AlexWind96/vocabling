import { AxiosError } from 'axios'
import { createQuery } from 'react-query-kit'
import { API, Module } from '@/shared/api'

export const useModule = createQuery<Module, { id: string }, AxiosError>({
  primaryKey: API.module.basePath,
  queryFn: ({ queryKey: [_, vars] }) => {
    return API.module.getModuleById(vars.id).then((res) => res.data)
  },
})
export const useModuleQuery = ({ variables, select }) => useModule({ select, variables })

export const useModuleTitle = ({ variables }) =>
  useModule({ variables, select: (data) => data.label })
