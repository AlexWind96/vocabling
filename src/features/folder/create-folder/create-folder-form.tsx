import { yupResolver } from '@hookform/resolvers/yup'
import * as React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { Button, Stack } from '@mantine/core'
import { CreateFolderDto, Folder } from '@/api'
import { TextInputController } from '@/shared/ui'

type CreateFolderFormValues = Pick<Folder, 'label'>

type CreateFolderFormProps = {
  onSubmit: (values: CreateFolderDto) => Promise<void>
}

export const CreateFolderForm = (props: CreateFolderFormProps) => {
  const methods = useForm<CreateFolderFormValues>({
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

  const onSubmit: SubmitHandler<CreateFolderFormValues> = async (data) => {
    const module: CreateFolderDto = {
      label: data.label.trim(),
    }
    await props.onSubmit(module)

    reset()
  }

  return (
    <FormProvider<CreateFolderFormValues> {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="xs">
          <TextInputController control={control} name={'label'} placeholder={'Folder name'} />
          <Button fullWidth mt="xl" type={'submit'} loading={isSubmitting}>
            Save folder
          </Button>
        </Stack>
      </form>
    </FormProvider>
  )
}
