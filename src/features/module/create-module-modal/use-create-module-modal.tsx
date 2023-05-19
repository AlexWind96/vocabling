import * as React from 'react'
import { useCallback } from 'react'
import { closeModal, openModal } from '@mantine/modals'
import { CreateModuleDTO } from '@shared/api'
import { CreateModuleForm } from './create-module-form'
import { useCreateModuleMutation } from './use-create-module-mutation'

const CREATE_MODULE_MODAL = 'CREATE_MODULE_MODAL'

export const useCreateModuleModal = ({ folderId }: { folderId?: string }) => {
  const { mutateAsync } = useCreateModuleMutation()
  const handleSubmit = async (data: CreateModuleDTO) => {
    await mutateAsync(data)
    closeModal(CREATE_MODULE_MODAL)
  }

  const openCreateModuleModal = useCallback(() => {
    openModal({
      modalId: CREATE_MODULE_MODAL,
      title: 'Create module',
      children: <CreateModuleForm folderId={folderId} onSubmit={handleSubmit} />,
    })
  }, [folderId])

  return { openCreateModuleModal }
}
