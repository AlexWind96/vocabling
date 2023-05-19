import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { API, CreateFolderDto, Folder } from '@shared/api'
import { queryClient } from '@shared/lib/react-query'
import { useFoldersQuery } from '@entities/folder'

export const useCreateFolderMutation = createMutation<Folder, CreateFolderDto, AxiosError>({
  mutationFn: async (variables) => {
    return API.folder.createFolder(variables).then((res) => res.data)
  },

  onSettled: () => {
    queryClient.invalidateQueries(useFoldersQuery.getKey())
  },
})
