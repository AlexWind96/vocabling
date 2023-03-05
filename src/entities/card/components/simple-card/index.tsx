import React from 'react'
import { Accordion, Box, Group, Paper, Stack, Text } from '@mantine/core'
import { Card } from '@/shared/api'
import { Progress } from './progress'
import { Sentence } from './sentence'

type CardViewProps = {
  data: Card
  rightSection: React.ReactNode
  isGraterProgress?: boolean
  hideStudyPhrase?: boolean
}

const hasAdditionalInfo = (notes: string | null, sentence: string | null) => {
  let isNotes = false
  let isSentence = false
  if (notes && notes.length && notes !== '<p></p>') {
    isNotes = true
  }
  if (sentence && sentence.length) {
    isSentence = true
  }
  return isSentence || isNotes
}

export const SimpleCard = ({
  data,
  rightSection,
  isGraterProgress,
  hideStudyPhrase = false,
}: CardViewProps) => {
  const diff = isGraterProgress ? 1 : 0

  const isAdditionalInfo = hasAdditionalInfo(data.notes, data.sentenceTranslation)

  return (
    <Paper p={'xs'} shadow="md" withBorder radius="md">
      <Stack>
        <Box p={'xs'}>
          <Stack spacing={'sm'}>
            <Group position={'apart'} align={'start'}>
              {data.progress && <Progress progress={data.progress.step + diff} />}
              {rightSection}
            </Group>
            <Stack spacing={'xs'}>
              <Sentence hideStudyPhrase={hideStudyPhrase} data={data.sentence} />
            </Stack>
          </Stack>
        </Box>
        {isAdditionalInfo ? (
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
        ) : (
          <Box p={16} bg={'slate.0'} sx={(theme) => ({ borderRadius: theme.radius.lg })}>
            <Text fw={'bold'} c={'slate.6'}>
              {data.phraseTranslation}
            </Text>
          </Box>
        )}
      </Stack>
    </Paper>
  )
}
