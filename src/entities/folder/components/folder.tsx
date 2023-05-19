import * as React from 'react'
import { PropsWithChildren } from 'react'
import { Group, Stack, Title, createStyles } from '@mantine/core'

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

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors[theme.primaryColor][7]
        : theme.colors[theme.primaryColor][2],
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.colors.white : theme.colors[theme.primaryColor][6],
  },
}))
