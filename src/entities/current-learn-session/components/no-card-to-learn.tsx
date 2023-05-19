import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button, Group, Paper, Stack, Title } from '@mantine/core'
import { PATH } from '@shared/config'

type NoCardToLearnProps = {}

export const NoCardToLearn = ({}: NoCardToLearnProps) => {
  return (
    <Paper h={170} p={'xs'} shadow="md" withBorder radius="md">
      <Stack h={'100%'} align={'center'} justify={'center'} spacing={'lg'}>
        <Title c={'slate.4'} order={2}>
          No more cards to learn
        </Title>
        <Group>
          <Button component={Link} to={`/${PATH.learn_cards}`}>
            Choose another module
          </Button>
          <Button variant={'outline'} component={Link} to={`/${PATH.modules}`}>
            Add new cards
          </Button>
        </Group>
      </Stack>
    </Paper>
  )
}
