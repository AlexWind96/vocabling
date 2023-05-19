import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '@shared/hooks'
import { queryClient } from '@shared/lib/react-query'
import { useLearnCardQuery } from '@entities/card'
import {
  selectCurrentLearnSessionSlice,
  useCurrentLearnSessionQuery,
} from '@entities/current-learn-session'
import { registerAnswer as registerAnswerAction } from './saga'

export const useRegisterAnswer = () => {
  const dispatch = useDispatch()
  const isProcessingAnswer = useTypedSelector(
    (state) => selectCurrentLearnSessionSlice(state).isProcessingAnswer
  )
  const registerAnswer = useCallback(async (id: string, isRight: boolean) => {
    await dispatch(registerAnswerAction.request({ id, isRight }))
    await queryClient.invalidateQueries(useLearnCardQuery.getKey())
    await queryClient.invalidateQueries(useCurrentLearnSessionQuery.getKey())
  }, [])

  return { registerAnswer, isProcessingAnswer }
}
