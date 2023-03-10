import React, { useState } from 'react'
import { ColorScheme, ColorSchemeProvider, MantineProvider as Provider } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import { GlobalStyles } from './global-styles'
import { globalMantineTheme } from './theme'

export function MantineProvider({ children }) {
  const preferredColorScheme = useColorScheme()
  const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme)
  const toggleColorScheme = (value?: ColorScheme) => {
    if (colorScheme === 'dark') {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <Provider theme={{ ...globalMantineTheme, colorScheme: colorScheme }} withNormalizeCSS>
        <NotificationsProvider position="top-right">
          <GlobalStyles />
          <ModalsProvider>{children}</ModalsProvider>
        </NotificationsProvider>
      </Provider>
    </ColorSchemeProvider>
  )
}
