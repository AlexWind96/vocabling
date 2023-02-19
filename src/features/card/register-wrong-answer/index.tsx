import * as React from 'react'
import { Button } from '@mantine/core'
import { useRegisterAnswer } from '@/entities/card'

type RegisterWrongAnswerProps = {
  id: string
}

export const RegisterWrongAnswer = (props: RegisterWrongAnswerProps) => {
  const { mutateAsync, isLoading } = useRegisterAnswer()

  const handleWrongAnswer = async () => {
    await mutateAsync({ id: props.id, isRight: false })
  }

  return (
    <Button color="green" variant="filled" disabled={isLoading} onClick={handleWrongAnswer}>
      Wrong
    </Button>
  )
}
