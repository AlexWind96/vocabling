import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Anchor, Container, Title } from '@mantine/core'
import useStyles from './styles'

type AuthLayoutProps = {
  fallback: React.ReactNode
}

export const AuthLayout = ({ fallback }: AuthLayoutProps) => {
  const { classes } = useStyles()
  return (
    <div className={classes.wrapper}>
      <Container size={420}>
        <Anchor component={Link} to={'/'}>
          <Title sx={{ cursor: 'pointer' }} align="center" order={2}>
            LANGO
          </Title>
        </Anchor>
        <React.Suspense fallback={fallback}>
          <Outlet />
        </React.Suspense>
      </Container>
    </div>
  )
}
