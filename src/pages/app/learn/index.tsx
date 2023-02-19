import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Group, Progress, Stack, Title } from '@mantine/core'
import { UpdateCurrentLearnSessionDto } from '@/api'
import { useAuth } from '@/entities/auth/hooks'
import {
  useCurrentLearnSession,
  useUpdateCurrentLearnSession,
} from '@/entities/current-learn-session'
import { StartCurrentLearnSession } from '@/features/current-learn-session'
import { getPercent } from '@/shared/utils'

type CardsLearningSettingsPageProps = {}

export const CardsLearningSettingsPage = ({}: CardsLearningSettingsPageProps) => {
  const navigate = useNavigate()
  const { data, isLoading } = useCurrentLearnSession()
  const { mutateAsync } = useUpdateCurrentLearnSession()
  const { user } = useAuth()

  const handleSubmit = async (values: UpdateCurrentLearnSessionDto) => {
    const currentLearnSession = await mutateAsync(values)
    navigate(currentLearnSession.id)
  }

  return (
    <Grid>
      <Grid.Col span={3} />
      <Grid.Col span={6}>
        <Stack>
          <Group>
            <Title>Learn new words</Title>
          </Group>
          {data && (
            <Progress value={getPercent(data.countOfCompleted, user!.learnGoal)} color={'pink'} />
          )}
          <StartCurrentLearnSession
            isSessionLoading={isLoading}
            learnSession={data}
            onSubmit={handleSubmit}
          />
        </Stack>
      </Grid.Col>
      <Grid.Col span={3} />
    </Grid>
  )
}
