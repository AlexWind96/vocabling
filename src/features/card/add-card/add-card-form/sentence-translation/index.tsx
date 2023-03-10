import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Plus, X } from 'tabler-icons-react'
import { ActionIcon, Button, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { TextareaController } from '@/shared/ui'
import { AddCardFormValues } from '../index'

export const SentenceTranslation = () => {
  const { control, setFocus } = useFormContext<AddCardFormValues>()
  const [isSentenceTranslation, handlers] = useDisclosure(false)

  const openField = () => {
    handlers.open()
    setFocus('sentenceTranslation', { shouldSelect: true })
  }

  return (
    <Stack spacing={'xs'}>
      {
        <TextareaController
          autosize
          pos={isSentenceTranslation ? 'static' : 'absolute'}
          opacity={isSentenceTranslation ? 1 : 0}
          control={control}
          name={'sentenceTranslation'}
          placeholder={'Translate sentence...'}
          rightSection={
            <ActionIcon color={'rose.4'} size={'sm'} variant="light" onClick={handlers.close}>
              <X />
            </ActionIcon>
          }
        />
      }
      {!isSentenceTranslation && (
        <Button onClick={openField} leftIcon={<Plus />} variant="light" color="gray.4">
          Translate sentence
        </Button>
      )}
    </Stack>
  )
}
