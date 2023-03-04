import { IconMinus, IconPlus } from '@tabler/icons'
import * as React from 'react'
import { ActionIcon } from '@mantine/core'
import { useToggleToFolder } from '@/entities/module'

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
  const { mutateAsync, isLoading } = useToggleToFolder()
  const handleClick = async () => {
    if (hasFolder) {
      await mutateAsync({ id: moduleId, folderId: null })
    } else {
      await mutateAsync({ id: moduleId, folderId: folderId })
    }
  }
  return (
    <ActionIcon color={'green'} onClick={handleClick} disabled={isLoading}>
      {hasFolder ? <IconMinus /> : <IconPlus />}
    </ActionIcon>
  )
}
