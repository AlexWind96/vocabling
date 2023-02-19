import { CreateSentenceUnitDto } from '@/api'

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
