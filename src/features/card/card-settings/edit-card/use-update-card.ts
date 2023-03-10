import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { useCards } from '@/entities/card'
import { API, Card, CardsQueryParams, Page, UpdateCardDTO } from '@/shared/api'
import { InfiniteData, queryClient } from '@/shared/lib/react-query'

export const useUpdateCard = createMutation<
  Card,
  { id: string; body: UpdateCardDTO },
  AxiosError,
  CardsQueryParams
>(
  async (vars) => {
    return API.card.updateCard(vars.id, vars.body).then((res) => res.data)
  },
  {
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
      await queryClient.invalidateQueries(useCards.getKey(context))
    },
  }
)
