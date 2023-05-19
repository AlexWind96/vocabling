import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button, Stack } from '@mantine/core'
import { CreateModuleDTO } from '@shared/api'
import { TextInputController } from '@shared/ui'

type CreateModuleFormProps = {
  onSubmit: (values: CreateModuleDTO) => Promise<void>
  folderId?: string
}

const createModuleFormSchema = z.object({
  label: z.string(),
})

type CreateModuleFormValues = z.infer<typeof createModuleFormSchema>

export const CreateModuleForm = (props: CreateModuleFormProps) => {
  const methods = useForm<CreateModuleFormValues>({
    resolver: zodResolver(createModuleFormSchema),
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
      folderId: props.folderId,
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
