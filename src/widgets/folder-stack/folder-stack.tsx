import * as React from 'react'
import { Stack } from '@mantine/core'
import { NoData } from '@shared/ui'
import { Folder, useFoldersQuery } from '@entities/folder'
import { ModulesGrid } from '../modules-grid'
import { FolderActions } from './folder-actions'

type FoldersStackProps = {}

export const FoldersStack = ({}: FoldersStackProps) => {
  const { isSuccess, data } = useFoldersQuery({
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
          <Folder key={folder.id} title={folder.label} actions={<FolderActions id={folder.id} />}>
            <ModulesGrid folderId={folder.id} withoutNoDataView />
          </Folder>
        )
      })}
    </Stack>
  )
}
