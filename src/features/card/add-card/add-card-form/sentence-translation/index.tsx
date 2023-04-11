import { IconCopy, IconPlus, IconX } from '@tabler/icons-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ActionIcon, Button, Group, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { TextareaController } from '@/shared/ui'
import { AddCardFormValues } from '../index'

export const SentenceTranslation = () => {
  const { control, setFocus, setValue, watch } = useFormContext<AddCardFormValues>()
  const [isSentenceTranslation, handlers] = useDisclosure(false)
  const openField = () => {
    handlers.open()
    setFocus('sentenceTranslation', { shouldSelect: true })
  }

  const handleCopy = () => {
    setValue('sentenceTranslation', watch('sentence'))
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
            <Group spacing={'sm'}>
              <ActionIcon color={'dark.8'} size={'sm'} variant="light" onClick={handleCopy}>
                <IconCopy />
              </ActionIcon>
              <ActionIcon color={'rose.4'} size={'sm'} variant="light" onClick={handlers.close}>
                <IconX />
              </ActionIcon>
            </Group>
          }
          rightSectionProps={{ style: { marginRight: '20px', width: '100px' } }}
        />
      }
      {!isSentenceTranslation && (
        <Button onClick={openField} leftIcon={<IconPlus />} variant="light" color="gray.4">
          Translate sentence
        </Button>
      )}
    </Stack>
  )
}
