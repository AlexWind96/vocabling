import { IconHome } from '@tabler/icons-react'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { ActionIcon, Grid, Skeleton, Text, useMantineTheme } from '@mantine/core'
import { useTypedSelector } from '@shared/hooks'
import {
  CurrentLearnSessionProgress,
  selectCurrentLearnSessionSlice,
} from '@entities/current-learn-session'
import { PATH } from '@entities/navigation'

export const LearnCardHeader = () => {
  const { primaryColor } = useMantineTheme()
  const { isLoading, learnGoal, session } = useTypedSelector(selectCurrentLearnSessionSlice)

  if (isLoading || !session || !learnGoal)
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
        <CurrentLearnSessionProgress learnGoal={learnGoal} />
      </Grid.Col>
      <Grid.Col span={3} sm={2}>
        <Text>
          {session.countOfCompleted} / {learnGoal}
        </Text>
      </Grid.Col>
    </Grid>
  )
}
