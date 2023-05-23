import { IconCopy } from '@tabler/icons-react'
import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { ActionIcon } from '@mantine/core'
import { TextareaController } from '@shared/ui'
import { addStudyPhraseToSentence, getSentenceUnits } from '../../helpers'
import { AddCardFormValues } from '../add-card-form'

export const PhraseTranslationField = () => {
  const {
    control,
    formState: { errors },
    setValue,
    setFocus,
  } = useFormContext<AddCardFormValues>()
  const sentence = useWatch({
    control,
    name: 'sentence',
  })
  const phrase = useWatch({
    control,
    name: 'phrase',
  })

  const onAddClick = () => {
    const phraseTranslation = addStudyPhraseToSentence(getSentenceUnits(sentence), phrase)
      .filter((value) => value.isStudyPhrase)
      .map((value) => value.value)
      .join(' ')
    setValue('phraseTranslation', phraseTranslation)
    setFocus('phraseTranslation', { shouldSelect: true })
  }

  return (
    <TextareaController
      autosize
      control={control}
      name={'phraseTranslation'}
      placeholder={'Translate the phrase'}
      error={errors.phraseTranslation?.message}
      rightSection={
        <ActionIcon size={'sm'} onClick={onAddClick}>
          <IconCopy />
        </ActionIcon>
      }
      rightSectionProps={{ style: { marginRight: '20px' } }}
    />
  )
}
