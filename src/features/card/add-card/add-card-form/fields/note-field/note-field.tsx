import { IconPlus } from '@tabler/icons-react'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Button, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { AddCardFormValues } from '../../add-card-form'
import { NoteEditor } from './note-editor'

export function NoteField() {
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
        <Button onClick={handleClick} leftIcon={<IconPlus />} variant="light" color="gray.4">
          Notes
        </Button>
      )}
    </Stack>
  )
}
