import React from 'react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'
import { DatePicker, DatePickerProps } from '@mantine/dates'

interface DatePickerControllerProps<T extends FieldValues> extends DatePickerProps {
  control: Control<T, any>
  name: FieldPath<T>
}

export const DatePickerController = <T extends FieldValues>({
  name,
  control,
  ...rest
}: DatePickerControllerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <DatePicker {...field} {...rest} />}
    />
  )
}
