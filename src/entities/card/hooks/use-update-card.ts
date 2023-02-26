import { useMutation } from '@tanstack/react-query'
import { API, Card, QUERY_KEY, UpdateCardDTO } from '@/api'
import { MutationConfig, queryClient } from '@/shared/lib/react-query'

type UpdateCardPayload = {
  id: string
  body: UpdateCardDTO
}

export const updateCard = async ({ id, body }: UpdateCardPayload): Promise<Card> => {
  const { data } = await API.endpoints.card.updateCard(id, body)
  return data
}

type Options = {
  config?: MutationConfig<typeof updateCard>
}

export const useUpdateCard = ({ config }: Options = {}) => {
  return useMutation({
    onMutate: async ({ id, body }) => {
      await queryClient.cancelQueries([QUERY_KEY.CARDS])

      const previousItem = queryClient.getQueryData<Card>([QUERY_KEY.CARDS, id])

      queryClient.setQueryData([QUERY_KEY.CARDS, id], {
        ...previousItem,
        ...body,
      })

      return { previousItem }
    },
    onError: (_, { id }, context: any) => {
      if (context?.previousItem) {
        queryClient.setQueryData([QUERY_KEY.CARDS, id], context.previousItems)
      }
    },
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries([QUERY_KEY.CARDS, id])
      queryClient.invalidateQueries([QUERY_KEY.CARDS])
    },
    ...config,
    mutationFn: updateCard,
  })
}
