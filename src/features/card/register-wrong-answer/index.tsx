import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@mantine/core'
import { useLearnCard } from '@/entities/card'
import { currentLearnSession, useCurrentLearnSession } from '@/entities/current-learn-session'
import { useTypedSelector } from '@/shared/hooks'
import { queryClient } from '@/shared/lib/react-query'

type RegisterWrongAnswerProps = {
  id: string
}

const {
  asyncActions: { registerAnswer },
  selectors: { selectCurrentLearnSessionState },
  actions: { cleanState },
} = currentLearnSession

export const RegisterWrongAnswer = (props: RegisterWrongAnswerProps) => {
  const isLoading = useTypedSelector(
    (state) => selectCurrentLearnSessionState(state).isLoadingAnswer
  )
  const dispatch = useDispatch()

  const handleWrongAnswer = async () => {
    await dispatch(registerAnswer.request({ id: props.id, isRight: false }))
    await queryClient.invalidateQueries(useLearnCard.getKey())
    await queryClient.invalidateQueries(useCurrentLearnSession.getKey())
    dispatch(cleanState())
  }

  return (
    <Button color="red" variant="filled" disabled={isLoading} onClick={handleWrongAnswer}>
      Wrong
    </Button>
  )
}
