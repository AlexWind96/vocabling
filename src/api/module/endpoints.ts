import type { AxiosPromise } from 'axios'
import { Endpoints } from '@/shared/api'
import { Page } from '../types'
import { CreateModuleDTO, Module, ModulesQueryParams, UpdateModuleDTO } from './models'

export class ModuleEndpoints extends Endpoints {
  getModules = (params: ModulesQueryParams | undefined): AxiosPromise<Page<Module>> => {
    return this.instance.get(this.getEndpoint(), { params })
  }
  getModuleById = (id: string): AxiosPromise<Module> => {
    return this.instance.get(this.getEndpoint(`/${id}`))
  }
  updateModule = (id: string, body: UpdateModuleDTO): AxiosPromise<Module> => {
    return this.instance.patch(this.getEndpoint(`/${id}`), body)
  }

  createModule = (body: CreateModuleDTO): AxiosPromise<Module> => {
    return this.instance.post(this.getEndpoint(), body)
  }

  deleteModule = (id: string): AxiosPromise<Module> => {
    return this.instance.delete(this.getEndpoint(`/${id}`))
  }
}
