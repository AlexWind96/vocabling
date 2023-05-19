import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { API, Folder } from '@shared/api'
import { queryClient } from '@shared/lib/react-query'
import { useFoldersQuery } from '@entities/folder'
import { useModulesQuery } from '@entities/module'

export const useDeleteFolderMutation = createMutation<Folder, { id: string }, AxiosError>({
  mutationFn: async (vars) => {
    return API.folder.deleteFolder(vars.id).then((res) => res.data)
  },

  onSettled: () => {
    queryClient.invalidateQueries(useFoldersQuery.getKey())
    queryClient.invalidateQueries(useModulesQuery.getKey())
  },
})
