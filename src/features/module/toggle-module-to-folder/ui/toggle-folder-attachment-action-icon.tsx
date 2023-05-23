import { IconPlus } from '@tabler/icons-react'
import * as React from 'react'
import { FC } from 'react'
import { ActionIcon, ActionIconProps } from '@mantine/core'
import { useToggleModuleToFolder } from '../use-toggle-module-to-folder'

interface IToggleFolderAttachmentActionIcon extends Omit<ActionIconProps, 'onClick' | 'loading'> {
  folderId: string
  moduleId: string
  hasFolder: boolean
}

export const ToggleFolderAttachmentActionIcon: FC<IToggleFolderAttachmentActionIcon> = ({
  folderId,
  hasFolder,
  moduleId,
}) => {
  const { toggleModuleToFolder, isLoading } = useToggleModuleToFolder()
  return (
    <ActionIcon
      loading={isLoading}
      onClick={() =>
        toggleModuleToFolder({
          folderId,
          moduleId,
          hasFolder,
        })
      }
    >
      <IconPlus />
    </ActionIcon>
  )
}
