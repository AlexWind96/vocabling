import * as React from 'react'
import { Button, ButtonProps } from '@mantine/core'
import { useLogout } from '../use-logout'

type LogoutButtonProps = ButtonProps

export const LogoutButton = (props: LogoutButtonProps) => {
  const { logout, isLoading } = useLogout()
  return <Button {...props} maw={150} variant={'outline'} onClick={logout} loading={isLoading} />
}
