import { IconFolderX, IconPlus } from '@tabler/icons'
import * as React from 'react'
import { Grid, Group } from '@mantine/core'
import { Folder, useFolders } from '@/entities/folder'
import { ModuleCard } from '@/entities/module'
import { DeleteFolder } from '@/features/folder/delete-folder'
import { ModuleSettings } from '@/features/module/module-settings'
import { ErrorAlert, LoadingData, NoData } from '@/shared/ui'
import { UpdateFolder } from '@/widgets/update-module'

type FoldersGridProps = {}

export const FoldersGrid = ({}: FoldersGridProps) => {
  const { isError, error, isSuccess, data } = useFolders()

  if (isSuccess) {
    if (!data.length) {
      return <NoData message={'No folders'} />
    }
    return (
      <Grid gutter={20}>
        {data.map((folder) => {
          return (
            <Grid.Col key={folder.id}>
              <Folder
                title={folder.label}
                actions={
                  <Group>
                    <UpdateFolder folderId={folder.id} color={'pink'}>
                      <IconPlus />
                    </UpdateFolder>
                    <DeleteFolder id={folder.id} color={'pink'}>
                      <IconFolderX />
                    </DeleteFolder>
                  </Group>
                }
              >
                <Grid>
                  {folder.modules.map((module) => {
                    return (
                      <Grid.Col span={12} xs={6} sm={4} key={module.id}>
                        <ModuleCard
                          data={module}
                          actions={<ModuleSettings folderId={module.folderId} id={module.id} />}
                        />
                      </Grid.Col>
                    )
                  })}
                </Grid>
              </Folder>
            </Grid.Col>
          )
        })}
      </Grid>
    )
  }

  if (isError) {
    return <ErrorAlert message={error?.message} />
  }

  return <LoadingData />
}
