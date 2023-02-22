import type { AxiosPromise } from 'axios'
import { Endpoints } from '@/shared/api'
import { Page } from '../types'
import { LearnSession } from './model'

export class LearnSessionEndpoints extends Endpoints {
  getLearnSessions = (): AxiosPromise<Page<LearnSession>> => {
    return this.instance.get(this.getEndpoint())
  }
  getLearnSessionById = (id: string): AxiosPromise<LearnSession> => {
    return this.instance.get(this.getEndpoint(`/${id}`))
  }
}
