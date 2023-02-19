import { AxiosInstance } from 'axios'
import { IJwtTokenService } from '@/shared/lib/jwt-token-service'

export class ApiService {
  instance!: AxiosInstance
  tokenService!: IJwtTokenService
  //TypeEndpoints muss be declared globally in app/api/index.ts
  //It helps us to make HTTP class clear and make business logic only in app layer
  //It also let us to collect endpoints from entities and connect them only in app layer
  endpoints!: TypedEndpoints
  constructor(instance: AxiosInstance, tokenService: IJwtTokenService, endpoints) {
    this.instance = instance
    this.tokenService = tokenService
    this.endpoints = endpoints
  }
  getBearer = (token: string): string => {
    return 'Bearer ' + token
  }
}
