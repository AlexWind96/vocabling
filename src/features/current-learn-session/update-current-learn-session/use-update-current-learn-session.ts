import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { useLearnCard } from '@/entities/card'
import { useCurrentLearnSession } from '@/entities/current-learn-session'
import { API, CurrentLearnSession, UpdateCurrentLearnSessionDto } from '@/shared/api'
import { queryClient } from '@/shared/lib/react-query'

export const useUpdateCurrentLearnSession = createMutation<
  CurrentLearnSession,
  UpdateCurrentLearnSessionDto,
  AxiosError
>({
  mutationFn: async (vars) => {
    return API.currentLearnSession.updateCurrentLearnSession(vars).then((res) => res.data)
  },

  onSettled: () => {
    queryClient.invalidateQueries(useCurrentLearnSession.getKey())
    queryClient.invalidateQueries(useLearnCard.getKey())
  },
})
