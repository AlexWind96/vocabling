import React from 'react'
import { CreateCardDTO } from '@/shared/api'
import { Notifications } from '@/shared/lib/notifications'
import { AddCardForm } from './add-card-form'
import { useCreateCard } from './use-create-card'

type AddCardProps = {
  previewSection: React.ReactNode
}
export const AddCard = (props: AddCardProps) => {
  const { mutateAsync, error } = useCreateCard({
    onMutate: (data) => {
      return { moduleId: data.moduleId, first: 3 }
    },
  })

  const handleSubmit = async (data: CreateCardDTO) => {
    try {
      await mutateAsync(data)
    } catch (e) {
      Notifications.showError({ message: error?.message || 'Something is wrong' })
      throw e
    }
  }

  return <AddCardForm previewSection={props.previewSection} onSubmit={handleSubmit} />
}
