import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { useCards } from '@/entities/card'
import { API, Card, CreateCardDTO } from '@/shared/api'
import { queryClient } from '@/shared/lib/react-query'

export const useCreateCard = createMutation<Card, CreateCardDTO, AxiosError>(
  async (vars) => {
    return API.card.createCard(vars).then((res) => res.data)
  },
  {
    onSettled: () => {
      queryClient.invalidateQueries(useCards.getKey())
    },
  }
)
