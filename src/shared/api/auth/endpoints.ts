import { Dispatch } from '@reduxjs/toolkit'
import type { AxiosPromise } from 'axios'
import { AxiosRequestConfig } from 'axios'
import { IJwtTokenService } from '@shared/lib/jwt-token-service'
import { getBearer } from '@shared/utils'
import { Endpoints } from '../endpoints'
import { LoginBody, RegisterBody, Tokens, UpdateUserDto, User } from './models'

export class AuthEndpoints extends Endpoints {
  basePath = 'auth'

  register = (body: RegisterBody): AxiosPromise<Tokens> => {
    return this.instance.post(this.basePath + '/signup', body)
  }

  updateUser = (body: UpdateUserDto): AxiosPromise<User> => {
    return this.instance.patch('users/me', body)
  }

  login = (body: LoginBody): AxiosPromise<Tokens> => {
    return this.instance.post(this.basePath + '/signin', body)
  }

  refreshToken = (): AxiosPromise<Tokens> => {
    return this.instance.post(this.basePath + '/refresh')
  }

  logout = (): AxiosPromise<null> => {
    return this.instance.post(this.basePath + '/logout')
  }

  getCurrentUser = (): AxiosPromise<User> => {
    return this.instance.get(`users/me`)
  }

  registerInterceptors(jwtTokenService: IJwtTokenService, dispatch: Dispatch): void {
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (config.url === 'auth/refresh') {
          const rt = jwtTokenService.getRefreshToken()
          if (rt) {
            config.headers = {
              Authorization: getBearer(rt),
            }
          }
        } else {
          const at = jwtTokenService.getAccessToken()
          if (at) {
            config.headers = {
              Authorization: getBearer(at),
            }
          }
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        return response
      },
      async (err) => {
        const originalConfig = err.config
        if (err.response) {
          switch (err.response.status) {
            case 401: {
              if (originalConfig.url === 'auth/refresh') {
                jwtTokenService.removeTokens()
                dispatch({ type: 'auth/cleanAuthData' })
              } else {
                originalConfig._retry = true
                try {
                  const { data } = await this.refreshToken()
                  jwtTokenService.updateTokens(data)
                  return this.instance(originalConfig.url, {
                    ...originalConfig,
                    data: originalConfig?.data ? JSON.parse(originalConfig.data) : undefined,
                  })
                } catch (_error) {
                  return Promise.reject(_error)
                }
              }
              break
            }
          }
        }

        return Promise.reject(err)
      }
    )
  }
}
