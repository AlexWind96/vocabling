import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Badge, Button, Group, Stack, Text } from '@mantine/core'
import { useAppDispatch } from '@shared/hooks'
import { MultiSelectController } from '@shared/ui'
import { setupSession, useCurrentLearnSessionQuery } from '@entities/current-learn-session'
import { useModulesQuery } from '@entities/module'
import { useStartLearnSessionMutation } from './start-learn-session-mutation'

type StartLearnSessionFormProps = {}

const startLearnSessionFormSchema = z.object({
  modules: z.array(z.string()),
})

type StartLearnSessionFormValues = z.infer<typeof startLearnSessionFormSchema>

export const StartLearnSessionForm = (props: StartLearnSessionFormProps) => {
  const navigate = useNavigate()
  const { data: modules, isFetched } = useModulesQuery()
  const { data: learnSession, isLoading: isSessionLoading } = useCurrentLearnSessionQuery()
  const { mutateAsync } = useStartLearnSessionMutation()
  const dispatch = useAppDispatch()
  const methods = useForm<StartLearnSessionFormValues>({
    resolver: zodResolver(startLearnSessionFormSchema),
    mode: 'onChange',
    defaultValues: {
      modules: learnSession?.modules || [],
    },
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    control,
    setValue,
  } = methods

  const onSubmit: SubmitHandler<StartLearnSessionFormValues> = async (data) => {
    const currentLearnSession = await mutateAsync(data)
    await dispatch(setupSession()).unwrap()
    navigate(currentLearnSession.id)
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
    if (learnSession) {
      setValue('modules', learnSession.modules)
    }
  }, [learnSession])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MultiSelectController
        disabled={!isFetched || isSessionLoading}
        control={control}
        name={'modules'}
        data={data}
        label="Pick a module"
        placeholder={'All modules by default'}
        clearable
        size="lg"
      />
      <Stack spacing="xs">
        <Button fullWidth mt="xl" type={'submit'} loading={isSubmitting || isSessionLoading}>
          Start
        </Button>
      </Stack>
    </form>
  )
}
