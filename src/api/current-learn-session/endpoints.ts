import type { AxiosPromise } from 'axios'
import { Endpoints } from '@/shared/api'
import { CurrentLearnSession, UpdateCurrentLearnSessionDto } from './model'

export class CurrentLearnSessionEndpoints extends Endpoints {
  getCurrentLearnSession = (): AxiosPromise<CurrentLearnSession> => {
    return this.instance.get(this.getEndpoint())
  }
  completeCurrentLearnSession = (): AxiosPromise<undefined> => {
    return this.instance.get(this.getEndpoint(`/complete`))
  }
  updateCurrentLearnSession = (
    body: UpdateCurrentLearnSessionDto
  ): AxiosPromise<CurrentLearnSession> => {
    return this.instance.patch(this.getEndpoint(), body)
  }
}
