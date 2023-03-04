import { useMutation } from '@tanstack/react-query'
import { API, Card, QUERY_KEY } from '@/shared/api'
import { MutationConfig, queryClient } from '@/shared/lib/react-query'

export const deleteCard = async (id: string): Promise<Card> => {
  const { data } = await API.card.deleteCard(id)
  return data
}

type Options = {
  config?: MutationConfig<typeof deleteCard>
}

export const useDeleteCard = ({ config }: Options = {}) => {
  return useMutation({
    onMutate: async (id) => {
      await queryClient.cancelQueries([QUERY_KEY.CARDS])

      const previousItems = queryClient.getQueryData<Card[]>([QUERY_KEY.CARDS])

      queryClient.setQueryData(
        [QUERY_KEY.CARDS],
        previousItems?.filter((item) => item.id !== id)
      )

      return { previousItems }
    },
    onError: (_, __, context: any) => {
      if (context?.previousItems) {
        queryClient.setQueryData([QUERY_KEY.CARDS], context.previousItems)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.CARDS])
    },
    ...config,
    mutationFn: deleteCard,
  })
}
