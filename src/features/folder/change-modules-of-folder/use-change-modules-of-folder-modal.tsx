import { IconPlus } from '@tabler/icons-react'
import * as React from 'react'
import { useCallback } from 'react'
import { ActionIcon } from '@mantine/core'
import { openModal } from '@mantine/modals'
import { QueryWrapper } from '@shared/lib/react-query'
import { ModulesStack } from '@entities/module'
import { useToggleModuleToFolder } from '../../module/toggle-module-to-folder'

const CHANGE_MODULES_OF_FOLDER_MODULE = 'CHANGE_MODULES_OF_FOLDER_MODULE'

export const useChangeModulesOfFolderModal = ({ id }: { id: string }) => {
  const { toggleModuleToFolder } = useToggleModuleToFolder()

  const openChangeModulesOfFolderModal = useCallback(() => {
    openModal({
      modalId: CHANGE_MODULES_OF_FOLDER_MODULE,
      title: 'Add modules',
      children: (
        <QueryWrapper>
          <ModulesStack
            folderId={'without_folder'}
            moduleCardActions={(module) => {
              return (
                <div className={'flex h-100'}>
                  <ActionIcon
                    onClick={() =>
                      toggleModuleToFolder({
                        folderId: id,
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
      ),
    })
  }, [id])

  return { openChangeModulesOfFolderModal }
}
