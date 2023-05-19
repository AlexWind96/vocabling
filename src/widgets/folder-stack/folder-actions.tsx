import { IconFolderX, IconPlus, IconSchool, IconSquarePlus } from '@tabler/icons-react'
import * as React from 'react'
import { ActionIcon, Group } from '@mantine/core'
import { useNavigateToNewLearnSession } from '@features/current-learn-session/navigate-to-new-learn-session'
import { useChangeModulesOfFolderModal } from '@features/folder/change-modules-of-folder'
import { useDeleteFolderModal } from '@features/folder/delete-folder'
import { useCreateModuleModal } from '@features/module/create-module-modal'

type FolderActionsProps = {
  id: string
}

export const FolderActions = ({ id }: FolderActionsProps) => {
  const { openDeleteFolderModal } = useDeleteFolderModal({ id })
  const { openCreateModuleModal } = useCreateModuleModal({})
  const { navigateToNewLearnSession } = useNavigateToNewLearnSession({
    params: { folderId: id, modules: [] },
  })
  const { openChangeModulesOfFolderModal } = useChangeModulesOfFolderModal({ id })
  return (
    <Group>
      <ActionIcon onClick={openChangeModulesOfFolderModal}>
        <IconPlus />
      </ActionIcon>
      <ActionIcon onClick={openDeleteFolderModal}>
        <IconFolderX />
      </ActionIcon>
      <ActionIcon onClick={openCreateModuleModal}>
        <IconSquarePlus />
      </ActionIcon>
      <ActionIcon onClick={navigateToNewLearnSession}>
        <IconSchool />
      </ActionIcon>
    </Group>
  )
}
