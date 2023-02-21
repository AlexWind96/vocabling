import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@mantine/core'
import { currentLearnSession } from '@/entities/current-learn-session'
import { useTypedSelector } from '@/shared/hooks'

type RegisterWrongAnswerProps = {
  id: string
}

const {
  asyncActions: { registerAnswer },
  selectors: { selectCurrentLearnSessionState },
} = currentLearnSession

export const RegisterWrongAnswer = (props: RegisterWrongAnswerProps) => {
  const isLoading = useTypedSelector(
    (state) => selectCurrentLearnSessionState(state).isLoadingAnswer
  )
  const dispatch = useDispatch()

  const handleWrongAnswer = async () => {
    await dispatch(registerAnswer.request({ id: props.id, isRight: false }))
  }

  return (
    <Button color="red" variant="filled" disabled={isLoading} onClick={handleWrongAnswer}>
      Wrong
    </Button>
  )
}
