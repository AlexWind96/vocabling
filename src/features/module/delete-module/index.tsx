import { IconX } from '@tabler/icons'
import * as React from 'react'
import { ActionIcon } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { useDeleteModule } from '@/entities/module'

type DeleteModuleProps = {
  id: string
}

export const DeleteModule = (props: DeleteModuleProps) => {
  const { mutateAsync } = useDeleteModule()

  const handleDelete = async () => {
    openConfirmModal({
      title: 'Do you want to remove this module?',
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: async () => {
        await mutateAsync(props.id)
      },
    })
  }
  return (
    <ActionIcon color="red" onClick={handleDelete}>
      <IconX />
    </ActionIcon>
  )
}
