import { createStyles } from '@mantine/core'

export default createStyles((theme) => ({
  footer: {
    marginTop: '80px',
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.black : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}))
