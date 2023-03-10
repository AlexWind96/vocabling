import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Plus } from 'tabler-icons-react'
import { Button, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { AddCardFormValues } from '../index'
import { NoteEditor } from './note-editor'

export function Note() {
  const { control, formState } = useFormContext<AddCardFormValues>()
  const [isNotes, handlers] = useDisclosure(false)

  const handleClick = () => {
    handlers.open()
    // editor?.commands.focus()
  }

  return (
    <Stack spacing="xs">
      <Controller
        name={'notes'}
        control={control}
        render={({ field }) => (
          <NoteEditor
            isSubmitted={formState.isSubmitSuccessful && !formState.isDirty}
            value={field.value}
            onChange={field.onChange}
            onClose={handlers.close}
            isNotes={isNotes}
          />
        )}
      />
      {!isNotes && (
        <Button onClick={handleClick} leftIcon={<Plus />} variant="light" color="gray.4">
          Notes
        </Button>
      )}
    </Stack>
  )
}
