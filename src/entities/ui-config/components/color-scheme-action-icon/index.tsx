import { IconMoon, IconSun } from '@tabler/icons-react'
import { ActionIcon } from '@mantine/core'
import { useColorScheme } from '@/shared/hooks'

export const ColorSchemeActionIcon = () => {
  const { toggleColorScheme, colorScheme } = useColorScheme()
  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      size="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.slate[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.amber[6],
      })}
    >
      {colorScheme === 'dark' ? (
        <IconSun width={18} height={18} />
      ) : (
        <IconMoon width={20} height={20} />
      )}
    </ActionIcon>
  )
}
