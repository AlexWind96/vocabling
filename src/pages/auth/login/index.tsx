import React from 'react'
import { Link } from 'react-router-dom'
import { Anchor, Paper, Text, Title } from '@mantine/core'
import { Login } from '@/features/auth/login'
import { PATH } from '@/shared/config'

export const LoginPage = () => {
  return (
    <Paper withBorder shadow="md" px={30} pb={30} pt={20} mt={30} radius="md">
      <Title align="center" order={3} mb={'md'}>
        Log in
      </Title>
      <Login />
      <Text color="dimmed" size="sm" align="center" mt={'sm'}>
        Do not have an account yet?{' '}
        <Anchor size={'sm'} component={Link} to={`/${PATH.register}`}>
          Register new account
        </Anchor>
      </Text>
    </Paper>
  )
}
