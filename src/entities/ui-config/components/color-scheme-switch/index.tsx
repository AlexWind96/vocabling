import { IconMoonStars, IconSun } from '@tabler/icons-react'
import * as React from 'react'
import { Switch, useMantineTheme } from '@mantine/core'
import { useColorScheme } from '@/shared/hooks'

type ColorSchemeSwitchProps = {}

export const ColorSchemeSwitch = (props: ColorSchemeSwitchProps) => {
  const { toggleColorScheme, colorScheme } = useColorScheme()
  const theme = useMantineTheme()
  return (
    <Switch
      checked={colorScheme === 'dark'}
      onChange={() => toggleColorScheme()}
      size="lg"
      onLabel={<IconSun color={theme.white} size="1.25rem" stroke={1.5} />}
      offLabel={<IconMoonStars color={theme.colors.gray[6]} size="1.25rem" stroke={1.5} />}
    />
  )
}
