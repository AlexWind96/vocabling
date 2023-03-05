import * as React from 'react'
import { ActionIcon, ActionIconProps } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { useDeleteFolder } from './use-delete-folder'

type DeleteFolderProps = {
  id: string
} & ActionIconProps

export const DeleteFolder = ({ id, ...actionIconProps }: DeleteFolderProps) => {
  const { mutateAsync } = useDeleteFolder()

  const handleDelete = async () => {
    openConfirmModal({
      title: 'Do you want to remove this folder? Modules will be saved',
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: async () => {
        await mutateAsync({ id })
      },
    })
  }
  return <ActionIcon onClick={handleDelete} {...actionIconProps} />
}
