import { Global } from '@mantine/core'

export function GlobalStyles() {
  return (
    <Global
      styles={(theme) => ({
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },

        body: {
          ...theme.fn.fontStyles(),
          // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.slate[8] : theme.white,
          color: theme.colorScheme === 'dark' ? theme.colors.slate[0] : theme.black,
          lineHeight: theme.lineHeight,
          overscrollBehaviorY: 'contain',
        },
      })}
    />
  )
}
