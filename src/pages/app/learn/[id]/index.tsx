import * as React from 'react'
import { Grid, Stack } from '@mantine/core'
import { LearnCardFooter, LearnCardHeader, LearnCardMain } from '@/widgets/learn-card'

type CardsLearningSessionPageProps = {}

export const CardsLearningSessionPage = ({}: CardsLearningSessionPageProps) => {
  return (
    <Grid gutter={0}>
      <Grid.Col span={0} sm={2} md={3} />
      <Grid.Col span={12} sm={8} md={6}>
        <Stack>
          <LearnCardHeader />
          <LearnCardMain />
          <LearnCardFooter />
        </Stack>
      </Grid.Col>
      <Grid.Col span={0} sm={2} md={3} />
    </Grid>
  )
}
