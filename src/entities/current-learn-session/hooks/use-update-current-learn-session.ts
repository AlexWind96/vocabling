import { useMutation } from 'react-query'
import { API, CurrentLearnSession, QUERY_KEY, UpdateCurrentLearnSessionDto } from '@/api'
import { MutationConfig, queryClient } from '@/shared/lib/react-query'

export const updateCurrentLearnSession = async (
  body: UpdateCurrentLearnSessionDto
): Promise<CurrentLearnSession> => {
  const { data } = await API.endpoints.currentLearnSession.updateCurrentLearnSession(body)
  return data
}

type Options = {
  config?: MutationConfig<typeof updateCurrentLearnSession>
}

export const useUpdateCurrentLearnSession = ({ config }: Options = {}) => {
  return useMutation({
    onMutate: async (body) => {
      await queryClient.cancelQueries([QUERY_KEY.CURRENT_LEARN_SESSION])

      const previousItem = queryClient.getQueryData<CurrentLearnSession>([
        QUERY_KEY.CURRENT_LEARN_SESSION,
      ])

      queryClient.setQueryData([QUERY_KEY.CURRENT_LEARN_SESSION], {
        ...previousItem,
        modules: body.modules,
      })

      return { previousItem }
    },
    onError: (_, __, context: any) => {
      if (context?.previousItem) {
        queryClient.setQueryData([QUERY_KEY.CURRENT_LEARN_SESSION], context.previousItem)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.CURRENT_LEARN_SESSION])
      queryClient.refetchQueries([QUERY_KEY.CARDS, QUERY_KEY.LEARN_CARD])
    },
    ...config,
    mutationFn: updateCurrentLearnSession,
  })
}
