import { IconHome } from '@tabler/icons-react'
import * as React from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ActionIcon, Grid, Progress, Skeleton, Text, useMantineTheme } from '@mantine/core'
import { PATH } from '@shared/config'
import { getPercent } from '@shared/utils'
import { useCurrentLearnSessionQuery } from '@entities/current-learn-session'
import { useUserQuery } from '@entities/user'
import { useCompleteLearnSessionMutation } from '@features/current-learn-session/complete-learn-session'

type LearnCardHeaderProps = {}

export const LearnCardHeader = ({}: LearnCardHeaderProps) => {
  const { data: session, isLoading } = useCurrentLearnSessionQuery()
  const { mutateAsync } = useCompleteLearnSessionMutation()
  const { data: user } = useUserQuery()
  const navigate = useNavigate()
  const { primaryColor } = useMantineTheme()

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
        <ActionIcon
          component={Link}
          to={`/${PATH.learn_cards}`}
          variant="light"
          color={primaryColor}
        >
          <IconHome />
        </ActionIcon>
      </Grid.Col>
      <Grid.Col span={7} sm={8}>
        <Progress value={getPercent(session.countOfCompleted, user!.learnGoal)} />
      </Grid.Col>
      <Grid.Col span={3} sm={2}>
        <Text>
          {session.countOfCompleted} / {user!.learnGoal}
        </Text>
      </Grid.Col>
    </Grid>
  )
}
