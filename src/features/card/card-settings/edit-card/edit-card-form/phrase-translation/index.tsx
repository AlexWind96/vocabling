import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextareaController } from '@/shared/ui'
import { EditCardFormValues } from '../index'

export const PhraseTranslation = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<EditCardFormValues>()
  return (
    <TextareaController
      autosize
      control={control}
      label={'Phrase translation'}
      name={'phraseTranslation'}
      placeholder={'Translate the phrase'}
      error={errors.phraseTranslation?.message}
    />
  )
}
