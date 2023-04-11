import * as React from 'react'
import { ActionIcon, ActionIconProps, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { CreateModuleDTO } from '@/shared/api'
import { CreateModuleForm } from './create-module-form'
import { useCreateModule } from './use-create-module'

type CreateModuleActionIconProps = { folderId?: string } & Omit<ActionIconProps, 'onClick'>

export const CreateModuleActionIcon = ({
  folderId,
  ...buttonProps
}: CreateModuleActionIconProps) => {
  const { mutateAsync } = useCreateModule()
  const [opened, handlers] = useDisclosure(false)
  const handleSubmit = async (data: CreateModuleDTO) => {
    await mutateAsync(data)
    handlers.close()
  }
  return (
    <>
      <ActionIcon onClick={handlers.open} {...buttonProps} />
      <Modal opened={opened} onClose={handlers.close} title="Create folder">
        <CreateModuleForm folderId={folderId} onSubmit={handleSubmit} />
      </Modal>
    </>
  )
}
