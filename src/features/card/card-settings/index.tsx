import * as React from 'react'
import { DotsVertical } from 'tabler-icons-react'
import { ActionIcon, Menu } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { DeleteCard } from './delete-card'
import { EditCard } from './edit-card'

type CardSettingsProps = {
  id: string
}

export const CardSettings = ({ id }: CardSettingsProps) => {
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
        <EditCard id={id} />
        <DeleteCard id={id} />
      </Menu.Dropdown>
    </Menu>
  )
}
