export enum ROLE {
  Admin = 'admin',
  User = 'user',
}

export type AuthUser = {
  id: string
  email: string
  name: string
  role: ROLE
}
