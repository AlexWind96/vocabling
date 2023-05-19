import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'
import { Button, Grid, Stack } from '@mantine/core'
import { CreateCardDTO } from '@shared/api'
import { Notifications } from '@shared/lib/notifications'
import { addStudyPhraseToSentence, getSentenceUnits } from '../helpers'
import { useCreateCardMutation } from '../use-create-card-mutation'
import {
  NoteField,
  PhraseField,
  PhraseTranslationField,
  SentenceField,
  SentenceTranslationField,
} from './fields'
import { PreviewCardSection } from './preview-card-section'

const addCardSchema = z.object({
  sentenceTranslation: z.string().optional(),
  sentence: z.string().min(1),
  phrase: z.array(z.string()).min(1),
  phraseTranslation: z.string().min(1),
  notes: z.string(),
})

export type AddCardFormValues = z.infer<typeof addCardSchema>

type CreateCardFormProps = {
  previewSection: React.ReactNode
}

export const AddCardForm = (props: CreateCardFormProps) => {
  const { id } = useParams()
  const { mutateAsync, error } = useCreateCardMutation({
    onMutate: (data) => {
      return { moduleId: data.moduleId, first: 3 }
    },
  })
  const methods = useForm<AddCardFormValues>({
    resolver: zodResolver(addCardSchema),
    mode: 'onChange',
    defaultValues: {
      sentenceTranslation: '',
      sentence: '',
      phrase: [],
      notes: '<p></p>',
      phraseTranslation: '',
    },
  })
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit: SubmitHandler<AddCardFormValues> = async (data) => {
    try {
      const card: CreateCardDTO = {
        moduleId: id as string,
        notes: data.notes,
        phraseTranslation: data.phraseTranslation,
        sentenceTranslation: data.sentenceTranslation,
        sentence: addStudyPhraseToSentence(getSentenceUnits(data.sentence), data.phrase),
        sentenceText: data.sentence.trim(),
      }
      await mutateAsync(card)
      reset()
    } catch (e) {
      Notifications.showError({ message: error?.message || 'Something is wrong' })
    }
  }
  return (
    <FormProvider<AddCardFormValues> {...methods}>
      <Grid>
        <Grid.Col md={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="xs">
              <SentenceField />
              <PhraseField />
              <PhraseTranslationField />
              <SentenceTranslationField />
              <NoteField />
              <Button fullWidth type={'submit'} loading={isSubmitting}>
                Save
              </Button>
            </Stack>
          </form>
        </Grid.Col>
        <Grid.Col md={6}>
          <Stack>
            <PreviewCardSection />
            {props.previewSection}
          </Stack>
        </Grid.Col>
      </Grid>
    </FormProvider>
  )
}
