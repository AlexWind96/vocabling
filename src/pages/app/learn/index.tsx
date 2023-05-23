import * as React from 'react'
import { Grid, Group, Stack, Title } from '@mantine/core'
import { CurrentLearnSessionProgress } from '@entities/current-learn-session'
import { useUserQuery } from '@entities/user'
import { StartLearnSessionForm } from '@features/current-learn-session/start-learn-session-form'

type CardsLearningSettingsPageProps = {}

export const CardsLearningSettingsPage = ({}: CardsLearningSettingsPageProps) => {
  const { data: user } = useUserQuery()

  return (
    <Grid gutter={0}>
      <Grid.Col span={0} sm={2} lg={3} />
      <Grid.Col span={12} sm={8} lg={6}>
        <Stack>
          <Group>
            <Title>Learn new words</Title>
          </Group>
          <CurrentLearnSessionProgress learnGoal={user!.learnGoal} />
          <StartLearnSessionForm />
        </Stack>
      </Grid.Col>
      <Grid.Col span={0} sm={2} lg={3} />
    </Grid>
  )
}
