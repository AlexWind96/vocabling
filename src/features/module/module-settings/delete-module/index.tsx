import { IconTrash } from '@tabler/icons'
import * as React from 'react'
import { Menu } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { useDeleteModule } from './use-delete-module'

type DeleteModuleProps = {
  id: string
}

export const DeleteModule = (props: DeleteModuleProps) => {
  const { mutateAsync } = useDeleteModule()

  const handleDelete = async () => {
    openConfirmModal({
      title: 'Do you want to remove this module with cards?',
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: async () => {
        await mutateAsync({ id: props.id })
      },
    })
  }
  return (
    <Menu.Item color="red" icon={<IconTrash size={14} />} onClick={handleDelete}>
      Delete module
    </Menu.Item>
  )
}
