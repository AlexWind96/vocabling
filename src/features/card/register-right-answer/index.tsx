import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@mantine/core'
import { currentLearnSession } from '@/entities/current-learn-session'
import { useTypedSelector } from '@/shared/hooks'

type RegisterRightAnswerProps = {
  id: string
}

const {
  asyncActions: { registerAnswer },
  selectors: { selectCurrentLearnSessionState },
} = currentLearnSession

export const RegisterRightAnswer = (props: RegisterRightAnswerProps) => {
  const isLoading = useTypedSelector(
    (state) => selectCurrentLearnSessionState(state).isLoadingAnswer
  )
  const dispatch = useDispatch()
  const handleRightAnswer = async () => {
    await dispatch(registerAnswer.request({ id: props.id, isRight: true }))
  }

  return (
    <Button color="green" variant="filled" disabled={isLoading} onClick={handleRightAnswer}>
      Right
    </Button>
  )
}
