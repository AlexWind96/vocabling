import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextareaController } from '../../../../../components/form-elements'
import { CreateWordFormValues } from '../../../types'

export const ForeignExampleSection = () => {
  const { control } = useFormContext<CreateWordFormValues>()
  return (
    <TextareaController
      autosize
      control={control}
      name={'foreignExample'}
      label={'Foreign example'}
    />
  )
}
