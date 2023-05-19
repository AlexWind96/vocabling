import * as React from 'react'
import { PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'
import { API } from '@shared/api'
import { jwtTokenService } from '@shared/lib/jwt-token-service'


type ApiInterceptorsProviderProps = PropsWithChildren

export const ApiInterceptorsProvider = ({ children }: ApiInterceptorsProviderProps) => {
  const dispatch = useDispatch()
  // API.registerGlobalInterceptors()
  API.auth.registerInterceptors(jwtTokenService, dispatch)

  return <>{children}</>
}
