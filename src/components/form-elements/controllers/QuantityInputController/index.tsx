import React from 'react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'
import { NumberInputProps } from '@mantine/core'
import { QuantityInput } from '../../../elements'

interface QuantityInputControllerProps<T extends FieldValues> extends NumberInputProps {
  control: Control<T, any>
  name: FieldPath<T>
}

export const QuantityInputController = <T extends FieldValues>({
  name,
  control,
  ...rest
}: QuantityInputControllerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <QuantityInput {...field} {...rest} />}
    />
  )
}
