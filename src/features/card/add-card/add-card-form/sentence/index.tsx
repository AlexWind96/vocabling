import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextareaController } from '@/shared/ui'
import { AddCardFormValues } from '../index'

export const Sentence = () => {
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
