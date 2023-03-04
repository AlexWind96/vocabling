import { Module } from '..'

export type Folder = {
  id: string
  createdAt: Date
  updatedAt: Date
  label: string
  userId: string
  modules: Module[]
  description: string | null
}

export type CreateFolderDto = {
  label: string
  description?: string
}
