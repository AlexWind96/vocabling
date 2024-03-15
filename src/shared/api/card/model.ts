import { Module } from '../module'
import { PaginationArgs, SortType } from '../types'

export type Card = {
  id: string
  createdAt: Date
  updatedAt: Date
  userId: string
  sentence: SentenceUnit[]
  sentenceText: string
  phraseTranslation: string
  sentenceTranslation: string | null
  notes: string | null
  moduleId: string
  progress?: CardLearnProgress
  module?: Module
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
  step: number
  views: number
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
  sentenceText: string
  sentenceTranslation?: string
  notes?: string
}

export type UpdateCardDTO = {
  sentence?: CreateSentenceUnitDto[]
  moduleId?: string
  phraseTranslation?: string
  sentenceTranslation?: string
  notes?: string
  sentenceText?: string
}

export enum CardOrderByFields {
  Progress = 'progress',
  CreatedAt = 'createdAt',
  Views = 'views',
}

export type CardsQueryParams = {
  moduleId?: string
  orderBy?: CardOrderByFields
  sort?: SortType
  keywords?: string
  step?: 1 | 2 | 3 | 4 | 5 | number
} & PaginationArgs
