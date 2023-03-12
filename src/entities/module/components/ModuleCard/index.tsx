import React from 'react'
import { Link } from 'react-router-dom'
import { Anchor, Group, Paper, Stack, Text } from '@mantine/core'
import { Module } from '@/shared/api'
import useStyles from './styles'

type ModuleCardProps = {
  data: Module
  actions: React.ReactNode
}

export const ModuleCard = ({ data, actions }: ModuleCardProps) => {
  const { classes } = useStyles()
  return (
    <Paper p={'md'}>
      <Group position={'apart'}>
        <Stack spacing={2}>
          <Anchor component={Link} to={data.id} className={classes.anchor}>
            {data.label}
          </Anchor>
          <Text color={'slate.5'} fz={14} fw={'bold'}>
            Cards: {data._count?.cards || 0}
          </Text>
        </Stack>
        {actions}
      </Group>
    </Paper>
  )
}
