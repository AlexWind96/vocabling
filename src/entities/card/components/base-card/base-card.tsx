import { IconEye, IconEyeCheck, IconMinus, IconPlus } from '@tabler/icons-react'
import React, { useEffect } from 'react'
import {
  Accordion,
  ActionIcon,
  Badge,
  Box,
  Button,
  Collapse,
  Group,
  Paper,
  Stack,
  Text,
  UnstyledButton,
  createStyles,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Card } from '@shared/api'
import { Progress } from './progress'
import { Sentence } from './sentence'

type BaseCardProps = {
  data: Card
  rightSection: React.ReactNode
  isGraterProgress?: boolean
  hideStudyPhrase?: boolean
  showModule?: boolean
  expandComments?: boolean
  onViewed?: () => void
  onPlusClick?: () => void
  onMinusClick?: () => void
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

export const BaseCard = ({
  data,
  rightSection,
  isGraterProgress,
  hideStudyPhrase = false,
  showModule = false,
  expandComments = false,
  onViewed,
  onPlusClick,
  onMinusClick,
}: BaseCardProps) => {
  const { classes } = useStyles()
  const diff = isGraterProgress ? 1 : 0
  const isAdditionalInfo = hasAdditionalInfo(data.notes, data.sentenceTranslation)
  const [opened, { toggle, open, close }] = useDisclosure(expandComments)
  useEffect(() => {
    if (expandComments) {
      open()
    } else {
      close()
    }
  }, [expandComments])
  return (
    <Paper p={'xs'} shadow="lg" radius="md">
      <Stack>
        <Box p={'xs'}>
          <Stack spacing={'sm'}>
            <Group position={'apart'} align={'start'}>
              <div className={'flex gap-4'}>
                {data.progress ? (
                  <Progress progress={data.progress.step + diff} />
                ) : (
                  <Progress progress={1} />
                )}
                {data.module && showModule && <Badge size={'xs'}>{data.module.label}</Badge>}
                <Badge size={'xs'} color={'gray'} leftSection={<IconEye size={16} />}>
                  <Text lh={'16px'}>{data.progress?.views}</Text>
                </Badge>
              </div>
              <div className={'flex gap-4'}>
                {onViewed && (
                  <ActionIcon size={'xs'} color={'gray'} onClick={onViewed}>
                    <IconEyeCheck />
                  </ActionIcon>
                )}
                {onPlusClick && (
                  <ActionIcon size={'xs'} color={'green'} onClick={onPlusClick}>
                    <IconPlus />
                  </ActionIcon>
                )}
                {onMinusClick && (
                  <ActionIcon size={'xs'} color={'red'} onClick={onMinusClick}>
                    <IconMinus />
                  </ActionIcon>
                )}
                {rightSection}
              </div>
            </Group>
            <Stack spacing={'xs'}>
              <Sentence hideStudyPhrase={hideStudyPhrase} data={data.sentence} />
            </Stack>
          </Stack>
        </Box>
        {isAdditionalInfo ? (
          <>
            <UnstyledButton
              p={16}
              onClick={toggle}
              sx={(theme) => ({
                borderRadius: theme.radius.lg,
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.slate[0],
              })}
            >
              <Text className={classes.phraseTranslation}>{data.phraseTranslation}</Text>
            </UnstyledButton>
            <Collapse in={opened} px={'1rem'}>
              <Text c={'slate.7'} size={'md'}>
                {data.sentenceTranslation}
              </Text>
              <div className={'text-sm'} dangerouslySetInnerHTML={{ __html: data.notes || '' }} />
            </Collapse>
          </>
        ) : (
          <Box
            p={16}
            sx={(theme) => ({
              borderRadius: theme.radius.lg,
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.slate[0],
            })}
          >
            <Text className={classes.phraseTranslation}>{data.phraseTranslation}</Text>
          </Box>
        )}
      </Stack>
    </Paper>
  )
}

const useStyles = createStyles((theme) => ({
  phraseTranslation: {
    fontWeight: 600,
    color: theme.colorScheme === 'dark' ? theme.colors.slate[2] : theme.colors.slate[7],
  },
}))
