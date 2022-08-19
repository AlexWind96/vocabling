import React from 'react'
import { X } from 'tabler-icons-react'
import { Accordion, ActionIcon, Box, Group, Paper, Stack, Title } from '@mantine/core'
import { WordDataDTO } from '../../types/api'

type WordCardProps = {
  data: WordDataDTO
  onDelete: (id: string) => void
}

export const WordCard = ({ data, onDelete }: WordCardProps) => {
  return (
    <Paper p={'xs'} shadow="md" withBorder>
      <Stack>
        <Box p={'xs'}>
          <Group position={'apart'} align={'flex-start'}>
            <Stack spacing={'xs'}>
              <Title color={'green.5'} order={4}>
                {data.foreignWord}
              </Title>
              <Title order={5}>{data.nativeWord}</Title>
            </Stack>
            <ActionIcon
              variant={'light'}
              color={'red'}
              size={'xs'}
              onClick={() => onDelete(data.id)}
            >
              <X />
            </ActionIcon>
          </Group>
        </Box>
        <Accordion variant="separated" radius="xs">
          <Accordion.Item value="example">
            <Accordion.Control>{data.foreignExample}</Accordion.Control>
            <Accordion.Panel>{data.nativeExample}</Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Stack>
    </Paper>
  )
}

WordCard.propTypes = {}
