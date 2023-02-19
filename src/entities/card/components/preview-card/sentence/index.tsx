import * as React from 'react'
import { CreateSentenceUnitDto } from '@/api'
import { isLastItem } from '@/shared/utils'
import { Unit } from './sentence-unit'

type SentenceProps = {
  data: CreateSentenceUnitDto[]
}

export const Sentence = ({ data }: SentenceProps) => {
  const isSentence = Boolean(data.length)
  return (
    <div className={'font-sans text-slate-900 dark:text-white text-2xl font-medium'}>
      {isSentence ? getSentence(data) : '...'}
    </div>
  )
}

const getSentence = (data: CreateSentenceUnitDto[]) =>
  data.map((unit, index, array) => {
    if (isLastItem(index, array)) return <Unit unit={unit} key={'unit' + index} />

    const isNextPunctuationUnit = array[index + 1].isPunctuation

    if (isNextPunctuationUnit) {
      return <Unit unit={unit} key={'unit' + index} />
    } else {
      return <Unit unit={unit} key={'unit' + index} withSpace />
    }
  })
