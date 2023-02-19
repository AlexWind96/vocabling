import * as React from 'react'
import { X } from 'tabler-icons-react'
import { ActionIcon } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { useDeleteCard } from '@/entities/card'

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
        await mutateAsync(props.id)
      },
    })
  }
  return (
    <ActionIcon variant={'light'} color={'red'} size={'xs'} onClick={handleDelete}>
      <X />
    </ActionIcon>
  )
}
