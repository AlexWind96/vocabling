import React from 'react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'
import { Select, SelectProps } from '@mantine/core'

interface SelectControllerProps<T extends FieldValues> extends SelectProps {
  control: Control<T, any>
  name: FieldPath<T>
}

export const SelectController = <T extends FieldValues>({
  name,
  control,
  ...rest
}: SelectControllerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Select {...field} {...rest} />}
    />
  )
}
