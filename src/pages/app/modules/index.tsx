import { IconPlus } from '@tabler/icons-react'
import React from 'react'
import { Button, Divider, Grid, Group, Stack, Title } from '@mantine/core'
import { QueryWrapper } from '@shared/lib/react-query'
import { CardSkeletons } from '@shared/ui'
import { useCreateFolderModal } from '@features/folder/create-folder-modal'
import { useCreateModuleModal } from '@features/module/create-module-modal'
import { FoldersStack } from '@widgets/folder-stack'
import { ModulesGrid } from '@widgets/modules-grid'

export const ModulesPage = () => {
  const { openCreateModuleModal } = useCreateModuleModal({})
  const { openCreateFolderModal } = useCreateFolderModal()
  return (
    <Stack>
      <Group position={'apart'}>
        <Title>Modules</Title>
        <Group>
          <Button leftIcon={<IconPlus />} onClick={openCreateModuleModal}>
            Create module
          </Button>
          <Button leftIcon={<IconPlus />} variant={'outline'} onClick={openCreateFolderModal}>
            Create folder
          </Button>
        </Group>
      </Group>
      <Divider my="sm" label="Folders" labelProps={{ fz: 14, c: 'slate.4', fw: 'bold' }} />
      <Grid gutter={20}>
        <Grid.Col>
          <QueryWrapper
            loadingFallback={
              <Stack>
                <CardSkeletons count={2} height={120} />
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
            <CardSkeletons width={250} />
          </Group>
        }
      >
        <ModulesGrid folderId={'without_folder'} />
      </QueryWrapper>
    </Stack>
  )
}
