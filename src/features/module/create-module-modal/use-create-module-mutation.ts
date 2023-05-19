import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { API, CreateModuleDTO, Module } from '@shared/api'
import { queryClient } from '@shared/lib/react-query'
import { useModulesQuery } from '@entities/module'

export const useCreateModuleMutation = createMutation<Module, CreateModuleDTO, AxiosError>({
  mutationFn: async (vars) => {
    return API.module.createModule(vars).then((res) => res.data)
  },

  onSettled: () => {
    queryClient.invalidateQueries(useModulesQuery.getKey())
  },
})
