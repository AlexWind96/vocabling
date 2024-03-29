import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button, Stack } from '@mantine/core'
import { Card, UpdateCardDTO } from '@shared/api'
import {
  ModuleField,
  NoteField,
  PhraseField,
  PhraseTranslationField,
  SentenceField,
  SentenceTranslationField,
} from './fields'
import { addStudyPhraseToSentence, getInitialEditCardValues, getSentenceUnits } from './helpers'

const editCardSchema = z.object({
  moduleId: z.string(),
  sentenceTranslation: z.string().optional(),
  sentence: z.string(),
  phrase: z.array(z.string()).min(1),
  phraseTranslation: z.string(),
  notes: z.string(),
})

export type EditCardFormValues = z.infer<typeof editCardSchema>

type EditCardFormProps = {
  onSubmit: (values: UpdateCardDTO) => Promise<void>
  defaultValues: Card
}

export const EditCardForm = (props: EditCardFormProps) => {
  const methods = useForm<EditCardFormValues>({
    resolver: zodResolver(editCardSchema),
    mode: 'onChange',
    defaultValues: getInitialEditCardValues(props.defaultValues),
  })
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit: SubmitHandler<EditCardFormValues> = async (data) => {
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
    <FormProvider<EditCardFormValues> {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="xs">
          <ModuleField />
          <SentenceField />
          <PhraseField />
          <PhraseTranslationField />
          <SentenceTranslationField />
          <NoteField />
          <Button fullWidth mt="xl" type={'submit'} loading={isSubmitting}>
            Edit
          </Button>
        </Stack>
      </form>
    </FormProvider>
  )
}
