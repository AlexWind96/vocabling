import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import * as React from 'react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Alert, Button, PasswordInput, Stack, TextInput } from '@mantine/core'
import { PATH } from '@shared/config'
import { registerAction } from './saga'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  name: z.string(),
})

type RegisterForm = z.infer<typeof registerSchema>

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  })

  const [alertError, setAlertError] = useState<string | null>(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      await dispatch(registerAction.request(data))
      navigate(`/${PATH.app}`, { replace: true })
      reset()
    } catch (err) {
      const serverError = err as AxiosError
      setAlertError(serverError.response?.data?.message || 'Error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {alertError && !isSubmitting && (
        <Alert color="red" mb={'sm'}>
          {alertError}
        </Alert>
      )}
      <Stack>
        <TextInput
          {...register('name')}
          label="Name"
          placeholder="Name"
          required
          error={errors.name?.message as React.ReactNode}
        />
        <TextInput
          {...register('email')}
          label="Email"
          placeholder="you@mantine.dev"
          required
          error={errors.email?.message as React.ReactNode}
        />
        <PasswordInput
          {...register('password')}
          label="Password"
          placeholder="Your password"
          required
          error={errors.password?.message as React.ReactNode}
        />
      </Stack>
      <Button fullWidth type={'submit'} mt={'md'} loading={isSubmitting}>
        Sign in
      </Button>
    </form>
  )
}
