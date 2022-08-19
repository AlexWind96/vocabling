import { useQuery } from 'react-query'
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query'
import { WordsService } from '@/services'
import { WordDataDTO } from '../types/api'

const getWords = async (): Promise<WordDataDTO[]> => {
  return WordsService.getAll()
}

type QueryFnType = typeof getWords

type Options = {
  config?: QueryConfig<QueryFnType>
}

export const useWords = ({ config }: Options = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['words'],
    queryFn: () => getWords(),
    ...config,
  })
}
