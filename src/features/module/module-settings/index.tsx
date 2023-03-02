import * as React from 'react'
import { DotsVertical } from 'tabler-icons-react'
import { ActionIcon, Menu } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { DeleteModule } from './delete-module'
import { RemoveFromFolder } from './remove-from-folder'
import { RenameModule } from './rename-module'

type ModuleSettingsProps = {
  id: string
  folderId: string | null
}

export const ModuleSettings = ({ id, folderId }: ModuleSettingsProps) => {
  const [opened, { toggle }] = useDisclosure(false)
  return (
    <Menu shadow="md" width={200} opened={opened} onChange={toggle}>
      <Menu.Target>
        <ActionIcon size="sm">
          <DotsVertical />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Settings</Menu.Label>
        <RenameModule id={id} />
        {folderId && <RemoveFromFolder id={id} />}
        <DeleteModule id={id} />
      </Menu.Dropdown>
    </Menu>
  )
}
