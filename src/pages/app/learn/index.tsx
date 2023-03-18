import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Group, Progress, Stack, Title } from '@mantine/core'
import { useCurrentLearnSession } from '@/entities/current-learn-session'
import { useUser } from '@/entities/user'
import { StartCurrentLearnSession } from '@/features/current-learn-session/start-current-learn-session'
import { useUpdateCurrentLearnSession } from '@/features/current-learn-session/update-current-learn-session'
import { UpdateCurrentLearnSessionDto } from '@/shared/api'
import { getPercent } from '@/shared/utils'

type CardsLearningSettingsPageProps = {}

export const CardsLearningSettingsPage = ({}: CardsLearningSettingsPageProps) => {
  const navigate = useNavigate()
  const { data, isLoading } = useCurrentLearnSession()
  const { mutateAsync } = useUpdateCurrentLearnSession()
  const { data: user } = useUser()

  const handleSubmit = async (values: UpdateCurrentLearnSessionDto) => {
    const currentLearnSession = await mutateAsync(values)
    navigate(currentLearnSession.id)
  }

  return (
    <Grid gutter={0}>
      <Grid.Col span={0} sm={2} lg={3} />
      <Grid.Col span={12} sm={8} lg={6}>
        <Stack>
          <Group>
            <Title>Learn new words</Title>
          </Group>
          {data && <Progress value={getPercent(data.countOfCompleted, user!.learnGoal)} />}
          <StartCurrentLearnSession
            isSessionLoading={isLoading}
            learnSession={data}
            onSubmit={handleSubmit}
          />
        </Stack>
      </Grid.Col>
      <Grid.Col span={0} sm={2} lg={3} />
    </Grid>
  )
}
