import * as React from 'react'
import { Skeleton } from '@mantine/core'
import { BaseCard, useLearnCard } from '@/entities/card'
import { NoCardToLearn, selectCurrentLearnSessionSlice } from '@/entities/current-learn-session'
import { useTypedSelector } from '@/shared/hooks'

type LearnCardMainProps = {}

export const LearnCardMain = ({}: LearnCardMainProps) => {
  const { data, isFetching } = useLearnCard()
  const { isRightAnswer, isShownResult } = useTypedSelector(selectCurrentLearnSessionSlice)
  if (isFetching) return <Skeleton height={150} radius="xl" />

  if (!data) return <NoCardToLearn />

  return (
    <BaseCard
      data={data}
      rightSection={null}
      isGraterProgress={isRightAnswer}
      hideStudyPhrase={!isShownResult}
    />
  )
}
