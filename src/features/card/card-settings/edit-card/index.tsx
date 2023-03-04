import { IconEdit } from '@tabler/icons'
import React from 'react'
import { Menu } from '@mantine/core'
import { closeModal, openModal } from '@mantine/modals'
import { useCard, useUpdateCard } from '@/entities/card'
import { UpdateCardDTO } from '@/shared/api'
import { LoadingScreen } from '@/shared/ui'
import { EditCardForm } from './edit-card-form'

type EditCardProps = {
  id: string
}

export const EditCard = (props: EditCardProps) => {
  const { data, isFetching } = useCard({ id: props.id })
  const { mutateAsync } = useUpdateCard()

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
                <LoadingScreen />
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
