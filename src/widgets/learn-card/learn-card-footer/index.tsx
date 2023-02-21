import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Group, Skeleton } from '@mantine/core'
import { useLearnCard } from '@/entities/card'
import { currentLearnSession } from '@/entities/current-learn-session'
import { RegisterRightAnswer, RegisterWrongAnswer } from '@/features/card'
import { useTypedSelector } from '@/shared/hooks'

type LearnCardFooterProps = {}
const { selectors, actions } = currentLearnSession

export const LearnCardFooter = ({}: LearnCardFooterProps) => {
  const { data, isLoading } = useLearnCard()
  const { isShownResult } = useTypedSelector(selectors.selectCurrentLearnSessionState)
  const dispatch = useDispatch()
  const handleShowResult = () => {
    dispatch(actions.showResult())
  }

  if (isLoading)
    return (
      <Group position={'apart'}>
        <Skeleton height={40} width={70} radius="lg" />
        <Skeleton height={40} width={70} radius="lg" />
      </Group>
    )
  if (!data) return null

  if (isShownResult) {
    return (
      <Group position={'apart'}>
        <RegisterWrongAnswer id={data.id} />
        <RegisterRightAnswer id={data.id} />
      </Group>
    )
  } else {
    return <Button onClick={handleShowResult}>Show result</Button>
  }
}
