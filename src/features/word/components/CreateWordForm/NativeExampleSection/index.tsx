import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextareaController } from '../../../../../components/form-elements'
import { CreateWordFormValues } from '../../../types'

export const NativeExampleSection = () => {
  const { control } = useFormContext<CreateWordFormValues>()
  return (
    <TextareaController
      autosize
      control={control}
      name={'nativeExample'}
      label={'Native example'}
    />
  )
}
