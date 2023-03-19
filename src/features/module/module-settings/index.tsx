import { IconDotsVertical, IconPlus } from '@tabler/icons-react'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { ActionIcon, Menu } from '@mantine/core'
import { DeleteModule } from './delete-module'
import { RemoveFromFolder } from './remove-from-folder'
import { RenameModule } from './rename-module'

type ModuleSettingsProps = {
  id: string
  folderId: string | null
}

export const ModuleSettings = ({ id, folderId }: ModuleSettingsProps) => {
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
        <RenameModule id={id} />
        {folderId && <RemoveFromFolder id={id} />}
        <DeleteModule id={id} />
      </Menu.Dropdown>
    </Menu>
  )
}
