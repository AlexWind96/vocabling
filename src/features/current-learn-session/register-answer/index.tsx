import * as React from 'react'
import { Button, ButtonProps } from '@mantine/core'
import { selectCurrentLearnSessionSlice } from '@/entities/current-learn-session'
import { useTypedSelector } from '@/shared/hooks'

type RegisterAnswerProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
} & ButtonProps

export const RegisterAnswer = ({ onClick, ...buttonProps }: RegisterAnswerProps) => {
  const isProcessing = useTypedSelector(
    (state) => selectCurrentLearnSessionSlice(state).isProcessingAnswer
  )

  return <Button disabled={isProcessing} onClick={onClick} {...buttonProps} />
}

export { registerAnswer } from './saga'
