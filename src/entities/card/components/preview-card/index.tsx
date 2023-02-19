import React from 'react'
import { Accordion, Box, Paper, Stack, Text } from '@mantine/core'
import { CreateCardDTO } from '@/api'
import { Sentence } from './sentence'

type PreviewCardProps = {
  data: Pick<CreateCardDTO, 'sentence' | 'sentenceTranslation' | 'phraseTranslation' | 'notes'>
}

export const PreviewCard = ({ data }: PreviewCardProps) => {
  return (
    <Paper p={'xs'} shadow="md" withBorder radius="md">
      <Stack>
        <Box p={'xs'}>
          <Stack spacing={'xs'}>
            <Sentence data={data.sentence} />
          </Stack>
        </Box>
        <Accordion variant="separated" radius="lg" defaultValue={'translations'}>
          <Accordion.Item value="translations">
            <Accordion.Control>{data.phraseTranslation || '...'}</Accordion.Control>
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
