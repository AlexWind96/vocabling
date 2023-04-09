import * as React from 'react'
import { Box, Group, Text } from '@mantine/core'

type ColoredCountProps = {
  color: string[]
  count: number
}

export const ColoredCount = (props: ColoredCountProps) => {
  return (
    <Group spacing={3} align={'baseline'}>
      <Box
        sx={() => ({
          backgroundColor: props.color[5],
          padding: 5,
          borderRadius: '50%',
        })}
      />
      <Text fz={14} fw={'bold'} sx={() => ({ color: props.color[4] })}>
        {props.count}
      </Text>
    </Group>
  )
}
