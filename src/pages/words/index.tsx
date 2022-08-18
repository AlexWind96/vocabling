import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Plus } from 'tabler-icons-react'
import { Button, Group, Stack, Title } from '@mantine/core'

export const Words = () => {
  const { t } = useTranslation()
  return (
    <Stack>
      <Group position={'apart'}>
        <Title>{t('examinations')}</Title>
        <Button color={'green'} component={Link} to={'create'} leftIcon={<Plus />}>
          Create
        </Button>
      </Group>
      <Stack>Hello</Stack>
    </Stack>
  )
}
