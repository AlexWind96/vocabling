import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { useCards } from '@/entities/card'
import { API, Card, CardsQueryParams, CreateCardDTO, Page } from '@/shared/api'
import { InfiniteData, queryClient } from '@/shared/lib/react-query'

export const useCreateCard = createMutation<Card, CreateCardDTO, AxiosError, CardsQueryParams>({
  mutationFn: async (vars) => {
    return API.card.createCard(vars).then((res) => res.data)
  },
  onSuccess: async (data, variables, context) => {
    const previousRecords = queryClient.getQueryData<InfiniteData<Page<Card>>>(
      useCards.getKey(context)
    )
    if (previousRecords) {
      queryClient.setQueryData<InfiniteData<Page<Card>>>(useCards.getKey(context), {
        ...previousRecords,
        pages: previousRecords.pages.map((page, index) => {
          if (index === 0) {
            return {
              ...page,
              edges: [{ node: data, cursor: data.id }, ...page.edges],
            }
          } else {
            return page
          }
        }),
      })
    }
    await queryClient.invalidateQueries(useCards.getKey(context))
  },
})
