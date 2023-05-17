import { useCallback } from 'react'
import { ColorScheme } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'

export const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  })
  const toggleColorScheme = useCallback(
    (value?: ColorScheme) => {
      if (colorScheme === 'dark') {
        document.documentElement.classList.remove('dark')
      } else {
        document.documentElement.classList.add('dark')
      }
      setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
    },
    [colorScheme]
  )
  return { colorScheme, toggleColorScheme }
}
