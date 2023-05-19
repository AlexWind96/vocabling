import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Group, Title, createStyles } from '@mantine/core'

export const ErrorPage = () => {
  const { classes } = useStyles()

  return (
    <Container className={classes.root}>
      <div className={classes.label}>Network error</div>
      <Title className={classes.title}>Something went wrong(</Title>
      <Group position="center">
        <Button component={Link} to={'/home'} variant="subtle" size="md">
          Take me back to home page
        </Button>
      </Group>
    </Container>
  )
}

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 150,
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,
    marginBottom: theme.spacing.xl,
    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}))
