import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { API, Module } from '@shared/api'
import { queryClient } from '@shared/lib/react-query'
import { useFoldersQuery } from '@entities/folder'
import { useModulesQuery } from '@entities/module'

export const useRemoveFromFolderMutation = createMutation<Module, { id: string }, AxiosError>({
  mutationFn: async (vars) => {
    return API.module
      .updateModule(vars.id, { folderId: null })
      .then((res) => res.data)
      .catch((err) => err)
  },

  onSuccess: () => {
    queryClient.invalidateQueries(useModulesQuery.getKey())
    queryClient.invalidateQueries(useFoldersQuery.getKey())
  },
})
