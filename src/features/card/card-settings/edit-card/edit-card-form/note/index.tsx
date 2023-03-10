import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { EditCardFormValues } from '../index'
import { NoteEditor } from './note-editor'

export function Note() {
  const { control, formState } = useFormContext<EditCardFormValues>()

  return (
    <Controller
      name={'notes'}
      control={control}
      render={({ field }) => (
        <NoteEditor
          isSubmitted={formState.isSubmitSuccessful && !formState.isDirty}
          value={field.value}
          onChange={field.onChange}
        />
      )}
    />
  )
}
