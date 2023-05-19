import * as React from 'react'
import { SentenceUnit } from '@shared/api'

type UnitProps = {
  unit: Partial<SentenceUnit>
  withSpace?: boolean
}

export const Unit = ({ unit, withSpace = false }: UnitProps) => {
  const space = withSpace ? ' ' : ''
  if (unit.isStudyPhrase) {
    return <span className={'text-pink-500 dark:text-pink-500'}>{unit.value + space}</span>
  } else {
    return <span>{unit.value + space}</span>
  }
}
