import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { API, Folder, QUERY_KEY } from '@/shared/api'
import { ExtractFnReturnType, QueryConfig } from '@/shared/lib/react-query'

export const getFolder = async (id: string): Promise<Folder> => {
  const { data } = await API.folder.getFolderById(id)
  return data
}
type QueryFnType = typeof getFolder

type UseFolderOptions = {
  id: string
  config?: QueryConfig<QueryFnType>
}

export const useFolder = ({ id, config }: UseFolderOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>, AxiosError>({
    ...config,
    queryKey: [QUERY_KEY.FOLDERS, id],
    queryFn: () => getFolder(id),
  })
}
