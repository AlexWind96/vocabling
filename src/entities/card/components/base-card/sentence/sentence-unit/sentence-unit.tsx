import * as React from 'react'
import { createStyles } from '@mantine/core'
import { SentenceUnit } from '@shared/api'

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

const useStyles = createStyles((theme) => ({
  unit: {
    lineHeight: 1.5,
  },
  accent: {
    color: theme.fn.primaryColor(),
  },
  hidden: {
    position: 'relative',
    userSelect: 'none',
    '&:after': {
      position: 'absolute',
      content: '""',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      backgroundColor: theme.fn.primaryColor(),
      borderRadius: theme.radius.md,
    },
  },
}))
