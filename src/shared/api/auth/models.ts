export type Tokens = {
  access_token: string
  refresh_token: string
}

export type RegisterBody = {
  email: string
  password: string
  name: string
}

export type LoginBody = {
  email: string
  password: string
}

export enum ROLE {
  User = 'USER',
  Admin = 'ADMIN',
}

export type User = {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date

  role: ROLE
  learnGoal: number
  growthRatio?: number
  initialMemoryPersistence?: number
  learnSessions?: any[]
  currentSession?: any
  cards?: any[]
  modules?: any[]
  folders?: any[]
}

export type UpdateUserDto = {
  name?: string
  email?: string
  learnGoal?: number
  growthRatio?: number
  initialMemoryPersistence?: number
}
