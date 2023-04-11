import { User } from '../auth'

export type CurrentLearnSession = {
  id: string
  createdAt: Date
  userId: string
  user?: User
  countOfCompleted: number
  rightAnswers: number
  modules: string[]
}

export type UpdateCurrentLearnSessionDto = { folderId?: string } & Pick<
  CurrentLearnSession,
  'modules'
>
