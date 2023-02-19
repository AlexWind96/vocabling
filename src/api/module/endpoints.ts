import type { AxiosPromise } from 'axios'
import { Endpoints } from '@/shared/api'
import { Page } from '../types'
import { CreateModuleDTO, Module } from './models'

export class ModuleEndpoints extends Endpoints {
  getModules = (): AxiosPromise<Page<Module>> => {
    return this.instance.get(this.getEndpoint())
  }
  getModuleById = (id: string): AxiosPromise<Module> => {
    return this.instance.get(this.getEndpoint(`/${id}`))
  }
  updateModule = (id: string, body: Partial<Module>): AxiosPromise<Module> => {
    return this.instance.patch(this.getEndpoint(`/${id}`), body)
  }

  createModule = (body: CreateModuleDTO): AxiosPromise<Module> => {
    return this.instance.post(this.getEndpoint(), body)
  }

  deleteModule = (id: string): AxiosPromise<Module> => {
    return this.instance.delete(this.getEndpoint(`/${id}`))
  }
}
