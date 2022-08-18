import React from 'react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'
import { Checkbox, CheckboxProps } from '@mantine/core'

interface CheckboxControllerProps<T extends FieldValues> extends CheckboxProps {
  control: Control<T, any>
  name: FieldPath<T>
}

export const CheckboxController = <T extends FieldValues>({
  name,
  control,
  ...rest
}: CheckboxControllerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <Checkbox
          checked={value}
          onChange={(event) => onChange(event.currentTarget.checked)}
          {...rest}
        />
      )}
    />
  )
}
