import { useCallback } from 'react'
import { Text } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { useDeleteFolderMutation } from './use-delete-folder-mutation'

export const useDeleteFolderModal = ({ id }: { id: string }) => {
  const { mutateAsync } = useDeleteFolderMutation()

  const openDeleteFolderModal = useCallback(async () => {
    openConfirmModal({
      title: 'Remove folder',
      children: <Text>Do you want to remove this folder? Modules will be saved</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: async () => {
        await mutateAsync({ id })
      },
    })
  }, [id])

  return { openDeleteFolderModal }
}
