import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import * as React from 'react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Alert, Button, PasswordInput, Stack, TextInput } from '@mantine/core'
import { auth } from '@/entities/auth'
import { PATH } from '@/shared/config'

export type RegisterFormValues = {
  email: string
  password: string
  name: string
}

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string().required('This field is required'),
        password: Yup.string().required('This field is required'),
        name: Yup.string().required('This field is required'),
      })
    ),
    mode: 'onChange',
  })

  const [alertError, setAlertError] = useState<string | null>(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      await dispatch(auth.model.actions.register.request(data))
      navigate(`/${PATH.app}`, { replace: true })
      reset()
    } catch (err) {
      const serverError = err as AxiosError
      setAlertError(serverError?.message || 'Error')
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
