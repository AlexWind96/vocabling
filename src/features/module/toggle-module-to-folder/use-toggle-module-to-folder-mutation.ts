import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { API, Module, UpdateModuleDTO } from '@shared/api'
import { queryClient } from '@shared/lib/react-query'
import { useFoldersQuery } from '@entities/folder'
import { useModulesQuery } from '@entities/module'

export const useToggleModuleToFolderMutation = createMutation<
  Module,
  { id: string; body: UpdateModuleDTO },
  AxiosError
>({
  mutationFn: async (vars) => {
    return API.module
      .updateModule(vars.id, vars.body)
      .then((res) => res.data)
      .catch((err) => err)
  },

  onSuccess: () => {
    queryClient.invalidateQueries(useModulesQuery.getKey())
    queryClient.invalidateQueries(useFoldersQuery.getKey())
  },
})
