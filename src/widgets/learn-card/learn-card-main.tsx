import * as React from 'react'
import { Skeleton } from '@mantine/core'
import { useTypedSelector } from '@shared/hooks'
import { BaseCard, useLearnCardQuery, useNextLearnCardQuery } from '@entities/card'
import { NoCardToLearn, selectCurrentLearnSessionSlice } from '@entities/current-learn-session'

type LearnCardMainProps = {}

export const LearnCardMain = ({}: LearnCardMainProps) => {
  const { data, isFetching } = useLearnCardQuery()
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
