import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextareaController } from '@/shared/ui'
import { CardFormValues } from '../model'

export const PhraseTranslation = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CardFormValues>()
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
