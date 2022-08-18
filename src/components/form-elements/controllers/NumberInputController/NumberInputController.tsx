import React from 'react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'
import { NumberInput, NumberInputProps } from '@mantine/core'

interface NumberInputControllerProps<T extends FieldValues> extends NumberInputProps {
  control: Control<T, any>
  name: FieldPath<T>
}

export const NumberInputController = <T extends FieldValues>({
  name,
  control,
  ...rest
}: NumberInputControllerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <NumberInput {...field} {...rest} />}
    />
  )
}
