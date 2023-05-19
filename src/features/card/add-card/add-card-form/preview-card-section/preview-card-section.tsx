import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CreateCardDTO } from '@shared/api'
import { PreviewCard } from '@entities/card'
import { addStudyPhraseToSentence, getSentenceUnits } from '../../helpers'
import { AddCardFormValues } from '../add-card-form'

export const PreviewCardSection = () => {
  const { watch } = useFormContext<AddCardFormValues>()
  const data: Pick<
    CreateCardDTO,
    'sentence' | 'sentenceTranslation' | 'phraseTranslation' | 'notes'
  > = {
    ...watch(),
    sentence: addStudyPhraseToSentence(getSentenceUnits(watch('sentence')), watch('phrase')),
  }

  return <PreviewCard data={data} />
}
