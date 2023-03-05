import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { useCard, useCards } from '@/entities/card'
import { API, Card, UpdateCardDTO } from '@/shared/api'
import { queryClient } from '@/shared/lib/react-query'

export const useUpdateCard = createMutation<Card, { id: string; body: UpdateCardDTO }, AxiosError>(
  async (vars) => {
    return API.card.updateCard(vars.id, vars.body).then((res) => res.data)
  },
  {
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries(useCard.getKey({ id: variables.id }))
      queryClient.invalidateQueries(useCards.getKey())
    },
  }
)
