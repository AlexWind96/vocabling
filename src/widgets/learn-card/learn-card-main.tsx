import * as React from 'react'
import { Skeleton } from '@mantine/core'
import { useTypedSelector } from '@shared/hooks'
import { BaseCard } from '@entities/card'
import { NoCardToLearn, selectCurrentLearnSessionSlice } from '@entities/current-learn-session'

export const LearnCardMain = () => {
  const { isLoading, currentCard, isHidden } = useTypedSelector(selectCurrentLearnSessionSlice)

  if (isLoading) return <Skeleton height={150} radius="xl" />

  if (!currentCard) return <NoCardToLearn />

  return <BaseCard data={currentCard} showModule rightSection={null} hideStudyPhrase={isHidden} />
}
