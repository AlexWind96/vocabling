import * as React from 'react'
import { PropsWithChildren } from 'react'
import { Group, Stack, Title } from '@mantine/core'
import useStyles from './styles'

type FolderProps = {
  title: string
  actions?: React.ReactNode
} & PropsWithChildren

export const Folder = ({ title, children, actions }: FolderProps) => {
  const { classes } = useStyles()
  return (
    <Stack className={classes.wrapper}>
      <Group align={'center'}>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
        {actions}
      </Group>
      {children}
    </Stack>
  )
}
