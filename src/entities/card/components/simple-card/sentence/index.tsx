import * as React from 'react'
import { SentenceUnit } from '@/api'
import { isLastItem } from '@/shared/utils'
import { Unit } from './sentence-unit'

type SentenceProps = {
  data: SentenceUnit[]
  hideStudyPhrase: boolean
}

export const Sentence = ({ data, hideStudyPhrase }: SentenceProps) => {
  const isSentence = Boolean(data.length)
  return (
    <div className={'font-sans text-slate-900 dark:text-white text-2xl font-medium'}>
      {isSentence ? getSentence(data, hideStudyPhrase) : '...'}
    </div>
  )
}

const getSentence = (data: SentenceUnit[], hideStudyPhrase: boolean) =>
  data.map((unit, index, array) => {
    if (isLastItem(index, array))
      return <Unit unit={unit} key={'unit' + index} hideStudyPhrase={hideStudyPhrase} />

    const isNextPunctuationUnit = array[index + 1].isPunctuation

    if (isNextPunctuationUnit) {
      return <Unit unit={unit} key={'unit' + index} hideStudyPhrase={hideStudyPhrase} />
    } else {
      return <Unit unit={unit} key={'unit' + index} hideStudyPhrase={hideStudyPhrase} withSpace />
    }
  })
