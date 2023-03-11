import { createStyles } from '@mantine/core'

export default createStyles((theme, _params) => {
  return {
    header: {
      marginBottom: `calc(${theme.spacing.md} * 1.5)`,
      height: 44,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },
  }
})
