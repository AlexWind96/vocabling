import { IconTrash } from '@tabler/icons-react'
import * as React from 'react'
import { FC } from 'react'
import { Menu, MenuItemProps } from '@mantine/core'
import { useDeleteModuleModal } from '../use-delete-module-modal'

interface IDeleteModuleMenuItem extends Omit<MenuItemProps, 'icon' | 'onClick'> {
  id: string
}

export const DeleteModuleMenuItem: FC<IDeleteModuleMenuItem> = ({ id, ...rest }) => {
  const { openDeleteModuleModal } = useDeleteModuleModal({ id })
  return (
    <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={openDeleteModuleModal} {...rest}>
      Delete module
    </Menu.Item>
  )
}
