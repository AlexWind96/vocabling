import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CreateCardDTO } from '@/api'
import { PreviewCard } from '@/entities/card'
import { addStudyPhraseToSentence, getSentenceUnits } from '../../../../helpers'
import { CardFormValues } from '../model'

export const PreviewCardSection = () => {
  const { watch } = useFormContext<CardFormValues>()
  const data: Pick<
    CreateCardDTO,
    'sentence' | 'sentenceTranslation' | 'phraseTranslation' | 'notes'
  > = {
    ...watch(),
    sentence: addStudyPhraseToSentence(getSentenceUnits(watch('sentence')), watch('phrase')),
  }

  return <PreviewCard data={data} />
}
