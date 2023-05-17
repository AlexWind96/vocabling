import axios, { AxiosInstance } from 'axios'
import { API_URL, isDevEnv } from '../config'
import { sleep } from '../utils'
import { AuthEndpoints } from './auth'
import { CardEndpoints } from './card'
import { CurrentLearnSessionEndpoints } from './current-learn-session'
import { Endpoints } from './endpoints'
import { FolderEndpoints } from './folder'
import { LearnSessionEndpoints } from './learn-session'
import { ModuleEndpoints } from './module'

export { Endpoints } from './endpoints'

export class ApiService {
  instance: AxiosInstance

  card: CardEndpoints
  auth: AuthEndpoints
  currentLearnSession: CurrentLearnSessionEndpoints
  folder: FolderEndpoints
  learnSession: LearnSessionEndpoints
  module: ModuleEndpoints

  constructor(instance: AxiosInstance) {
    this.instance = instance
    this.card = new CardEndpoints(instance)
    this.auth = new AuthEndpoints(instance)
    this.currentLearnSession = new CurrentLearnSessionEndpoints(instance)
    this.folder = new FolderEndpoints(instance)
    this.learnSession = new LearnSessionEndpoints(instance)
    this.module = new ModuleEndpoints(instance)
  }

  registerGlobalInterceptors = () => {
    this.instance.interceptors.response.use(async (response) => {
      // add artificial delay for dev env
      if (isDevEnv) {
        await sleep(3000)
      }
      return response
    })
  }
}

export const API = new ApiService(
  axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })
)
