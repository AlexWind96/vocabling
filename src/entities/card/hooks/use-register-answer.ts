import { useMutation } from '@tanstack/react-query'
import { API, Card, QUERY_KEY } from '@/api'
import { MutationConfig, queryClient } from '@/shared/lib/react-query'

const registerAnswer = async ({ id, isRight }: { id: string; isRight: boolean }): Promise<Card> => {
  if (isRight) {
    const { data } = await API.endpoints.card.registerRightAnswer(id)
    return data
  } else {
    const { data } = await API.endpoints.card.registerWrongAnswer(id)
    return data
  }
}

type Options = {
  config?: MutationConfig<typeof registerAnswer>
}

export const useRegisterAnswer = ({ config }: Options = {}) => {
  return useMutation({
    onSettled: () => {
      queryClient.invalidateQueries([QUERY_KEY.CARDS, QUERY_KEY.LEARN_CARD])
      queryClient.invalidateQueries([QUERY_KEY.CURRENT_LEARN_SESSION])
    },
    ...config,
    mutationFn: registerAnswer,
  })
}
