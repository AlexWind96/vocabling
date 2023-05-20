import { IconPlus } from '@tabler/icons-react'
import * as React from 'react'
import { ActionIcon, Modal } from '@mantine/core'
import { QueryWrapper } from '@shared/lib/react-query'
import { ModulesStack } from '@entities/module'
import { useToggleModuleToFolder } from '../../module/toggle-module-to-folder'

type ChangeModulesOfFolderModalProps = {
  opened: boolean
  onClose: () => void
  folderId?: string
}

export const ChangeModulesOfFolderModal = ({
  folderId = 'without_folder',
  opened,
  onClose,
}: ChangeModulesOfFolderModalProps) => {
  const { toggleModuleToFolder, isLoading } = useToggleModuleToFolder()
  return (
    <Modal opened={opened} onClose={onClose} title={'Add modules'}>
      <QueryWrapper>
        <ModulesStack
          folderId={'without_folder'}
          moduleCardActions={(module) => {
            return (
              <div className={'flex h-100'}>
                <ActionIcon
                  disabled={isLoading}
                  onClick={() =>
                    toggleModuleToFolder({
                      folderId,
                      moduleId: module.id,
                      hasFolder: Boolean(module.folderId),
                    })
                  }
                >
                  <IconPlus />
                </ActionIcon>
              </div>
            )
          }}
        />
      </QueryWrapper>
    </Modal>
  )
}
