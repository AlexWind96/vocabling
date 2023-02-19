import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UnstyledButton, UnstyledButtonProps } from '@mantine/core'
import { auth } from '@/entities/auth'
import { PATH } from '@/shared/config'

type LogoutProps = UnstyledButtonProps

export const Logout = (props: LogoutProps) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const logout = async () => {
    setIsLoading(true)
    await dispatch(auth.model.actions.logout.request())
    setIsLoading(false)
    navigate(PATH.login)
  }
  return <UnstyledButton {...props} onClick={logout} disabled={isLoading} />
}
