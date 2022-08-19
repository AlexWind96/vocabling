import { useMutation } from 'react-query'
import { MutationConfig, queryClient } from '@/lib/react-query'
import { WordsService } from '@/services'

export const incrementCount = async () => {
  return WordsService.incrementCount('count')
}

type Options = {
  config?: MutationConfig<typeof incrementCount>
}

export const useIncrementCount = ({ config }: Options = {}) => {
  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries(['count'])

      const previousItem = queryClient.getQueryData<{ count: number; owner: string }>(['count'])

      queryClient.setQueryData(['count'], {
        ...previousItem,
        count: previousItem!.count + 1,
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
    mutationFn: incrementCount,
  })
}
