import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { API } from '@shared/api'
import { queryClient } from '@shared/lib/react-query'
import { useCurrentLearnSessionQuery } from '@entities/current-learn-session'

export const useCompleteLearnSessionMutation = createMutation<void, void, AxiosError>({
  mutationFn: async () => {
    return API.currentLearnSession.completeCurrentLearnSession().then((res) => res.data)
  },

  onSettled: () => {
    queryClient.invalidateQueries(useCurrentLearnSessionQuery.getKey())
  },
})
