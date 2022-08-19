import { yupResolver } from '@hookform/resolvers/yup'
import * as React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { Button } from '@mantine/core'
import { CreateWordFormValues } from '../../types'
import { ForeignExampleSection } from './ForeignExampleSection'
import { ForeignWordSection } from './ForeignWordSection'
import { NativeExampleSection } from './NativeExampleSection'
import { NativeWordSection } from './NativeWordSection'
import { CreateFormDefaultValues } from './defaultValues'

type CreateWordFormProps = {
  onSubmit: (values: CreateWordFormValues) => Promise<void>
}

export const CreateWordForm = (props: CreateWordFormProps) => {
  const methods = useForm<CreateWordFormValues>({
    resolver: yupResolver(Yup.object().shape({})),
    mode: 'onChange',
    defaultValues: CreateFormDefaultValues,
  })
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit: SubmitHandler<CreateWordFormValues> = async (data) => {
    await props.onSubmit(data)
    reset()
  }

  return (
    <FormProvider<CreateWordFormValues> {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ForeignWordSection />
        <NativeWordSection />
        <ForeignExampleSection />
        <NativeExampleSection />
        <Button fullWidth mt="xl" type={'submit'} loading={isSubmitting}>
          Save
        </Button>
      </form>
    </FormProvider>
  )
}
