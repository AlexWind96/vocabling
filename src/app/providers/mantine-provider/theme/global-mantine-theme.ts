import { MantineThemeOverride } from '@mantine/core'
import { overrideColors } from './colors'

export const globalMantineTheme: MantineThemeOverride = {
  colors: overrideColors.colors,
  primaryShade: { light: 6, dark: 7 },
  primaryColor: 'pink',
  datesLocale: 'en',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, sans-serif',
  fontFamilyMonospace:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
  components: {
    Paper: {
      defaultProps: (theme) => ({
        shadow: 'md',
        radius: 'lg',
        bg: theme.colorScheme === 'dark' ? theme.colors.dark[8] : undefined,
      }),
    },
    Navbar: {
      defaultProps: (theme) => ({
        bg: theme.colorScheme === 'dark' ? theme.colors.dark[8] : undefined,
      }),
    },
    Header: {
      defaultProps: (theme) => ({
        bg: theme.colorScheme === 'dark' ? theme.colors.dark[8] : undefined,
      }),
    },
  },
}
