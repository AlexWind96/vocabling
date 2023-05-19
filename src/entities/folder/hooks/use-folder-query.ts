import { AxiosError } from 'axios'
import { createQuery } from 'react-query-kit'
import { API, Folder } from '@shared/api'

export const useFolderQuery = createQuery<Folder, { id: string }, AxiosError>({
  primaryKey: API.folder.basePath,
  queryFn: ({ queryKey: [, variables] }) => {
    return API.folder.getFolderById(variables.id).then((res) => res.data)
  },
})
