export type LearnSession = {
  id: string
  createdAt: Date
  userId: string
  isCompleted: boolean
  countOfCompleted: number
  rightAnswers: number
  user?: {
    learnGoal: number
  }
}
