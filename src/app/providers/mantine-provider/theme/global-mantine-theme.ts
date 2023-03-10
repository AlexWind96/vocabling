import { MantineThemeOverride } from '@mantine/core'
import { overrideColors } from './colors'

export const globalMantineTheme: MantineThemeOverride = {
  colors: overrideColors.colors,
  primaryShade: { light: 6, dark: 7 },
  primaryColor: 'pink',
  components: {},
  datesLocale: 'en',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, sans-serif',
  fontFamilyMonospace:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
}
