import { IconCursorText } from '@tabler/icons-react'
import * as React from 'react'
import { FC } from 'react'
import { Menu, MenuItemProps } from '@mantine/core'
import { useRenameModuleModal } from '../use-rename-module-modal'

interface IRenameModuleMenuItem extends Omit<MenuItemProps, 'icon' | 'onClick'> {
  id: string
}

export const RenameModuleMenuItem: FC<IRenameModuleMenuItem> = ({ id, ...rest }) => {
  const { openRenameModuleModal } = useRenameModuleModal({ id })
  return (
    <Menu.Item icon={<IconCursorText size={14} />} onClick={openRenameModuleModal} {...rest}>
      Rename module
    </Menu.Item>
  )
}
