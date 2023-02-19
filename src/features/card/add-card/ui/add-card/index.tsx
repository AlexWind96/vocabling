import React from 'react'
import { CreateCardDTO } from '@/api'
import { useCreateCard } from '@/entities/card'
import { AddCardForm } from './add-card-form'

type AddCardProps = {
  previewSection: React.ReactNode
}
export const AddCard = (props: AddCardProps) => {
  const { mutateAsync } = useCreateCard()

  const handleSubmit = async (data: CreateCardDTO) => {
    await mutateAsync(data)
  }

  return <AddCardForm previewSection={props.previewSection} onSubmit={handleSubmit} />
}
