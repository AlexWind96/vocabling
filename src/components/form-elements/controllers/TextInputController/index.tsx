import React from 'react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'
import { TextInput, TextInputProps } from '@mantine/core'

interface NumberInputControllerProps<T extends FieldValues> extends TextInputProps {
  control: Control<T, any>
  name: FieldPath<T>
}

export const TextInputController = <T extends FieldValues>({
  name,
  control,
  ...rest
}: NumberInputControllerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <TextInput {...field} {...rest} />}
    />
  )
}
