import { useMutation } from '@tanstack/react-query'
import { API, QUERY_KEY } from '@/api'
import { MutationConfig, queryClient } from '@/shared/lib/react-query'

const completeCurrentLearnSession = async (): Promise<undefined> => {
  await API.endpoints.currentLearnSession.completeCurrentLearnSession()
  return
}

type Options = {
  config?: MutationConfig<typeof completeCurrentLearnSession>
}

export const useCompleteCurrentLearnSession = ({ config }: Options = {}) => {
  return useMutation({
    onSettled: () => {
      queryClient.invalidateQueries([QUERY_KEY.CURRENT_LEARN_SESSION])
    },
    ...config,
    mutationFn: completeCurrentLearnSession,
  })
}
