import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { API, Card, CardsQueryParams, Page, UpdateCardDTO } from '@shared/api'
import { InfiniteData, queryClient } from '@shared/lib/react-query'
import { useCardQuery, useCardsQuery } from '@entities/card'

export const useRegisterViewMutation = createMutation<
  Card,
  { id: string },
  AxiosError,
  CardsQueryParams
>({
  mutationFn: async (vars) => {
    return API.card.registerView(vars.id).then((res) => res.data)
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
            edges: page.edges.map((edge) => {
              if (edge.cursor === data.id) {
                return { node: data, cursor: data.id }
              } else {
                return edge
              }
            }),
          }
        }),
      })
    }
    await queryClient.invalidateQueries(useCardsQuery.getKey(context))
    await queryClient.invalidateQueries(useCardQuery.getKey({ id: data.id }))
  },
})
