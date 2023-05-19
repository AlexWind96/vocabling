import React, { FC } from 'react'
import { Group, Header as MantineHeader } from '@mantine/core'
import useStyles from './styles'


type HeaderProps = {
  before?: React.ReactNode
  after?: React.ReactNode
}

export const Header: FC<HeaderProps> = ({ before, after }) => {
  const { classes } = useStyles()

  return (
    <MantineHeader height={56} className={classes.header}>
      <div className={classes.inner}>
        <Group>{before}</Group>
        {after}
      </div>
    </MantineHeader>
  )
}
