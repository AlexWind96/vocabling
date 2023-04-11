import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { useModules } from '@/entities/module'
import { API, CreateModuleDTO, Module } from '@/shared/api'
import { queryClient } from '@/shared/lib/react-query'

export const useCreateModule = createMutation<Module, CreateModuleDTO, AxiosError>({
  mutationFn: async (vars) => {
    return API.module.createModule(vars).then((res) => res.data)
  },

  onSettled: () => {
    queryClient.invalidateQueries(useModules.getKey())
  },
})
