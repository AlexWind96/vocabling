import * as React from 'react'
import { SentenceUnit } from '@/shared/api'
import { useStyles } from './style'

type UnitProps = {
  unit: Partial<SentenceUnit>
  withSpace?: boolean
  hideStudyPhrase: boolean
}

export const Unit = ({ unit, withSpace = false, hideStudyPhrase }: UnitProps) => {
  const { classes, cx } = useStyles()
  const accent = hideStudyPhrase
    ? cx(classes.unit, classes.accent, classes.hidden)
    : cx(classes.unit, classes.accent)

  if (unit.isStudyPhrase) {
    return (
      <>
        <span className={accent}>{unit.value}</span>
        {withSpace && <span> </span>}
      </>
    )
  } else {
    return (
      <>
        <span className={cx(classes.unit)}>{unit.value}</span>
        {withSpace && <span> </span>}
      </>
    )
  }
}
