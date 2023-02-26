import { nanoid } from '@reduxjs/toolkit'
import { useMutation } from '@tanstack/react-query'
import { API, Card, CreateCardDTO, QUERY_KEY } from '@/api'
import { MutationConfig, queryClient } from '@/shared/lib/react-query'

export const createCard = async (body: CreateCardDTO): Promise<Card> => {
  const { data } = await API.endpoints.card.createCard(body)
  return data
}

type Options = {
  config?: MutationConfig<typeof createCard>
}

export const useCreateCard = ({ config }: Options = {}) => {
  return useMutation({
    onMutate: async (newCard) => {
      await queryClient.cancelQueries([QUERY_KEY.CARDS])

      const previousItems = queryClient.getQueryData<Card[]>([QUERY_KEY.CARDS])

      queryClient.setQueryData(
        [QUERY_KEY.CARDS],
        [
          {
            ...newCard,
            id: nanoid(10),
          },
          ...(previousItems || []),
        ]
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
    mutationFn: createCard,
  })
}
