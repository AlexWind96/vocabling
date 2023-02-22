import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextareaController } from '@/shared/ui'
import { CardFormValues } from '../model'

export const SentenceTranslation = () => {
  const { control } = useFormContext<CardFormValues>()

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
