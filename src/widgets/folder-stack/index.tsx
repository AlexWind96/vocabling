import { IconFolderX, IconPlus } from '@tabler/icons'
import * as React from 'react'
import { Grid, Group } from '@mantine/core'
import { Folder, useFolders } from '@/entities/folder'
import { ModuleCard } from '@/entities/module'
import { DeleteFolder } from '@/features/folder/delete-folder'
import { ModuleSettings } from '@/features/module/module-settings'
import { NoData } from '@/shared/ui'
import { UpdateFolder } from '../update-module'

type FoldersStackProps = {}

export const FoldersStack = ({}: FoldersStackProps) => {
  const { isSuccess, data } = useFolders({
    suspense: true,
    useErrorBoundary: true,
  })

  if (!isSuccess) return null

  if (!data.length) {
    return <NoData message={'No folders'} />
  }
  return (
    <>
      {data.map((folder) => {
        return (
          <Folder
            key={folder.id}
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
        )
      })}
    </>
  )
}
