import React from 'react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'
import { Checkbox, CheckboxGroupProps } from '@mantine/core'


type Item = {
  value: string
  label: string
}

interface CheckboxGroupControllerProps<T extends FieldValues>
  extends Omit<CheckboxGroupProps, 'children'> {
  control: Control<T, any>
  name: FieldPath<T>
  items: Item[]
}

export const CheckboxGroupController = <T extends FieldValues>({
  name,
  control,
  items,
  ...rest
}: CheckboxGroupControllerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Checkbox.Group {...field} {...rest}>
          {items.map(({ value, label }, index) => (
            <Checkbox key={`${index}-${value}'`} value={value} label={label} />
          ))}
        </Checkbox.Group>
      )}
    />
  )
}
