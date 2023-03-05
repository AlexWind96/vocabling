import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { useCards } from '@/entities/card'
import { API, Card } from '@/shared/api'
import { queryClient } from '@/shared/lib/react-query'

export const useDeleteCard = createMutation<Card, { id: string }, AxiosError>(
  async (vars) => {
    return API.card.deleteCard(vars.id).then((res) => res.data)
  },
  {
    onSettled: () => {
      queryClient.invalidateQueries(useCards.getKey())
    },
  }
)
