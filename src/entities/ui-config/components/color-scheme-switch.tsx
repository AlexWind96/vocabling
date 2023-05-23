import { IconMoonStars, IconSun } from '@tabler/icons-react'
import * as React from 'react'
import { Switch, useMantineColorScheme, useMantineTheme } from '@mantine/core'

type ColorSchemeSwitchProps = {}

export const ColorSchemeSwitch = (props: ColorSchemeSwitchProps) => {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme()
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
