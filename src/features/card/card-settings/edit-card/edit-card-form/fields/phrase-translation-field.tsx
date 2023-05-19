import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextareaController } from '@shared/ui'
import { EditCardFormValues } from '../edit-card-form'

export const PhraseTranslationField = () => {
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
