import { MantineThemeOverride } from '@mantine/core'
import { overrideColors } from './colors'

type GenerateGlobalMantineTheme = (themeOverride?: MantineThemeOverride) => MantineThemeOverride

export const generateGlobalMantineTheme: GenerateGlobalMantineTheme = (themeOverride) => {
  return {
    colors: overrideColors.colors,
    primaryShade: { light: 6, dark: 7 },
    primaryColor: themeOverride?.primaryColor || 'pink',
    datesLocale: 'en',
    components: {
      Paper: {
        defaultProps: (theme) => ({
          shadow: 'md',
          radius: 'lg',
          bg: theme.colorScheme === 'dark' ? theme.colors.dark[7] : undefined,
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
      ActionIcon: {
        defaultProps: (theme) => ({
          color: theme.colorScheme === 'dark' ? theme.colors.white : theme.colors.pink,
        }),
      },
      Modal: {
        styles: (theme) => ({
          header: {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.white,
          },
          body: {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.white,
          },
          title: {
            fontWeight: 500,
          },
        }),
      },
    },
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, sans-serif',
    fontFamilyMonospace:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
  }
}
