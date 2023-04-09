import type { AxiosPromise } from 'axios'
import { Endpoints } from '../endpoints'
import { Page } from '../types'
import { CreateModuleDTO, Module, ModulesQueryParams, UpdateModuleDTO } from './model'

export class ModuleEndpoints extends Endpoints {
  basePath: string = 'modules'

  getModules = (params: ModulesQueryParams | undefined): AxiosPromise<Page<Module>> => {
    return this.instance.get(this.basePath, { params })
  }
  getModuleById = (id: string): AxiosPromise<Module> => {
    return this.instance.get(this.basePath + `/${id}`)
  }
  updateModule = (id: string, body: UpdateModuleDTO): AxiosPromise<Module> => {
    return this.instance.patch(this.basePath + `/${id}`, body)
  }

  createModule = (body: CreateModuleDTO): AxiosPromise<Module> => {
    return this.instance.post(this.basePath, body)
  }

  deleteModule = (id: string): AxiosPromise<Module> => {
    return this.instance.delete(this.basePath + `/${id}`)
  }
}
