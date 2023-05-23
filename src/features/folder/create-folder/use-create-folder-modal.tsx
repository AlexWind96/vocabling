import * as React from 'react'
import { useCallback } from 'react'
import { closeModal, openModal } from '@mantine/modals'
import { CreateFolderDto } from '@shared/api'
import { CreateFolderForm } from './ui'
import { useCreateFolderMutation } from './use-create-folder-mutation'

const CREATE_FOLDER_MODAL = 'CREATE_FOLDER_MODAL'

export const useCreateFolderModal = () => {
  const { mutateAsync } = useCreateFolderMutation()
  const handleSubmit = async (data: CreateFolderDto) => {
    await mutateAsync(data)
    closeModal(CREATE_FOLDER_MODAL)
  }
  const openCreateFolderModal = useCallback(() => {
    openModal({
      modalId: CREATE_FOLDER_MODAL,
      title: 'Create folder',
      children: <CreateFolderForm onSubmit={handleSubmit} />,
    })
  }, [])
  return { openCreateFolderModal }
}
