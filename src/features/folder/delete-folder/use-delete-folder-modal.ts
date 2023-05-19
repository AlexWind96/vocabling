import { useCallback } from 'react'
import { openConfirmModal } from '@mantine/modals'
import { useDeleteFolderMutation } from './use-delete-folder-mutation'

export const useDeleteFolderModal = ({ id }: { id: string }) => {
  const { mutateAsync } = useDeleteFolderMutation()

  const openDeleteFolderModal = useCallback(async () => {
    openConfirmModal({
      title: 'Do you want to remove this folder? Modules will be saved',
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: async () => {
        await mutateAsync({ id })
      },
    })
  }, [id])

  return { openDeleteFolderModal }
}
