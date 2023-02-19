import React from 'react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'
import { MultiSelect, MultiSelectProps } from '@mantine/core'

interface MultiSelectControllerProps<T extends FieldValues> extends MultiSelectProps {
  control: Control<T, any>
  name: FieldPath<T>
}

export const MultiSelectController = <T extends FieldValues>({
  name,
  control,
  ...rest
}: MultiSelectControllerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <MultiSelect {...field} {...rest} />}
    />
  )
}
