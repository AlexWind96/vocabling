import { IconCursorText } from '@tabler/icons'
import React from 'react'
import { Menu } from '@mantine/core'
import { closeModal, openModal } from '@mantine/modals'
import { UpdateModuleDTO } from '@/api'
import { useModule, useUpdateModule } from '@/entities/module'
import { LoadingScreen } from '@/shared/ui'
import { RenameModuleForm } from './rename-module-form'

type RenameModuleProps = {
  id: string
}

export const RenameModule = (props: RenameModuleProps) => {
  const { data, isFetching } = useModule({ id: props.id })
  const { mutateAsync } = useUpdateModule()

  const handleSubmit = async (data: UpdateModuleDTO) => {
    await mutateAsync({ id: props.id, body: data })
    closeModal(props.id)
  }
  return (
    <>
      <Menu.Item
        icon={<IconCursorText size={14} />}
        onClick={() => {
          openModal({
            modalId: props.id,
            title: 'Rename module',
            children:
              isFetching || !data ? (
                <LoadingScreen />
              ) : (
                <RenameModuleForm onSubmit={handleSubmit} defaultValues={data} />
              ),
          })
        }}
      >
        Rename module
      </Menu.Item>
    </>
  )
}
