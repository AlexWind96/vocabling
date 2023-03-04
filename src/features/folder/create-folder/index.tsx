import * as React from 'react'
import { Button, ButtonProps, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useCreateFolder } from '@/entities/folder'
import { CreateFolderDto } from '@/shared/api'
import { CreateFolderForm } from './create-folder-form'

type CreateFolderProps = {} & Omit<ButtonProps, 'onClick'>

export const CreateFolder = ({ ...buttonProps }: CreateFolderProps) => {
  const { mutateAsync } = useCreateFolder()
  const [opened, handlers] = useDisclosure(false)
  const handleSubmit = async (data: CreateFolderDto) => {
    await mutateAsync(data)
    handlers.close()
  }

  return (
    <>
      <Button onClick={handlers.open} {...buttonProps} />
      <Modal opened={opened} onClose={handlers.close} title="Create folder">
        <CreateFolderForm onSubmit={handleSubmit} />
      </Modal>
    </>
  )
}
