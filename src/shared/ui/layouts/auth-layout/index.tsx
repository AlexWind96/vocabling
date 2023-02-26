import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Anchor, Container, Title } from '@mantine/core'

type AuthLayoutProps = {
  fallback: React.ReactNode
}

export const AuthLayout = ({ fallback }: AuthLayoutProps) => {
  return (
    <Container size={420} my={20}>
      <Anchor component={Link} to={'/'}>
        <Title sx={{ cursor: 'pointer' }} align="center" order={2}>
          LANGO
        </Title>
      </Anchor>
      <React.Suspense fallback={fallback}>
        <Outlet />
      </React.Suspense>
    </Container>
  )
}
