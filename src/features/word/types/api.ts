import { CreateWordFormValues } from './index'

export type CreateWordDataDTO = CreateWordFormValues & {
  owner: string
}

export type WordDataDTO = CreateWordFormValues & {
  id: string
  owner: string
}

export type SheetWordDataDTO = {
  word: string
  translation: string
  sentence: string
  sentenceTranslation: string
  s1: ';'
  s2: ';'
  s3: ';'
}
