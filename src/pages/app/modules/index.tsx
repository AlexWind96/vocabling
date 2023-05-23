import React from 'react'
import { Divider, Grid, Group, Stack, Title } from '@mantine/core'
import { QueryWrapper } from '@shared/lib/react-query'
import { Skeletons } from '@shared/ui'
import { useThemeMediaQuery } from '@shared/ui/layouts/use-theme-media-query'
import { CreateFolderButton } from '@features/folder/create-folder'
import { CreateModuleButton } from '@features/module/create-module'
import { FoldersStack } from '@widgets/folder-stack'
import { ModulesGrid } from '@widgets/modules-grid'

export const ModulesPage = () => {
  const { isMD } = useThemeMediaQuery()
  return (
    <Stack>
      <Group position={'apart'}>
        <Title>Modules</Title>
        <Group>
          <CreateModuleButton />
          <CreateFolderButton />
        </Group>
      </Group>
      <Divider my="sm" label="Folders" labelProps={{ fz: 14, c: 'slate.4', fw: 'bold' }} />
      <Grid gutter={20}>
        <Grid.Col>
          <QueryWrapper
            loadingFallback={
              <Stack>
                <Skeletons count={2} height={120} />
              </Stack>
            }
          >
            <FoldersStack />
          </QueryWrapper>
        </Grid.Col>
      </Grid>
      <Divider label="Modules" labelProps={{ fz: 14, c: 'slate.4', fw: 'bold' }} my="xs" />
      <QueryWrapper
        loadingFallback={
          <Group position="apart">
            <Skeletons width={isMD ? 250 : '100%'} />
          </Group>
        }
      >
        <ModulesGrid folderId={'without_folder'} />
      </QueryWrapper>
    </Stack>
  )
}
