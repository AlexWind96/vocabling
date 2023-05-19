import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button, Stack } from '@mantine/core'
import { UpdateModuleDTO } from '@shared/api'
import { TextInputController } from '@shared/ui'

type RenameModuleFormProps = {
  defaultValues: RenameModuleFormValues
  onSubmit: (values: UpdateModuleDTO) => Promise<void>
}

const renameModuleFormSchema = z.object({
  label: z.string(),
})

type RenameModuleFormValues = z.infer<typeof renameModuleFormSchema>

export const RenameModuleForm = (props: RenameModuleFormProps) => {
  const methods = useForm<RenameModuleFormValues>({
    resolver: zodResolver(renameModuleFormSchema),
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
