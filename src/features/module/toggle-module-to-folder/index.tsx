import { IconMinus, IconPlus } from '@tabler/icons'
import * as React from 'react'
import { ActionIcon } from '@mantine/core'
import { useUpdateModule } from '../use-update-module'

type ToggleModuleToFolderProps = {
  moduleId: string
  folderId: string
  hasFolder: boolean
}

export const ToggleModuleToFolder = ({
  folderId,
  moduleId,
  hasFolder,
}: ToggleModuleToFolderProps) => {
  const { mutate, isLoading, error } = useUpdateModule()
  console.log(error)
  const handleClick = () => {
    if (hasFolder) {
      mutate({ id: moduleId, body: { folderId: null } })
    } else {
      mutate({
        id: moduleId,
        body: {
          folderId,
        },
      })
    }
  }
  return (
    <ActionIcon color={'green'} onClick={handleClick} disabled={isLoading}>
      {hasFolder ? <IconMinus /> : <IconPlus />}
    </ActionIcon>
  )
}