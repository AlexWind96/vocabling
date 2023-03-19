import { IconDotsVertical } from '@tabler/icons-react'
import * as React from 'react'
import { ActionIcon, Menu } from '@mantine/core'
import { CardsQueryParams } from '@/shared/api'
import { DeleteCard } from './delete-card'
import { EditCard } from './edit-card'

type CardSettingsProps = {
  id: string
  params: CardsQueryParams
}

export const CardSettings = ({ id, params }: CardSettingsProps) => {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon size="sm">
          <IconDotsVertical />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Settings</Menu.Label>
        <EditCard id={id} params={params} />
        <DeleteCard id={id} params={params} />
      </Menu.Dropdown>
    </Menu>
  )
}
