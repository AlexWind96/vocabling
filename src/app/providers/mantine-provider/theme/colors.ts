import {
  amber,
  blue,
  cyan,
  emerald,
  fuchsia,
  gray,
  green,
  indigo,
  lime,
  neutral,
  orange,
  pink,
  purple,
  red,
  rose,
  sky,
  slate,
  stone,
  teal,
  violet,
  yellow,
  zinc,
} from 'tailwindcss/colors'
import { MantineThemeColorsOverride, Tuple } from '@mantine/core'
import { ExtendedCustomColors } from './colors.d'

type ColorShades = Tuple<string, 10>

type Colors = {
  [key in ExtendedCustomColors]: ColorShades
}

export const overrideColors: MantineThemeColorsOverride = {
  colors: {
    dark: Object.values(zinc),
    slate: Object.values(slate),
    gray: Object.values(gray),
    zinc: Object.values(zinc),
    neutral: Object.values(neutral),
    stone: Object.values(stone),
    amber: Object.values(amber),
    emerald: Object.values(emerald),
    sky: Object.values(sky),
    purple: Object.values(purple),
    rose: Object.values(rose),
    red: Object.values(red),
    pink: Object.values(pink),
    fuchsia: Object.values(fuchsia),
    violet: Object.values(violet),
    indigo: Object.values(indigo),
    blue: Object.values(blue),
    cyan: Object.values(cyan),
    teal: Object.values(teal),
    green: Object.values(green),
    lime: Object.values(lime),
    yellow: Object.values(yellow),
    orange: Object.values(orange),
  } as Colors,
}
