import { yupResolver } from '@hookform/resolvers/yup'
import * as React from 'react'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { Button, Stack } from '@mantine/core'
import { useModules } from '@/entities/module'
import { CurrentLearnSession, UpdateCurrentLearnSessionDto } from '@/shared/api'
import { MultiSelectController } from '@/shared/ui'

type StartCurrentLearnSessionProps = {
  onSubmit: (values: UpdateCurrentLearnSessionDto) => Promise<void>
  learnSession?: CurrentLearnSession
  isSessionLoading: boolean
}

type FromValues = {
  modules: string[]
}

export const StartCurrentLearnSession = (props: StartCurrentLearnSessionProps) => {
  const { data: modules, isFetched } = useModules()

  const methods = useForm<FromValues>({
    resolver: yupResolver(Yup.object().shape({})),
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

  const onSubmit: SubmitHandler<FromValues> = async (data) => {
    await props.onSubmit(data)
    reset()
  }

  const data = modules
    ? modules.map((module) => {
        return {
          value: module.id,
          label: module.label,
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
