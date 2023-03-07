import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { useFolders } from '@/entities/folder'
import { useModules } from '@/entities/module'
import { API, Folder } from '@/shared/api'
import { queryClient } from '@/shared/lib/react-query'

export const useDeleteFolder = createMutation<Folder, { id: string }, AxiosError>(
  async (vars) => {
    return API.folder.deleteFolder(vars.id).then((res) => res.data)
  },
  {
    onSettled: () => {
      queryClient.invalidateQueries(useFolders.getKey())
      queryClient.invalidateQueries([useModules.getKey()])
    },
  }
)
