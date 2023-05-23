import { createStyles } from '@mantine/core'

export default createStyles((theme, _params) => {
  return {
    main: {
      background: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.slate[0],
    },
  }
})
