import {
  IconCursorText,
  IconDotsVertical,
  IconFolderOff,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { ActionIcon, Menu } from '@mantine/core'
import { useDeleteModuleModal } from '@features/module/delete-module'
import { useRemoveFromFolder } from '@features/module/remove-from-folder'
import { useRenameModuleModal } from '@features/module/rename-module'

type ModuleSettingsProps = {
  id: string
  folderId: string | null
}

export const ModuleSettings = ({ id, folderId }: ModuleSettingsProps) => {
  const { removeFromFolder } = useRemoveFromFolder({ id })
  const { openRenameModuleModal } = useRenameModuleModal({ id })
  const { openDeleteModuleModal } = useDeleteModuleModal({ id })
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon size="sm">
          <IconDotsVertical />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item icon={<IconPlus size={14} />} component={Link} to={`${id}/add-cards`}>
          Add cards
        </Menu.Item>
        <Menu.Item icon={<IconCursorText size={14} />} onClick={openRenameModuleModal}>
          Rename module
        </Menu.Item>
        {folderId && (
          <Menu.Item icon={<IconFolderOff size={14} />} onClick={removeFromFolder}>
            Remove from folder
          </Menu.Item>
        )}
        <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={openDeleteModuleModal}>
          Delete module
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
