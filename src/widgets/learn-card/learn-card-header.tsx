import { IconHome } from '@tabler/icons-react'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { ActionIcon, Badge, Box, Grid, Group, Skeleton, Text, useMantineTheme } from '@mantine/core'
import { useTypedSelector } from '@shared/hooks'
import {
  CurrentLearnSessionProgress,
  selectCurrentLearnSessionSlice,
} from '@entities/current-learn-session'
import { PATH } from '@entities/navigation'

export const LearnCardHeader = () => {
  const { primaryColor } = useMantineTheme()
  const { isLoading, learnGoal, session, remainingCards } = useTypedSelector(
    selectCurrentLearnSessionSlice
  )

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
    <Group>
      <ActionIcon component={Link} to={`/${PATH.learn_cards}`} variant="light" color={primaryColor}>
        <IconHome />
      </ActionIcon>
      <Box className={'flex-1'}>
        <CurrentLearnSessionProgress learnGoal={learnGoal} />
      </Box>
      <Text>
        {session.countOfCompleted} / {learnGoal}
      </Text>
      <Badge color={'blue'}>Remains: {remainingCards}</Badge>
    </Group>
  )
}
