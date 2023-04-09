import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { useCards } from '@/entities/card'
import { API, Card, CardsQueryParams, Page } from '@/shared/api'
import { InfiniteData, queryClient } from '@/shared/lib/react-query'

export const useDeleteCard = createMutation<Card, { id: string }, AxiosError, CardsQueryParams>({
  mutationFn: async (vars) => {
    return API.card.deleteCard(vars.id).then((res) => res.data)
  },
  onSuccess: async (data, variables, context) => {
    const previousRecords = queryClient.getQueryData<InfiniteData<Page<Card>>>(
      useCards.getKey(context)
    )
    if (previousRecords) {
      queryClient.setQueryData<InfiniteData<Page<Card>>>(useCards.getKey(context), {
        ...previousRecords,
        pages: previousRecords.pages.map((page) => {
          return {
            ...page,
            edges: page.edges.filter((edge) => edge.cursor !== data.id),
          }
        }),
      })
    }
    await queryClient.invalidateQueries(useCards.getKey(context))
  },
})
