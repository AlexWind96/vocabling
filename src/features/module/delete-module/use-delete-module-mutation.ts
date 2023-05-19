import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { API, Module } from '@shared/api'
import { queryClient } from '@shared/lib/react-query'
import { useFoldersQuery } from '@entities/folder'
import { useModulesQuery } from '@entities/module'

export const useDeleteModuleMutation = createMutation<Module, { id: string }, AxiosError>({
  mutationFn: async (vars) => {
    return API.module.deleteModule(vars.id).then((res) => res.data)
  },

  onSettled: () => {
    queryClient.invalidateQueries(useModulesQuery.getKey())
    queryClient.invalidateQueries(useFoldersQuery.getKey())
  },
})
