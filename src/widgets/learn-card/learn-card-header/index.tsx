import { useEffect } from 'react'
import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Home } from 'tabler-icons-react'
import { ActionIcon, Grid, Progress, Skeleton, Text } from '@mantine/core'
import { useAuth } from '@/entities/auth'
import {
  useCompleteCurrentLearnSession,
  useCurrentLearnSession,
} from '@/entities/current-learn-session'
import { PATH } from '@/shared/config'
import { getPercent } from '@/shared/utils'

type LearnCardHeaderProps = {}

export const LearnCardHeader = ({}: LearnCardHeaderProps) => {
  const { data: session, isLoading } = useCurrentLearnSession()
  const { mutateAsync } = useCompleteCurrentLearnSession()
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (session && session.countOfCompleted === user!.learnGoal) {
      mutateAsync().then(() => {
        navigate(`/${PATH.learn_sessions}/${session.id}`)
      })
    }
  }, [session])

  if (isLoading || !session)
    return (
      <Grid align={'center'}>
        <Grid.Col span={2}>
          <Skeleton height={30} circle radius={'lg'} />
        </Grid.Col>
        <Grid.Col span={8}>
          <Skeleton height={8} radius="xl" />
        </Grid.Col>
      </Grid>
    )

  return (
    <Grid align={'center'}>
      <Grid.Col span={2}>
        <ActionIcon component={Link} to={`/${PATH.learn_cards}`} variant="light" color={'pink'}>
          <Home />
        </ActionIcon>
      </Grid.Col>
      <Grid.Col span={8}>
        <Progress value={getPercent(session.countOfCompleted, user!.learnGoal)} color={'pink'} />
      </Grid.Col>
      <Grid.Col span={2}>
        <Text>
          {session.countOfCompleted} / {user!.learnGoal}
        </Text>
      </Grid.Col>
    </Grid>
  )
}
