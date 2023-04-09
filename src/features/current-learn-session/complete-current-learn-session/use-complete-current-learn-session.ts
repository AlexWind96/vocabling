import { AxiosError } from 'axios'
import { createMutation } from 'react-query-kit'
import { useCurrentLearnSession } from '@/entities/current-learn-session'
import { API } from '@/shared/api'
import { queryClient } from '@/shared/lib/react-query'

export const useCompleteCurrentLearnSession = createMutation<void, void, AxiosError>({
  mutationFn: async () => {
    return API.currentLearnSession.completeCurrentLearnSession().then((res) => res.data)
  },

  onSettled: () => {
    queryClient.invalidateQueries(useCurrentLearnSession.getKey())
  },
})
