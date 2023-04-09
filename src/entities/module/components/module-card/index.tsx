import React from 'react'
import { Link } from 'react-router-dom'
import { Anchor, Group, Paper, Stack, Text } from '@mantine/core'
import { Module } from '@/shared/api'
import { ColoredCount } from '../../../../shared/ui'
import useStyles from './styles'

type ModuleCardProps = {
  data: Module
  actions: React.ReactNode
}

export const ModuleCard = ({ data, actions }: ModuleCardProps) => {
  const { classes, theme } = useStyles()
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
          {data.counts && (
            <Group>
              <ColoredCount color={theme.colors.orange} count={data.counts.new} />
              <ColoredCount color={theme.colors.pink} count={data.counts.shown} />
              <ColoredCount color={theme.colors.purple} count={data.counts.in_progress} />
              <ColoredCount color={theme.colors.indigo} count={data.counts.in_familiar} />
              <ColoredCount color={theme.colors.emerald} count={data.counts.known} />
            </Group>
          )}
        </Stack>
        {actions}
      </Group>
    </Paper>
  )
}
