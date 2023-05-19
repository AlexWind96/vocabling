import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextareaController } from '@shared/ui'
import { AddCardFormValues } from '../add-card-form'

export const SentenceField = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<AddCardFormValues>()
  return (
    <TextareaController
      autosize
      control={control}
      name={'sentence'}
      placeholder={'Native sentence...'}
      error={errors.sentence?.message}
    />
  )
}
