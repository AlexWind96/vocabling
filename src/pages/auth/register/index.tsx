import React from 'react'
import { Link } from 'react-router-dom'
import { Anchor, Paper, Text, Title } from '@mantine/core'
import { Register } from '@/features/auth/register'
import { PATH } from '@/shared/config'

export const RegisterPage = () => {
  return (
    <Paper withBorder shadow="md" px={30} pb={30} pt={20} mt={30} radius="md">
      <Title align="center" order={3} mb={'md'}>
        Sign up
      </Title>
      <Register />
      <Text color="dimmed" size="sm" align="center" mt={'sm'}>
        Have an account yet?{' '}
        <Anchor size={'sm'} component={Link} to={`/${PATH.login}`}>
          Log in
        </Anchor>
      </Text>
    </Paper>
  )
}
