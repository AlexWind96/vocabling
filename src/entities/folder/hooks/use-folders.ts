import { AxiosError } from 'axios'
import { createQuery } from 'react-query-kit'
import { API, Folder } from '@/shared/api'

export const useFolders = createQuery<Folder[], void, AxiosError>({
  primaryKey: API.folder.basePath,
  queryFn: () => {
    return API.folder.getFolders().then((res) => res.data.edges.map((edge) => edge.node))
  },
})
