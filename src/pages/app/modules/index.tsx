import React from 'react'
import { Plus } from 'tabler-icons-react'
import { Divider, Grid, Group, Stack, Title } from '@mantine/core'
import { CreateFolder } from '@/features/folder/create-folder'
import { CreateModule } from '@/features/module/create-module'
import { QueryErrorBoundary, QuerySuspense, QueryWrapper } from '@/shared/lib/react-query'
import { FoldersStack } from '@/widgets/folder-stack'
import { ModulesGrid } from '@/widgets/modules-grid'

export const ModulesPage = () => {
  return (
    <Stack>
      <Group position={'apart'}>
        <Title>Learn Modules</Title>
        <Group>
          <CreateModule color={'green'} leftIcon={<Plus />}>
            Create module
          </CreateModule>
          <CreateFolder leftIcon={<Plus />} color={'blue'}>
            Create folder
          </CreateFolder>
        </Group>
      </Group>
      <Divider my="sm" label="Folders" labelProps={{ fz: 14, c: 'slate.4', fw: 'bold' }} />
      <Grid gutter={20}>
        <Grid.Col>
          <QueryWrapper>
            <FoldersStack />
          </QueryWrapper>
        </Grid.Col>
      </Grid>
      <Divider label="Modules" labelProps={{ fz: 14, c: 'slate.4', fw: 'bold' }} my="xs" />
      <QueryErrorBoundary>
        <QuerySuspense>
          <ModulesGrid folderId={'without_folder'} />
        </QuerySuspense>
      </QueryErrorBoundary>
    </Stack>
  )
}
