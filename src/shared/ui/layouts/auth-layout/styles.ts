import { createStyles, rem } from '@mantine/core'
import background_dark from '@/shared/assets/texture/letters-dark.svg'
import background_light from '@/shared/assets/texture/letters.svg'

export default createStyles((theme) => ({
  wrapper: {
    paddingTop: rem(20),
    paddingBottom: rem(10),
    minHeight: '100vh',
    backgroundImage:
      theme.colorScheme === 'dark' ? `url(${background_dark})` : `url(${background_light})`,
    backgroundPosition: 'center',
  },
}))
