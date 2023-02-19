import React from 'react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'
import { Textarea, TextareaProps } from '@mantine/core'

interface TextareaControllerProps<T extends FieldValues> extends TextareaProps {
  control: Control<T, any>
  name: FieldPath<T>
}

export const TextareaController = <T extends FieldValues>({
  name,
  control,
  ...rest
}: TextareaControllerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Textarea {...field} {...rest} />}
    />
  )
}
