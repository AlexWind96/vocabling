import { IconDotsVertical } from '@tabler/icons-react'
import * as React from 'react'
import { ActionIcon, MantineNumberSize, Menu } from '@mantine/core'
import { PopoverWidth } from '@mantine/core/lib/Popover/Popover.types'

type SettingsMenuProps = {
  withoutLabel?: boolean
  label?: string
  iconSize?: MantineNumberSize
  width?: PopoverWidth
  children: React.ReactNode
}

export const SettingsMenu = ({
  withoutLabel,
  label = 'Settings',
  iconSize = 'sm',
  width = 200,
  children,
}: SettingsMenuProps) => {
  return (
    <Menu shadow="md" width={width}>
      <Menu.Target>
        <ActionIcon size={iconSize}>
          <IconDotsVertical />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {!withoutLabel && <Menu.Label>{label}</Menu.Label>}
        {children}
      </Menu.Dropdown>
    </Menu>
  )
}
