import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { API, Folder, QUERY_KEY } from '@/api'
import { ExtractFnReturnType, QueryConfig } from '@/shared/lib/react-query'

export const getFolders = async (): Promise<Folder[]> => {
  const { data } = await API.endpoints.folder.getFolders()
  return data.edges.map((item) => item.node)
}

type QueryFnType = typeof getFolders

type Options = {
  config?: QueryConfig<QueryFnType>
}

export const useFolders = ({ config }: Options = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>, AxiosError, Folder[]>({
    queryKey: [QUERY_KEY.FOLDERS],
    queryFn: getFolders,
    ...config,
  })
}
