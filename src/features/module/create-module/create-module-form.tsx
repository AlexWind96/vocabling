import { yupResolver } from '@hookform/resolvers/yup'
import * as React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { Button, Stack } from '@mantine/core'
import { CreateModuleDTO, Module } from '@/shared/api'
import { TextInputController } from '@/shared/ui'

type CreateModuleFormValues = Pick<Module, 'label'>

type CreateModuleFormProps = {
  onSubmit: (values: CreateModuleDTO) => Promise<void>
}

export const CreateModuleForm = (props: CreateModuleFormProps) => {
  const methods = useForm<CreateModuleFormValues>({
    resolver: yupResolver(
      Yup.object().shape({
        label: Yup.string().required('Required'),
      })
    ),
    mode: 'onChange',
    defaultValues: {
      label: '',
    },
  })
  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods

  const onSubmit: SubmitHandler<CreateModuleFormValues> = async (data) => {
    const module: CreateModuleDTO = {
      label: data.label.trim(),
    }
    await props.onSubmit(module)

    reset()
  }

  return (
    <FormProvider<CreateModuleFormValues> {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="xs">
          <TextInputController control={control} name={'label'} placeholder={'Module name'} />
          <Button fullWidth mt="xl" type={'submit'} loading={isSubmitting}>
            Save module
          </Button>
        </Stack>
      </form>
    </FormProvider>
  )
}
