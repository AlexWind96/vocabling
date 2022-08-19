import { CreateWordFormValues } from '../types'
import { SheetWordDataDTO } from '../types/api'

export const formatWordsToSheetWords = (words: CreateWordFormValues[]): SheetWordDataDTO[] => {
  return words
    .filter((item) => item.nativeExample)
    .map((word) => {
      return {
        word: word.foreignWord,
        translation: word.nativeWord,
        sentence: word.foreignExample,
        sentenceTranslation: word.nativeExample,
        s1: ';',
        s2: ';',
        s3: ';',
      }
    })
}
