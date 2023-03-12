import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  unit: {},
  accent: {
    color: theme.colors[theme.primaryColor][4],
  },
  hidden: {
    position: 'relative',
    userSelect: 'none',
    '&:before': {
      position: 'absolute',
      content: '""',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      backgroundColor: theme.colors[theme.primaryColor][4],
      borderRadius: theme.radius.md,
    },
  },
}))
