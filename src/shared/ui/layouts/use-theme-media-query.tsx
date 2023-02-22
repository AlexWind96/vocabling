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
      isXS: width >= breakpoints.xs,
      isSM: width >= breakpoints.sm,
      isMD: width >= breakpoints.md,
      isLG: width >= breakpoints.lg,
      isXL: width >= breakpoints.xl,
    }
  }, [width])

  return getMediaQueryBooleans()
}
