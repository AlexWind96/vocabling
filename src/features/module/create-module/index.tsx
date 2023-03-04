import * as React from 'react'
import { Button, ButtonProps, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useCreateModule } from '@/entities/module'
import { CreateModuleDTO } from '@/shared/api'
import { CreateModuleForm } from './create-module-form'

type CreateModuleProps = {} & Omit<ButtonProps, 'onClick'>

export const CreateModule = ({ ...buttonProps }: CreateModuleProps) => {
  const { mutateAsync } = useCreateModule()
  const [opened, handlers] = useDisclosure(false)
  const handleSubmit = async (data: CreateModuleDTO) => {
    await mutateAsync(data)
    handlers.close()
  }
  return (
    <>
      <Button onClick={handlers.open} {...buttonProps} />
      <Modal opened={opened} onClose={handlers.close} title="Create folder">
        <CreateModuleForm onSubmit={handleSubmit} />
      </Modal>
    </>
  )
}
