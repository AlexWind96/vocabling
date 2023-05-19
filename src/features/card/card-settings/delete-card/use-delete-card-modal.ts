import { openConfirmModal } from '@mantine/modals'
import { CardsQueryParams } from '@shared/api'
import { useDeleteCardMutation } from './use-delete-card-mutation'

export const useDeleteCardModal = ({ id, params }: { params: CardsQueryParams; id: string }) => {
  const { mutateAsync } = useDeleteCardMutation({ onMutate: () => params })

  const openDeleteCardModal = async () => {
    openConfirmModal({
      title: 'Do you want to remove this card?',
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: async () => {
        await mutateAsync({ id })
      },
    })
  }
  return { openDeleteCardModal }
}
