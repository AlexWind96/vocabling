import axios, { AxiosRequestConfig } from 'axios'
import { ApiService } from '@/shared/api'
import { API_URL } from '@/shared/config'
import { jwtTokenService } from '@/shared/lib/jwt-token-service'
import { AuthEndpoints } from './auth'
import { CardEndpoints } from './card'
import { CurrentLearnSessionEndpoints } from './current-learn-session'
import { ModuleEndpoints } from './module'

const apiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const endpoints = {
  auth: new AuthEndpoints(apiInstance, 'auth'),
  card: new CardEndpoints(apiInstance, 'cards'),
  module: new ModuleEndpoints(apiInstance, 'modules'),
  currentLearnSession: new CurrentLearnSessionEndpoints(apiInstance, 'current-learn-session'),
}

declare global {
  type TypedEndpoints = typeof endpoints
}

export const API = new ApiService(apiInstance, window.store.dispatch, jwtTokenService, endpoints)

//4.Add interceptors for request and response depending on your business requirements
API.instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.url === 'auth/refresh') {
      const rt = API.tokenService.getRefreshToken()
      if (rt) {
        config.headers = {
          Authorization: API.getBearer(rt),
        }
      }
    } else {
      const at = API.tokenService.getAccessToken()
      if (at) {
        config.headers = {
          Authorization: API.getBearer(at),
        }
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

API.instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (err) => {
    const originalConfig = err.config

    if (err.response) {
      switch (err.response.status) {
        case 401: {
          if (originalConfig.url === 'auth/refresh') {
            API.dispatch({ type: 'auth/cleanAuthData' })
          } else {
            originalConfig._retry = true
            try {
              const { data } = await API.endpoints.auth.refreshToken()
              API.tokenService.updateTokens(data)
              return API.instance(originalConfig)
            } catch (_error) {
              return Promise.reject(_error)
            }
          }
        }
      }
    }

    return Promise.reject(err)
  }
)
