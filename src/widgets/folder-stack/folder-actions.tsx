import { IconPlus } from '@tabler/icons-react'
import * as React from 'react'
import { ActionIcon, Group, Modal, ScrollArea, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { QueryWrapper } from '@shared/lib/react-query'
import { ModulesStack } from '@entities/module'
import { NavigateToNewLearnSessionActionIcon } from '@features/current-learn-session/navigate-to-new-learn-session'
import { DeleteFolderActionIcon } from '@features/folder/delete-folder'
import { CreateModuleActionIcon } from '@features/module/create-module'
import { ToggleFolderAttachmentActionIcon } from '@features/module/toggle-module-to-folder'

type FolderActionsProps = {
  id: string
}

export const FolderActions = ({ id }: FolderActionsProps) => {
  const [opened, handlers] = useDisclosure(false)

  return (
    <>
      <Group>
        <Tooltip label={'Add modules'}>
          <ActionIcon onClick={handlers.open}>
            <IconPlus />
          </ActionIcon>
        </Tooltip>
        <DeleteFolderActionIcon id={id} />
        <CreateModuleActionIcon folderId={id} />
        <NavigateToNewLearnSessionActionIcon folderId={id} />
      </Group>
      <Modal
        opened={opened}
        onClose={handlers.close}
        title={'Add modules'}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <QueryWrapper>
          <ModulesStack
            folderId={'without_folder'}
            moduleCardActions={(module) => {
              return (
                <div className={'flex h-100'}>
                  <ToggleFolderAttachmentActionIcon
                    folderId={id}
                    moduleId={module.id}
                    hasFolder={Boolean(module.folderId)}
                  />
                </div>
              )
            }}
          />
        </QueryWrapper>
      </Modal>
    </>
  )
}
