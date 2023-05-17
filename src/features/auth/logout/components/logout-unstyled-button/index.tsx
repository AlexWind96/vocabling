import React from 'react'
import { Loader, UnstyledButton, UnstyledButtonProps } from '@mantine/core'
import { useLogout } from '../../use-logout'

type LogoutProps = UnstyledButtonProps

export const LogoutUnstyledButton = (props: LogoutProps) => {
  const { logout, isLoading } = useLogout()
  return (
    <UnstyledButton
      {...props}
      onClick={logout}
      disabled={isLoading}
      children={isLoading ? <Loader size={'sm'} /> : props.children}
    />
  )
}
