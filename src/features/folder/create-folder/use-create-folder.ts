import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { useFolders } from '@/entities/folder'
import { API, CreateFolderDto, Folder } from '@/shared/api'
import { queryClient } from '@/shared/lib/react-query'

export const useCreateFolder = createMutation<Folder, CreateFolderDto, AxiosError>(
  async (variables) => {
    return API.folder.createFolder(variables).then((res) => res.data)
  },
  {
    onSettled: () => {
      queryClient.invalidateQueries(useFolders.getKey())
    },
  }
)
