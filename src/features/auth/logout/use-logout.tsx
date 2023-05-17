import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PATH } from '@/shared/config'
import { logout as logoutAction } from './saga'

export const useLogout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const logout = useCallback(async () => {
    setIsLoading(true)
    await dispatch(logoutAction.request())
    setIsLoading(false)
    navigate(`/${PATH.login}`)
  }, [])

  return { logout, isLoading }
}
