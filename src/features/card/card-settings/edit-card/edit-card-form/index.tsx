import { yupResolver } from '@hookform/resolvers/yup'
import * as React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { Button, Stack } from '@mantine/core'
import { Card, UpdateCardDTO } from '@/api'
import { addStudyPhraseToSentence, getInitialEditCardValues, getSentenceUnits } from './helpers'
import { CardFormValues } from './model'
import { Module } from './module'
import { Note } from './note'
import { Phrase } from './phrase'
import { PhraseTranslation } from './phrase-translation'
import { Sentence } from './sentence'
import { SentenceTranslation } from './sentence-translation'

type CreateCardFormProps = {
  onSubmit: (values: UpdateCardDTO) => Promise<void>
  defaultValues: Card
}

export const EditCardForm = (props: CreateCardFormProps) => {
  const methods = useForm<CardFormValues>({
    resolver: yupResolver(
      Yup.object().shape({
        sentence: Yup.string().required(),
        phraseTranslation: Yup.string().required(),
        phrase: Yup.array().min(1),
      })
    ),
    mode: 'onChange',
    defaultValues: getInitialEditCardValues(props.defaultValues),
  })
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit: SubmitHandler<CardFormValues> = async (data) => {
    const card: UpdateCardDTO = {
      moduleId: data.moduleId,
      notes: data.notes,
      phraseTranslation: data.phraseTranslation,
      sentenceTranslation: data.sentenceTranslation,
      sentence: addStudyPhraseToSentence(getSentenceUnits(data.sentence), data.phrase),
      sentenceText: data.sentence.trim(),
    }
    await props.onSubmit(card)
  }

  return (
    <FormProvider<CardFormValues> {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="xs">
          <Module />
          <Sentence />
          <Phrase />
          <PhraseTranslation />
          <SentenceTranslation />
          <Note />
          <Button fullWidth mt="xl" type={'submit'} loading={isSubmitting}>
            Edit
          </Button>
        </Stack>
      </form>
    </FormProvider>
  )
}
