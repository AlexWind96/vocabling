import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button, Stack } from '@mantine/core'
import { CreateFolderDto } from '@shared/api'
import { TextInputController } from '@shared/ui'

type CreateFolderFormProps = {
  onSubmit: (values: CreateFolderDto) => Promise<void>
}

const createFolderSchema = z.object({
  label: z.string(),
})

type CreateFolderFormValues = z.infer<typeof createFolderSchema>

export const CreateFolderForm = (props: CreateFolderFormProps) => {
  const methods = useForm<CreateFolderFormValues>({
    resolver: zodResolver(createFolderSchema),
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
        <Stack spacing={'md'}>
          <TextInputController control={control} name={'label'} placeholder={'Folder name'} />
          <Button fullWidth type={'submit'} loading={isSubmitting}>
            Save folder
          </Button>
        </Stack>
      </form>
    </FormProvider>
  )
}
