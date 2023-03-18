import { IconHome } from '@tabler/icons-react'
import * as React from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ActionIcon, Grid, Progress, Skeleton, Text, useMantineTheme } from '@mantine/core'
import { useCurrentLearnSession } from '@/entities/current-learn-session'
import { useUser } from '@/entities/user'
import { useCompleteCurrentLearnSession } from '@/features/current-learn-session/complete-current-learn-session'
import { PATH } from '@/shared/config'
import { getPercent } from '@/shared/utils'

type LearnCardHeaderProps = {}

export const LearnCardHeader = ({}: LearnCardHeaderProps) => {
  const { data: session, isLoading } = useCurrentLearnSession()
  const { mutateAsync } = useCompleteCurrentLearnSession()
  const { data: user } = useUser()
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
