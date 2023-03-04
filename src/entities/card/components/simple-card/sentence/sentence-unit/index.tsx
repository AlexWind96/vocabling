import * as React from 'react'
import { SentenceUnit } from '@/shared/api'

type UnitProps = {
  unit: Partial<SentenceUnit>
  withSpace?: boolean
  hideStudyPhrase: boolean
}

export const Unit = ({ unit, withSpace = false, hideStudyPhrase }: UnitProps) => {
  const accent = hideStudyPhrase
    ? 'bg-pink-300 text-pink-300 select-none'
    : 'text-pink-500 dark:text-pink-500'
  const space = withSpace ? 'mr-2' : ''
  if (unit.isStudyPhrase) {
    return <div className={`inline-block rounded-sm ${accent} ${space}`}>{unit.value}</div>
  } else {
    return <div className={`inline-block ${space}`}>{unit.value}</div>
  }
}
