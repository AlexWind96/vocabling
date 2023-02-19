import { createStyles } from '@mantine/core'

export default createStyles((theme, _params) => {
  return {
    header: {
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
    },

    inner: {
      height: 56,
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  }
})
