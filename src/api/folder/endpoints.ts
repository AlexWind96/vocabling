import type { AxiosPromise } from 'axios'
import { Endpoints } from '@/shared/api'
import { Page } from '../types'
import { CreateFolderDto, Folder } from './models'

export class FolderEndpoints extends Endpoints {
  getFolders = (): AxiosPromise<Page<Folder>> => {
    return this.instance.get(this.getEndpoint())
  }
  getFolderById = (id: string): AxiosPromise<Folder> => {
    return this.instance.get(this.getEndpoint(`/${id}`))
  }
  updateFolder = (id: string, body: Partial<Folder>): AxiosPromise<Folder> => {
    return this.instance.patch(this.getEndpoint(`/${id}`), body)
  }

  createFolder = (body: CreateFolderDto): AxiosPromise<Folder> => {
    return this.instance.post(this.getEndpoint(), body)
  }

  deleteFolder = (id: string): AxiosPromise<Folder> => {
    return this.instance.delete(this.getEndpoint(`/${id}`))
  }
}
