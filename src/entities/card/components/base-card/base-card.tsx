import { IconEye, IconEyeCheck, IconInfoCircle, IconMinus, IconPlus } from '@tabler/icons-react'
import moment from 'moment'
import React, { useEffect } from 'react'
import {
  ActionIcon,
  Badge,
  Box,
  ChevronIcon,
  Collapse,
  Group,
  Paper,
  Popover,
  Stack,
  Text,
  TypographyStylesProvider,
  UnstyledButton,
  createStyles,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Card, LEARN_STATUS } from '@shared/api'
import { Progress } from './progress'
import { Sentence } from './sentence'

type BaseCardProps = {
  data: Card
  rightSection: React.ReactNode
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
  hideStudyPhrase = false,
  showModule = false,
  expandComments = false,
  onViewed,
  onPlusClick,
  onMinusClick,
}: BaseCardProps) => {
  return (
    <Paper p={'xs'} shadow="lg" radius="md">
      <Stack>
        <Box p={'xs'}>
          <Stack spacing={'sm'}>
            <Group position={'apart'} align={'start'}>
              <div className={'flex gap-4'}>
                {data.progress ? (
                  <Progress status={data.progress.status} />
                ) : (
                  <Progress status={LEARN_STATUS.NEW} />
                )}
                <Badge size={'xs'} color={'gray'} leftSection={<IconEye size={16} />}>
                  <Text lh={'16px'}>{data.progress?.views}</Text>
                </Badge>
                <MetaInfo data={data} />
                {data.module && showModule && <Badge size={'xs'}>{data.module.label}</Badge>}
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
        <AdditionalInfo data={data} expandComments={expandComments} />
      </Stack>
    </Paper>
  )
}

const MetaInfo = ({ data }: { data: Card }) => {
  const [opened, { close, open }] = useDisclosure(false)

  return (
    <Popover width={'auto'} position="bottom" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <ActionIcon size={'xs'} color={'blue'} onMouseEnter={open} onMouseLeave={close}>
          <IconInfoCircle />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
        {data.progress?.nextRepetitionDate ? (
          <Text fz={'sm'}>
            Next repetition: {moment(data.progress.nextRepetitionDate).format('YYYY-DD-MM HH:mm')}
          </Text>
        ) : null}
        <Text fz={'sm'}>Step: {data.progress?.step}</Text>
        <Text fz={'sm'}>Threshold: {data.progress?.threshold}</Text>
      </Popover.Dropdown>
    </Popover>
  )
}

const AdditionalInfo = ({ data, expandComments }: { data: Card; expandComments: boolean }) => {
  const [opened, { toggle, open, close }] = useDisclosure(expandComments)
  const isAdditionalInfo = hasAdditionalInfo(data.notes, data.sentenceTranslation)
  const { classes } = useStyles()

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'ArrowUp':
        event.preventDefault()
        isAdditionalInfo && toggle()
        break
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [toggle, opened, isAdditionalInfo])

  useEffect(() => {
    if (expandComments) {
      open()
    } else {
      close()
    }
  }, [expandComments])
  return (
    <>
      <UnstyledButton
        p={16}
        onClick={isAdditionalInfo ? toggle : undefined}
        sx={(theme) => ({
          borderRadius: theme.radius.lg,
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.slate[0],
        })}
      >
        <Group position={'apart'}>
          <Text className={classes.phraseTranslation}>{data.phraseTranslation}</Text>
          {isAdditionalInfo ? <ChevronIcon /> : null}
        </Group>
      </UnstyledButton>
      <Collapse in={opened} px={'1rem'}>
        <Text c={'slate.7'} size={'md'}>
          {data.sentenceTranslation}
        </Text>
        <TypographyStylesProvider>
          <div className={'text-sm'} dangerouslySetInnerHTML={{ __html: data.notes || '' }} />
        </TypographyStylesProvider>
      </Collapse>
    </>
  )
}

const useStyles = createStyles((theme) => ({
  phraseTranslation: {
    fontWeight: 600,
    color: theme.colorScheme === 'dark' ? theme.colors.slate[2] : theme.colors.slate[7],
  },
}))
