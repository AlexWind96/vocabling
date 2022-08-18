import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextInputController } from '../../../../../components/form-elements'
import { CreateWordFormValues } from '../../../types'

export const NativeWordSection = () => {
  const { control } = useFormContext<CreateWordFormValues>()
  return <TextInputController control={control} name={'nativeWord'} label={'Native word'} />
}
