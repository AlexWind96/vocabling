import React from 'react'
import { Link } from 'react-router-dom'
import { Group, Paper, Progress, Stack, Text, Title } from '@mantine/core'
import { Module } from '@/api'

type ModuleCardProps = {
  data: Module
  actions: React.ReactNode
}

export const ModuleCard = ({ data, actions }: ModuleCardProps) => {
  return (
    <Paper p={'md'} shadow="md" withBorder>
      <Stack spacing={'lg'}>
        <Stack spacing={2}>
          <Group position={'apart'}>
            <Text
              component={Link}
              to={data.id}
              fw={'bold'}
              fz={30}
              className={'hover:text-slate-700'}
            >
              {data.label}
            </Text>
            {actions}
          </Group>
          <Title color={'slate.6'} order={3}>
            Cards: {data._count.cards}
          </Title>
        </Stack>
        <Progress mb={4} color={'yellow.4'} size="lg" value={50} />
      </Stack>
    </Paper>
  )
}
