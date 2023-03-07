import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import * as React from 'react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Alert, Button, PasswordInput, TextInput } from '@mantine/core'
import { auth } from '@/entities/auth'
import { PATH } from '@/shared/config'
import { ServerError } from '../../../shared/api'

export type LoginFormValues = {
  email: string
  password: string
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string().required('This field is required'),
        password: Yup.string().required('This field is required'),
      })
    ),
    mode: 'onChange',
  })

  const [alertError, setAlertError] = useState<string | null>(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
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
