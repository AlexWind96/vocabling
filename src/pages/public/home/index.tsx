import * as React from 'react'
import { Link } from 'react-router-dom'
import { Button, Text, Title, createStyles, rem } from '@mantine/core'
import { PATH } from '@entities/navigation'

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

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: rem(100),
    paddingBottom: rem(130),
    [theme.fn.smallerThan('xs')]: {
      paddingTop: rem(80),
      paddingBottom: rem(50),
    },
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  title: {
    fontWeight: 800,
    fontSize: rem(60),
    letterSpacing: rem(1),
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(40),
      textAlign: 'left',
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][5],
  },

  description: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.slate[7],
    textAlign: 'center',
    fontWeight: 500,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    fontSize: rem(20),
    [theme.fn.smallerThan('xs')]: {
      fontSize: theme.fontSizes.md,
      textAlign: 'left',
    },
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  control: {
    height: rem(42),
    fontSize: theme.fontSizes.md,

    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    [theme.fn.smallerThan('xs')]: {
      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },

  secondaryControl: {
    color: theme.white,
    backgroundColor: 'rgba(255, 255, 255, .4)',

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, .45) !important',
    },
  },
}))
