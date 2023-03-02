import React from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'tabler-icons-react'
import { Button, Divider, Group, Stack, Title } from '@mantine/core'
import { CreateFolder } from '@/features/folder/create-folder'
import { CreateModule } from '@/features/module'
import { PATH } from '@/shared/config'
import { FoldersGrid } from './folders-grid'
import { ModulesGrid } from './modules-grid'

export const ModulesPage = () => {
  return (
    <Stack>
      <Group position={'apart'}>
        <Title>Learn Modules</Title>
        <Group>
          <Button color={'amber'} component={Link} to={PATH.all_cards}>
            All cards
          </Button>
          <CreateModule color={'green'} leftIcon={<Plus />}>
            Create module
          </CreateModule>
          <CreateFolder leftIcon={<Plus />} color={'blue'}>
            Create folder
          </CreateFolder>
        </Group>
      </Group>
      <Divider my="sm" label="Folders" labelProps={{ fz: 14, c: 'slate.4', fw: 'bold' }} />
      <FoldersGrid />
      <Divider label="Modules" labelProps={{ fz: 14, c: 'slate.4', fw: 'bold' }} my="xs" />
      <ModulesGrid />
    </Stack>
  )
}
