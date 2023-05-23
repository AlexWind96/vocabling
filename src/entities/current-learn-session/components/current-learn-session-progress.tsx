import * as React from 'react'
import { FC } from 'react'
import { Progress } from '@mantine/core'
import { getPercent } from '@shared/utils'
import { useCurrentLearnSessionQuery } from '../hooks'

interface ICurrentLearnSessionProgress {
  learnGoal: number
}

export const CurrentLearnSessionProgress: FC<ICurrentLearnSessionProgress> = ({ learnGoal }) => {
  const { data } = useCurrentLearnSessionQuery()
  if (!data) return <Progress value={0} />
  return <Progress value={getPercent(data.countOfCompleted, learnGoal)} />
}
