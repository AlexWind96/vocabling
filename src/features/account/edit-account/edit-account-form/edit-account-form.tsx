import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button, NumberInput, Stack } from '@mantine/core'
import { UpdateUserDto, User } from '@shared/api'

const editAccountSchema = z.object({
  learnGoal: z.number().optional(),
  growthRatio: z.number().optional(),
  initialMemoryPersistence: z.number().optional(),
})

export type EditAccountFormValues = z.infer<typeof editAccountSchema>

type EditAccountFormProps = {
  onSubmit: (values: UpdateUserDto) => Promise<void>
  defaultValues: User
}

export const EditAccountForm = (props: EditAccountFormProps) => {
  const methods = useForm<EditAccountFormValues>({
    resolver: zodResolver(editAccountSchema),
    mode: 'onChange',
    defaultValues: {
      learnGoal: props.defaultValues.learnGoal,
      growthRatio: props.defaultValues.growthRatio,
      initialMemoryPersistence: props.defaultValues.initialMemoryPersistence,
    },
  })
  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = methods

  const onSubmit: SubmitHandler<EditAccountFormValues> = async (data) => {
    const dto: UpdateUserDto = {
      growthRatio: data.growthRatio,
      initialMemoryPersistence: data.initialMemoryPersistence,
      learnGoal: data.learnGoal,
    }
    await props.onSubmit(dto)
  }

  return (
    <FormProvider<EditAccountFormValues> {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="xs" w={{ base: '100%', sm: '50%' }}>
          <Controller
            name={'growthRatio'}
            control={control}
            render={({ field }) => (
              <NumberInput label={'Growth ratio'} precision={2} min={0} max={0.9} {...field} />
            )}
          />
          <Controller
            name={'initialMemoryPersistence'}
            control={control}
            render={({ field }) => (
              <NumberInput label={'Initial memory persistence'} precision={2} min={0} {...field} />
            )}
          />
          <Controller
            name={'learnGoal'}
            control={control}
            render={({ field }) => <NumberInput label={'Learning goal'} {...field} />}
          />
          <Button fullWidth mt="xl" type={'submit'} loading={isSubmitting}>
            Save
          </Button>
        </Stack>
      </form>
    </FormProvider>
  )
}
