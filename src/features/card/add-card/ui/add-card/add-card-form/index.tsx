import { yupResolver } from '@hookform/resolvers/yup'
import * as React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { Button, Grid, Stack } from '@mantine/core'
import { CreateCardDTO } from '@/api'
import { addStudyPhraseToSentence, getSentenceUnits } from '../../../helpers'
import { CardFormValues } from './model'
import { Note } from './note'
import { Phrase } from './phrase'
import { PhraseTranslation } from './phrase-translation'
import { PreviewCardSection } from './preview-card-section'
import { Sentence } from './sentence'
import { SentenceTranslation } from './sentence-translation'

const CREATE_FORM_DEFAULT_VALUES: CardFormValues = {
  sentenceTranslation: '',
  sentence: '',
  phrase: [],
  notes: '<p></p>',
  phraseTranslation: '',
}

type CreateCardFormProps = {
  onSubmit: (values: CreateCardDTO) => Promise<void>
  previewSection: React.ReactNode
}

export const AddCardForm = (props: CreateCardFormProps) => {
  const { id } = useParams()
  const methods = useForm<CardFormValues>({
    resolver: yupResolver(
      Yup.object().shape({
        sentence: Yup.string().required(),
        phraseTranslation: Yup.string().required(),
        phrase: Yup.array().min(1),
      })
    ),
    mode: 'onChange',
    defaultValues: CREATE_FORM_DEFAULT_VALUES,
  })
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit: SubmitHandler<CardFormValues> = async (data) => {
    const card: CreateCardDTO = {
      moduleId: id as string,
      notes: data.notes,
      phraseTranslation: data.phraseTranslation,
      sentenceTranslation: data.sentenceTranslation,
      sentence: addStudyPhraseToSentence(getSentenceUnits(data.sentence), data.phrase),
    }
    await props.onSubmit(card)
    reset()
  }
  return (
    <FormProvider<CardFormValues> {...methods}>
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
