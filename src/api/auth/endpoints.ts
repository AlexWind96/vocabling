import type { AxiosPromise } from 'axios'
import { Endpoints } from '@/shared/api'
import { LoginBody, RegisterBody, Tokens, User } from './models'

export class AuthEndpoints extends Endpoints {
  register = (body: RegisterBody): AxiosPromise<Tokens> => {
    return this.instance.post(this.getEndpoint('/signup'), body)
  }

  login = (body: LoginBody): AxiosPromise<Tokens> => {
    return this.instance.post(this.getEndpoint('/signin'), body)
  }

  refreshToken = (): AxiosPromise<Tokens> => {
    return this.instance.post(this.getEndpoint('/refresh'))
  }

  logout = (): AxiosPromise<null> => {
    return this.instance.post(this.getEndpoint('/logout'))
  }

  getCurrentUser = (): AxiosPromise<User> => {
    return this.instance.get(`users/me`)
  }
}
