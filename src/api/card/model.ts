export type Card = {
  id: string
  createdAt: Date
  updatedAt: Date
  userId: string
  sentence: SentenceUnit[]
  phraseTranslation: string
  sentenceTranslation: string | null
  notes: string | null
  moduleId: string
  progress?: CardLearnProgress
}

export enum LEARN_STATUS {
  NEW = 'NEW',
  SHOWN = 'SHOWN',
  IN_PROGRESS = 'IN_PROGRESS',
  FAMILIAR = 'FAMILIAR',
  KNOWN = 'KNOWN',
}

export type CardLearnProgress = {
  id: string
  cardId: string
  interval: number
  countOfAnswers: number
  countOfRightAnswers: number
  accuracy: number
  status: LEARN_STATUS
  lastRepetitionDate: Date | null
  nextRepetitionDate: Date | null
}

export type SentenceUnit = {
  id: number
  value: string
  isPunctuation: boolean
  isStudyPhrase: boolean
  translation?: string
  note?: string
  cardId: string
}

export type CreateSentenceUnitDto = Omit<SentenceUnit, 'id' | 'cardId'>

export type CreateCardDTO = {
  sentence: CreateSentenceUnitDto[]
  phraseTranslation: string
  moduleId: string

  sentenceTranslation?: string
  notes?: string
}
