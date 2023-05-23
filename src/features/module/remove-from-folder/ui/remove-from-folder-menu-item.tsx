import { IconFolderOff } from '@tabler/icons-react'
import * as React from 'react'
import { FC } from 'react'
import { Menu, MenuItemProps } from '@mantine/core'
import { useRemoveFromFolder } from '../use-remove-from-folder'

interface IRemoveFromFolderMenuItem extends Omit<MenuItemProps, 'icon' | 'onClick'> {
  id: string
}

export const RemoveFromFolderMenuItem: FC<IRemoveFromFolderMenuItem> = ({ id, ...rest }) => {
  const { removeFromFolder } = useRemoveFromFolder({ id })
  return (
    <Menu.Item icon={<IconFolderOff size={14} />} onClick={removeFromFolder} {...rest}>
      Remove from folder
    </Menu.Item>
  )
}
