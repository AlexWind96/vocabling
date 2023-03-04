import type { AxiosPromise } from 'axios'
import { Endpoints } from '../endpoints'
import { Page } from '../types'
import { CreateFolderDto, Folder } from './models'

export class FolderEndpoints extends Endpoints {
  basePath: string = 'folders'

  getFolders = (): AxiosPromise<Page<Folder>> => {
    return this.instance.get(this.basePath)
  }
  getFolderById = (id: string): AxiosPromise<Folder> => {
    return this.instance.get(this.basePath + `/${id}`)
  }
  updateFolder = (id: string, body: Partial<Folder>): AxiosPromise<Folder> => {
    return this.instance.patch(this.basePath + `/${id}`, body)
  }

  createFolder = (body: CreateFolderDto): AxiosPromise<Folder> => {
    return this.instance.post(this.basePath, body)
  }

  deleteFolder = (id: string): AxiosPromise<Folder> => {
    return this.instance.delete(this.basePath + `/${id}`)
  }
}
