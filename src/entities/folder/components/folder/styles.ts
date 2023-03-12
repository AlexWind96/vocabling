import { createStyles } from '@mantine/core'

export default createStyles((theme) => ({
  wrapper: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors[theme.primaryColor][7]
        : theme.colors[theme.primaryColor][2],
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.colors.white : theme.colors[theme.primaryColor][6],
  },
}))
