import { useMutation } from 'react-query'
import { MutationConfig, queryClient } from '@/lib/react-query'
import { WordsService } from '@/services'

export const setCount = async (count: number) => {
  return WordsService.resetCount('count', count)
}

type Options = {
  config?: MutationConfig<typeof setCount>
}

export const useSetCount = ({ config }: Options = {}) => {
  return useMutation({
    onMutate: async (count: number) => {
      await queryClient.cancelQueries(['count'])

      const previousItem = queryClient.getQueryData<{ count: number; owner: string }>(['count'])

      queryClient.setQueryData(['count'], {
        ...previousItem,
        count,
      })

      return { previousItem }
    },
    onError: (_, __, context: any) => {
      if (context?.previousItem) {
        queryClient.setQueryData(['count'], context.previousItem)
      }
    },
    onSuccess: () => {
      queryClient.refetchQueries(['count'])
    },
    ...config,
    mutationFn: (count) => setCount(count),
  })
}
