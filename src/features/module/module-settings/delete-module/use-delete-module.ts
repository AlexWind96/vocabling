import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { useFolders } from '@/entities/folder'
import { useModules } from '@/entities/module'
import { API, Module } from '@/shared/api'
import { queryClient } from '@/shared/lib/react-query'

export const useDeleteModule = createMutation<Module, { id: string }, AxiosError>(
  async (vars) => {
    return API.module.deleteModule(vars.id).then((res) => res.data)
  },
  {
    onSettled: () => {
      queryClient.invalidateQueries(useModules.getKey())
      queryClient.invalidateQueries(useFolders.getKey())
    },
  }
)
