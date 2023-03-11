import { IconMoodAnnoyed2 } from '@tabler/icons-react'
import * as React from 'react'
import { Stack, Title, useMantineTheme } from '@mantine/core'

type NoDataProps = {
  message: string
}

export const NoData = ({ message }: NoDataProps) => {
  const { colors } = useMantineTheme()
  return (
    <Stack align={'center'}>
      <IconMoodAnnoyed2 size={100} color={colors.slate[4]} />
      <Title order={3} color={'slate.4'}>
        {message}
      </Title>
    </Stack>
  )
}
