import { Card, CreateSentenceUnitDto } from '@/shared/api'
import { EditCardFormValues } from './index'

export const getSentenceUnits = (sentence: string): CreateSentenceUnitDto[] => {
  const notLettersReg = /[^'’\s\p{L}\p{N}\p{M}-]+/gu
  const moreThenTwoSpacesReg = /[\s]{2,}/gu
  if (sentence === '') return []
  return sentence
    .replace(notLettersReg, ' $& ')
    .replace(moreThenTwoSpacesReg, ' ')
    .trim()
    .split(' ')
    .map((unit, index) => {
      return {
        id: index,
        isPunctuation: notLettersReg.test(unit),
        isStudyPhrase: false,
        value: unit,
      }
    })
}

export const addStudyPhraseToSentence = (
  sentence: CreateSentenceUnitDto[],
  phrase: string[]
): CreateSentenceUnitDto[] => {
  return sentence.map((unit, index) => {
    if (phrase.includes(`${index}`)) {
      return {
        ...unit,
        isStudyPhrase: true,
      }
    } else {
      return unit
    }
  })
}

export const getInitialEditCardValues = (card: Card): EditCardFormValues => {
  return {
    sentence: card.sentenceText,
    phrase: card.sentence
      .map((unit, index) => {
        return { ...unit, id: index }
      })
      .filter((unit) => unit.isStudyPhrase)
      .map((unit) => String(unit.id)),
    sentenceTranslation: card.sentenceTranslation || '',
    phraseTranslation: card.phraseTranslation,
    notes: card.notes || '',
    moduleId: card.moduleId,
  }
}
