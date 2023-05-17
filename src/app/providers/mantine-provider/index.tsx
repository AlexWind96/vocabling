import React from 'react'
import { ColorScheme, ColorSchemeProvider, MantineProvider as Provider } from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { useTypedSelector } from '@/shared/hooks'
import { GlobalStyles } from './global-styles'
import { generateGlobalMantineTheme } from './theme'

export function MantineProvider({ children }) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })
  const toggleColorScheme = (value?: ColorScheme) => {
    if (colorScheme === 'dark') {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  }
  useHotkeys([['mod+J', () => toggleColorScheme()]])
  const { theme } = useTypedSelector((state) => state.uiConfig)
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <Provider
        theme={{ ...generateGlobalMantineTheme(theme), colorScheme: colorScheme }}
        withNormalizeCSS
      >
        <Notifications position="top-right" />
        <GlobalStyles />
        <ModalsProvider>{children}</ModalsProvider>
      </Provider>
    </ColorSchemeProvider>
  )
}
