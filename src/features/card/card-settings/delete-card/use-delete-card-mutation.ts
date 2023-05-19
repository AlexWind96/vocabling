import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { API, Card, CardsQueryParams, Page } from '@shared/api'
import { InfiniteData, queryClient } from '@shared/lib/react-query'
import { useCardsQuery } from '@entities/card'

export const useDeleteCardMutation = createMutation<
  Card,
  { id: string },
  AxiosError,
  CardsQueryParams
>({
  mutationFn: async (vars) => {
    return API.card.deleteCard(vars.id).then((res) => res.data)
  },
  onSuccess: async (data, variables, context) => {
    const previousRecords = queryClient.getQueryData<InfiniteData<Page<Card>>>(
      useCardsQuery.getKey(context)
    )
    if (previousRecords) {
      queryClient.setQueryData<InfiniteData<Page<Card>>>(useCardsQuery.getKey(context), {
        ...previousRecords,
        pages: previousRecords.pages.map((page) => {
          return {
            ...page,
            edges: page.edges.filter((edge) => edge.cursor !== data.id),
          }
        }),
      })
    }
    await queryClient.invalidateQueries(useCardsQuery.getKey(context))
  },
})
