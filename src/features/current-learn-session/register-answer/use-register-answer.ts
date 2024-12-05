import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Card, LearnSession } from '@shared/api'
import { useTypedSelector } from '@shared/hooks'
import { queryClient } from '@shared/lib/react-query'
import { useLearnCardQuery, useNextLearnCardQuery } from '@entities/card'
import {
  currentLearnSessionSlice,
  selectCurrentLearnSessionSlice,
  useCurrentLearnSessionQuery,
} from '@entities/current-learn-session'
import { registerAnswer as registerAnswerAction } from './saga'

const {
  actions: { cleanState },
} = currentLearnSessionSlice

export const useRegisterAnswer = () => {
  const dispatch = useDispatch()
  const { data: nextCard } = useNextLearnCardQuery()

  const isProcessingAnswer = useTypedSelector(
    (state) => selectCurrentLearnSessionSlice(state).isProcessingAnswer
  )
  const registerAnswer = async (id: string, isRight: boolean) => {
    await dispatch(registerAnswerAction.request({ id, isRight }))
    const session = queryClient.getQueryData(useCurrentLearnSessionQuery.getKey()) as LearnSession
    if (session) {
      queryClient.setQueryData(useCurrentLearnSessionQuery.getKey(), {
        ...session,
        countOfCompleted: session.countOfCompleted + 1,
      })
    } else {
      await queryClient.invalidateQueries(useCurrentLearnSessionQuery.getKey())
    }
    const card = queryClient.getQueryData(useLearnCardQuery.getKey()) as Card
    if (nextCard && card && card.id !== nextCard.id) {
      queryClient.setQueryData(useLearnCardQuery.getKey(), nextCard)
      queryClient.invalidateQueries(useNextLearnCardQuery.getKey())
    } else {
      await queryClient.invalidateQueries(useLearnCardQuery.getKey())
      queryClient.invalidateQueries(useNextLearnCardQuery.getKey())
    }
    dispatch(cleanState())
  }

  return { registerAnswer, isProcessingAnswer }
}
