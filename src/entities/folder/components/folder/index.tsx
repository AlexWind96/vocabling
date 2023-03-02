import * as React from 'react'
import { PropsWithChildren } from 'react'
import { Group, Stack, Title, useMantineTheme } from '@mantine/core'

type FolderProps = {
  title: string
  actions?: React.ReactNode
} & PropsWithChildren

export const Folder = ({ title, children, actions }: FolderProps) => {
  const { radius } = useMantineTheme()
  return (
    <Stack p={'md'} bg={'pink.1'} style={{ borderRadius: radius.md }}>
      <Group align={'center'}>
        <Title color={'pink'} order={3}>
          {title}
        </Title>
        {actions}
      </Group>
      {children}
    </Stack>
  )
}
