import { useCallback } from 'react'
import { useRemoveFromFolderMutation } from './use-remove-from-folder-mutation'

export const useRemoveFromFolder = ({ id }: { id: string }) => {
  const { mutateAsync } = useRemoveFromFolderMutation()
  const removeFromFolder = useCallback(async () => {
    await mutateAsync({ id })
  }, [])

  return { removeFromFolder }
}
