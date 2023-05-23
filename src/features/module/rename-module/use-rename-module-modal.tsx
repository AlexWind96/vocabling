import { useCallback } from 'react'
import { closeModal, openModal } from '@mantine/modals'
import { UpdateModuleDTO } from '@shared/api'
import { LoadingData } from '@shared/ui'
import { useModuleQuery } from '@entities/module'
import { RenameModuleForm } from './ui'
import { useRenameModuleMutation } from './use-rename-module-mutation'

export const useRenameModuleModal = ({ id }: { id: string }) => {
  const { data, isFetching } = useModuleQuery({ variables: { id } })
  const { mutateAsync } = useRenameModuleMutation()

  const handleSubmit = async (data: UpdateModuleDTO) => {
    await mutateAsync({ id: id, body: data })
    closeModal(id)
  }

  const openRenameModuleModal = useCallback(() => {
    openModal({
      modalId: id,
      title: 'Rename module',
      children:
        isFetching || !data ? (
          <LoadingData />
        ) : (
          <RenameModuleForm onSubmit={handleSubmit} defaultValues={data} />
        ),
    })
  }, [isFetching, data, id])

  return { openRenameModuleModal }
}
