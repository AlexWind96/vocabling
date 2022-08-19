import { useMutation } from 'react-query'
import { MutationConfig, queryClient } from '@/lib/react-query'
import { WordsService } from '@/services'
import { WordDataDTO } from '../types/api'

const deleteItem = async (id: string) => {
  return WordsService.remove(id)
}

type Options = {
  config?: MutationConfig<typeof deleteItem>
}

export const useDeleteWord = ({ config }: Options = {}) => {
  return useMutation({
    onMutate: async (id) => {
      await queryClient.cancelQueries(['words'])

      const previousItems = queryClient.getQueryData<WordDataDTO[]>(['words'])

      queryClient.setQueryData(
        ['words'],
        previousItems?.filter((item) => item.id !== id)
      )

      return { previousItems }
    },
    onError: (_, __, context: any) => {
      if (context?.previousItems) {
        queryClient.setQueryData(['words'], context.previousItems)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['words'])
    },
    ...config,
    mutationFn: deleteItem,
  })
}
