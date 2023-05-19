import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react'
import * as React from 'react'
import { ActionIcon, Menu } from '@mantine/core'
import { CardsQueryParams } from '@shared/api'
import { useDeleteCardModal } from './delete-card'
import { useEditCardModal } from './edit-card/use-edit-card-modal'

type CardSettingsProps = {
  id: string
  params: CardsQueryParams
}

export const CardSettings = ({ id, params }: CardSettingsProps) => {
  const { openDeleteCardModal } = useDeleteCardModal({ id, params })
  const { openEditCardModal } = useEditCardModal({ id, params })
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon size="sm">
          <IconDotsVertical />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item icon={<IconEdit size={14} />} onClick={openEditCardModal}>
          Edit card
        </Menu.Item>
        <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={openDeleteCardModal}>
          Delete card
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
