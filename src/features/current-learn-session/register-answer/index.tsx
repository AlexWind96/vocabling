import * as React from 'react'
import { Button, ButtonProps } from '@mantine/core'
import { currentLearnSession } from '@/entities/current-learn-session'
import { useTypedSelector } from '@/shared/hooks'

type RegisterAnswerProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
} & ButtonProps

const {
  selectors: { selectCurrentLearnSessionState },
} = currentLearnSession

export const RegisterAnswer = ({ onClick, ...buttonProps }: RegisterAnswerProps) => {
  const isLoading = useTypedSelector(
    (state) => selectCurrentLearnSessionState(state).isLoadingAnswer
  )

  return <Button disabled={isLoading} onClick={onClick} {...buttonProps} />
}
