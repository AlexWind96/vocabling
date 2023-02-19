import * as React from 'react'
import { Button } from '@mantine/core'
import { useRegisterAnswer } from '@/entities/card'

type RegisterRightAnswerProps = {
  id: string
}

export const RegisterRightAnswer = (props: RegisterRightAnswerProps) => {
  const { mutateAsync, isLoading } = useRegisterAnswer()

  const handleRightAnswer = async () => {
    await mutateAsync({ id: props.id, isRight: true })
  }

  return (
    <Button color="green" variant="filled" disabled={isLoading} onClick={handleRightAnswer}>
      Right
    </Button>
  )
}
