import { yupResolver } from '@hookform/resolvers/yup'
import * as React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { Button, Stack } from '@mantine/core'
import { Module, UpdateModuleDTO } from '@/shared/api'
import { TextInputController } from '@/shared/ui'

type RenameModuleFormValues = Pick<Module, 'label'>

type RenameModuleFormProps = {
  defaultValues: RenameModuleFormValues
  onSubmit: (values: UpdateModuleDTO) => Promise<void>
}

export const RenameModuleForm = (props: RenameModuleFormProps) => {
  const methods = useForm<RenameModuleFormValues>({
    resolver: yupResolver(
      Yup.object().shape({
        label: Yup.string().required('This field is requered'),
      })
    ),
    mode: 'onChange',
    defaultValues: props.defaultValues,
  })
  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods

  const onSubmit: SubmitHandler<RenameModuleFormValues> = async (data) => {
    const module: UpdateModuleDTO = {
      label: data.label.trim(),
    }
    await props.onSubmit(module)

    reset()
  }

  return (
    <FormProvider<RenameModuleFormValues> {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="xs">
          <TextInputController control={control} name={'label'} placeholder={'Module name'} />
          <Button fullWidth mt="xl" type={'submit'} loading={isSubmitting}>
            Save changes
          </Button>
        </Stack>
      </form>
    </FormProvider>
  )
}
