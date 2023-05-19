import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextareaController } from '@shared/ui'
import { EditCardFormValues } from '../edit-card-form'

export const SentenceField = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<EditCardFormValues>()
  return (
    <TextareaController
      autosize
      control={control}
      name={'sentence'}
      label={'Sentence'}
      placeholder={'Native sentence...'}
      error={errors.sentence?.message}
    />
  )
}
