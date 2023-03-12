import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button, Text, Title } from '@mantine/core'
import { PATH } from '@/shared/config'
import useStyles from './styles'

export const HomePage = () => {
  const { classes } = useStyles()
  return (
    <div className={classes.wrapper}>
      <div className={classes.inner}>
        <Title className={classes.title}>
          Learn languages
          <br />
          <Text component="span" inherit className={classes.highlight}>
            effectively
          </Text>
        </Title>

        <Text className={classes.description}>
          Save and learn new words without loosing context
        </Text>

        <div className={classes.controls}>
          <Button component={Link} to={`/${PATH.login}`} size={'lg'} radius={'lg'}>
            Get started
          </Button>
        </div>
      </div>
    </div>
  )
}
