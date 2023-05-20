import { IconFolderX, IconPlus, IconSchool, IconSquarePlus } from '@tabler/icons-react'
import * as React from 'react'
import { ActionIcon, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useNavigateToNewLearnSession } from '@features/current-learn-session/navigate-to-new-learn-session'
import { ChangeModulesOfFolderModal } from '@features/folder/change-modules-of-folder'
import { useDeleteFolderModal } from '@features/folder/delete-folder'
import { useCreateModuleModal } from '@features/module/create-module-modal'

type FolderActionsProps = {
  id: string
}

export const FolderActions = ({ id }: FolderActionsProps) => {
  const { openDeleteFolderModal } = useDeleteFolderModal({ id })
  const { openCreateModuleModal } = useCreateModuleModal({ folderId: id })
  const { navigateToNewLearnSession } = useNavigateToNewLearnSession({
    params: { folderId: id, modules: [] },
  })
  const [opened, handlers] = useDisclosure(false)

  return (
    <>
      <Group>
        <ActionIcon onClick={handlers.open}>
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
      <ChangeModulesOfFolderModal opened={opened} onClose={handlers.close} folderId={id} />
    </>
  )
}
