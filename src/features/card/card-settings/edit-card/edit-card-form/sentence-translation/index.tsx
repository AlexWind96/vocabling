import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextareaController } from '@/shared/ui'
import { EditCardFormValues } from '../index'

export const SentenceTranslation = () => {
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
