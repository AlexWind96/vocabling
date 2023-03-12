import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  unit: {},
  accent: {
    color: theme.fn.primaryColor(),
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
      backgroundColor: theme.fn.primaryColor(),
      borderRadius: theme.radius.md,
    },
  },
}))
