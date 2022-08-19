import { useQuery } from 'react-query'
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query'
import { WordsService } from '../../../services'

const getCount = async (): Promise<{ count: number; owner: string }> => {
  return WordsService.getOneById('count')
}

type QueryFnType = typeof getCount

type Options = {
  config?: QueryConfig<QueryFnType>
}

export const useCount = ({ config }: Options = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['count'],
    queryFn: () => getCount(),
  })
}
