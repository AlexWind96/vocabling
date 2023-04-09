import { IconFolderX, IconPlus } from '@tabler/icons-react'
import * as React from 'react'
import { Group, Stack } from '@mantine/core'
import { Folder, useFolders } from '@/entities/folder'
import { DeleteFolder } from '@/features/folder/delete-folder'
import { NoData } from '@/shared/ui'
import { ModulesGrid } from '../modules-grid'
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
    <Stack>
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
            <ModulesGrid folderId={folder.id} withoutNoDataView />
          </Folder>
        )
      })}
    </Stack>
  )
}
