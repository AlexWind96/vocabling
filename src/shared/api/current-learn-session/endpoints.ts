import type { AxiosPromise } from 'axios'
import { Endpoints } from '../endpoints'
import { CurrentLearnSession, UpdateCurrentLearnSessionDto } from './model'

export class CurrentLearnSessionEndpoints extends Endpoints {
  basePath: string = 'current-learn-session'

  getCurrentLearnSession = (): AxiosPromise<CurrentLearnSession> => {
    return this.instance.get(this.basePath)
  }
  completeCurrentLearnSession = (): AxiosPromise<undefined> => {
    return this.instance.post(this.basePath + `/complete`)
  }
  updateCurrentLearnSession = (
    body: UpdateCurrentLearnSessionDto
  ): AxiosPromise<CurrentLearnSession> => {
    return this.instance.patch(this.basePath, body)
  }
}
