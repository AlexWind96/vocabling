import React from 'react'
import { Accordion, Box, Group, Paper, Stack, Text } from '@mantine/core'
import { Card } from '@/api'
import { Sentence } from './sentence'

type CardViewProps = {
  data: Card
  rightSection: React.ReactNode
}

export const SimpleCard = ({ data, rightSection }: CardViewProps) => {
  return (
    <Paper p={'xs'} shadow="md" withBorder radius="md">
      <Stack>
        <Box p={'xs'}>
          <Stack spacing={'sm'}>
            <Group position={'apart'} align={'start'}>
              <Group spacing={4}>
                <div className={'h-1 rounded w-4 bg-pink-400'} />
                <div className={'h-1 rounded w-4 bg-pink-400'} />
                <div className={'h-1 rounded w-4 bg-slate-400'} />
                <div className={'h-1 rounded w-4 bg-slate-400'} />
                <div className={'h-1 rounded w-4 bg-slate-400'} />
              </Group>
              {rightSection}
            </Group>
            <Stack spacing={'xs'}>
              <Sentence data={data.sentence} />
            </Stack>
          </Stack>
        </Box>
        <Accordion variant="separated" radius="lg">
          <Accordion.Item value="translations">
            <Accordion.Control>
              <Text fw={'bold'} c={'slate.6'}>
                {data.phraseTranslation}
              </Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text c={'slate.7'} size={'md'}>
                {data.sentenceTranslation}
              </Text>
              <div className={'text-sm'} dangerouslySetInnerHTML={{ __html: data.notes || '' }} />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Stack>
    </Paper>
  )
}
