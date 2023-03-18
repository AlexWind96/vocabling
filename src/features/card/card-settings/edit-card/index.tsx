import { IconEdit } from '@tabler/icons-react'
import React from 'react'
import { Menu } from '@mantine/core'
import { closeModal, openModal } from '@mantine/modals'
import { useCard } from '@/entities/card'
import { CardsQueryParams, UpdateCardDTO } from '@/shared/api'
import { LoadingData } from '@/shared/ui'
import { EditCardForm } from './edit-card-form'
import { useUpdateCard } from './use-update-card'

type EditCardProps = {
  id: string
  params: CardsQueryParams
}

export const EditCard = (props: EditCardProps) => {
  const { data, isFetching } = useCard({
    variables: {
      id: props.id,
    },
  })
  const { mutateAsync } = useUpdateCard({
    onMutate: () => props.params,
  })

  const handleSubmit = async (data: UpdateCardDTO) => {
    await mutateAsync({ id: props.id, body: data })
    closeModal(props.id)
  }
  return (
    <>
      <Menu.Item
        icon={<IconEdit size={14} />}
        onClick={() => {
          openModal({
            modalId: props.id,
            title: 'Edit Card',
            children:
              isFetching || !data ? (
                <LoadingData />
              ) : (
                <EditCardForm onSubmit={handleSubmit} defaultValues={data} />
              ),
          })
        }}
      >
        Edit card
      </Menu.Item>
    </>
  )
}
