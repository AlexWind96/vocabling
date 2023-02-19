import { AxiosInstance } from 'axios'

export class Endpoints {
  readonly basePath: string
  public instance: AxiosInstance
  constructor(instance: AxiosInstance, basePath: string) {
    this.basePath = basePath
    this.instance = instance
  }

  getEndpoint(endpoint?: string): string {
    return this.basePath + (endpoint || '')
  }
}
