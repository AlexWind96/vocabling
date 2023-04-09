import { createStyles, rem } from '@mantine/core'

export default createStyles((theme) => ({
  anchor: {
    fontWeight: 'bold',
    fontSize: rem(20),
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
}))
