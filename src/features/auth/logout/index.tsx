import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Loader, UnstyledButton, UnstyledButtonProps } from '@mantine/core'
import { PATH } from '@/shared/config'
import { logout } from './saga'

type LogoutProps = UnstyledButtonProps

export const Logout = (props: LogoutProps) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const onClick = async () => {
    setIsLoading(true)
    await dispatch(logout.request())
    setIsLoading(false)
    navigate(PATH.login)
  }
  return (
    <UnstyledButton
      {...props}
      onClick={onClick}
      disabled={isLoading}
      children={isLoading ? <Loader size={'sm'} /> : props.children}
    />
  )
}
