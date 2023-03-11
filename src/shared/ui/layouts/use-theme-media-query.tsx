import { useCallback } from 'react'
import { useMantineTheme } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'

type UseThemeMediaQueryReturnType = {
  isXS: boolean
  isSM: boolean
  isMD: boolean
  isLG: boolean
  isXL: boolean
}

export function useThemeMediaQuery(): UseThemeMediaQueryReturnType {
  const { width } = useViewportSize()
  const { breakpoints } = useMantineTheme()
  const getMediaQueryBooleans = useCallback(() => {
    return {
      isXS: window.matchMedia(`(min-width: ${breakpoints.xs})`).matches,
      isSM: window.matchMedia(`(min-width: ${breakpoints.sm})`).matches,
      isMD: window.matchMedia(`(min-width: ${breakpoints.md})`).matches,
      isLG: window.matchMedia(`(min-width: ${breakpoints.lg})`).matches,
      isXL: window.matchMedia(`(min-width: ${breakpoints.xl})`).matches,
    }
  }, [width])

  return getMediaQueryBooleans()
}
