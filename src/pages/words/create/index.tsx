import React from 'react'
import { Button, Grid, Group, Indicator } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { useAuth } from '@/features/auth'
import { CreateWordForm, formatWordsToSheetWords } from '@/features/word'
import { useCreateWord } from '@/features/word/api/createWord'
import { useSendWords } from '@/features/word/api/sendWords'
import { CreateWordFormValues } from '@/features/word/types'

export const CreateWord = () => {
  const [words, setWords] = useLocalStorage<CreateWordFormValues[]>({
    key: 'words',
    defaultValue: [],
  })
  const { mutateAsync } = useCreateWord()
  const { user } = useAuth()
  const { mutateAsync: sendWords, isLoading } = useSendWords()

  const handleSubmit = async (data: CreateWordFormValues) => {
    await mutateAsync({ ...data, owner: user!.id })
    setWords((current) => [...current, data])
  }

  const handleSendToSheets = async () => {
    await sendWords(formatWordsToSheetWords(words))
    setWords([])
  }

  return (
    <Grid>
      <Grid.Col md={6}>
        <CreateWordForm onSubmit={handleSubmit} />
        <Group position={'center'} mt={'xl'}>
          <Indicator inline label={words.length} size={14}>
            <Button onClick={handleSendToSheets} loading={isLoading}>
              Send to sheets
            </Button>
          </Indicator>
        </Group>
      </Grid.Col>
    </Grid>
  )
}
