import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  phraseTranslation: {
    fontWeight: 600,
    color: theme.colorScheme === 'dark' ? theme.colors.slate[2] : theme.colors.slate[7],
  },
}))
