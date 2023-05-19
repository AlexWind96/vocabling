import { useCallback } from 'react'
import { openConfirmModal } from '@mantine/modals'
import { useDeleteModuleMutation } from './use-delete-module-mutation'

export const useDeleteModuleModal = ({ id }: { id: string }) => {
  const { mutateAsync } = useDeleteModuleMutation()

  const openDeleteModuleModal = useCallback(async () => {
    openConfirmModal({
      title: 'Do you want to remove this module with cards?',
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: async () => {
        await mutateAsync({ id })
      },
    })
  }, [])

  return { openDeleteModuleModal }
}
