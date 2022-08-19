import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Plus } from 'tabler-icons-react'
import { Button, Grid, Group, Stack, Title } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { LoadingScreen } from '../../components/elements'
import { WordCard } from '../../features/word'
import { useDeleteWord, useWords } from '../../features/word/api'

export const Words = () => {
  const { t } = useTranslation()
  const { data, isLoading } = useWords()
  const { mutateAsync } = useDeleteWord()
  if (isLoading) return <LoadingScreen />
  if (!data) return <Title>No words</Title>
  const handleDelete = async (id: string) => {
    openConfirmModal({
      title: 'Do you want to remove word',
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: async () => {
        await mutateAsync(id as string)
      },
    })
  }
  return (
    <Stack>
      <Group position={'apart'}>
        <Title>{t('words')}</Title>
        <Button color={'green'} component={Link} to={'create'} leftIcon={<Plus />}>
          Create
        </Button>
      </Group>
      <Grid>
        {data.map((word) => {
          return (
            <Grid.Col key={word.id} md={4}>
              <WordCard data={word} onDelete={handleDelete} />
            </Grid.Col>
          )
        })}
      </Grid>
    </Stack>
  )
}
