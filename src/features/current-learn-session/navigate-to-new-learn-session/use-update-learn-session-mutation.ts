import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { API, CurrentLearnSession, UpdateCurrentLearnSessionDto } from '@shared/api'
import { queryClient } from '@shared/lib/react-query'
import { useLearnCardQuery } from '@entities/card'
import { useCurrentLearnSessionQuery } from '@entities/current-learn-session'

export const useUpdateLearnSessionMutation = createMutation<
  CurrentLearnSession,
  UpdateCurrentLearnSessionDto,
  AxiosError
>({
  mutationFn: async (vars) => {
    return API.currentLearnSession.updateCurrentLearnSession(vars).then((res) => res.data)
  },

  onSettled: () => {
    queryClient.invalidateQueries(useCurrentLearnSessionQuery.getKey())
    queryClient.invalidateQueries(useLearnCardQuery.getKey())
  },
})
