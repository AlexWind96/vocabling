import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button, Stack } from '@mantine/core'
import { useModules } from '@/entities/module'
import { CurrentLearnSession, UpdateCurrentLearnSessionDto } from '@/shared/api'
import { MultiSelectController } from '@/shared/ui'

type StartCurrentLearnSessionProps = {
  onSubmit: (values: UpdateCurrentLearnSessionDto) => Promise<void>
  learnSession?: CurrentLearnSession
  isSessionLoading: boolean
}

const startCurrentLearnSessionSchema = z.object({
  modules: z.array(z.string()),
})

type FormValues = z.infer<typeof startCurrentLearnSessionSchema>

export const StartCurrentLearnSession = (props: StartCurrentLearnSessionProps) => {
  const { data: modules, isFetched } = useModules()

  const methods = useForm<FormValues>({
    resolver: zodResolver(startCurrentLearnSessionSchema),
    mode: 'onChange',
    defaultValues: {
      modules: props.learnSession?.modules || [],
    },
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    control,
    setValue,
  } = methods

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await props.onSubmit(data)
    reset()
  }

  const data = modules
    ? modules.map((module) => {
        return {
          value: module.id,
          label: module.label,
          group: module?.folder?.label || undefined,
        }
      })
    : []

  useEffect(() => {
    if (props.learnSession) {
      setValue('modules', props.learnSession.modules)
    }
  }, [props.learnSession])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MultiSelectController
        disabled={!isFetched || props.isSessionLoading}
        control={control}
        name={'modules'}
        data={data}
        label="Pick a module"
        placeholder={'All modules by default'}
        clearable
        size="lg"
      />
      <Stack spacing="xs">
        <Button
          fullWidth
          mt="xl"
          type={'submit'}
          loading={isSubmitting}
          disabled={!isFetched || props.isSessionLoading}
        >
          Start
        </Button>
      </Stack>
    </form>
  )
}
