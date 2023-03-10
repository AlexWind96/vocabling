import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'
import { Button, Grid, Stack } from '@mantine/core'
import { CreateCardDTO } from '@/shared/api'
import { addStudyPhraseToSentence, getSentenceUnits } from '../helpers'
import { Note } from './note'
import { Phrase } from './phrase'
import { PhraseTranslation } from './phrase-translation'
import { PreviewCardSection } from './preview-card-section'
import { Sentence } from './sentence'
import { SentenceTranslation } from './sentence-translation'

const addCardSchema = z.object({
  sentenceTranslation: z.string().optional(),
  sentence: z.string(),
  phrase: z.array(z.string()).min(1),
  phraseTranslation: z.string(),
  notes: z.string(),
})

export type AddCardFormValues = z.infer<typeof addCardSchema>

type CreateCardFormProps = {
  onSubmit: (values: CreateCardDTO) => Promise<void>
  previewSection: React.ReactNode
}

export const AddCardForm = (props: CreateCardFormProps) => {
  const { id } = useParams()
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
    const card: CreateCardDTO = {
      moduleId: id as string,
      notes: data.notes,
      phraseTranslation: data.phraseTranslation,
      sentenceTranslation: data.sentenceTranslation,
      sentence: addStudyPhraseToSentence(getSentenceUnits(data.sentence), data.phrase),
      sentenceText: data.sentence.trim(),
    }
    await props.onSubmit(card)
    reset()
  }
  return (
    <FormProvider<AddCardFormValues> {...methods}>
      <Grid>
        <Grid.Col md={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="xs">
              <Sentence />
              <Phrase />
              <PhraseTranslation />
              <SentenceTranslation />
              <Note />
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
