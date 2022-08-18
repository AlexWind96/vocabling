import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextInputController } from '../../../../../components/form-elements'
import { CreateWordFormValues } from '../../../types'

export const ForeignWordSection = () => {
  const { control } = useFormContext<CreateWordFormValues>()
  return <TextInputController control={control} name={'foreignWord'} label={'Foreign word'} />
}
