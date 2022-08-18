import React from 'react'
import { Controller } from 'react-hook-form'
import { Textarea, TextareaProps } from '@mantine/core'

interface NumberInputControllerProps extends TextareaProps {
  control: any
  name: string
}

export const TextareaController = ({ name, control, ...rest }: NumberInputControllerProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Textarea {...field} {...rest} />}
    />
  )
}
