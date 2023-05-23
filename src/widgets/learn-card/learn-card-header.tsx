import { IconHome } from '@tabler/icons-react'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { ActionIcon, Grid, Skeleton, Text, useMantineTheme } from '@mantine/core'
import {
  CurrentLearnSessionProgress,
  useCurrentLearnSessionQuery,
} from '@entities/current-learn-session'
import { PATH } from '@entities/navigation'
import { useUserQuery } from '@entities/user'
import { useCompleteLearnSessionEffect } from '@features/current-learn-session/complete-learn-session'

type LearnCardHeaderProps = {}

export const LearnCardHeader = ({}: LearnCardHeaderProps) => {
  const { data: session, isLoading } = useCurrentLearnSessionQuery()
  const { data: user } = useUserQuery()
  const { primaryColor } = useMantineTheme()

  useCompleteLearnSessionEffect({ session, learnGoal: user!.learnGoal })

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
        <CurrentLearnSessionProgress learnGoal={user!.learnGoal} />
      </Grid.Col>
      <Grid.Col span={3} sm={2}>
        <Text>
          {session.countOfCompleted} / {user!.learnGoal}
        </Text>
      </Grid.Col>
    </Grid>
  )
}
