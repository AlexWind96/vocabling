import * as React from 'react'
import { Skeleton } from '@mantine/core'
import { NoCard, SimpleCard, useLearnCard } from '@/entities/card'
import { currentLearnSession } from '@/entities/current-learn-session'
import { useTypedSelector } from '@/shared/hooks'

type LearnCardMainProps = {}

export const LearnCardMain = ({}: LearnCardMainProps) => {
  const { data, isLoading } = useLearnCard()
  const { isRightAnswer, isShownResult } = useTypedSelector(
    currentLearnSession.selectors.selectCurrentLearnSessionState
  )
  if (isLoading) return <Skeleton height={150} radius="xl" />

  if (!data) return <NoCard />

  return (
    <SimpleCard
      data={data}
      rightSection={null}
      isGraterProgress={isRightAnswer}
      hideStudyPhrase={!isShownResult}
    />
  )
}
