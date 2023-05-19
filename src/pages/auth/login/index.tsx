import React from 'react'
import { Link } from 'react-router-dom'
import { Anchor, Paper, Text, Title } from '@mantine/core'
import { PATH } from '@shared/config'
import { LoginForm } from '@features/auth/login'

export const LoginPage = () => {
  return (
    <Paper withBorder shadow="md" px={30} pb={30} pt={20} mt={30} radius="md">
      <Title align="center" order={3} mb={'md'}>
        Log in
      </Title>
      <LoginForm />
      <Text color="dimmed" size="sm" align="center" mt={'sm'}>
        Do not have an account yet?{' '}
        <Anchor size={'sm'} component={Link} to={`/${PATH.register}`}>
          Register new account
        </Anchor>
      </Text>
    </Paper>
  )
}
