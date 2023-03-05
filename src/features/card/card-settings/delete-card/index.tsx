import { IconTrash } from '@tabler/icons'
import * as React from 'react'
import { Menu } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { useDeleteCard } from './use-delete-card'

type DeleteCardProps = {
  id: string
}

export const DeleteCard = (props: DeleteCardProps) => {
  const { mutateAsync } = useDeleteCard()

  const handleDelete = async () => {
    openConfirmModal({
      title: 'Do you want to remove this card?',
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: async () => {
        await mutateAsync({ id: props.id })
      },
    })
  }
  return (
    <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={handleDelete}>
      Delete card
    </Menu.Item>
  )
}
