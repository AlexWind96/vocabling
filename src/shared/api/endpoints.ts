import { AxiosInstance } from 'axios'

export class Endpoints {
  public instance: AxiosInstance
  constructor(instance: AxiosInstance) {
    this.instance = instance
  }
}
