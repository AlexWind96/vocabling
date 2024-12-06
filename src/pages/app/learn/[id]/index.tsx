import * as React from 'react'
import { Navigate } from 'react-router-dom'
import { Grid } from '@mantine/core'
import { useTypedSelector } from '@shared/hooks'
import { selectCurrentLearnSessionSlice } from '@entities/current-learn-session'
import { PATH } from '@entities/navigation'
import { LearnCard } from '@widgets/learn-card'

export const CardsLearningSessionPage = () => {
  const state = useTypedSelector(selectCurrentLearnSessionSlice)
  if (!state.session) {
    return <Navigate to={`/${PATH.learn_cards}`} replace />
  }

  return (
    <Grid gutter={0}>
      <Grid.Col span={0} sm={2} md={3} />
      <Grid.Col span={12} sm={8} md={6}>
        <LearnCard />
      </Grid.Col>
      <Grid.Col span={0} sm={2} md={3} />
    </Grid>
  )
}
