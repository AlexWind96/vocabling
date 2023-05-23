import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextareaController } from '@shared/ui'
import { EditCardFormValues } from '../edit-card-form'

export const SentenceTranslationField = () => {
  const { control } = useFormContext<EditCardFormValues>()

  return (
    <TextareaController
      autosize
      control={control}
      label={'Sentence translation'}
      name={'sentenceTranslation'}
      placeholder={'Translate sentence...'}
    />
  )
}
