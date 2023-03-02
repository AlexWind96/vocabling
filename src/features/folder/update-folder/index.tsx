import * as React from 'react'
import { ActionIcon, ActionIconProps, Modal, ScrollArea, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ModuleCard, useModules } from '@/entities/module'
import { ToggleModuleToFolder } from './toggle-module-to-folder'

type UpdateFolderProps = {
  folderId: string
} & Omit<ActionIconProps, 'onClick'>

export const UpdateFolder = ({ folderId, ...actionIconProps }: UpdateFolderProps) => {
  const [opened, { open, close }] = useDisclosure(false)
  const { data } = useModules({ params: { folderId: 'without_folder' } })
  return (
    <>
      <Modal opened={opened} onClose={close} title={<Text fw={'bold'}>Add modules</Text>}>
        {data && data.length ? (
          <ScrollArea style={{ height: 400 }}>
            <Stack spacing={'xs'} px={20} pb={10}>
              {data.map((module) => {
                return (
                  <ModuleCard
                    key={module.id}
                    data={module}
                    actions={
                      <div className={'flex h-100'}>
                        <ToggleModuleToFolder
                          hasFolder={Boolean(module.folderId)}
                          moduleId={module.id}
                          folderId={folderId}
                        />
                      </div>
                    }
                  />
                )
              })}
            </Stack>
          </ScrollArea>
        ) : (
          <Text>No modules to add</Text>
        )}
      </Modal>
      <ActionIcon onClick={open} {...actionIconProps} />
    </>
  )
}
