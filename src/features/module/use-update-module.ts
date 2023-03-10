import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { useFolders } from '@/entities/folder'
import { useModules } from '@/entities/module'
import { API, Module, UpdateModuleDTO } from '@/shared/api'
import { queryClient } from '@/shared/lib/react-query'

export const useUpdateModule = createMutation<
  Module,
  { id: string; body: UpdateModuleDTO },
  AxiosError
>(
  async (vars) => {
    return API.module
      .updateModule(vars.id, vars.body)
      .then((res) => res.data)
      .catch((err) => err)
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries(useModules.getKey())
      queryClient.invalidateQueries(useFolders.getKey())
    },
  }
)
