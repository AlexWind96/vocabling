import type { AxiosPromise } from 'axios'
import { Endpoints } from '../endpoints'
import { Page } from '../types'
import { LearnSession } from './model'


export class LearnSessionEndpoints extends Endpoints {
  basePath: string = 'learn-sessions'

  getLearnSessions = (): AxiosPromise<Page<LearnSession>> => {
    return this.instance.get(this.basePath)
  }
  getLearnSessionById = (id: string): AxiosPromise<LearnSession> => {
    return this.instance.get(this.basePath + `/${id}`)
  }
}
