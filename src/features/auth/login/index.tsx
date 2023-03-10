import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import * as React from 'react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Alert, Button, PasswordInput, TextInput } from '@mantine/core'
import { auth } from '@/entities/auth'
import { ServerError } from '@/shared/api'
import { PATH } from '@/shared/config'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
})

type LoginForm = z.infer<typeof loginSchema>

export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  const [alertError, setAlertError] = useState<string | null>(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      await dispatch(auth.model.actions.login.request(data))
      navigate(`/${PATH.app}`, { replace: true })
      reset()
    } catch (err) {
      const serverError = err as AxiosError<ServerError>
      setAlertError(serverError.response?.data.message || 'Error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {alertError && !isSubmitting && (
        <Alert color="red" mb={'sm'}>
          {alertError}
        </Alert>
      )}
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
        mt="md"
      />
      <Button fullWidth mt="xl" type={'submit'} loading={isSubmitting}>
        Sign in
      </Button>
    </form>
  )
}
