import React from 'react'
import { Link } from 'react-router-dom'
import { Group, Paper, Stack, Text } from '@mantine/core'
import { Module } from '@/shared/api'

type ModuleCardProps = {
  data: Module
  actions: React.ReactNode
}

export const ModuleCard = ({ data, actions }: ModuleCardProps) => {
  return (
    <Paper p={'md'} shadow="md" withBorder>
      <Group position={'apart'}>
        <Stack spacing={2}>
          <Text
            component={Link}
            to={data.id}
            fw={'bold'}
            fz={20}
            className={'hover:text-slate-700'}
          >
            {data.label}
          </Text>
          <Text color={'slate.5'} fz={14} fw={'bold'}>
            Cards: {data._count?.cards && ''}
          </Text>
        </Stack>
        {actions}
      </Group>
    </Paper>
  )
}
