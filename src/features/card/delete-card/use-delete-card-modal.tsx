import { Text } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { CardsQueryParams } from '@shared/api'
import { useDeleteCardMutation } from './use-delete-card-mutation'

export const useDeleteCardModal = ({ id, params }: { params: CardsQueryParams; id: string }) => {
  const { mutateAsync } = useDeleteCardMutation({ onMutate: () => params })

  const openDeleteCardModal = async () => {
    openConfirmModal({
      title: 'Delete card',
      children: <Text size="sm">Do you really want to delete this card?</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: async () => {
        await mutateAsync({ id })
      },
    })
  }
  return { openDeleteCardModal }
}
