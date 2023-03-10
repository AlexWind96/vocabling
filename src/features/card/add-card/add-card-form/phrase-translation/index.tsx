import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextareaController } from '@/shared/ui'
import { AddCardFormValues } from '../index'

export const PhraseTranslation = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<AddCardFormValues>()
  return (
    <TextareaController
      autosize
      control={control}
      name={'phraseTranslation'}
      placeholder={'Translate the phrase'}
      error={errors.phraseTranslation?.message}
    />
  )
}
