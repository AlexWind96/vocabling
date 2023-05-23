import React from 'react'
import { closeModal, openModal } from '@mantine/modals'
import { CardsQueryParams, UpdateCardDTO } from '@shared/api'
import { LoadingData } from '@shared/ui'
import { useCardQuery } from '@entities/card'
import { EditCardForm } from './ui'
import { useUpdateCardMutation } from './use-update-card-mutation'

export const useEditCardModal = ({ id, params }: { params: CardsQueryParams; id: string }) => {
  const { data, isFetching } = useCardQuery({
    variables: {
      id,
    },
  })
  const { mutateAsync } = useUpdateCardMutation({
    onMutate: () => params,
  })

  const handleSubmit = async (data: UpdateCardDTO) => {
    await mutateAsync({ id: id, body: data })
    closeModal(id)
  }

  const openEditCardModal = () => {
    openModal({
      modalId: id,
      title: 'Edit Card',
      children:
        isFetching || !data ? (
          <LoadingData />
        ) : (
          <EditCardForm onSubmit={handleSubmit} defaultValues={data} />
        ),
    })
  }
  return { openEditCardModal }
}
