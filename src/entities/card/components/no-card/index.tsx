import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button, Group, Paper, Stack, Title } from '@mantine/core'

type NoCardProps = {}

export const NoCard = ({}: NoCardProps) => {
  return (
    <Paper h={170} p={'xs'} shadow="md" withBorder radius="md">
      <Stack h={'100%'} align={'center'} justify={'center'} spacing={'lg'}>
        <Title c={'slate.4'} order={2}>
          No more cards to learn
        </Title>
        <Group>
          <Button color={'pink'} component={Link} to={'/learn'}>
            Choose another module
          </Button>
          <Button color={'blue'} component={Link} to={'/modules'}>
            Add new cards
          </Button>
        </Group>
      </Stack>
    </Paper>
  )
}
