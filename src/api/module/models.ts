export type Module = {
  id: string
  createdAt: Date
  updatedAt: Date
  label: string
  value: string
  folderId: string | null
  userId: string
  _count: {
    cards: number
  }
  counts?: {
    all: number
    new: number
    shown: number
    in_progress: number
    in_familiar: number
    known: number
  }
}

export type CreateModuleDTO = {
  label: string
}
